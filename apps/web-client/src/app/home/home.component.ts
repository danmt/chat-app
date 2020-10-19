import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '@chat-app/api-interface';
import { Store } from '@ngrx/store';
import { filter, map, take, tap } from 'rxjs/operators';

import * as fromApp from '../core/state';
import { HomePageActions } from './actions';

@Component({
  selector: 'wc-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  currentUser$ = this.store.select(fromApp.selectAuth);
  clients$ = this.store.select(fromApp.selectClientsReceivers);
  hasReceivers$ = this.store.select(fromApp.selectClientsHasReceivers);
  chats$ = this.store
    .select(fromApp.selectChatsList)
    .pipe(tap((a) => console.log(a)));
  activeChatId$ = this.store.select(fromApp.selectChatsActiveId);
  chat$ = this.store.select(fromApp.selectChat);
  receiver$ = this.store.select(fromApp.selectChatReceiver);
  isShowingClients$ = this.route.queryParamMap.pipe(
    map(
      (queryParamMap) =>
        !!(queryParamMap && queryParamMap.get('isShowingClients'))
    )
  );

  constructor(
    private store: Store<fromApp.State>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.store.dispatch(HomePageActions.enterPage());

    this.route.queryParams
      .pipe(filter((queryParams) => queryParams && queryParams.chatId))
      .subscribe(({ chatId }) => {
        this.onToggleShowClients(true);
        this.onActivateChat(chatId);
      });
  }

  onActivateChat(chatId: string) {
    this.store.dispatch(HomePageActions.activateChat({ chatId }));
  }

  onSendMessage(chatId: string, body: string) {
    this.store.dispatch(HomePageActions.sendMessage({ chatId, body }));
  }

  onToggleShowClients(previousValue: boolean | undefined) {
    this.router.navigate(['/'], {
      queryParams: { isShowingClients: previousValue ? undefined : true },
    });
  }

  onStartChat(participants: [IUser, IUser]) {
    this.store.dispatch(HomePageActions.startChat({ participants }));
  }
}
