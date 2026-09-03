import express from "express";
import { getPosts, addPost, removePost, upload, toggleLike, addComment } from "../controllers/postController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
    "/",
    getPosts
);

router.post(
    "/",
    requireAuth,
    upload.fields([
        {
            name: "my_images",
            maxCount: 5
        },
        {
            name: "my_videos",
            maxCount: 2
        }
    ]),
    addPost
);

router.delete(
    "/:id",
    requireAuth,
    removePost
);

router.post(
    "/:id/like",
    requireAuth,
    toggleLike
);

router.post(
    "/:id/comments",
    requireAuth,
    addComment
);

export default router;