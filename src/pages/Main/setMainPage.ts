import { searchUser } from 'features/searchUser';
import { Chat } from 'widgets/Chat/Chat';
import { Footer } from 'widgets/Footer/Footer';
import { Header } from 'widgets/Header/Header';
import { renderUsers } from 'entities/Users/renderUsers';
import { state } from 'app/state';

import './MainPage.scss';

export const setMainPage = () => {
  const { users } = state.getState();

  const template = `
    <main class="main">
      <section class="content">
        <aside class="users">
          <input class="input search_input" placeholder="Поиск..."/>
          <ul class="list"></ul>
        </aside>
        <section class="chat"></section>
      </section>
    </main>
  `;

  document.body.innerHTML = '';
  document.body.insertAdjacentHTML('beforeend', template);

  Header();
  renderUsers(users);
  Chat();
  Footer();
  searchUser();
};
