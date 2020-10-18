import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IChatTab } from '@chat-app/api-interface';

@Component({
  selector: 'wc-chats',
  templateUrl: './chats.component.html',
})
export class ChatsComponent {
  @Input() chats!: IChatTab[] | null;
  @Output() activateChat = new EventEmitter<string>();

  onActivateChat(chatId: string) {
    this.activateChat.emit(chatId);
  }
}
