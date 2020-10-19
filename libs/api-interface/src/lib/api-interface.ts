export interface IMessage {
  body: string;
  date: Date;
  authorId: string;
}

export interface IUser {
  _id: string;
  username: string;
  thumbnail: string;
  clientId?: string;
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

export enum ActionTypes {
  Connect = '[Web Client] Connect',
  ClientConnected = '[Socket] Client Connected',
  ClientDisconnected = '[Socket] Client Disconnected',
  SendMessage = '[Web Client] Send Message',
  MessageSent = '[Socket] Message Sent',
  MessageReceived = '[Socket] Message Received',
  ReadMessage = '[Web Client] Read Message',
  MessageRead = '[Socket] Message Read',
}
