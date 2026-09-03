import { useEffect, useState } from "react";
import { getSearchHistory, clearSearchHistory } from "../services/api";
import BackButton from "../components/BackButton";


const SearchHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    async function loadHistory() {
        try {
            const data = await getSearchHistory();
            setHistory(data.history);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    async function handleClear() {
        try {
            await clearSearchHistory();
            setHistory([]);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadHistory();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0b0f14] flex items-center justify-center text-orange-300">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0b0f14] px-6 py-10">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-orange-300">
                        Search History
                    </h1>
                    {
                        history.length > 0 && (
                            <button
                                onClick={handleClear}
                                className="text-red-400 hover:text-red-300"
                            >
                                Clear
                            </button>
                        )
                    }
                </div>
                {
                    history.length === 0 ? (
                        <p className="text-gray-400 mt-10">
                            No search history yet.
                        </p>
                    ) : (
                        <div className="mt-8 space-y-3">
                            {
                                history.map(
                                    item => (
                                        <div
                                            key={item._id}
                                            className="bg-zinc-900 border border-zinc-700 rounded-xl px-5 py-4 text-gray-300"
                                        >
                                            {item.query}
                                        </div>
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

export default SearchHistory;