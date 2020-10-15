import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'wc-chat',
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit {
  @Input() currentId = -1;
  @Input() chat: any;

  constructor() {}

  ngOnInit(): void {}
}
