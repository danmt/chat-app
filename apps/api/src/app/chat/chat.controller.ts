import { Controller, Post, Body, Headers, Get } from '@nestjs/common';
import { IUser } from '@chat-app/api-interface';

import { ChatService } from './chat.service';

@Controller('/chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  create(@Body('participants') participants: IUser[]) {
    return this.chatService.create(participants);
  }

  @Get()
  getChats(@Headers('id') id: string) {
    return this.chatService.getChats(id);
  }
}
