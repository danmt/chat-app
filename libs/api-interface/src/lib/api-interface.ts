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
  isLoggedIn?: boolean;
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
  ClientsUpdated = '[Socket] Clients Updated',
  StartChat = '[Web Client] Start Chat',
  ChatStarted = '[Socket] Chat Started',
  DeleteChat = '[Web Client] Delete Chat',
  ChatDeleted = '[Socket] Chat Deleted',
}
