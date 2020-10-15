import { createAction, props } from '@ngrx/store';

export const getChats = createAction('[ChatsComponent] Get Chats');
export const activateChat = createAction(
  '[ChatsComponent] Activate Chat',
  props<{ chatId: number }>()
);
