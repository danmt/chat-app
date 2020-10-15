import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';
import * as fromChats from './chats.reducer';

export interface State {
  chats: fromChats.State;
}

export const reducers: ActionReducerMap<State> = {
  chats: fromChats.reducer,
};

export const metaReducers: MetaReducer<State>[] = [];

export const selectChatsState = (state: State) => state.chats;

export const selectChats = createSelector(
  selectChatsState,
  fromChats.selectChatsData
);
export const selectChatsList = createSelector(
  selectChats,
  fromChats.selectChatsList
);
export const selectChatsPending = createSelector(
  selectChatsState,
  fromChats.selectChatsPending
);
export const selectChatsError = createSelector(
  selectChatsState,
  fromChats.selectChatsError
);
export const selectChatsActiveId = createSelector(
  selectChatsState,
  fromChats.selectChatsActiveId
);
export const selectChat = createSelector(
  selectChats,
  selectChatsActiveId,
  fromChats.selectChat
);
export const selectChatReceiver = createSelector(
  selectChat,
  fromChats.selectChatReceiver
);
