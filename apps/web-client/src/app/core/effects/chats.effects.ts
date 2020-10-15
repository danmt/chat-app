import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import { ChatsComponentActions, ChatsApiActions } from '../../chats/actions';

@Injectable()
export class ChatsEffects {
  getChats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChatsComponentActions.getChats),
      map(() =>
        ChatsApiActions.getChatsSuccess({
          chats: [
            {
              id: 1,
              participants: [
                {
                  id: 1,
                  name: 'Daniel Marin',
                  thumbnail: 'asd.jpg',
                },
                {
                  id: 2,
                  name: 'Juanita',
                  thumbnail: 'asd.jpg',
                },
              ],
              messages: [
                {
                  body: 'Hola',
                  date: new Date(Date.now()),
                  authorId: 2,
                },
                {
                  body: 'Como estas?',
                  date: new Date(Date.now()),
                  authorId: 2,
                },
                {
                  body: 'Todo bien y tu?',
                  date: new Date(Date.now()),
                  authorId: 1,
                },
                {
                  body: 'Aqui...',
                  date: new Date(Date.now()),
                  authorId: 2,
                },
                {
                  body: 'Y eso?',
                  date: new Date(Date.now()),
                  authorId: 1,
                },
                {
                  body: 'Acabo de recordar....',
                  date: new Date(Date.now()),
                  authorId: 1,
                },
                {
                  body: 'BOOOOOOOOOOOOORING',
                  date: new Date(Date.now()),
                  authorId: 1,
                },
                {
                  body: 'Que bicho',
                  date: new Date(Date.now()),
                  authorId: 2,
                },
                {
                  body: 'Llora puessssss',
                  date: new Date(Date.now()),
                  authorId: 1,
                },
              ],
            },
            {
              id: 2,
              participants: [
                {
                  id: 1,
                  name: 'Daniel Marin',
                  thumbnail: 'asd.jpg',
                },
                {
                  id: 2,
                  name: 'John Smith',
                  thumbnail: 'asd.jpg',
                },
              ],
              messages: [
                {
                  body: 'asd asdas dasdasd asdasd asdasdasda',
                  date: new Date(Date.now()),
                  authorId: 2,
                },
              ],
            },
          ],
        })
      )
    )
  );

  constructor(private actions$: Actions) {}
}
