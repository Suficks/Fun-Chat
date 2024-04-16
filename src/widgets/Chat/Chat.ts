import { renderDialogButtons } from 'entities/DialogButtons/renderDialogButtons';
import { renderDialogHeader } from 'entities/DialogHeader/renderDialogHeader';
import { onReadMessages } from 'features/onReadMessages';
import './Chat.scss';

export const Chat = () => {
  const container = document.querySelector('.chat');

  if (!container) return;

  const template = `
      <div class="dialog_header"></div>
      <div class="dialog_content">
        <p class="info">Выберите пользователя для отправки сообщения...</p>
      </div>
      <form class="dialog_form">
        <input class="message_input disabled" placeholder="Сообщение..."/>
        <div class="dialog_buttons"></div>
      </form>
    </section>
  `;
  container.innerHTML = '';
  container?.insertAdjacentHTML('beforeend', template);

  const content = document.querySelector('.dialog_content');
  content?.addEventListener('wheel', onReadMessages);
  content?.addEventListener('click', onReadMessages);

  renderDialogHeader();
  renderDialogButtons();
};
