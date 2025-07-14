import express from "express";

import queryRouter from "./query/query.route";
import accountRouter from "./account/account.route";
import passwordRouter from "./password/password.route";
import verificationRouter from "./verification/verification.route";

const router = express.Router();

router.use("/", queryRouter);
router.use("/account", accountRouter);
router.use("/password", passwordRouter);
router.use("/verification", verificationRouter);

export default router;
