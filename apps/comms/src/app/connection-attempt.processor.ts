import { Processor, Process } from '@nestjs/bull';
import { HttpService } from '@nestjs/common';
import { Job } from 'bull';

@Processor('connection-attempt')
export class ConnectionAttemptProcessor {
  constructor(private readonly httpService: HttpService) {}

  @Process()
  connectionAttempt(job: Job<unknown>) {
    this.httpService
      .post('http://localhost:3333/api/clients', job.data)
      .subscribe();
  }
}
