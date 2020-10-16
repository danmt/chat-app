import { createReducer, on, Action } from '@ngrx/store';
import { IChat, IMessage, IUser, IChatTab } from '@chat-app/api-interface';

import { ChatsComponentActions, ChatsApiActions } from '../../chats/actions';

export interface State {
  data?: IChat[];
  pending: boolean;
  error: Error | null;
  activeId: number;
}

export const initialState = {
  pending: false,
  error: null,
  activeId: -1,
} as State;

const chatReducer = createReducer(
  initialState,
  on(ChatsComponentActions.getChats, (state) => ({
    ...state,
    pending: true,
  })),
  on(ChatsComponentActions.activateChat, (state, action) => ({
    ...state,
    activeId: action.chatId,
  })),
  on(ChatsApiActions.getChatsSuccess, (state, action) => ({
    ...state,
    pending: false,
    data: action.chats,
    error: null,
  })),
  on(ChatsApiActions.getChatsError, (state, action) => ({
    ...state,
    pending: false,
    error: action.error,
    data: undefined,
  }))
);

export function reducer(state = initialState, action: Action) {
  return chatReducer(state, action);
}

export const selectChatsData = (state: State) => state.data;
export const selectChatsActiveId = (state: State) => state.activeId;
export const selectChatsList = (
  chats: IChat[] | undefined,
  currentUserId: number
) =>
  chats &&
  chats.map(
    (chat) =>
      ({
        id: chat.id,
        contact: chat.participants.find(
          (participant: IUser) => currentUserId !== participant.id
        ),
        lastMessage: chat.messages.find(
          (message: IMessage) => currentUserId !== message.authorId
        ),
      } as IChatTab)
  );
export const selectChatsPending = (state: State) => state.pending;
export const selectChatsError = (state: State) => state.error;
export const selectChat = (chats: IChat[] | undefined, activeId: number) =>
  chats && chats.find((chat: IChat) => chat.id === activeId);
export const selectChatReceiver = (
  chat: IChat | undefined,
  currentUserId: number
) =>
  chat &&
  chat.participants &&
  chat.participants.find(
    (participant: IUser) => currentUserId !== participant.id
  );
