import { Injectable } from '@nestjs/common';
import { User, UpdateUserInput, CreateUserInput } from './users.interface';
import { AppService } from 'src/app.service';

@Injectable()
export class UserService {
  constructor(private readonly service: AppService) {}

  getAll(): Promise<User[]> {
    return this.service.client.users.find({ first: 0, max: 100 });
  }

  get(id: string): Promise<User> {
    return this.service.client.users.findOne({ id: id });
  }

  async update(body: UpdateUserInput): Promise<User> {
    const user = await this.service.client.users.findOne({ id: body.id });
    const obj = Object.assign(user, body);

    if (user) {
      await this.service.client.users.update({ id: body.id }, obj);
    }
    return obj;
  }

  async create(input: CreateUserInput): Promise<string> {
    const { password, ...data } = input;
    const userObj = Object.assign(new User(), data, {
      realm: 'master',
      emailVerified: true,
      enabled: true,
    });

    const user = await this.service.client.users.create(userObj);
    await this.service.client.users.resetPassword({
      id: user.id,
      credential: { temporary: false, value: password, type: 'password' },
      realm: 'master',
    });

    return user.id;
  }
}
