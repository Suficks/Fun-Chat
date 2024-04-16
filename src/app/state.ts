import { renderDialogHeader } from 'entities/DialogHeader/renderDialogHeader';
import { renderMessages } from 'entities/Messages/renderMessages';
import { renderUsers } from 'entities/Users/renderUsers';
import { getDataFromSessionStorage } from 'features/sessionStorage';
import { Message, StateProps, Status, User } from 'shared/types/types';

class State {
  state: StateProps;

  constructor() {
    this.state = {
      users: [],
      currentUser: getDataFromSessionStorage('currentUser') || {},
      selectedContact: { login: '' },
      messages: {},
      currentMessage: '',
      isEditMode: false,
    };
  }

  getState() {
    return this.state;
  }

  getMessages() {
    const { login } = this.getState().selectedContact;
    return this.state.messages[login] || [];
  }

  setIsEditMode(mode: boolean) {
    this.state.isEditMode = mode;
  }

  setUsers(users: User[]) {
    const { login } = this.getState().selectedContact;

    users.forEach((user) => {
      const currentIndex = this.state.users.findIndex((elem) => elem.login === user.login);

      if (currentIndex !== -1) {
        this.state.users[currentIndex] = user;
      } else this.state.users.push(...users);

      if (login === user.login) {
        this.setSelectedContact(user.login);
      }
    });

    this.state.users.sort((a) => (a.isLogined ? -1 : 0));
    renderUsers(this.state.users);
  }

  setCurrentMessage(message: string) {
    this.state.currentMessage = message;
  }

  setCurrentUser(currentUser: User) {
    this.state.currentUser = currentUser;
  }

  setSelectedContact(login: string) {
    const selectedContact = this.state.users.find((item) => item.login === login);
    if (selectedContact) {
      this.state.selectedContact = selectedContact;
    }
    renderDialogHeader();
    renderMessages();
  }

  setMessages = (newMessages: Message[]) => {
    const { messages } = this.state;

    newMessages.forEach((item) => {
      const { to = '', from = '' } = item;

      if (!messages[to] || !messages[from]) {
        messages[to] = [];
        messages[from] = [];
      }
      messages[to]?.push(item);
      messages[from]?.push(item);
    });
    console.log(messages);
    renderUsers(this.state.users);
  };

  addMessages(message: Message, to: string, from: string) {
    const { messages } = this.state;

    if (!messages[to] || !messages[from]) {
      messages[to] = [];
      messages[from] = [];
    }
    messages[to]?.push(message);
    messages[from]?.push(message);

    renderUsers(this.state.users);
    renderMessages();
  }

  clearHistory(deleteMessages: boolean = false) {
    const { login } = this.state.selectedContact;
    if (deleteMessages) {
      this.state.messages[login] = [];
    }
    this.state.selectedContact = { login: '' };
  }

  deleteMessage(id: string) {
    const { messages } = this.state;

    Object.keys(messages).forEach((key) => {
      this.state.messages[key] = this.state.messages[key]?.filter((item) => item.id !== id);
    });
    renderUsers(this.state.users);
    renderMessages();
  }

  deleteAllMessages() {
    this.state.messages = {};
  }

  editMessage(id: string, text: string) {
    const { login } = this.getState().selectedContact;
    const editableMessage = this.state.messages[login]?.find((item) => item.id === id);

    if (editableMessage && editableMessage.status) {
      editableMessage.text = text;
      editableMessage.status.isEdited = true;
    }

    renderMessages();
  }

  changeMessageStatus(id: string, { isDelivered, isReaded }: Status) {
    const {
      messages,
      selectedContact: { login },
    } = this.state;

    const updatedMessages = messages?.[login]?.map((message) => {
      if (message.id === id) {
        return {
          ...message,
          status: {
            ...message.status,
            isDelivered,
            isReaded,
          },
        };
      }
      return message;
    });

    if (updatedMessages) {
      this.state.messages[login] = updatedMessages;
    }
    renderUsers(this.state.users);
    renderMessages();
  }
}

export const state = new State();
