import { IUser } from '@chat-app/api-interface';
import { createAction, props } from '@ngrx/store';

export const enterPage = createAction('[HomePage] Enter Page');
export const activateChat = createAction(
  '[HomePage] Activate Chat',
  props<{ chatId: string }>()
);
export const clearChat = createAction('[HomePage] Clear Chat');
export const sendMessage = createAction(
  '[HomePage] Send Message',
  props<{ chatId: string; body: string }>()
);
export const startChat = createAction(
  '[HomePage] Start Chat',
  props<{ participants: [IUser, IUser] }>()
);
