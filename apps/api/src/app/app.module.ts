import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ChatModule } from './chat/chat.module';
import { ClientModule } from './client/client.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    ChatModule,
    ClientModule,
    MongooseModule.forRoot('mongodb://localhost/chat-app'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
