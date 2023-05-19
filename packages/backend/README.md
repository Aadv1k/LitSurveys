# @litsurveys/backend

This is the core backend for litsurveys, built using

![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=&logo=graphql&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=g&logo=express&logoColor=%2361DAFB)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=&logo=Sequelize&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=&logo=redis&logoColor=white)


## Endpoints

- `POST /graphql`: the GraphQL entry point
- `POST /auth/login`: login as an existing user
- `POST /auth/signup`: Sign up as a new user
- `GET /auth/oauth/:id`: OAuth implementation for the backend (redirect)
- `GET /auth/oauth/:id/callback`: Callback URL for the OAuth, handles user creation/login and return JWT token
