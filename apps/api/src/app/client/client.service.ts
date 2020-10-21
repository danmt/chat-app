import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

import { Client, ClientDocument } from './client.schema';
import { IUser } from '@chat-app/api-interface';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
    @InjectQueue('connection') private connectionQueue: Queue
  ) {}

  async create(user: IUser, socketId: string) {
    console.log(user);
    return await this.clientModel.create({ user, socketId });
  }

  async deleteClient(socketId: string) {
    await this.clientModel.deleteOne({ socketId });
    this.connectionQueue.add({ clients: await this.clientModel.find() });
  }

  async getClients() {
    return await this.clientModel.find();
  }

  async emitClients() {
    const clients = await this.getClients();
    console.log(clients);
    this.connectionQueue.add({
      clients: clients.map((client) => ({
        _id: client.user._id,
        username: client.user.username,
        thumbnail: client.user.thumbnail,
        clientId: client.socketId,
      })),
    });
  }
}
