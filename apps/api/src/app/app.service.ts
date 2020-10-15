import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  login(username: string) {
    return { success: true, username };
  }
}
