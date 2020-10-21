import { HttpModule, Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
