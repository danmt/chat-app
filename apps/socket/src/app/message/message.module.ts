import { HttpModule, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { MessageGateway } from './message.gateway';
import { ConnectionProcessor } from './connection.processor';

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
      name: 'close-connection',
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'connection',
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  providers: [MessageGateway, ConnectionProcessor],
})
export class MessageModule {}
