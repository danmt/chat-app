import { HttpModule, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { AppGateway } from './app.gateway';
import { ConnectionAttemptProcessor } from './connection/connection-attempt.processor';
import { ConnectionLostProcessor } from './connection//connection-lost.processor';
import { StartChatProcessor } from './chat/start-chat.processor';
import { DeleteChatProcessor } from './chat/delete-chat.processor';
import { SendMessageProcessor } from './message/send-message.processor';
import { SocketModule } from './config/socket/socket.module';

const redisConfig = {
  host: 'localhost',
  port: 6379,
};

@Module({
  imports: [
    HttpModule,
    SocketModule,
    BullModule.registerQueue(
      {
        name: 'connection-attempt',
        redis: redisConfig,
      },
      {
        name: 'connection-lost',
        redis: redisConfig,
      },
      {
        name: 'start-chat',
        redis: redisConfig,
      },
      {
        name: 'delete-chat',
        redis: redisConfig,
      },
      {
        name: 'send-message',
        redis: redisConfig,
      }
    ),
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
