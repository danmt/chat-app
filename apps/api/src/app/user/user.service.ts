import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async login(username: string) {
    const user = await this.userModel.findOne({ username });

    if (user) {
      return user;
    }

    return this.userModel.create({ username, thumbnail: '' });
  }
}
