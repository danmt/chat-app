import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from '../chat.schema';
import { IMessage } from '@chat-app/api-interface';
import { Message, MessageDocument } from './message.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>
  ) {}

  async sendMessage(chatId: string, authorId: string, body: string) {
    const message: IMessage = new this.messageModel({
      body,
      date: new Date(Date.now()),
      authorId,
      chatId,
    }).toObject();

    await this.chatModel.updateOne(
      { _id: chatId },
      { $push: { messages: message } },
      { new: true }
    );

    return message;
  }
}
