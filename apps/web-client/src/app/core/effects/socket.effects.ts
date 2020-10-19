import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';
import { of } from 'rxjs';
import { concatMap, map, tap, withLatestFrom } from 'rxjs/operators';

import { ActionTypes, IUser } from '@chat-app/api-interface';
import { ChatsSocketActions, HomePageActions } from '../../home/actions';
import * as fromApp from '../state';

@Injectable()
export class SocketEffects {
  connect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(HomePageActions.enterPage),
        concatMap((action) =>
          of(action).pipe(
            withLatestFrom(
              this.store.select(fromApp.selectAuth),
              (_, user) => user
            )
          )
        ),
        tap((user) => this.socket.emit(ActionTypes.Connect, user))
      ),
    { dispatch: false }
  );

  clientConnected$ = createEffect(() =>
    this.socket
      .fromEvent<IUser[]>(ActionTypes.ClientConnected)
      .pipe(
        map((clients: IUser[]) =>
          ChatsSocketActions.clientConnected({ clients })
        )
      )
  );

  constructor(
    private actions$: Actions,
    private socket: Socket,
    private store: Store<fromApp.State>
  ) {}
}
