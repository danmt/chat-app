import { createAction, props } from '@ngrx/store';

export const enterPage = createAction('[HomePage] Enter Page');
export const activateChat = createAction(
  '[HomePage] Activate Chat',
  props<{ chatId: string }>()
);
export const sendMessage = createAction(
  '[HomePage] Send Message',
  props<{ chatId: string; body: string }>()
);
