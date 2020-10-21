import { HttpModule, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConnectionAttemptProcessor } from './connection-attempt.processor';
import { CloseConnectionProcessor } from './close-connection.processor';

const redis = {
  host: 'localhost',
  port: 6379,
};

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'connection-attempt',
      redis,
    }),
    BullModule.registerQueue({
      name: 'close-connection',
      redis,
    }),
    HttpModule,
  ],
  controllers: [],
  providers: [ConnectionAttemptProcessor, CloseConnectionProcessor],
})
export class AppModule {}
