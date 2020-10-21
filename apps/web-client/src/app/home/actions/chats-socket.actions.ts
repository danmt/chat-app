import { createAction, props } from '@ngrx/store';
import { IUser } from '@chat-app/api-interface';

export const clientConnected = createAction(
  '[ChatsSocket] Client Connected',
  props<{ clients: IUser[] }>()
);
