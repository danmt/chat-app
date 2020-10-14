import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'wc-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent implements OnInit {
  @Input() chats: any[] = [];

  constructor() {}

  ngOnInit(): void {}
}
