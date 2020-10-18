export interface IMessage {
  body: string;
  date: Date;
  authorId: string;
}

export interface IUser {
  _id: string;
  username: string;
  thumbnail: string;
}

export interface IChat {
  _id: string;
  participants: [IUser, IUser];
  messages: IMessage[];
}

export interface IChatTab {
  _id: string;
  contact?: IUser;
  lastMessage?: IMessage;
}
