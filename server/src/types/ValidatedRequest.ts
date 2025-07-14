import { Request } from "express";

export type ValidatedRequest<
  Params = unknown,
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery = unknown
> = Request<Params, ResBody, ReqBody, ReqQuery> & {
  validatedBody: ReqBody;
  validatedQuery: ReqQuery;
  validatedParams: Params;
};
