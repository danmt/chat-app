import { createReducer, on, Action } from '@ngrx/store';
import { IUser } from '@chat-app/api-interface';

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
  on(ChatsSocketActions.clientConnected, (state, action) => ({
    ...state,
    pending: false,
    data: action.clients,
    error: null,
  }))
);

export function reducer(state = initialState, action: Action) {
  return clientsReducer(state, action);
}

export const selectClientsData = (state: State) => state.data;
export const selectClientsPending = (state: State) => state.pending;
export const selectClientsError = (state: State) => state.error;
