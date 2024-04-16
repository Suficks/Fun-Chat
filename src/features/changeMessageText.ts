import { state } from 'app/state';
import { renderDialogButtons } from 'entities/DialogButtons/renderDialogButtons';

export const changeMessageText = (id: string) => {
  const messageInput = document.querySelector('.message_input') as HTMLInputElement;
  const message = state.getMessages().find((item) => item.id === id);

  if (messageInput) {
    messageInput.value = message?.text || '';
  }
  state.setIsEditMode(true);
  renderDialogButtons(id);
};
