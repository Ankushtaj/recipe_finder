import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import CommunityPost from "../components/CommunityPost";
import { getPosts } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import BackButton from "../components/BackButton.jsx";

const Community = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { user } = useAuth();

    useEffect(() => {
        const loadPosts = async () => {
            try {
                setLoading(true);

                setError("");

                const data = await getPosts();

                setPosts(data);
            }
            catch (error) {
                console.log(error);
                setError("Could not load community posts.");
            }
            finally {
                setLoading(false);
            }
        };
        loadPosts();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0b0f14] flex justify-center items-center">
                <Loading />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0b0f14] text-white px-4 py-24">

            <div className="max-w-6xl mx-auto">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-orange-300">
                            QuickCuisine Community
                        </h1>

                        <p className="text-gray-400 mt-2">
                            Discover creations shared by the community.
                        </p>
                    </div>

                    {
                        user && (
                            <Link
                                to="/community/create"
                                className="bg-orange-400 hover:bg-orange-500 text-black font-semibold px-5 py-3 rounded-lg duration-200 text-center"
                            >
                                Share Your Creation
                            </Link>
                        )
                    }

                </div>

                {
                    error && (
                        <p className="text-red-400 text-center mt-10">
                            {error}
                        </p>
                    )
                }

                {
                    !error &&
                    posts.length === 0 && (
                        <div className="text-center text-gray-400 mt-20">
                            No community posts yet.
                            {
                                user && (
                                    <div className="mt-3">
                                        Be the first to share your creation!
                                    </div>
                                )
                            }
                        </div>
                    )
                }

                {
                    posts.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 items-start">
                            {
                                posts.map(
                                    post => (
                                        <CommunityPost
                                            key={post._id}
                                            post={post}
                                        />
                                    )
                                )
                            }
                        </div>

                    )
                }

            </div>

            <div className="flex justify-center mt-12 pb-4">
                <BackButton />
            </div>

        </div>
    );
};

export default Community;