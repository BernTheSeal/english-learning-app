import express from "express";

import { checkAuth, logout, generateNewAccessToken } from "./session.controller.js";
import { checkToken } from "../../../middlewares/checkToken.js";

const router = express.Router();

router.use("/check-auth", checkToken, checkAuth);
router.use("/generate-new-access-token", generateNewAccessToken);
router.use("/logout", checkToken, logout);

export default router;
