import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IChat } from '@chat-app/api-interface';

@Component({
  selector: 'wc-chats',
  templateUrl: './chats.component.html',
})
export class ChatsComponent {
  @Input() chats: IChat[] | null = null;
  @Output() activateChat = new EventEmitter<number>();

  onActivateChat(chatId: number) {
    this.activateChat.emit(chatId);
  }
}
