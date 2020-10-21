import { createAction, props } from '@ngrx/store';
import { IChat, IUser } from '@chat-app/api-interface';

export const clientsUpdated = createAction(
  '[ChatsSocket] Clients Updated',
  props<{ clients: IUser[] }>()
);
export const chatStarted = createAction(
  '[ChatsSocket] Chat Started',
  props<{ chat: IChat }>()
);
