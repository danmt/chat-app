import { IUser } from '@chat-app/api-interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ConnectedClient,
  ConnectedClientDocument,
} from './connected-client.schema';

@Injectable()
export class ConnectedClientService {
  constructor(
    @InjectModel(ConnectedClient.name)
    private connectedClientModel: Model<ConnectedClientDocument>
  ) {}

  async connect(user: IUser) {
    let connectedClient = await this.connectedClientModel.findById(user._id);

    if (!connectedClient) {
      connectedClient = await this.connectedClientModel.create({
        _id: user._id,
        username: user.username,
        thumbnail: user.thumbnail,
        clientId: user.clientId,
      });
    } else {
      connectedClient.clientId = user.clientId;
      await connectedClient.save();
    }

    const connectedClients = await this.connectedClientModel.find({});

    return {
      connectedClient,
      connectedClients,
    };
  }

  async disconnect(clientId: string) {
    const disconnectedClient = await this.connectedClientModel.findOne({
      clientId,
    });
    if (disconnectedClient) {
      await disconnectedClient.deleteOne();
    }
    const connectedClients = await this.connectedClientModel.find({});
    return {
      disconnectedClient,
      connectedClients,
    };
  }
}
