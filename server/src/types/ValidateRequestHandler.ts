import { ValidatedRequest } from "./ValidatedRequest";
import { Response, NextFunction } from "express";

export type ValidatedRequestHandler<
  Params = unknown,
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery = unknown
> = (
  req: ValidatedRequest<Params, ResBody, ReqBody, ReqQuery>,
  res: Response<ResBody>,
  next: NextFunction
) => Promise<void>;
