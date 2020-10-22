import { HttpModule, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { AppGateway } from './app.gateway';
import { ConnectionAttemptProcessor } from './connection-attempt.processor';
import { ConnectionLostProcessor } from './connection-lost.processor';
import { StartChatProcessor } from './start-chat.processor';
import { DeleteChatProcessor } from './delete-chat.processor';

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
  ],
  controllers: [],
  providers: [
    AppGateway,
    ConnectionAttemptProcessor,
    ConnectionLostProcessor,
    StartChatProcessor,
    DeleteChatProcessor,
  ],
})
export class AppModule {}
