import { IUser } from '@chat-app/api-interface';
import {
  Controller,
  Post,
  Body,
  HttpCode,
  Delete,
  Param,
} from '@nestjs/common';

import { ConnectedClientService } from './connected-client.service';

@Controller('/connected_clients')
export class ConnectedClientController {
  constructor(
    private readonly connectedClientService: ConnectedClientService
  ) {}

  @Post()
  @HttpCode(200)
  connect(@Body('user') user: IUser) {
    return this.connectedClientService.connect(user);
  }

  @Delete('/:client_id')
  @HttpCode(200)
  disconnect(@Param('client_id') clientId: string) {
    return this.connectedClientService.disconnect(clientId);
  }
}
