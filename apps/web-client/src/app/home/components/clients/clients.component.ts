import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '@chat-app/api-interface';

@Component({
  selector: 'wc-clients',
  templateUrl: './clients.component.html',
})
export class ClientsComponent {
  @Input() clients!: IUser[] | null;
  @Input() currentUser!: IUser | null;
  @Output() startChat = new EventEmitter<[IUser, IUser]>();

  onStartChat(user: IUser) {
    if (!this.currentUser) {
      return;
    }

    this.startChat.emit([this.currentUser, user]);
  }
}
