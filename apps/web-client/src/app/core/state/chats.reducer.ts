import { createReducer, on, Action } from '@ngrx/store';
import { IChat, IMessage, IUser, IChatTab } from '@chat-app/api-interface';

import { HomePageActions, ChatsApiActions } from '../../home/actions';

export interface State {
  data: IChat[] | null;
  pending: boolean;
  error: Error | null;
  activeId: string | null;
}

export const initialState = {
  data: null,
  pending: false,
  error: null,
  activeId: null,
} as State;

const chatsReducer = createReducer(
  initialState,
  on(HomePageActions.enterPage, (state) => ({
    ...state,
    pending: true,
  })),
  on(HomePageActions.activateChat, (state, action) => ({
    ...state,
    activeId: action.chatId,
  })),
  on(HomePageActions.clearChat, (state, action) => ({
    ...state,
    activeId: null,
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
      : state.data.map((chat) =>
          chat._id === action.message.chatId
            ? {
                ...chat,
                messages: [...chat.messages, action.message],
              }
            : chat
        ),
  })),
  on(ChatsApiActions.startChatSuccess, (state, action) => {
    if (!state.data) {
      return state;
    }

    const chatFound = state.data.find((chat) => chat._id === action.chat._id);

    if (chatFound) {
      return state;
    }

    return {
      ...state,
      data: [...state.data, action.chat],
    };
  }),
  on(ChatsApiActions.deleteChatSuccess, (state, action) => {
    if (!state.data) {
      return state;
    }

    return {
      ...state,
      data: state.data.filter((chat) => chat._id !== action.chatId),
    };
  })
);

export function reducer(state = initialState, action: Action) {
  return chatsReducer(state, action);
}

export const selectChatsData = (state: State) => state.data;
export const selectChatsActiveId = (state: State) => state.activeId;
export const selectChatsList = (
  chats: IChat[] | null,
  clients: IUser[] | null,
  currentUser: IUser | null
) => {
  if (!chats || !clients || !currentUser) {
    return null;
  }

  return chats.map(
    (chat) =>
      ({
        _id: chat._id,
        lastMessage: chat.messages?.reduce(
          (_: IMessage | null, message) => message,
          null
        ),
        contact: chat.participants
          .filter((participant) => currentUser?._id !== participant._id)
          .reduce(
            (_: IUser | null, participant) => ({
              ...participant,
              isLoggedIn:
                clients?.some((client) => client._id === participant._id) ||
                false,
            }),
            null
          ),
      } as IChatTab)
  );
};
export const selectChatsPending = (state: State) => state.pending;
export const selectChatsError = (state: State) => state.error;
export const selectChat = (chats: IChat[] | null, activeId: string | null) => {
  if (!chats || !activeId) {
    return null;
  }

  const selectedChat = chats.find((chat) => chat._id === activeId);

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
    (participant) => participant._id !== user._id
  );

  if (!receiver) {
    return null;
  }

  return receiver;
};
