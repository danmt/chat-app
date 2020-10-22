import { Process, Processor } from '@nestjs/bull';
import { HttpService, Logger } from '@nestjs/common';
import { Job } from 'bull';

import { ActionTypes } from '@chat-app/api-interface';
import { AppGateway } from './app.gateway';

@Processor('delete-chat')
export class DeleteChatProcessor {
  private logger = new Logger('DeleteChatProcessor');

  constructor(
    private readonly httpService: HttpService,
    private readonly appGateway: AppGateway
  ) {}

  @Process()
  async deleteChat(job: Job<{ chatId: string }>) {
    this.httpService
      .delete<{ chatId: string }>(
        `http://localhost:3333/api/chats/${job.data.chatId}`
      )
      .subscribe(() => {
        this.logger.log(`Chat Deleted: ${job.data.chatId}`);
        // Emit chat deleted event after participants joined the room
        this.appGateway.server
          .to(job.data.chatId)
          .emit(ActionTypes.ChatDeleted, { chatId: job.data.chatId });
      });
  }
}
