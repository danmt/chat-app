import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '@chat-app/api-interface';

@Component({
  selector: 'wc-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input() currentUser!: IUser | null;
  @Input() receiver!: IUser | null;
  @Input() activeChatId!: string | null;
  @Input() isShowingClients: boolean | null = false;
  @Input() hasReceivers: boolean | null = false;
  @Output() toggleShowClients = new EventEmitter<boolean | undefined>();
  @Output() deleteChat = new EventEmitter<string>();

  onToggleShowClients() {
    this.toggleShowClients.emit(this.isShowingClients || undefined);
  }

  onDeleteChat(chatId: string) {
    if (confirm('Are you sure about this? This action cannot be reverted.')) {
      this.deleteChat.emit(chatId);
    }
  }
}
