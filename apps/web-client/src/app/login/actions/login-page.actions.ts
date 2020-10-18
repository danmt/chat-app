import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[LoginPage] Login',
  props<{ username: string }>()
);
