import { state } from 'app/state';
import { User } from 'shared/types/types';
import './User.scss';

export const renderUsers = (users: User[]) => {
  const container = document.querySelector('.list');
  const { messages } = state.getState();

  if (!container) return;

  const templates = users.map((user) => {
    const { login, isLogined } = user;
    const messagesFromCurrentUser = messages[login] || [];
    const filteredMessages = messagesFromCurrentUser?.filter((item) => item.status?.isReaded === false);
    const unreadMessagesCounter =
      filteredMessages && filteredMessages.length !== 0 ? `<div class="unread">${filteredMessages?.length}</div>` : '';

    return `
      <li class="user" data-login="${login}">
        <div class="marker ${isLogined ? 'online' : ''}"></div>
        <p class="user_name">${login}</p>
        ${filteredMessages?.map((item) => (item.from === login ? unreadMessagesCounter : '')).join('')}
      </li>
    `;
  });

  container.innerHTML = templates.join('');

  const usersList = document.querySelectorAll('.user');

  usersList.forEach((user) => {
    user.addEventListener('click', () => {
      const login = user.getAttribute('data-login');
      state.setSelectedContact(login || '');

      const messageInput = document.querySelector('.message_input');
      messageInput?.classList.remove('disabled');
    });
  });
};
