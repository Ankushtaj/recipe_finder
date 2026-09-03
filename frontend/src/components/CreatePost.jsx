import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPost } from "../services/api.js";
import BackButton from "../components/BackButton";

const CreatePost = () => {
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const [caption, setCaption] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleImages = (e) => {
        const files = Array.from(
            e.target.files
        );

        if (files.length > 5) {
            setError(
                "You can upload a maximum of 5 images."
            );
            return;
        }

        setError("");
        setImages(files);
    };

    const handleVideos = (e) => {
        const files = Array.from(
            e.target.files
        );

        if (files.length > 2) {
            setError(
                "You can upload a maximum of 2 videos."
            );
            return;
        }

        setError("");
        setVideos(files);
    };

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            if (
                images.length === 0 &&
                videos.length === 0
            ) {
                setError(
                    "At least one image or video is required."
                );
                return;
            }

            try {

                setLoading(true);
                setError("");

                const formData =
                    new FormData();

                images.forEach(
                    file => {
                        formData.append(
                            "my_images",
                            file
                        );
                    }
                );

                videos.forEach(
                    file => {
                        formData.append(
                            "my_videos",
                            file
                        );
                    }
                );

                formData.append(
                    "caption",
                    caption
                );

                await addPost(
                    formData
                );

                navigate(
                    "/community"
                );

            }
            catch (error) {

                console.log(
                    error
                );

                setError(
                    error.message ||
                    "Could not create post."
                );

            }
            finally {

                setLoading(false);

            }
        };

    return (
        <div className="min-h-screen bg-[#0b0f14] text-white flex flex-col items-center justify-center gap-4 px-4 py-12">

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-2xl bg-zinc-900 border border-zinc-700 rounded-2xl p-6 shadow-xl"
            >

                <h1 className="text-3xl font-bold text-orange-300">
                    Share Your Creation
                </h1>

                <p className="text-gray-400 mt-2">
                    Share something you made with the QuickCuisine community.
                </p>

                <div className="mt-8">

                    <label className="block text-gray-200 font-medium mb-2">
                        Images
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={
                            handleImages
                        }
                        className="w-full text-gray-300"
                    />

                    <p className="text-gray-500 text-sm mt-2">
                        Maximum 5 images
                    </p>

                </div>

                <div className="mt-6">

                    <label className="block text-gray-200 font-medium mb-2">
                        Videos
                    </label>

                    <input
                        type="file"
                        accept="video/*"
                        multiple
                        onChange={
                            handleVideos
                        }
                        className="w-full text-gray-300"
                    />

                    <p className="text-gray-500 text-sm mt-2">
                        Maximum 2 videos
                    </p>

                </div>

                <div className="mt-6">

                    <label className="block text-gray-200 font-medium mb-2">
                        Caption
                    </label>

                    <textarea
                        value={caption}
                        onChange={
                            e =>
                                setCaption(
                                    e.target.value
                                )
                        }
                        placeholder="Tell the community about your creation..."
                        className="w-full min-h-[140px] bg-black border border-zinc-700 rounded-xl p-4 text-gray-300 outline-none focus:border-orange-400 resize-none"
                    />

                </div>

                {
                    error && (
                        <p className="text-red-400 mt-5">
                            {error}
                        </p>
                    )
                }

                <div className="flex gap-3 mt-8">

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/community"
                            )
                        }
                        className="bg-slate-700 hover:bg-slate-600 px-5 py-3 rounded-lg duration-200"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-orange-400 hover:bg-orange-500 text-black font-semibold px-6 py-3 rounded-lg duration-200 disabled:opacity-50"
                    >
                        {
                            loading
                                ? "Uploading..."
                                : "Share Creation"
                        }
                    </button>

                </div>

            </form>
            <BackButton />
        </div>
    );
};

export default CreatePost;