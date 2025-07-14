import express, { RequestHandler } from "express";

import { checkAccessToken } from "../../../middlewares/checkAccessToken";
import { validateRequest } from "../../../middlewares/validateRequest";

import { forgotPassword, resetPassword, updatePassword } from "./password.controller";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  resetPasswordTokenSchema,
  updatePasswordSchema,
} from "./password.schema";

const router = express.Router();

router.post(
  "/forgot",
  validateRequest({ body: forgotPasswordSchema }),
  forgotPassword as unknown as RequestHandler
);

router.post(
  "/reset/:token",
  validateRequest({ body: resetPasswordSchema, params: resetPasswordTokenSchema }),
  resetPassword as unknown as RequestHandler
);

router.post(
  "/update",
  checkAccessToken,
  validateRequest({ body: updatePasswordSchema }),
  updatePassword as unknown as RequestHandler
);

export default router;
