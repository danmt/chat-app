import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, take } from 'rxjs/operators';

import * as fromApp from './core/state';
import { ChatsComponentActions } from './chats/actions';

@Component({
  selector: 'wc-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  chats$ = this.store.select(fromApp.selectChatsList, 1);
  receiver$ = this.store.select(fromApp.selectChatReceiver, 1);
  chat$ = this.store.select(fromApp.selectChat);

  constructor(
    private store: Store<fromApp.State>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.store.dispatch(ChatsComponentActions.getChats());

    this.route.queryParams
      .pipe(
        map(({ activeId }) => activeId),
        filter((activeId) => activeId),
        take(1)
      )
      .subscribe((activeId) => this.onActivateChat(parseInt(activeId, 10)));

    this.store
      .select(fromApp.selectChatsActiveId)
      .pipe(filter((activeId) => activeId !== -1))
      .subscribe((activeId) =>
        this.router.navigate([''], { queryParams: { activeId } })
      );
  }

  onActivateChat(chatId: number) {
    this.store.dispatch(ChatsComponentActions.activateChat({ chatId }));
  }
}
