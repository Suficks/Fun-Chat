import { state } from 'app/state';
import { renderDialogButtons } from 'entities/DialogButtons/renderDialogButtons';
import { editMessage, sendMessage } from 'shared/api/api';
import { onReadMessages } from './onReadMessages';

export const buttonsHandler = (currentBtn: HTMLButtonElement, id: string = '') => {
  const messageInput = document.querySelector('.message_input') as HTMLInputElement;

  messageInput?.addEventListener('input', () => {
    currentBtn?.classList.toggle('disabled', messageInput.value === '');
    state.setCurrentMessage(messageInput.value);
  });

  messageInput?.addEventListener('keypress', (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !messageInput.value.trim()) {
      e.preventDefault();
    }
  });

  currentBtn.addEventListener('click', (e: Event) => {
    e.preventDefault();
    messageInput.value = '';
    onReadMessages();

    if (currentBtn.classList.contains('send_btn')) {
      sendMessage();
      currentBtn?.classList.add('disabled');
    } else {
      editMessage(id);
      state.setIsEditMode(false);
      renderDialogButtons();
    }
  });
};
