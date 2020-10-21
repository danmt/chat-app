import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { IUser, ActionTypes } from '@chat-app/api-interface';

@WebSocketGateway()
export class AppGateway {
  @WebSocketServer()
  server: Server;
  private logger: Logger = new Logger('AppGateway');
  private connectedClients: IUser[] = [];

  handleDisconnect(client: Socket) {
    this.connectedClients = this.connectedClients.filter(
      (connectedClient) => connectedClient.clientId !== client.id
    );
    this.logger.log(
      `Disconnect: ${client.id} - ${this.connectedClients.length} connected clients.`
    );
    this.server.emit(ActionTypes.ClientsUpdated, this.connectedClients);
  }

  @SubscribeMessage(ActionTypes.Connect)
  connect(@MessageBody() payload: IUser, @ConnectedSocket() client: Socket) {
    this.connectedClients = [
      ...this.connectedClients,
      { ...payload, clientId: client.id },
    ];
    this.logger.log(
      `Connect: ${payload.username} (${payload._id}/${client.id}) - ${this.connectedClients.length} connected clients.`
    );
    this.server.emit(ActionTypes.ClientsUpdated, this.connectedClients);
  }

  @SubscribeMessage(ActionTypes.StartChat)
  startChat(@MessageBody() payload: { participants: [IUser, IUser] }) {
    this.logger.log(
      `Start Chat: Between ${payload.participants[0]._id} and ${payload.participants[1]._id}`
    );
  }
}
