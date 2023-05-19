import { Request, Response } from "express";
import Ajv from "ajv";

import jwt from 'jsonwebtoken'

import { v4 as uuid } from "uuid";

import { ErrorCodes, JWT_SECRET } from "../const";
import { sendErrorResponse, sendJSONResponse } from "../utils";
import { LoginUser } from "../types";

import { User } from "@litsurvey/common";

import UserService from '../services/UserService'

import LoginSchema from "../httpSchemas/login" ;

const ajv = new Ajv({ allErrors: true });

ajv.addFormat('email', {
		type: 'string',
		validate: (value: string) => {
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				return emailRegex.test(value);
		},
});


export default async function (req: Request, res: Response) {
  let body: LoginUser;

  console.log(req.cookies);

  try {
    body = req.body;
  } catch (err) {
    sendErrorResponse(res, {
      error: {
        code: ErrorCodes.BAD_INPUT,
        message: "Invalid JSON data",
      },
      status: 400
    })
    return;
  }

  const isBodyValid = ajv.validate(LoginSchema, body);
  if (!isBodyValid)  {
    sendErrorResponse(res, {
      error: {
        code: ErrorCodes.BAD_INPUT,
        message: "Bad input",
        details: ajv.errors,
      },
      status: 400
    })
    return;
  }

  let foundUser;
  if (body.username) {
    foundUser = await UserService.getUserByUsername(body.username);
  } else if (body.email) {
    foundUser = await UserService.getUserByEmail(body.email);
  }

  if (!foundUser) {
    sendErrorResponse(res, {
      error: {
        code: ErrorCodes.USER_NOT_FOUND,
        message: `user ${body.email ?? body.username} does not exist`,
      },
      status: 400
    })
    return;
  }

  if (foundUser.password !== body.password) {
    sendErrorResponse(res, {
      error: {
        code: ErrorCodes.INVALID_PASSWORD,
        message: `invalid password for ${body.email ?? body.username}`,
      },
      status: 400
    })

    return;

  }



  const jwtToken = jwt.sign( {
          username: foundUser.username,
          email: foundUser.email
        },
        JWT_SECRET,
        {
          expiresIn: "30m"
        }
      )

  res.cookie("litsurvey-token", jwtToken, { httpOnly: true });
  sendJSONResponse(res, {
    data: {
      username: foundUser.username,
      email: foundUser.email,
    },
    status: 200
  }, 200)
}
