import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ChatsModule } from './chats/chats.module';
import { ChatModule } from './chat/chat.module';
import { HeaderModule } from './header/header.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    ChatsModule,
    HeaderModule,
    ChatModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
