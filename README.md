<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>



## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
simple NestJS/Typescript application to handle User Management (using Keycloak API):
1. User can have scopes. (location or business unit based scopes)
2. User can have roles. (MANAGE_USER, MANAGE_SCOPES)

repo had 4 endpoints:
• Create user – After creating the user, user should be able to login
• Update user – Updating basic attributes like firstname, lastname
• Get User by Id – Get user object back using keycloak generated id
• Get all Users – Get users array back using keycloak


## Installation

```bash
$ docker run -p 8080:8080 -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin quay.io/keycloak/keycloak:15.0.2
```

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
### or 

```bash
# build an image
$ docker build -t keycloak-auth . 

# check ur image is created & exist
$ docker images

# Run 
$ docker run -p 3000:3000 keycloak-auth
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Hints

if you got error message "HTTPS required", please do the following steps 

- docker exec -it {contaierID} bash
- cd keycloak/bin
- ./kcadm.sh config credentials --server http://localhost:8080/auth --realm master --user admin
- ./kcadm.sh update realms/master -s sslRequired=NONE


## used libraries

- [keycloak-admin-client](https://www.npmjs.com/package/@keycloak/keycloak-admin-client)
- [nest-keycloak-connect](https://www.npmjs.com/package/nest-keycloak-connect)

## License

Nest is [MIT licensed](LICENSE).
