import express, { RequestHandler } from "express";

import { createSession, deleteSession, checkSession, generateNewAccessToken } from "./session.controller";

import { checkAccessToken } from "../../middlewares/checkAccessToken";
import { loginLimiter } from "../../middlewares/rateLimiter";
import { validateRequest } from "../../middlewares/validateRequest";
import { createSessionSchema } from "./session.schema";

const router = express.Router();

router
  .route("/")
  .get(checkAccessToken, checkSession)
  .post(
    loginLimiter,
    validateRequest({ body: createSessionSchema }),
    createSession as unknown as RequestHandler
  )
  .delete(checkAccessToken, deleteSession);

router.get("/refresh", generateNewAccessToken);

export default router;
