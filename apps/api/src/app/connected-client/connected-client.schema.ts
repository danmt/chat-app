import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConnectedClientDocument = ConnectedClient & Document;

@Schema()
export class ConnectedClient {
  @Prop()
  username: string;

  @Prop()
  thumbnail: string;

  @Prop()
  clientId: string;
}

export const ConnectedClientSchema = SchemaFactory.createForClass(
  ConnectedClient
);
