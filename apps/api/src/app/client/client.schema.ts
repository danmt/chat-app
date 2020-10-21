import { IUser } from '@chat-app/api-interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../user/user.schema';

export type ClientDocument = Client & Document;

@Schema()
export class Client {
  @Prop(User)
  user: IUser;

  @Prop()
  socketId: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
