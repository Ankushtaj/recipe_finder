import express from "express";
import { addSearchHistory, getSearchHistory, clearSearchHistory } from "../controllers/searchHistoryController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
    "/",
    requireAuth,
    getSearchHistory
);

router.post(
    "/",
    requireAuth,
    addSearchHistory
);

router.delete(
    "/",
    requireAuth,
    clearSearchHistory
);

export default router;
