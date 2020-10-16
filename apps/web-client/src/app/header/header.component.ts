import { Component, Input } from '@angular/core';
import { IUser } from '@chat-app/api-interface';

@Component({
  selector: 'wc-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input() receiver!: IUser;
}
