import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IChat } from '@chat-app/api-interface';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  getChats() {
    return this.httpClient.get<IChat[]>('/api/chats');
  }

  sendMessage(chatId: string, body: string) {
    return this.httpClient.post(`/api/chats/${chatId}/messages`, { body });
  }
}
