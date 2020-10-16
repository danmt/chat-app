import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IChatTab } from '@chat-app/api-interface';

@Component({
  selector: 'wc-chats',
  templateUrl: './chats.component.html',
})
export class ChatsComponent {
  @Input() chats!: IChatTab[] | null;
  @Output() activateChat = new EventEmitter<number>();

  onActivateChat(chatId: number) {
    this.activateChat.emit(chatId);
  }
}
