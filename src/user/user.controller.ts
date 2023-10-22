import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { Unprotected } from 'nest-keycloak-connect';
import { User, UpdateUserInput, CreateUserInput } from './users.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  @Unprotected()
  getUser(@Param('id') id: string): Promise<User> {
    return this.userService.get(id);
  }

  @Get()
  @Unprotected()
  getUsers(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Put()
  @Unprotected()
  updateUser(@Body() input: UpdateUserInput): Promise<User> {
    return this.userService.update(input);
  }

  @Post()
  @Unprotected()
  createUser(@Body() input: CreateUserInput): Promise<User> {
    return this.userService.create(input);
  }
}
