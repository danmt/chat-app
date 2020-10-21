import {
  Controller,
  Post,
  Body,
  Headers,
  Get,
  HttpCode,
  Delete,
  Param,
} from '@nestjs/common';
import { IUser } from '@chat-app/api-interface';

import { ChatService } from './chat.service';

@Controller('/chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @HttpCode(200)
  create(@Body('participants') participants: IUser[]) {
    return this.chatService.create(participants);
  }

  @Get()
  getChats(@Headers('id') id: string) {
    return this.chatService.getChats(id);
  }

  @Delete('/:chat_id')
  deleteChat(@Param('chat_id') chatId: string) {
    return this.chatService.deleteChat(chatId);
  }
}
