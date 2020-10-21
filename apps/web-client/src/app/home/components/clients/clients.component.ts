import { Component, Input } from '@angular/core';
import { IUser } from '@chat-app/api-interface';

@Component({
  selector: 'wc-clients',
  templateUrl: './clients.component.html',
})
export class ClientsComponent {
  @Input() clients!: IUser[] | null;
  @Input() currentUser!: IUser | null;
}
