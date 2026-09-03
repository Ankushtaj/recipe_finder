import { useState } from "react";
import { FaTrash, FaHeart, FaRegHeart, FaComment, FaPaperPlane } from "react-icons/fa";
import { removePost, toggleLike, addComment } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

const CommunityPost = ({ post }) => {
    const { user } = useAuth();
    const [deleting, setDeleting] = useState(false);
    const [likes, setLikes] = useState(post.likes || []);
    const [comments, setComments] = useState(post.comments || []);
    const [commentText, setCommentText] = useState("");
    const [showComments, setShowComments] = useState(false);

    const getIdString = (value) => {
        if (!value) return "";
        if (typeof value === "string") return value;
        if (value._id) return String(value._id);
        return String(value);
    };

    const currentUserId = getIdString(user?._id || user?.id);
    const postUserId = getIdString(post.userId?._id || post.userId);

    const isLiked =
        currentUserId !== "" &&
        likes.some(
            likeId => getIdString(likeId) === currentUserId
        );

    const isOwner =
        currentUserId !== "" &&
        postUserId !== "" &&
        postUserId === currentUserId;

    const isVideo = (url) => {
        return /\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(url || "");
    };

    const handleDelete = async () => {
        try {
            setDeleting(true);
            await removePost(post._id);
            window.location.reload();
        }
        catch (error) {
            console.log("Could not delete post:", error);
        }
        finally {
            setDeleting(false);
        }
    };

    const handleLike = async () => {
        if (!user) return;

        try {
            const data = await toggleLike(post._id);
            setLikes(data.likes || []);
        }
        catch (error) {
            console.log("Could not like post:", error);
        }
    };

    const handleComment = async () => {
        if (!user) return;

        const text = commentText.trim();
        if (!text) return;

        try {
            const data = await addComment(post._id, text);
            setComments(data.comments || []);
            setCommentText("");
        }
        catch (error) {
            console.log("Could not add comment:", error);
        }
    };

    return (
        <div className="relative w-full max-w-[620px] bg-zinc-900 border border-zinc-700 rounded-2xl shadow-lg shadow-black/30">

            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
                <div>
                    <p className="text-gray-100 font-semibold">
                        {post.userId?.name || "QuickCuisine User"}
                    </p>

                    {post.createdAt && (
                        <p className="text-gray-500 text-xs mt-1">
                            {new Date(post.createdAt).toLocaleDateString(
                                undefined,
                                {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric"
                                }
                            )}
                        </p>
                    )}
                </div>

                {isOwner && (
                    <button
                        onClick={handleDelete}
                        disabled={deleting}
                        title="Delete post"
                        className="text-gray-500 hover:text-red-400 duration-200"
                    >
                        <FaTrash />
                    </button>
                )}
            </div>

            <div className="w-full aspect-[4/3] overflow-x-auto flex snap-x snap-mandatory scrollbar-none bg-black">
                {post.fileUrls?.map((url, index) => (
                    <div
                        key={index}
                        className="min-w-full w-full h-full shrink-0 snap-center flex items-center justify-center p-2"
                    >
                        <div className="w-full h-full overflow-hidden rounded-xl flex items-center justify-center">
                            {isVideo(url) ? (
                                <video
                                    src={url}
                                    controls
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <img
                                    src={url}
                                    alt="Community creation"
                                    className="w-full h-full object-contain"
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="px-5 pb-5">

                {post.caption && (
                    <p className="text-slate-300 font-serif leading-7 mt-2 whitespace-pre-wrap">
                        {post.caption}
                    </p>
                )}

                <div className="flex items-center mt-3 pt-4 border-t border-zinc-600/60">
                    <button
                        onClick={handleLike}
                        disabled={!user}
                        title={user ? "Like" : "Login to like"}
                        className={`flex items-center gap-2 duration-200 ${isLiked
                            ? "text-red-400"
                            : "text-gray-400"
                            } ${user
                                ? "hover:text-red-400"
                                : "cursor-not-allowed opacity-70"
                            }`}
                    >
                        {isLiked ? <FaHeart /> : <FaRegHeart />}
                        <span>{likes.length}</span>
                    </button>
                </div>

                <div className="relative mt-4">
                    <button
                        onClick={() => setShowComments(!showComments)}
                        className="flex items-center gap-2 text-gray-400 hover:text-orange-300 duration-200 text-sm"
                    >
                        <FaComment />
                        {showComments ? "Hide Comments" : "View Comments"}
                        <span className="text-gray-500">
                            ({comments.length})
                        </span>
                    </button>

                    {showComments && (
                        <div className="absolute left-0 right-0 top-full mt-2 z-30 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl p-3">

                            <div className="max-h-[180px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800 pr-1 space-y-2">
                                {comments.length > 0 ? (
                                    comments.map((comment, index) => (
                                        <div
                                            key={comment._id || index}
                                            className="bg-zinc-800/80 rounded-lg px-3 py-2 break-words whitespace-pre-wrap"
                                        >
                                            <p className="text-gray-300 text-sm leading-6">
                                                {comment.text}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-sm py-2">
                                        No comments yet.
                                    </p>
                                )}
                            </div>

                            {user ? (
                                <div className="flex gap-2 mt-3">
                                    <input
                                        type="text"
                                        value={commentText}
                                        onChange={e => setCommentText(e.target.value)}
                                        onKeyDown={e => {
                                            if (e.key === "Enter") {
                                                handleComment();
                                            }
                                        }}
                                        placeholder="Write a comment..."
                                        className="flex-1 min-w-0 bg-black border border-zinc-700 rounded-lg px-3 py-2 text-sm text-gray-300 outline-none focus:border-orange-400 duration-200"
                                    />

                                    <button
                                        onClick={handleComment}
                                        disabled={!commentText.trim()}
                                        className="bg-orange-400 hover:bg-orange-500 disabled:opacity-40 disabled:cursor-not-allowed text-black px-4 rounded-lg duration-200"
                                        title="Post comment"
                                    >
                                        <FaPaperPlane />
                                    </button>
                                </div>
                            ) : (
                                <p className="text-gray-500 text-sm mt-3">
                                    Log in to comment.
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommunityPost;
