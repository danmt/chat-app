import { createAction, props } from '@ngrx/store';
import { IUser } from '@chat-app/api-interface';

export const clientsUpdated = createAction(
  '[ChatsSocket] Clients Updated',
  props<{ clients: IUser[] }>()
);
