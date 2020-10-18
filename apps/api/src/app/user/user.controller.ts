import { Controller, Post, Body } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  login(@Body('username') username: string) {
    return this.userService.login(username);
  }
}
