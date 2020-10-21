import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { ActionTypes, IUser } from '@chat-app/api-interface';

@WebSocketGateway()
export class MessageGateway {
  @WebSocketServer()
  server: Server;
  private logger: Logger = new Logger('MessagesGateway');

  constructor(
    @InjectQueue('connection-attempt') private connectionAttemptQueue: Queue,
    @InjectQueue('close-connection') private closeConnectionQueue: Queue
  ) {}

  handleDisconnect(client: Socket) {
    this.logger.log(`Client ${client.id} disconnected.`);
    this.closeConnectionQueue.add({ socketId: client.id });
  }

  @SubscribeMessage(ActionTypes.AttemptConnection)
  connect(@MessageBody() user: IUser, @ConnectedSocket() client: Socket) {
    this.logger.log(`Connect: ${user.username} (${user._id}/${client.id})`);
    this.connectionAttemptQueue.add({ user, clientId: client.id });
  }
}
