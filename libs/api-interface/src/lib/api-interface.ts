export interface IMessage {
  body: string;
  date: Date;
  authorId: string;
  chatId: string;
}

export interface IUser {
  _id: string;
  username: string;
  thumbnail: string;
  clientId?: string;
  isLoggedIn: boolean | null;
}

export interface IChat {
  _id: string;
  participants: [IUser, IUser];
  messages: IMessage[];
}

export interface IChatTab {
  _id: string;
  contact: IUser | null;
  lastMessage: IMessage | null;
}

export enum ActionTypes {
  Connect = '[Web Client] Connect',
  ClientConnected = '[Socket] Client Connected',
  ClientDisconnected = '[Socket] Client Disconnected',
  StartChat = '[Web Client] Start Chat',
  ChatStarted = '[Socket] Chat Started',
  DeleteChat = '[Web Client] Delete Chat',
  ChatDeleted = '[Socket] Chat Deleted',
  SendMessage = '[Web Client] Send Message',
  MessageSent = '[Socket] Message Sent',
  MessageReceived = '[Socket] Message Received',
  ReadMessage = '[Web Client] Read Message',
  MessageRead = '[Socket] Message Read',
}
