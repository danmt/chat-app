export interface IMessage {
  body: string;
  date: Date;
  authorId: number;
}

export interface IUser {
  id: number;
  name: string;
  thumbnail: string;
}

export interface IChat {
  id: number;
  participants: [IUser, IUser];
  messages: IMessage[];
}

export interface IChatTab {
  id: number;
  contact?: IUser;
  lastMessage?: IMessage;
}
