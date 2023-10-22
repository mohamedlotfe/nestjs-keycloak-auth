import UserRepresentation from '@keycloak/keycloak-admin-client/lib/defs/userRepresentation';

export class User implements UserRepresentation {}

export type UpdateUserInput = Pick<
  UserRepresentation,
  'firstName' | 'lastName'
> & {
  id: string;
};

export type CreateUserInput = Pick<
  UserRepresentation,
  'firstName' | 'lastName'
> & {
  username: string;
  password: string;
};
