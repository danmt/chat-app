import { IUser } from '@chat-app/api-interface';
import {
  Controller,
  Post,
  Body,
  HttpCode,
  Delete,
  Param,
} from '@nestjs/common';

import { ClientService } from './client.service';

@Controller('/clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @HttpCode(200)
  async create(@Body('user') user: IUser, @Body('clientId') clientId: string) {
    const client = await this.clientService.create(user, clientId);
    await this.clientService.emitClients();
    return client;
  }

  @Delete('/:socket_id')
  async deleteClient(@Param('socket_id') socketId: string) {
    await this.clientService.deleteClient(socketId);
    await this.clientService.emitClients();
    return { socketId };
  }
}
