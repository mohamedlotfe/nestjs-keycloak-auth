import { Injectable } from '@nestjs/common';
import KcAdminClient from '@keycloak/keycloak-admin-client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  public realmName: string = this.config.get('KEYCLOAK_REALM');
  public client: KcAdminClient;

  constructor(private readonly config: ConfigService) {
    this.connect().then((admin) => (this.client = admin));
  }
  async connect() {
    const kcAdminClient = new KcAdminClient({
      baseUrl: this.config.get('KEYCLOAK_AUTH_URI'),
      realmName: this.realmName,
    });
    try {
      await kcAdminClient.auth({
        username: this.config.get('KEYCLOAK_USERNAME'),
        password: this.config.get('KEYCLOAK_PASSWORD'),
        grantType: 'password',
        clientId: this.config.get('KEYCLOAK_CLIENT_ID'),
        clientSecret: this.config.get('KEYCLOAK_CLIENT_SECRET'),
      });
      return kcAdminClient;
    } catch (error) {
      console.log('error', error);
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
