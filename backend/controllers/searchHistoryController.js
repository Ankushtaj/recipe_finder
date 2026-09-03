import SearchHistory from "../models/SearchHistory.js";

export async function addSearchHistory(req, res) {
    const query = req.body.query?.trim();
    if (!query) {
        return res.status(400).json({
            message: "Search query is required",
        });
    }
    await SearchHistory.findOneAndUpdate(
        {
            userId: req.user._id,
            query: query.toLowerCase(),
        },
        {
            $set: {
                query: query.toLowerCase(),
                createdAt: new Date(),
            },
        },
        {
            upsert: true,
            new: true,
        }
    );
    res.status(201).json({
        message: "Search saved",
    });
}

export async function getSearchHistory(req, res) {
    const history =
        await SearchHistory.find({
            userId: req.user._id,
        })
            .sort({
                createdAt: -1,
            })
            .limit(20)
            .lean();

    res.json({
        history,
    });
}

export async function clearSearchHistory(req, res) {
    await SearchHistory.deleteMany({
        userId: req.user._id,
    });
    res.json({
        message: "Search history cleared",
    });
}