import { Process, Processor } from '@nestjs/bull';
import { HttpService, Logger } from '@nestjs/common';
import { Job } from 'bull';

import { ActionTypes, IUser } from '@chat-app/api-interface';
import { SocketService } from '../config/socket/socket.service';

@Processor('connection-lost')
export class ConnectionLostProcessor {
  private logger = new Logger('ConnectionLostProcessor');

  constructor(
    private readonly httpService: HttpService,
    private readonly socketService: SocketService
  ) {}

  @Process()
  async connectionLost(job: Job<{ clientId: string }>) {
    this.httpService
      .delete<{ disconnectedClient: IUser; connectedClients: IUser[] }>(
        `http://localhost:3333/api/connected_clients/${job.data.clientId}`
      )
      .subscribe(({ data: { disconnectedClient, connectedClients } }) => {
        if (disconnectedClient) {
          this.logger.log(
            `Connection Lost: ${disconnectedClient.username} (${disconnectedClient._id}/${disconnectedClient.clientId}) - ${connectedClients.length} connected clients.`
          );
          // Emit clients updated event
          this.socketService.server.emit(
            ActionTypes.ClientsUpdated,
            connectedClients
          );
        }
      });
  }
}
