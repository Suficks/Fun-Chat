import { state } from 'app/state';
import { buttonsHandler } from 'features/buttonsHandler';

const buttonsArray = [
  '<button class="button send_btn small_btn disabled">Отправить</button>',
  '<button class="button send_changed small_btn">Изменить</button>',
];

export function renderDialogButtons(id: string = '') {
  const container = document.querySelector('.dialog_buttons');
  const { isEditMode } = state.getState();

  if (!container) return;

  container.innerHTML = '';
  container?.insertAdjacentHTML('beforeend', isEditMode ? buttonsArray[1] : buttonsArray[0]);

  const sendBtn = document.querySelector('.send_btn') as HTMLButtonElement;
  const sendChangesBtn = document.querySelector('.send_changed') as HTMLButtonElement;

  const currentButton = isEditMode ? sendChangesBtn : sendBtn;

  buttonsHandler(currentButton, id);
}
