import express from "express";
import { getWordHistory, getWordHistoryForUser } from "./wordHistory.controller";
import { checkAccessToken } from "../../middlewares/checkAccessToken";

const router = express.Router();

router.get("/", checkAccessToken, getWordHistory);
router.get("/me", checkAccessToken, getWordHistoryForUser);

export default router;
