import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IChat } from '@chat-app/api-interface';

@Component({
  selector: 'wc-chat',
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit {
  @Input() currentUserId!: string;
  @Input() chat!: IChat | null;
  @Output() sendMessage = new EventEmitter<{ chatId: string; body: string }>();

  chatGroup = this.fb.group({
    body: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  onSendMessage(chatId?: string) {
    if (this.chatGroup.invalid || !chatId) {
      return;
    }

    const { body } = this.chatGroup.value;

    this.sendMessage.emit({ chatId, body });
    this.chatGroup.reset();
  }
}
