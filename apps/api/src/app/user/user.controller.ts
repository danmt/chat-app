import { Controller, Post, Body, HttpCode } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  @HttpCode(200)
  login(@Body('username') username: string) {
    return this.userService.login(username);
  }
}
