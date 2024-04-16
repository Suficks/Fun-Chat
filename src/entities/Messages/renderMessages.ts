import { state } from 'app/state';
import { setDropdown } from 'shared/ui/Dropdown/Dropdown';
import './Message.scss';

const onMessageHandler = () => {
  const messages = Array.from(document.querySelectorAll('.message'));
  const line = document.querySelector('.line');

  messages.forEach((item) => {
    item.addEventListener('click', (e) => {
      const id = item.getAttribute('data-id') || '';
      setDropdown(id, e as MouseEvent);
    });
  });

  (line || messages[messages.length - 1]).scrollIntoView({ behavior: 'smooth' });
};

const setMessages = () => {
  const messages = state.getMessages();
  const { login } = state.getState().currentUser;
  let isFirstMessageFromOther = true;

  return messages?.map((message) => {
    const { from = '', text, datetime = 1, status, id } = message;
    const date = new Date(datetime).toLocaleString('pl-PL');
    const isCurrentUser = from === login;
    let statusText = '';
    let isNewMessagesText = '';

    if (isCurrentUser) {
      statusText = 'отправлено';
      if (status?.isDelivered) {
        statusText = 'доставлено';
      } else if (status?.isReaded) {
        statusText = 'прочитано';
      }
      isFirstMessageFromOther = true;
    }

    if (!isCurrentUser && isFirstMessageFromOther && !status?.isReaded) {
      isNewMessagesText = '<div class="line">Новые сообщения</div>';
      isFirstMessageFromOther = false;
    }

    return `
      ${isNewMessagesText}
      <div class="message ${isCurrentUser ? 'right pointered' : 'no_events'}" data-id="${id}">
        <div class="message_header">
          <p class="user_name">${isCurrentUser ? 'вы' : from}</p>
          <p>${date}</p>
        </div>
        <div class="text">${text}</div>
        <div class="message_footer">
          <p>${status?.isEdited ? 'изменено' : ''}</p>
          <p>${statusText}</p>
        </div>
      </div>
    `;
  });
};

export const renderMessages = () => {
  const container = document.querySelector('.dialog_content');

  const { selectedContact } = state.getState();
  const messages = state.getMessages();

  if (!container) return;

  if (messages.length === 0 && selectedContact.login) {
    container.innerHTML = '<p class="info">Напишите ваше первое сообщение...</p>';
    return;
  }

  if (!selectedContact.login) {
    container.innerHTML = '<p class="info">Выберите пользователя для отправки сообщения...</p>';
    return;
  }

  const templates = setMessages();

  container.innerHTML = templates.join('');

  onMessageHandler();
};
