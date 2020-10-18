import { createAction, props } from '@ngrx/store';
import { IUser } from '@chat-app/api-interface';

export const loginSuccess = createAction(
  '[AuthApi] Login Success',
  props<{ user: IUser }>()
);
export const loginError = createAction(
  '[AuthApi] Login Error',
  props<{ error: Error }>()
);
