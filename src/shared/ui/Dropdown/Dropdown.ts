import { changeMessageText } from 'features/changeMessageText';
import { deleteMessage } from 'shared/api/api';
import './Dropdown.scss';

export const removeDropdown = () => {
  const dropdown = document.querySelector('.dropdown');
  dropdown?.remove();
};

const setDropdownPosition = (id: string, e: MouseEvent) => {
  const dropdown = document.querySelector('.dropdown') as HTMLElement;
  const left = e.clientX;
  const top = e.clientY;

  if (!dropdown) return;

  if (left + dropdown.offsetWidth > window.innerWidth) {
    dropdown.style.left = `${window.innerWidth - dropdown.offsetWidth}px`;
  } else {
    dropdown.style.left = `${left}px`;
  }

  const message = document.querySelector(`[data-id="${id}"]`) as HTMLElement;
  const messageBottom = message.getBoundingClientRect().bottom;
  if (top + dropdown.offsetHeight > messageBottom) {
    dropdown.style.top = `${messageBottom - dropdown.offsetHeight}px`;
  } else {
    dropdown.style.top = `${top}px`;
  }
};

export const setDropdown = (id: string, e: MouseEvent) => {
  const template = `
    <ul class="dropdown" style="left: ${e.clientX}px; top: ${e.clientY}px">
      <li class="dropdown_item change_btn">Изменить</li>
      <li class="dropdown_item delete_btn">Удалить</li>
    </ul>
  `;

  removeDropdown();
  document.body.insertAdjacentHTML('beforeend', template);

  setDropdownPosition(id, e);

  const changeBtn = document.querySelector('.change_btn');
  const deleteBtn = document.querySelector('.delete_btn');

  deleteBtn?.addEventListener('click', () => {
    deleteMessage(id);
  });

  changeBtn?.addEventListener('click', () => {
    changeMessageText(id);
  });
};

document.addEventListener('click', (e) => {
  if (!(e.target as HTMLElement).closest('.message')) {
    removeDropdown();
  }
});
