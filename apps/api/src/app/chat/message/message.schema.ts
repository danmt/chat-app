import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop()
  body: string;

  @Prop()
  date: Date;

  @Prop()
  authorId: MongooseSchema.Types.ObjectId;

  @Prop()
  chatId: MongooseSchema.Types.ObjectId;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
