import { createAction, props } from '@ngrx/store';
import { IUser } from '@chat-app/api-interface';

export const clientsUpdated = createAction(
  '[ChatsSocket] Client Updated',
  props<{ clients: IUser[] }>()
);
