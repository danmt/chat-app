import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { HttpService, Logger } from '@nestjs/common';
import { IUser, ActionTypes, IChat } from '@chat-app/api-interface';

@WebSocketGateway()
export class AppGateway {
  @WebSocketServer()
  server: Server;
  private logger: Logger = new Logger('AppGateway');
  private connectedClients: IUser[] = [];

  constructor(private httpService: HttpService) {}

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
    this.httpService
      .post<IChat>('http://localhost:3333/api/chats', payload)
      .subscribe();
  }
}
