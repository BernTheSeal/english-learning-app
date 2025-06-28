import express from "express";

import queryRouter from "./query/query.route.js";
import accountRouter from "./account/account.route.js";
import passwordRouter from "./password/password.route.js";
import verificationRouter from "./verification/verification.route.js";

const router = express.Router();

router.use("/", queryRouter);
router.use("/account", accountRouter);
router.use("/password", passwordRouter);
router.use("/verification", verificationRouter);

export default router;
