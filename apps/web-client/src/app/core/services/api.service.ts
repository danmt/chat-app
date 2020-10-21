import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IChat, IUser } from '@chat-app/api-interface';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  getChats() {
    return this.httpClient.get<IChat[]>('/api/chats');
  }

  login(username: string) {
    return this.httpClient.post<IUser>('/api/users/login', { username });
  }
}
