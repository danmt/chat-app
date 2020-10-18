import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, take } from 'rxjs/operators';

import * as fromApp from '../core/state';
import { HomePageActions } from './actions';

@Component({
  selector: 'wc-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  currentUser$ = this.store.select(fromApp.selectAuth);
  chats$ = this.store.select(fromApp.selectChatsList);
  activeChatId$ = this.store.select(fromApp.selectChatsActiveId);
  chat$ = this.store.select(fromApp.selectChat);
  receiver$ = this.store.select(fromApp.selectChatReceiver);

  constructor(
    private store: Store<fromApp.State>,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.store.dispatch(HomePageActions.enterPage());

    this.route.queryParams
      .pipe(
        map(({ chatId }) => chatId),
        filter((chatId) => chatId),
        take(1)
      )
      .subscribe((chatId) => this.onActivateChat(chatId));
  }

  onActivateChat(chatId: string) {
    this.store.dispatch(HomePageActions.activateChat({ chatId }));
  }

  onSendMessage(chatId: string, body: string) {
    this.store.dispatch(HomePageActions.sendMessage({ chatId, body }));
  }
}
