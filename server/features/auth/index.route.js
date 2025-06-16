import express from "express";

import accountRoutes from "./account/account.route.js";
import sessionRoutes from "./session/session.route.js";
import passwordRoutes from "./password/password.route.js";
import emailVerificationRoutes from "./emailVerification/emailVerification.route.js";

const router = express.Router();

router.use("/account", accountRoutes);
router.use("/session", sessionRoutes);
router.use("/password", passwordRoutes);
router.use("/email-verification", emailVerificationRoutes);

export default router;
