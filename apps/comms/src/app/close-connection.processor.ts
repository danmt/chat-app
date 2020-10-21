import { Processor, Process } from '@nestjs/bull';
import { HttpService } from '@nestjs/common';
import { Job } from 'bull';

@Processor('close-connection')
export class CloseConnectionProcessor {
  constructor(private readonly httpService: HttpService) {}

  @Process()
  closeConnection(job: Job<{ socketId: string }>) {
    this.httpService
      .delete(`http://localhost:3333/api/clients/${job.data.socketId}`)
      .subscribe();
  }
}
