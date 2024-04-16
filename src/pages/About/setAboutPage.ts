import { state } from 'app/state';
import { setAuthenticationPage } from 'pages/Authentication/setAuthenticationPage';
import { setMainPage } from 'pages/Main/setMainPage';
import './AboutPage.scss';

export const setAboutPage = (page: 'main' | 'auth') => {
  const template = `
    <div class="about">
      <h1 class="title about_title">Веселый чатик</h1>
      <p class="about_text">Это авторский чат на основе технологии WebSocket представляет собой мгновенное мессенджерское приложение, которое обеспечивает обмен сообщениями между пользователями в реальном времени.</p>
      <p class="about_text">Чат создан с использованием WebSocket протокола для поддержки двусторонней коммуникации между клиентом и сервером без задержек и перезагрузок страницы.</p>
      <h2 class="title about_title">Функциональность</h2>
      <ol>
        <li class="about_text"><b class="keywords">Регистрация и вход в систему:</b> Пользователи могут зарегистрироваться, создав учетную запись, либо войти в систему.</li>
        <li class="about_text"><b class="keywords">Обмен сообщениями:</b>  Пользователи могут отправлять текстовые сообщения в реальном времени и принимать их от других пользователей в чате.</li>
        <li class="about_text"><b class="keywords">Уведомления:</b>  Система предоставляет уведомления о новых сообщениях и событиях в чате.</li>
        <li class="about_text"><b class="keywords">Профили пользователей:</b>  Пользователи могут видеть других пользователе и видеть их онлайн-статус.</li>
        <li class="about_text"><b class="keywords">Удаление/редактирование сообщений:</b>  Пользователи могут удалять свои ранее отправленные сообщения и редактировать текст ранее отправленных им сообщений.</li>
      </ol>
      <a href="https://github.com/Suficks" target="_blank" class="about_link">Автор: Suficks</a>
      <button class="button back_btn">Вернуться назад</button>
      </div>
  `;

  document.body.innerHTML = '';
  document.body.insertAdjacentHTML('beforeend', template);

  const backBtn = document.querySelector('.back_btn');
  backBtn?.addEventListener('click', () => {
    state.clearHistory(false);
    return page === 'main' ? setMainPage() : setAuthenticationPage();
  });
};
