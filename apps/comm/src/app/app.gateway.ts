import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

import { IUser, ActionTypes, IMessage } from '@chat-app/api-interface';

@WebSocketGateway()
export class AppGateway {
  @WebSocketServer()
  server: Server;
  private logger: Logger = new Logger('AppGateway');

  constructor(
    @InjectQueue('connection-attempt')
    private connectionAttemptQueue: Queue<IUser>,
    @InjectQueue('connection-lost')
    private connectionLostQueue: Queue<{ clientId: string }>,
    @InjectQueue('start-chat')
    private startChatQueue: Queue<{ participants: [IUser, IUser] }>,
    @InjectQueue('delete-chat')
    private deleteChatQueue: Queue<{ chatId: string }>,
    @InjectQueue('send-message')
    private sendMessageQueue: Queue<IMessage>
  ) {}

  getSocket(clientId: string) {
    return this.server.sockets.connected[clientId];
  }

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
    this.startChatQueue.add(payload);
  }

  @SubscribeMessage(ActionTypes.DeleteChat)
  deleteChat(@MessageBody() payload: { chatId: string }) {
    this.logger.log(`Delete Chat ${payload.chatId}`);
    this.deleteChatQueue.add(payload);
  }

  @SubscribeMessage(ActionTypes.SendMessage)
  sendMessage(@MessageBody() payload: IMessage) {
    this.logger.log(`Send Message to chat ${payload.chatId}`);
    this.sendMessageQueue.add(payload);
  }
}
