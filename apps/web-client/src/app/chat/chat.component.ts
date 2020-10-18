import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IChat, IUser } from '@chat-app/api-interface';

@Component({
  selector: 'wc-chat',
  templateUrl: './chat.component.html',
})
export class ChatComponent {
  @Input() currentUser!: IUser | null;
  @Input() chat!: IChat | null;
  @Output() sendMessage = new EventEmitter<{ chatId: string; body: string }>();

  chatGroup = this.fb.group({
    body: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  onSendMessage(chatId?: string) {
    if (this.chatGroup.invalid || !chatId) {
      return;
    }

    const { body } = this.chatGroup.value;

    this.sendMessage.emit({ chatId, body });
    this.chatGroup.reset();
  }
}
