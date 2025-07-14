import express, { RequestHandler } from "express";

import { checkAccessToken } from "../../../middlewares/checkAccessToken";
import { validateRequest } from "../../../middlewares/validateRequest";

import { sendVerificationToken, verifyEmail } from "./verification.controller";
import { verifyEmailSchema } from "./verification.schema";

const router = express.Router();

router.post("/send", checkAccessToken, sendVerificationToken);

router.post(
  "/code",
  checkAccessToken,
  validateRequest({ body: verifyEmailSchema }),
  verifyEmail as unknown as RequestHandler
);

export default router;
