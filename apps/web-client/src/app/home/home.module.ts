import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { ChatsModule } from '../chats/chats.module';
import { ChatModule } from '../chat/chat.module';
import { HeaderModule } from '../header/header.module';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ChatsModule,
    ChatModule,
    HeaderModule,
  ],
})
export class HomeModule {}
