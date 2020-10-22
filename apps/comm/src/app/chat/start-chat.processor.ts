import { Process, Processor } from '@nestjs/bull';
import { HttpService, Logger } from '@nestjs/common';
import { Job } from 'bull';

import { ActionTypes, IChat, IUser } from '@chat-app/api-interface';
import { SocketService } from '../config/socket/socket.service';

@Processor('start-chat')
export class StartChatProcessor {
  private logger = new Logger('StartChatProcessor');

  constructor(
    private readonly httpService: HttpService,
    private readonly socketService: SocketService
  ) {}

  @Process()
  async startChat(job: Job<{ participants: [IUser, IUser] }>) {
    this.httpService
      .post<IChat>('http://localhost:3333/api/chats', job.data)
      .subscribe(({ data: chat }) => {
        this.logger.log(
          `Chat Started: Between ${chat.participants[0]._id} and ${chat.participants[1]._id}`
        );
        // Add both participants to the chat room
        job.data.participants.forEach((participant) => {
          const socket = this.socketService.getSocket(participant.clientId);
          if (socket) {
            socket.join(chat._id);
          }
        });
        // Emit chat started event after participants joined the room
        this.socketService.server
          .to(chat._id)
          .emit(ActionTypes.ChatStarted, { chat });
      });
  }
}
