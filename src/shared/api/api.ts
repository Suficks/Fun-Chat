import { state } from 'app/state';
import { getDataFromSessionStorage, setDataToSessionStorage } from 'features/sessionStorage';
import { setAuthenticationPage } from 'pages/Authentication/setAuthenticationPage';
import { setMainPage } from 'pages/Main/setMainPage';
import { Payload, RequestName, Response, User } from 'shared/types/types';
import { modalRemove, setModal } from 'shared/ui/Modal/Modal';

const APIUrl = 'ws://localhost:4000';
let socket: WebSocket;

const sendMessageToServer = (type: RequestName, payload: Payload) => {
  const message: Response = {
    id: crypto.randomUUID(),
    type,
    payload,
  };
  socket.send(JSON.stringify(message));
};

const checkServer = () => {
  return socket.readyState !== 2 && socket.readyState !== 3;
};

export const requestUsers = () => {
  sendMessageToServer('USER_ACTIVE', null);
  sendMessageToServer('USER_INACTIVE', null);
};

export const userAuth = () => {
  const { currentUser } = state.getState();
  sendMessageToServer('USER_LOGIN', { user: currentUser });
};

export const userLogOut = () => {
  const { currentUser } = state.getState();
  sendMessageToServer('USER_LOGOUT', { user: currentUser });
};

export const getHistory = (login: string) => {
  sendMessageToServer('MSG_FROM_USER', { user: { login } });
};

export const sendMessage = () => {
  const { selectedContact, currentMessage } = state.getState();

  sendMessageToServer('MSG_SEND', {
    message: {
      to: selectedContact.login,
      text: currentMessage,
    },
  });
};

export const deleteMessage = (id: string) => {
  sendMessageToServer('MSG_DELETE', { message: { id } });
};

export const editMessage = (id: string) => {
  const { currentMessage } = state.getState();
  sendMessageToServer('MSG_EDIT', { message: { id, text: currentMessage } });
};

export const setMessageRead = (id: string) => {
  sendMessageToServer('MSG_READ', { message: { id } });
};

const errorHandling = (error: string) => {
  let errorMessage = '';
  switch (error) {
    case 'incorrect password':
      errorMessage = 'Вы ввели неверный пароль';
      break;
    case 'a user with this login is already authorized':
      errorMessage = 'Пользователь с таким логином уже авторизован';
      break;
    case 'incorrect message id':
      errorMessage = 'Сообщение было удалено';
      break;
    default:
      errorMessage = 'Произошла ошибка';
  }
  setModal({ text: errorMessage, button: true });
};

const onSocketOpen = () => {
  const { login } = getDataFromSessionStorage('currentUser') || {};

  modalRemove();
  if (login) {
    userAuth();
  }
};

const onSocketMessage = (data: string) => {
  const { type, payload }: Response = JSON.parse(data);
  const { user, users = [], messages = [], message = {}, error = '' } = payload || {};
  const { login = '', isLogined } = user || {};
  const { id = '', text = '', to = '', from = '', status = { isDelivered: true } } = message;

  const updatedUser = { login, isLogined };
  const { currentUser } = state.getState();

  switch (type) {
    case 'USER_ACTIVE':
      {
        const filteredUsers = users?.filter((item: User) => item.login !== currentUser.login) || [];
        state.setUsers(filteredUsers);

        filteredUsers.forEach((item) => {
          getHistory(item.login);
        });
      }
      break;
    case 'USER_INACTIVE':
      state.setUsers(users);
      users.forEach((item) => {
        getHistory(item.login);
      });
      break;
    case 'USER_EXTERNAL_LOGIN':
    case 'USER_EXTERNAL_LOGOUT':
      state.setUsers([updatedUser]);
      break;
    case 'USER_LOGIN':
      state.setCurrentUser(currentUser);
      setDataToSessionStorage<User>('currentUser', { ...currentUser, isLogined });
      setMainPage();
      requestUsers();
      break;
    case 'ERROR':
      errorHandling(error);
      break;
    case 'USER_LOGOUT':
      sessionStorage.removeItem('currentUser');
      setAuthenticationPage();
      break;
    case 'MSG_FROM_USER':
      state.setMessages(messages);
      break;
    case 'MSG_SEND':
      state.addMessages(message, to, from);
      break;
    case 'MSG_DELETE':
      state.deleteMessage(id);
      break;
    case 'MSG_EDIT':
      state.editMessage(id, text);
      break;
    case 'MSG_DELIVER':
      state.changeMessageStatus(id, status);
      break;
    case 'MSG_READ':
      state.changeMessageStatus(id, status);
      break;
    default:
  }
};

const socketConnect = () => {
  socket = new WebSocket(APIUrl);

  socket.onopen = () => {
    onSocketOpen();
  };

  socket.onmessage = ({ data }) => {
    onSocketMessage(data);
  };

  socket.onclose = () => {
    state.deleteAllMessages();
    state.clearHistory(false);
    setModal({ text: 'Подключение к серверу', button: false, loader: true });

    const timer = setInterval(() => {
      socketConnect();

      if (checkServer()) {
        clearInterval(timer);
      }
    }, 3000);
  };
};

socketConnect();
