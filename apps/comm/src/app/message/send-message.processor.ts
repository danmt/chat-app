import { Process, Processor } from '@nestjs/bull';
import { HttpService, Logger } from '@nestjs/common';
import { Job } from 'bull';

import { ActionTypes, IMessage } from '@chat-app/api-interface';
import { AppGateway } from '../app.gateway';

@Processor('send-message')
export class SendMessageProcessor {
  private logger = new Logger('SendMessageProcessor');

  constructor(
    private readonly httpService: HttpService,
    private readonly appGateway: AppGateway
  ) {}

  @Process()
  async sendMessage(job: Job<IMessage>) {
    this.httpService
      .post<IMessage>(
        `http://localhost:3333/api/chats/${job.data.chatId}/messages`,
        { authorId: job.data.authorId, body: job.data.body }
      )
      .subscribe(({ data: message }) => {
        this.logger.log(`Message sent: ${job.data.chatId}`);
        // Emit message to the chat room
        this.appGateway.server
          .to(job.data.chatId)
          .emit(ActionTypes.MessageSent, { message });
      });
  }
}
