import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ChatController } from './chat.controller';
import { Chat, ChatSchema } from './chat.schema';
import { ChatService } from './chat.service';
import { MessageController } from './message/message.controller';
import { Message, MessageSchema } from './message/message.schema';
import { MessageService } from './message/message.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chat.name, schema: ChatSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  controllers: [ChatController, MessageController],
  providers: [ChatService, MessageService],
})
export class ChatModule {}
