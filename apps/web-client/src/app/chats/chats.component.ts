import { Component, Input } from '@angular/core';

@Component({
  selector: 'wc-chats',
  templateUrl: './chats.component.html',
})
export class ChatsComponent {
  @Input() chats: any[] = [];
}
