import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ChatModule } from './chat/chat.module';
import { ConnectedClientModule } from './connected-client/connected-client.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    ChatModule,
    ConnectedClientModule,
    MongooseModule.forRoot('mongodb://localhost/chat-app'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
