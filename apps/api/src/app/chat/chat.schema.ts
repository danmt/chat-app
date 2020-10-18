import { IMessage, IUser } from '@chat-app/api-interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../user/user.schema';

@Schema()
export class Message {
  @Prop()
  body: string;

  @Prop()
  date: Date;

  @Prop()
  authorId: number;
}

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop()
  id: number;

  @Prop([User])
  participants: IUser[];

  @Prop([Message])
  messages: IMessage[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
