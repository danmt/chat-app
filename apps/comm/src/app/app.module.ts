import { HttpModule, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { AppGateway } from './app.gateway';
import { ConnectionAttemptProcessor } from './connection/connection-attempt.processor';
import { ConnectionLostProcessor } from './connection//connection-lost.processor';
import { StartChatProcessor } from './chat/start-chat.processor';
import { DeleteChatProcessor } from './chat/delete-chat.processor';
import { SendMessageProcessor } from './message/send-message.processor';

@Module({
  imports: [
    HttpModule,
    BullModule.registerQueue({
      name: 'connection-attempt',
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'connection-lost',
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'start-chat',
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'delete-chat',
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'send-message',
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  controllers: [],
  providers: [
    AppGateway,
    ConnectionAttemptProcessor,
    ConnectionLostProcessor,
    StartChatProcessor,
    DeleteChatProcessor,
    SendMessageProcessor,
  ],
})
export class AppModule {}
