import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/userUpdate.dto';

@Controller('user')
export class UserController {
  constructor(private usersService: UserService) {}
  @Get()
  GetUser() {
    return this.usersService.getUser();
  }

  @Get(':id')
  GetUserById(@Param('id') userId: string) {
    return this.usersService.getUserById(userId);
  }

  @Post()
  CreateUser(@Body() userData: CreateUserDto) {
    return this.usersService.createUser(userData);
  }

  @Patch(':id')
  UpdateUser(@Param('id') userId: string, @Body() userData: UpdateUserDto) {
    return this.usersService.updateUser(userId, userData);
  }
}
