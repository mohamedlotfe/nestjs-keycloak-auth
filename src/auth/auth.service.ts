import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as queryString from 'querystring';
import { catchError, map } from 'rxjs/operators';
import { KeycloakToken } from './keycloack-token.model';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AuthService {
  private keycloakLoginUri: string;
  private keycloakResponseType: string;
  private keycloakScope: string;
  private keycloakRedirectUri: string;
  private keycloakClientId: string;
  private keycloakClientSecret: string;
  private keycloakTokenUri: string;

  constructor(
    private readonly config: ConfigService,
    private readonly http: HttpService,
  ) {
    this.keycloakLoginUri = config.get('KEYCLOAK_LOGIN_URI');
    this.keycloakResponseType = config.get('KEYCLOAK_RESPONSE_TYPE');
    this.keycloakScope = config.get('KEYCLOAK_SCOPE');
    this.keycloakRedirectUri = config.get('KEYCLOAK_REDIRECT_URI');
    this.keycloakClientId = config.get('KEYCLOAK_CLIENT_ID');
    this.keycloakClientSecret = config.get('KEYCLOAK_CLIENT_SECRET');
    this.keycloakTokenUri = this.config.get('KEYCLOAK_TOKEN_URI');
  }

  getUrlLogin(): any {
    return {
      url:
        `${this.keycloakLoginUri}` +
        `?client_id=${this.keycloakClientId}` +
        `&response_type=${this.keycloakResponseType}` +
        `&scope=${this.keycloakScope}` +
        `&redirect_uri=${this.keycloakRedirectUri}`,
    };
  }

  getAccessToken(code: string) {
    const params = {
      grant_type: 'authorization_code',
      client_id: this.keycloakClientId,
      client_secret: this.keycloakClientSecret,
      code: code,
      redirect_uri: this.keycloakRedirectUri,
    };

    return this.http
      .post(
        this.keycloakTokenUri,
        queryString.stringify(params),
        this.getContentType(),
      )
      .pipe(
        map(
          (res: any) =>
            new KeycloakToken(
              res.data.access_token,
              res.data.refresh_token,
              res.data.expires_in,
              res.data.refresh_expires_in,
            ),
        ),
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      );
  }

  refreshAccessToken(refresh_token: string) {
    const params = {
      grant_type: 'refresh_token',
      client_id: this.keycloakClientId,
      client_secret: this.keycloakClientSecret,
      refresh_token: refresh_token,
      redirect_uri: this.keycloakRedirectUri,
    };

    return this.http
      .post(
        this.keycloakTokenUri,
        queryString.stringify(params),
        this.getContentType(),
      )
      .pipe(
        map(
          (res: any) =>
            new KeycloakToken(
              res.data.access_token,
              res.data.refresh_token,
              res.data.expires_in,
              res.data.refresh_expires_in,
            ),
        ),
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
      );
  }

  getContentType(): { headers: object } {
    return { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
  }
}
