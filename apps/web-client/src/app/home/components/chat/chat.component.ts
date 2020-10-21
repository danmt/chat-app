import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IChat, IUser } from '@chat-app/api-interface';

@Component({
  selector: 'wc-chat',
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnChanges {
  @Input() currentUser!: IUser | null;
  @Input() chat!: IChat | null;
  @Output() sendMessage = new EventEmitter<{
    authorId: string;
    chatId: string;
    body: string;
  }>();
  @ViewChild('chatInput') chatInput!: ElementRef<any>;
  chatGroup = this.fb.group({
    body: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.chat) {
      this.chatGroup.reset();
    }
  }

  onSendMessage(chatId?: string) {
    if (this.chatGroup.invalid || !chatId || !this.currentUser) {
      return;
    }

    const { body } = this.chatGroup.value;

    this.sendMessage.emit({ authorId: this.currentUser._id, chatId, body });
    this.chatInput.nativeElement.focus();
    this.chatGroup.reset();
  }
}
