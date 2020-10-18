import { IMessage, IUser } from '@chat-app/api-interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../user/user.schema';
import { Message } from './message/message.schema';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop([User])
  participants: IUser[];

  @Prop([Message])
  messages: IMessage[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
