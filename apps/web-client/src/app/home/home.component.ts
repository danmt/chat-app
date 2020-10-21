import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '@chat-app/api-interface';
import { Store } from '@ngrx/store';
import { filter, map, take } from 'rxjs/operators';

import * as fromApp from '../core/state';
import { HomePageActions } from './actions';

@Component({
  selector: 'wc-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  currentUser$ = this.store.select(fromApp.selectCurrentClient);
  chats$ = this.store.select(fromApp.selectChatsList);
  activeChatId$ = this.store.select(fromApp.selectChatsActiveId);
  chat$ = this.store.select(fromApp.selectChat);
  receiver$ = this.store.select(fromApp.selectChatReceiver);
  clients$ = this.store.select(fromApp.selectClientsReceivers);
  hasReceivers$ = this.store.select(fromApp.selectClientsHasReceivers);
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

    this.route.queryParams.subscribe(({ chatId }) => {
      if (chatId) {
        this.onActivateChat(chatId);
      } else {
        this.onClearChat();
      }
    });
  }

  onActivateChat(chatId: string) {
    this.store.dispatch(HomePageActions.activateChat({ chatId }));
  }

  onClearChat() {
    this.store.dispatch(HomePageActions.clearChat());
  }

  onSendMessage(authorId: string, chatId: string, body: string) {
    this.store.dispatch(
      HomePageActions.sendMessage({ authorId, chatId, body })
    );
  }

  onToggleShowClients(previousValue: boolean | undefined) {
    this.router.navigate([''], {
      queryParams: { isShowingClients: previousValue ? undefined : true },
      queryParamsHandling: 'merge',
    });
  }

  onStartChat(participants: [IUser, IUser]) {
    this.store.dispatch(HomePageActions.startChat({ participants }));
  }

  onDeleteChat(chatId: string) {
    this.store.dispatch(HomePageActions.deleteChat({ chatId }));
  }
}
