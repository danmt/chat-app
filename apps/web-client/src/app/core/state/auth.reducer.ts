import { createReducer, on, Action } from '@ngrx/store';
import { IUser } from '@chat-app/api-interface';

import { AuthApiActions, LoginPageActions } from '../../login/actions';

export interface State {
  data: IUser | null;
  pending: boolean;
  error: Error | null;
}

export const initialState = {
  data: null,
  pending: false,
  error: null,
} as State;

const chatReducer = createReducer(
  initialState,
  on(LoginPageActions.login, (state) => ({
    ...state,
    pending: true,
  })),
  on(AuthApiActions.loginSuccess, (state, action) => ({
    ...state,
    pending: false,
    data: action.user,
    error: null,
  })),
  on(AuthApiActions.loginError, (state, action) => ({
    ...state,
    pending: false,
    error: action.error,
    data: null,
  }))
);

export function reducer(state = initialState, action: Action) {
  return chatReducer(state, action);
}

export const selectAuthData = (state: State) => state.data;
export const selectAuthPending = (state: State) => state.pending;
export const selectAuthError = (state: State) => state.error;
