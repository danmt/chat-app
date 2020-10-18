import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

import * as fromApp from '../core/state';
import { HomePageActions } from './actions';
import { AuthService } from '../core/services/auth.service';
import { IChatTab, IUser } from '@chat-app/api-interface';

@Component({
  selector: 'wc-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  chats$!: Observable<IChatTab[] | null>;
  receiver$!: Observable<IUser | null>;
  currentUserId!: string;
  chat$ = this.store.select(fromApp.selectChat);

  constructor(
    private store: Store<fromApp.State>,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.store.dispatch(HomePageActions.enterPage());

    this.currentUserId = this.authService.id;
    this.chats$ = this.store.select(
      fromApp.selectChatsList,
      this.currentUserId
    );
    this.receiver$ = this.store.select(
      fromApp.selectChatReceiver,
      this.currentUserId
    );

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
