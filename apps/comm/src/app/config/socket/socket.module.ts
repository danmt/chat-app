import { HttpModule, Module } from '@nestjs/common';
import { SocketService } from './socket.service';

@Module({
  imports: [HttpModule],
  providers: [SocketService],
  exports: [SocketService],
})
export class SocketModule {}
