import { Process, Processor } from '@nestjs/bull';
import { HttpService, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { map, mergeMap } from 'rxjs/operators';

import { ActionTypes, IChat, IUser } from '@chat-app/api-interface';
import { SocketService } from '../config/socket/socket.service';

@Processor('connection-attempt')
export class ConnectionAttemptProcessor {
  private logger = new Logger('ConnectionAttemptProcessor');

  constructor(
    private readonly httpService: HttpService,
    private readonly socketService: SocketService
  ) {}

  @Process()
  async connectionAttempt(job: Job<IUser>) {
    this.httpService
      .post<{ connectedClient: IUser; connectedClients: IUser[] }>(
        'http://localhost:3333/api/connected_clients',
        {
          user: job.data,
        }
      )
      .pipe(
        mergeMap(({ data: { connectedClient, connectedClients } }) =>
          this.httpService
            .get<IChat[]>('http://localhost:3333/api/chats', {
              headers: { id: connectedClient._id },
            })
            .pipe(
              map(({ data: chats }) => ({
                connectedClient,
                connectedClients,
                chats,
              }))
            )
        )
      )
      .subscribe(({ chats, connectedClient, connectedClients }) => {
        this.logger.log(
          `Connection Established: ${connectedClient.username} (${connectedClient._id}/${connectedClient.clientId}) - ${connectedClients.length} connected clients.`
        );
        // Get client socket
        const socket = this.socketService.getSocket(connectedClient.clientId);
        // if the socket is valid, join to each chat
        if (socket) {
          socket.join(chats.map((chat) => chat._id));
        }
        // Emit a clients updated event
        this.socketService.server.emit(
          ActionTypes.ClientsUpdated,
          connectedClients
        );
      });
  }
}
