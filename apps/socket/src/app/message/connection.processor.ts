import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

import { ActionTypes } from '@chat-app/api-interface';
import { MessageGateway } from './message.gateway';

@Processor('connection')
export class ConnectionProcessor {
  constructor(private readonly messageGateway: MessageGateway) {}

  @Process()
  connection(job: Job<unknown>) {
    this.messageGateway.server.emit(ActionTypes.ClientsListUpdated, job.data);
  }
}
