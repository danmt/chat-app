import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bull';

import { Client, ClientSchema } from './client.schema';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
    BullModule.registerQueue({
      name: 'connection',
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
