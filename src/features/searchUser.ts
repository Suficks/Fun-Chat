import { state } from 'app/state';
import { renderUsers } from 'entities/Users/renderUsers';

export const searchUser = () => {
  const searchInput = document.querySelector('.search_input') as HTMLInputElement;
  const { users } = state.getState();

  searchInput?.addEventListener('input', () => {
    const filteredUsers = users.filter((user) =>
      user.login.toLowerCase().includes(searchInput.value.trim().toLowerCase())
    );
    renderUsers(filteredUsers);
  });
};
