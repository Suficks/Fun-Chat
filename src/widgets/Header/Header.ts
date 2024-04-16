import { state } from 'app/state';
import { setAboutPage } from 'pages/About/setAboutPage';
import { userLogOut } from 'shared/api/api';
import './Header.scss';

export const Header = () => {
  const container = document.querySelector('.main');
  const { login } = state.getState().currentUser;

  const template = `
    <header class="header">
      <p class="current_user">Пользователь: ${login.length > 10 ? `${login.slice(0, 10)}...` : login}</p>
      <h1 class="title">Веселый чатик</h1>
      <div class="buttons_container">
        <button class="button info_btn small_btn">Инфо</button>
        <button class="button exit_btn small_btn">Выход</button>
      </div>
    </header>
  `;

  container?.insertAdjacentHTML('afterbegin', template);

  const infoBtn = document.querySelector('.info_btn');
  const exitBtn = document.querySelector('.exit_btn');

  infoBtn?.addEventListener('click', () => {
    setAboutPage('main');
  });
  exitBtn?.addEventListener('click', () => {
    userLogOut();
    state.clearHistory(true);
  });
};
