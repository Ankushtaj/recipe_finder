import postmodel from "../models/Post.js";
import multer from "multer";
import ImageKit, { toFile } from "@imagekit/nodejs";

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

const storage = multer.memoryStorage();

export const upload = multer({
    storage,
    limits: {
        files: 7,
        fileSize: 100 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype.startsWith("image/") ||
            file.mimetype.startsWith("video/")
        ) {
            cb(null, true);
        }
        else {
            cb(
                new Error(
                    "Only image and video files are allowed"
                )
            );
        }
    }
});

export async function getPosts(req, res) {
    const all_posts =
        await postmodel.find()
            .populate(
                "userId",
                "name email"
            )
            .sort({
                createdAt: -1
            })
            .lean();

    const result =
        all_posts.map(post => {
            const fileUrls =
                post.fileKeys.map(fileKey => {
                    try {
                        const fileData =
                            JSON.parse(fileKey);

                        return fileData.url;
                    }
                    catch {
                        return fileKey;
                    }
                });

            return {
                _id: post._id,
                userId: post.userId,
                caption: post.caption,
                fileUrls,
                likes: post.likes,
                comments: post.comments,
                createdAt: post.createdAt
            };
        });

    res.status(200).json(result);
}

export async function addPost(req, res) {
    if (
        !req.files?.my_images?.length &&
        !req.files?.my_videos?.length
    ) {
        return res.status(400).json({
            message:
                "At least one image/video is required"
        });
    }

    const fileKey = [];

    const files = [
        ...(req.files?.my_images ?? []),
        ...(req.files?.my_videos ?? [])
    ];

    try {
        for (const file of files) {
            const fileName = `${Date.now()}-${file.originalname}`;

            const uploadResponse =
                await imagekit.files.upload({
                    file: await toFile(
                        file.buffer,
                        file.originalname
                    ),
                    fileName,
                    folder: "/quickcuisine/posts"
                });

            fileKey.push(
                JSON.stringify({
                    fileId:
                        uploadResponse.fileId,
                    url:
                        uploadResponse.url
                })
            );
        }

        const post =
            await postmodel.create({
                userId: req.user._id,
                fileKeys: fileKey,
                caption:
                    req.body.caption?.trim() || "",
                likes: [],
                comments: [],
                createdAt: new Date()
            });

        res.status(201).json({
            message: "post received",
            post
        });
    }
    catch (error) {
        console.error(
            "Post upload failed:",
            error
        );

        for (const key of fileKey) {
            try {
                const fileData =
                    JSON.parse(key);

                await imagekit.files.delete(
                    fileData.fileId
                );
            }
            catch (cleanupError) {
                console.error(
                    "ImageKit cleanup failed:",
                    cleanupError
                );
            }
        }

        res.status(500).json({
            message: "upload failed"
        });
    }
}

export async function removePost(req, res) {
    const post =
        await postmodel.findById(
            req.params.id
        );

    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    if (
        post.userId.toString() !==
        req.user._id.toString()
    ) {
        return res.status(403).json({
            message:
                "You are not allowed to delete this post"
        });
    }

    try {
        for (const key of post.fileKeys) {
            try {
                const fileData =
                    JSON.parse(key);

                await imagekit.files.delete(
                    fileData.fileId
                );
            }
            catch (error) {
                console.error(
                    "Failed to delete ImageKit file:",
                    error
                );
            }
        }

        await postmodel.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message: "Post deleted"
        });
    }
    catch (error) {
        console.error(
            "Post deletion failed:",
            error
        );

        res.status(500).json({
            message:
                "Failed to delete post"
        });
    }
}

export async function toggleLike(req, res) {
    const post = await postmodel.findById(req.params.id);

    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    const userId = req.user._id.toString();

    const alreadyLiked = post.likes.some(
        id => id.toString() === userId
    );

    if (alreadyLiked) {
        post.likes = post.likes.filter(
            id => id.toString() !== userId
        );
    }
    else {
        post.likes.push(req.user._id);
    }

    await post.save();

    res.json({
        message: alreadyLiked
            ? "Post unliked"
            : "Post liked",
        likes: post.likes
    });
}

export async function addComment(req, res) {
    const text = req.body.text?.trim();

    if (!text) {
        return res.status(400).json({
            message: "Comment cannot be empty"
        });
    }

    const post = await postmodel.findById(req.params.id);

    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    post.comments.push({
        userId: req.user._id,
        text
    });

    await post.save();

    res.status(201).json({
        message: "Comment added",
        comments: post.comments
    });
}