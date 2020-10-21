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
      .subscribe(({ data: chat }) => {
        // Add both participants to the chat room
        payload.participants.forEach((participant) => {
          const socket = this.server.sockets.connected[participant.clientId];
          if (socket) {
            socket.join(chat._id);
          }
        });
        this.server.to(chat._id).emit(ActionTypes.ChatStarted, { chat });
      });
  }

  @SubscribeMessage(ActionTypes.DeleteChat)
  deleteChat(@MessageBody() payload: { chatId: string }) {
    this.logger.log(`Delete Chat ${payload.chatId}`);
    this.httpService
      .delete<{ chatId: string }>(
        `http://localhost:3333/api/chats/${payload.chatId}`
      )
      .subscribe(() =>
        this.server
          .to(payload.chatId)
          .emit(ActionTypes.ChatDeleted, { chatId: payload.chatId })
      );
  }

  @SubscribeMessage(ActionTypes.SendMessage)
  sendMessage(
    @MessageBody() payload: { authorId: string; chatId: string; body: string }
  ) {
    this.logger.log(`Send Message to chat ${payload.chatId}`);
  }
}
