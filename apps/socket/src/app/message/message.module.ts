import { HttpModule, Module } from '@nestjs/common';

import { MessageGateway } from './message.gateway';

@Module({
  imports: [HttpModule],
  providers: [MessageGateway],
})
export class MessageModule {}
