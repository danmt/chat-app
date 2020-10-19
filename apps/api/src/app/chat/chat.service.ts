import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from './chat.schema';
import { IUser } from '@chat-app/api-interface';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<ChatDocument>) {}

  async create(participants: IUser[]) {
    const chat = await this.chatModel.findOne({
      participants: { $all: participants },
    });

    if (chat) {
      return chat;
    }

    return this.chatModel.create({ participants, messages: [] });
  }

  async getChats(id: string) {
    return this.chatModel.find({ 'participants._id': id });
  }
}
