import { Request, Response } from "express";
import Ajv from "ajv";


import jwt from 'jsonwebtoken'

import { ErrorCodes, JWT_SECRET } from "../const";
import { sendErrorResponse, sendJSONResponse } from "../utils";
import { RegisterUser } from "../types";

import { User } from "@litsurvey/common";

import UserService from '../services/UserService'

import RegisterSchema from "../httpSchemas/register" ;

const ajv = new Ajv({ allErrors: true });

export default async function (req: Request, res: Response) {
  let body: RegisterUser;

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


  const isBodyValid = ajv.validate(RegisterSchema, body);
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

  const userToCreate = {
    ...body,
    id: "TODO, CHANGE THIS"
  } as User;

  const foundUser = await UserService.getUserByEmail(body.email)

  if (foundUser) {
    sendErrorResponse(res, {
      error: {
        code: ErrorCodes.BAD_INPUT,
        message: "User has already registered",
        details: ajv.errors,
      },
      status: 400
    })
    return;
  }

  const createdUser = await UserService.createUser(userToCreate)

  if (!createdUser) {
    sendErrorResponse(res, {
      error: {
        code: ErrorCodes.INTERNAL_ERROR,
        message: "Failed to create a new user"
      },
      status: 500
    })
    return;
  }

  sendJSONResponse(res, {
    data: {
      username: createdUser.username,
      email: createdUser.email,
      token: jwt.sign(
        {
          username: createdUser.username,
          email: createdUser.email
        },
        JWT_SECRET
      )
    },
    status: 201
  }, 201)
}