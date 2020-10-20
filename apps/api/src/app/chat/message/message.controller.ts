import { Controller, Post, Body, Param, HttpCode } from '@nestjs/common';

import { MessageService } from './message.service';

@Controller('/chats/:chat_id/messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @HttpCode(200)
  sendMessage(
    @Param('chat_id') chatId: string,
    @Body('body') body: string,
    @Body('authorId') authorId: string
  ) {
    return this.messageService.sendMessage(chatId, authorId, body);
  }
}
