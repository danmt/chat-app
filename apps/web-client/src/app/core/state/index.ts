import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';
import * as fromChats from './chats.reducer';
import * as fromAuth from './auth.reducer';
import * as fromClients from './clients.reducer';

export interface State {
  chats: fromChats.State;
  auth: fromAuth.State;
  clients: fromClients.State;
}

export const reducers: ActionReducerMap<State> = {
  chats: fromChats.reducer,
  auth: fromAuth.reducer,
  clients: fromClients.reducer,
};

export const metaReducers: MetaReducer<State>[] = [];

export const selectAuthState = (state: State) => state.auth;

export const selectAuth = createSelector(
  selectAuthState,
  fromAuth.selectAuthData
);
export const selectAuthPending = createSelector(
  selectAuthState,
  fromAuth.selectAuthPending
);
export const selectAuthError = createSelector(
  selectAuthState,
  fromAuth.selectAuthError
);

export const selectChatsState = (state: State) => state.chats;

export const selectChats = createSelector(
  selectChatsState,
  fromChats.selectChatsData
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
  selectAuth,
  fromChats.selectChatReceiver
);

export const selectClientsState = (state: State) => state.clients;

export const selectClients = createSelector(
  selectClientsState,
  fromClients.selectClientsData
);
export const selectClientsPending = createSelector(
  selectClientsState,
  fromClients.selectClientsPending
);
export const selectClientsError = createSelector(
  selectClientsState,
  fromClients.selectClientsError
);
export const selectClientsReceivers = createSelector(
  selectClients,
  selectChats,
  selectAuth,
  fromClients.selectClientsReceivers
);
export const selectClientsHasReceivers = createSelector(
  selectClientsReceivers,
  fromClients.selectClientsHasReceivers
);
export const selectCurrentClient = createSelector(
  selectClients,
  selectAuth,
  fromClients.selectCurrentClient
);

export const selectChatsList = createSelector(
  selectChats,
  selectClients,
  selectAuth,
  fromChats.selectChatsList
);
