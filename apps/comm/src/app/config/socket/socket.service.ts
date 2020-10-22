import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class SocketService {
  @WebSocketServer()
  server: Server;

  getSocket(clientId: string) {
    return this.server.sockets.connected[clientId];
  }
}
