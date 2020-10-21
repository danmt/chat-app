import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  username: string;

  @Prop()
  thumbnail: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
