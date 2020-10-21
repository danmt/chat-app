import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';

import {
  HomePageActions,
  ChatsApiActions,
  ChatsSocketActions,
} from '../../home/actions';
import { ApiService } from '../services/api.service';
import { ActionTypes, IChat, IMessage } from '@chat-app/api-interface';

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

  sendMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(HomePageActions.sendMessage),
        tap(({ authorId, chatId, body }) =>
          this.socket.emit(ActionTypes.SendMessage, { authorId, chatId, body })
        )
      ),
    {
      dispatch: false,
    }
  );

  messageSent$ = createEffect(() =>
    this.socket
      .fromEvent<{ message: IMessage }>(ActionTypes.MessageSent)
      .pipe(map(({ message }) => ChatsSocketActions.messageSent({ message })))
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

  deleteChat$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(HomePageActions.deleteChat),
        tap(({ chatId }) =>
          this.socket.emit(ActionTypes.DeleteChat, { chatId })
        )
      ),
    {
      dispatch: false,
    }
  );

  chatDeleted$ = createEffect(() =>
    this.socket.fromEvent<{ chatId: string }>(ActionTypes.ChatDeleted).pipe(
      tap(() =>
        this.router.navigate([''], {
          queryParams: { chatId: undefined },
          queryParamsHandling: 'merge',
        })
      ),
      map(({ chatId }) => ChatsSocketActions.chatDeleted({ chatId }))
    )
  );

  constructor(
    private socket: Socket,
    private actions$: Actions,
    private apiService: ApiService,
    private router: Router
  ) {}
}
