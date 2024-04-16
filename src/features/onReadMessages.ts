import { state } from 'app/state';
import { setMessageRead } from 'shared/api/api';

export const onReadMessages = () => {
  const { selectedContact, messages, currentUser } = state.getState();

  messages[selectedContact.login]?.forEach((item) => {
    const isCurrentUser = item.from === currentUser.login;

    if (item.status?.isReaded === false && !isCurrentUser) {
      setMessageRead(item.id || '');
    }
  });
};
