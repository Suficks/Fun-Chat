export interface User {
  login: string;
  password?: string;
  isLogined?: boolean;
}

export type Payload = {
  users?: User[];
  user?: User;
  message?: Message;
  messages?: Message[];
  error?: string;
} | null;

export type RequestName =
  | 'USER_LOGIN'
  | 'ERROR'
  | 'USER_LOGOUT'
  | 'USER_EXTERNAL_LOGIN'
  | 'USER_EXTERNAL_LOGOUT'
  | 'USER_ACTIVE'
  | 'USER_INACTIVE'
  | 'MSG_SEND'
  | 'MSG_FROM_USER'
  | 'MSG_DELIVER'
  | 'MSG_READ'
  | 'MSG_DELETE'
  | 'MSG_EDIT';

export interface Response {
  id: string;
  type: RequestName;
  payload: Payload;
}

export interface Status {
  isDelivered: boolean;
  isReaded?: boolean;
  isEdited?: boolean;
}

export interface Message {
  id?: string;
  from?: string;
  to?: string;
  text?: string;
  datetime?: number;
  status?: Status;
}

export interface Messages {
  [key: string]: Message[];
}

export interface StateProps {
  users: User[];
  currentUser: User;
  selectedContact: User;
  messages: Messages;
  currentMessage: string;
  isEditMode: boolean;
}
