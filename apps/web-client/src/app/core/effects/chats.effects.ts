import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs/operators';

import { HomePageActions, ChatsApiActions } from '../../home/actions';
import { ApiService } from '../services/api.service';

@Injectable()
export class ChatsEffects {
  getChats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomePageActions.enterPage),
      mergeMap(() =>
        this.apiService
          .getChats()
          .pipe(map((chats) => ChatsApiActions.getChatsSuccess({ chats })))
      )
    )
  );

  activateChat$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(HomePageActions.activateChat),
        tap(({ chatId }) =>
          this.router.navigate([''], { queryParams: { chatId } })
        )
      ),
    { dispatch: false }
  );

  sendMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomePageActions.sendMessage),
      mergeMap(({ chatId, body }) =>
        this.apiService
          .sendMessage(chatId, body)
          .pipe(map((message) => ChatsApiActions.messageSent({ message })))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private router: Router
  ) {}
}
