import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles, Public } from 'nest-keycloak-connect';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('user')
  @Roles({ roles: ['MANAGE_USER'] })
  getUserResource(): string {
    return 'Hello User!';
  }

  @Get('admin')
  @Roles({ roles: ['admin'] })
  getAdminResource(): string {
    return 'Hello admin!';
  }
}
