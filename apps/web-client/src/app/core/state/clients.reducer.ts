import { createReducer, on, Action } from '@ngrx/store';
import { IChat, IUser } from '@chat-app/api-interface';

import { ChatsSocketActions } from '../../home/actions';

export interface State {
  data: IUser[] | null;
  pending: boolean;
  error: Error | null;
}

export const initialState = {
  data: null,
  pending: false,
  error: null,
} as State;

const clientsReducer = createReducer(
  initialState,
  on(ChatsSocketActions.clientsListUpdated, (state, action) => {
    console.log(action);
    return {
      ...state,
      pending: false,
      data: action.clients,
      error: null,
    };
  })
);

export function reducer(state = initialState, action: Action) {
  return clientsReducer(state, action);
}

export const selectClientsData = (state: State) => state.data;
export const selectClientsPending = (state: State) => state.pending;
export const selectClientsError = (state: State) => state.error;

// TAKE OUT CLIENTS WHERE CHAT ALREADY EXISTS

export const selectClientsReceivers = (
  clients: IUser[] | null,
  chats: IChat[] | null,
  currentUser: IUser | null
) => {
  if (!clients || !currentUser || !chats) {
    return null;
  }

  console.log(clients);

  return clients.filter(
    (client) =>
      // Hide the current user
      client._id !== currentUser._id &&
      // Hide clients that already have an open chat with current user
      !chats.some(
        (chat) =>
          chat.participants.some(
            (participant) => participant._id === client._id
          ) &&
          chat.participants.some(
            (participant) => participant._id === currentUser._id
          )
      )
  );
};

export const selectClientsHasReceivers = (clients: IUser[] | null) =>
  clients && !!clients.length;

export const selectCurrentClient = (
  clients: IUser[] | null,
  currentUser: IUser | null
) => {
  if (!clients || !currentUser) {
    return null;
  }

  return clients.find((client) => client._id === currentUser._id) || null;
};
