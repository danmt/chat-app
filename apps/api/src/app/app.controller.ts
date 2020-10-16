import { Controller, Post, Body } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/login')
  login(@Body('username') username: string) {
    return this.appService.login(username);
  }
}
