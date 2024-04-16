import { setAboutPage } from 'pages/About/setAboutPage';
import { getDataFromSessionStorage } from 'features/sessionStorage';
import { setMainPage } from 'pages/Main/setMainPage';
import { userAuth } from 'shared/api/api';
import { validation } from './validation';
import './Authentication.scss';

export const setAuthenticationPage = () => {
  const template = `
    <form class="form auth_form">
      <fieldset class="fieldset">
        <legend>Авторизация</legend>
        <div class="input_wrap">
          <label>Имя</label>
          <input placeholder="Введите имя" type="text" class="input login_input name_input"/>
          <span class="error"></span>
        </div>
        <div class="input_wrap">
          <label>Пароль</label>
          <input placeholder="Введите имя" type="password" class="input login_input password_input"/>
          <span class="error"></span>
        </div>
      </fieldset>
      <button class="button disabled login_btn" >Войти в приложение</button>
      <button class="button info_btn">Инфо</button>
    </form>
  `;

  if (!getDataFromSessionStorage('currentUser')) {
    document.body.innerHTML = '';
    document.body.insertAdjacentHTML('beforeend', template);
  } else setMainPage();

  const inputs = document.querySelectorAll('.login_input');
  const infoBtn = document.querySelector('.info_btn');
  const loginBtn = document.querySelector('.login_btn');

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      validation(input as HTMLInputElement);
    });

    input?.addEventListener('keypress', (e) => {
      const keyboardEvent = e as KeyboardEvent;
      if (keyboardEvent.key === 'Enter' && loginBtn?.classList.contains('disabled')) {
        e.preventDefault();
      }
    });
  });

  infoBtn?.addEventListener('click', () => {
    setAboutPage('auth');
  });

  loginBtn?.addEventListener('click', (e: Event) => {
    e.preventDefault();
    userAuth();
  });
};

setAuthenticationPage();
