import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConnectedClientController } from './connected-client.controller';
import {
  ConnectedClient,
  ConnectedClientSchema,
} from './connected-client.schema';
import { ConnectedClientService } from './connected-client.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ConnectedClient.name, schema: ConnectedClientSchema },
    ]),
  ],
  controllers: [ConnectedClientController],
  providers: [ConnectedClientService],
})
export class ConnectedClientModule {}
