import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActionTypes, IChat } from '@chat-app/api-interface';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Socket } from 'ngx-socket-io';
import { map, mergeMap, tap } from 'rxjs/operators';

import {
  HomePageActions,
  ChatsApiActions,
  ChatsSocketActions,
} from '../../home/actions';
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
          this.router.navigate([''], {
            queryParams: { chatId },
            queryParamsHandling: 'merge',
          })
        )
      ),
    { dispatch: false }
  );

  clearChat$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(HomePageActions.clearChat),
        map(() =>
          this.router.navigate([''], {
            queryParams: { chatId: undefined },
            queryParamsHandling: 'merge',
          })
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

  startChat$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(HomePageActions.startChat),
        tap(({ participants }) =>
          this.socket.emit(ActionTypes.StartChat, { participants })
        )
      ),
    {
      dispatch: false,
    }
  );

  chatStarted$ = createEffect(() =>
    this.socket.fromEvent<{ chat: IChat }>(ActionTypes.ChatStarted).pipe(
      tap(({ chat }) =>
        this.router.navigate([''], { queryParams: { chatId: chat._id } })
      ),
      map(({ chat }) => ChatsSocketActions.chatStarted({ chat }))
    )
  );

  deleteChat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomePageActions.deleteChat),
      mergeMap(({ chatId }) =>
        this.apiService
          .deleteChat(chatId)
          .pipe(map(() => ChatsApiActions.deleteChatSuccess({ chatId })))
      )
    )
  );

  constructor(
    private socket: Socket,
    private actions$: Actions,
    private apiService: ApiService,
    private router: Router
  ) {}
}
