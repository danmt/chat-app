import { createAction, props } from '@ngrx/store';
import { IChat, IMessage } from '@chat-app/api-interface';

export const getChatsSuccess = createAction(
  '[ChatsApi] Get Chats Success',
  props<{ chats: IChat[] }>()
);
export const getChatsError = createAction(
  '[ChatsApi] Get Chats Error',
  props<{ error: Error }>()
);
export const messageSent = createAction(
  '[ChatsApi] Message Sent',
  props<{ message: IMessage }>()
);
export const startChatSuccess = createAction(
  '[ChatsApi] Start Chat Success',
  props<{ chat: IChat }>()
);
export const startChatError = createAction(
  '[ChatsApi] Start Chat Error',
  props<{ error: Error }>()
);
export const deleteChatSuccess = createAction(
  '[ChatsApi] Delete Chat Success',
  props<{ chatId: string }>()
);
export const deleteChatError = createAction(
  '[ChatsApi] Delete Chat Error',
  props<{ error: Error }>()
);
