import { Response, Request } from "express";
export interface CommonContext {
  req: Request,
  res: Response
} 
