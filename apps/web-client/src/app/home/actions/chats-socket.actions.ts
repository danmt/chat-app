import { createAction, props } from '@ngrx/store';
import { IChat, IMessage, IUser } from '@chat-app/api-interface';

export const clientConnected = createAction(
  '[ChatsSocket] Client Connected',
  props<{ clients: IUser[] }>()
);
export const chatStarted = createAction(
  '[ChatsSocket] Chat Started',
  props<{ chat: IChat }>()
);
export const chatDeleted = createAction(
  '[ChatsSocket] Chat Deleted',
  props<{ chatId: string }>()
);
export const messageSent = createAction(
  '[ChatsSocket] Chat Sent',
  props<{ message: IMessage }>()
);
