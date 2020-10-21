import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '@chat-app/api-interface';

@Component({
  selector: 'wc-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input() currentUser!: IUser | null;
  @Input() receiver!: IUser | null;
  @Input() isShowingClients: boolean | null = false;
  @Input() hasReceivers: boolean | null = false;
  @Output() toggleShowClients = new EventEmitter<boolean | undefined>();

  onToggleShowClients() {
    this.toggleShowClients.emit(this.isShowingClients || undefined);
  }
}
