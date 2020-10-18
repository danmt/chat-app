import { createReducer, on, Action } from '@ngrx/store';
import { IChat, IMessage, IUser, IChatTab } from '@chat-app/api-interface';

import { HomePageActions, ChatsApiActions } from '../../home/actions';

export interface State {
  data: IChat[] | null;
  pending: boolean;
  error: Error | null;
  activeId?: string;
}

export const initialState = {
  data: null,
  pending: false,
  error: null,
} as State;

const chatReducer = createReducer(
  initialState,
  on(HomePageActions.enterPage, (state) => ({
    ...state,
    pending: true,
  })),
  on(HomePageActions.activateChat, (state, action) => ({
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
    data: null,
  })),
  on(ChatsApiActions.messageSent, (state, action) => ({
    ...state,
    data: !state.data
      ? null
      : state.data.map((chat) => ({
          ...chat,
          messages: [...chat.messages, action.message],
        })),
  }))
);

export function reducer(state = initialState, action: Action) {
  return chatReducer(state, action);
}

export const selectChatsData = (state: State) => state.data;
export const selectChatsActiveId = (state: State) => state.activeId;
export const selectChatsList = (chats: IChat[] | null, user: IUser | null) => {
  if (!chats || !user) {
    return null;
  }

  return chats.map(
    (chat) =>
      ({
        _id: chat._id,
        contact: chat.participants.find(
          (participant: IUser) => user._id !== participant._id
        ),
        lastMessage: chat.messages.find(
          (message: IMessage) => user._id !== message.authorId
        ),
      } as IChatTab)
  );
};
export const selectChatsPending = (state: State) => state.pending;
export const selectChatsError = (state: State) => state.error;
export const selectChat = (chats: IChat[] | null, activeId?: string) => {
  if (!chats || !activeId) {
    return null;
  }

  const selectedChat = chats.find((chat: IChat) => chat._id === activeId);

  if (!selectedChat) {
    return null;
  }

  return selectedChat;
};
export const selectChatReceiver = (chat: IChat | null, user: IUser | null) => {
  if (!chat || !chat.participants || !user) {
    return null;
  }

  const receiver = chat.participants.find(
    (participant: IUser) => participant._id !== user._id
  );

  if (!receiver) {
    return null;
  }

  return receiver;
};
