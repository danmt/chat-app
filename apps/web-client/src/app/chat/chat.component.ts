import { Component, Input, OnInit } from '@angular/core';
import { IChat } from '@chat-app/api-interface';

@Component({
  selector: 'wc-chat',
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit {
  @Input() currentId = -1;
  @Input() chat!: IChat;

  constructor() {}

  ngOnInit(): void {}
}
