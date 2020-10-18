import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType, rootEffectsInit } from '@ngrx/effects';
import { LocalStorageService } from 'ngx-webstorage';
import { filter, map, mergeMap, tap } from 'rxjs/operators';

import { AuthApiActions, LoginPageActions } from '../../login/actions';
import { ApiService } from '../services/api.service';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginPageActions.login),
      mergeMap(({ username }) =>
        this.apiService.login(username).pipe(
          tap(() => this.router.navigate(['/'])),
          map((user) => AuthApiActions.loginSuccess({ user }))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.loginSuccess),
        tap(({ user }) => this.localStorage.store('user', user))
      ),
    { dispatch: false }
  );

  loginFromStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(rootEffectsInit),
      map(() => this.localStorage.retrieve('user')),
      filter((user) => !!user),
      map((user) =>
        AuthApiActions.loginSuccess({
          user,
        })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private localStorage: LocalStorageService,
    private router: Router
  ) {}
}
