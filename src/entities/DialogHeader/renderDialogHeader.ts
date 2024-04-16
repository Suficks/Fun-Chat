import { state } from 'app/state';
import './DialogHeader.scss';

export const renderDialogHeader = () => {
  const container = document.querySelector('.dialog_header');
  const { login, isLogined } = state.getState().selectedContact;

  if (!container) return;

  const template = `
    ${
      login
        ? `<p class="user_name">${login}</p>
      ${isLogined ? '<p class="status online_status">в сети</p>' : '<p class="status offline_status"> не в сети</p>'}`
        : ''
    }
    `;

  container.innerHTML = template;
};
