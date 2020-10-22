import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { HttpService, Logger } from '@nestjs/common';
import { IUser, ActionTypes, IChat, IMessage } from '@chat-app/api-interface';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@WebSocketGateway()
export class AppGateway {
  @WebSocketServer()
  server: Server;
  private logger: Logger = new Logger('AppGateway');

  constructor(
    private httpService: HttpService,
    @InjectQueue('connection-attempt')
    private connectionAttemptQueue: Queue<IUser>,
    @InjectQueue('connection-lost')
    private connectionLostQueue: Queue<{ clientId: string }>
  ) {}

  handleDisconnect(client: Socket) {
    this.logger.log(`Disconnection Attempt: ${client.id}.`);
    this.connectionLostQueue.add({ clientId: client.id });
  }

  @SubscribeMessage(ActionTypes.Connect)
  connect(@MessageBody() payload: IUser, @ConnectedSocket() client: Socket) {
    this.logger.log(
      `Connection Attempt: ${payload.username} (${payload._id}/${client.id}).`
    );
    this.connectionAttemptQueue.add({
      ...payload,
      clientId: client.id,
    });
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
    this.httpService
      .post<IMessage>(
        `http://localhost:3333/api/chats/${payload.chatId}/messages`,
        { authorId: payload.authorId, body: payload.body }
      )
      .subscribe(({ data: message }) =>
        this.server
          .to(payload.chatId)
          .emit(ActionTypes.MessageSent, { message })
      );
  }
}
