## Description
- A NestJs server-side application that  handle User Management (using Keycloak API), 
repo had 4 endpoints:
- Create user – After creating the user, user should be able to login
- Update user – Updating basic attributes like firstname, lastname
- Get User by Id – Get user object back using keycloak generated id
- Get all Users – Get users array back using keycloak
- The application containerized with proper docker file .


## The Architecture Design 

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://github.com/mohamedlotfe/nestjs-keycloak-auth/blob/main/public/flow.png"  alt="Nest Logo" /></a>
</p>

## Postman Endpoints
[exported postman collection]([https://www.npmjs.com/package/@keycloak/keycloak-admin-client](https://github.com/mohamedlotfe/nestjs-keycloak-auth/blob/main/repo.postman_collection.json))



## Installation

```bash
$ docker run -p 8080:8080 -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin quay.io/keycloak/keycloak:15.0.2
```

```bash
$ npm install
```

## Running the app without docker

```bash
# installation 
$ npm install

# watch mode
$ npm run start:dev
```
## Running using docker

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
