# LitSurveys

** This project is now archived, and will no longer get any updates, see [Why](#why-archived) **

This is the monorepo for LitSurveys, a webapp that aims to make surveys more fun and engaging.

## Backend

- [@litsurvey/backend](./packages/backend)

### Tech stack

![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=&logo=graphql&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/Express-%23404d59.svg?style=g&logo=express&logoColor=%2361DAFB)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=&logo=Sequelize&logoColor=white)
![Postgres](https://img.shields.io/badge/Postgres-%23316192.svg?style=&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-%23DD0031.svg?style=&logo=redis&logoColor=white)

## GraphQL

### User Type

The `User` type represents a user in the system.

| Field    | Type     | Description       |
|----------|----------|-------------------|
| id       | String!  | The user's ID.    |
| username | String!  | The username.     |
| token    | String   | The user's token. |

### TakeoutMenu Input

The `TakeoutMenu` input specifies the desired data to include in the takeout.

| Field    | Type    | Description                                        |
|----------|---------|----------------------------------------------------|
| surveys  | Boolean | Set to `true` to include surveys in the takeout.   |
| fields   | Boolean | Set to `true` to include fields in the takeout.    |
| responses| Boolean | Set to `true` to include responses in the takeout. |

### TakeoutOutput Type

The `TakeoutOutput` type represents the result of a takeout operation.

| Field    | Type         | Description                                  |
|----------|--------------|----------------------------------------------|
| surveys  | [Survey]     | An array of surveys included in the takeout. |
| fields   | [Field]      | An array of fields included in the takeout.  |
| responses| [Response]   | An array of responses included in the takeout.|

### Query Type

The `Query` type provides queries for retrieving data.

| Field    | Type          | Description                                   |
|----------|---------------|-----------------------------------------------|
| user     | User          | Retrieves the currently logged-in user.       |
| takeout  | TakeoutOutput | Retrieves the requested takeout information.  |

### Field Type

The `Field` type represents a field within a survey.

| Field              | Type     | Description                                             |
|--------------------|----------|---------------------------------------------------------|
| id                 | String!  | The ID of the field.                                    |
| survey_id          | String!  | The ID of the survey to which the field belongs.         |
| type               | String!  | The type of the field.                                  |
| question           | String!  | The question associated with the field.                  |
| response_options   | String   | The response options for the field (if applicable).      |

### FieldInput Input

The `FieldInput` input is used to create a new field.

| Field              | Type     | Description                                             |
|--------------------|----------|---------------------------------------------------------|
| type               | String!  | The type of the field.                                  |
| question           | String!  | The question associated with the field.                  |
| survey_id          | String!  | The ID of the survey to which the field belongs.         |
| response_options   | String   | The response options for the field (if applicable).      |

### DeleteFieldInput Input

The `DeleteFieldInput` input is used to delete a field.

| Field       | Type     | Description                                          |
|-------------|----------|------------------------------------------------------|
| survey_id   | String!  | The ID of the survey to which the field belongs.      |
| id          | String!  | The ID of the field to delete.                        |

### Mutation Type

The `Mutation` type provides mutations for creating and deleting fields.

| Field             | Type     | Description                                |
|-------------------|----------|--------------------------------------------|
| createField       | Field    | Creates a new field.                        |
| deleteField       | String   | Deletes a field and returns a success message.|

### Query Type

The `Query` type provides a query for retrieving fields.

| Field     | Type       | Description                                                      |
|-----------|------------|------------------------------------------------------------------|
| field     | [Field]    | Retrieves fields based on the specified survey ID (optional).    |

### Survey Type

The `Survey` type represents a survey in the system.

| Field          | Type     | Description                                      |
|----------------|----------|--------------------------------------------------|
| id             | String!  | The ID of the survey.                            |
| user_id        | String!  | The ID of the user who created the survey.        |
| created_at     | Int!     | The timestamp when the survey was created.       |
| title          | String!  | The title of the survey.                         |
| description    | String!  | The description of the survey.                   |
| status         | String!  | The status of the survey.                        |
| max_responses  | Int!     | The maximum number of responses for the survey.   |

### SurveyInput Input

The `SurveyInput` input is used to create a new survey.

| Field          | Type     | Description                                      |
|----------------|----------|--------------------------------------------------|
| title          | String!  | The title of the survey.                         |
| description    | String!  | The description of the survey.                   |
| status         | String!  | The status of the survey.                        |
| max_responses  | Int!     | The maximum number of responses for the survey.   |

### Mutation Type

The `Mutation` type provides mutations for creating and deleting surveys.

| Field             | Type    | Description                                 |
|-------------------|---------|---------------------------------------------|
| createSurvey      | Survey  | Creates a new survey.                        |
| deleteSurvey      | String  | Deletes a survey and returns a success message. |

### Query Type

The `Query` type provides a query for retrieving surveys.

| Field    | Type      | Description                                    |
|----------|-----------|------------------------------------------------|
| survey   | [Survey!] | Retrieves all surveys.                         |


## API

### `POST /auth/register`

To create a new user

```json
{
  "username": "johnnyOP123",
  "email": "johnny@foo.com",
  "password": "some2399",
  "type": "surveyee"
}
```

- `type`: `surveyee` | `surveyor`

#### Response

- `Set-Cookie: litsurvey-session=1f62efbb616717785a4d2d4ae9f57a5d`


### `POST /auth/login`

Login to an existing session

```json
{
  "username": "johnnyOP123",
  "password": "some2399",
}
```

#### Response

```json
{
	"data": {
    "username": "johnnyOP123",
		"email": "johnny@foo.com",
		"type": "surveyee"
	},
	"status": 200
}
```

- `Set-Cookie: litsurvey-session=1f62efbb616717785a4d2d4ae9f57a5d`


### `GET /auth/token`

Get the JWT token based on the SessionID

```json
{
	"data": {
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
	},
	"status": 200
}
```

### `/auth/oauth/google`

Implements the OAuth scheme for google and redirects the request to OAuth site

### `/auth/oauth/google/callback`

Creates a new user or uses an existing one to set the sessionID similar to login/signup functionality 


## Why archived

The reason I started this project is because I wanted to try building a large scale-API using GraphQL, however as the development goes on, I find my self enjoying less and less of the complexity, and I would not like to dedicate another week to a project that I don't enjoy working with.
