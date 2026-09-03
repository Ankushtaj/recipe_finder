const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api`;

async function request(endpoint, options = {}) {
    const response = await fetch(
        `${API_BASE_URL}${endpoint}`,
        {
            ...options,
            credentials: "include",
            headers: {
                ...(options.body instanceof FormData
                    ? {}
                    : {
                        "Content-Type": "application/json",
                    }),
                ...(options.headers || {}),
            },
        }
    );

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(
            data.message ||
            `HTTP ${response.status}`
        );
    }

    return data;
}

export function registerUser(data) {
    return request(
        "/auth/register",
        {
            method: "POST",
            body: JSON.stringify(data),
        }
    );
}

export function loginUser(data) {
    return request(
        "/auth/login",
        {
            method: "POST",
            body: JSON.stringify(data),
        }
    );
}

export function logoutUser() {
    return request(
        "/auth/logout",
        {
            method: "POST",
        }
    );
}

export function getCurrentUser() {
    return request(
        "/auth/me"
    );
}

export function getRecipes({
    q = "",
    category = "",
    area = "",
    ingredient = "",
    tag = "",
    page = 1,
    limit = 20,
    fuzzy = true,
} = {}) {
    const params =
        new URLSearchParams();

    if (q) {
        params.set(
            "q",
            q
        );
    }

    if (category) {
        params.set(
            "category",
            category
        );
    }

    if (area) {
        params.set(
            "area",
            area
        );
    }

    if (ingredient) {
        params.set(
            "ingredient",
            ingredient
        );
    }

    if (tag) {
        params.set(
            "tag",
            tag
        );
    }

    params.set(
        "page",
        page
    );

    params.set(
        "limit",
        limit
    );

    params.set(
        "fuzzy",
        fuzzy
    );

    return request(
        `/recipes?${params.toString()}`
    );
}

export function getRecipeById(id) {
    return request(
        `/recipes/${id}`
    );
}

export function getHomeRecommendations() {
    return request(
        "/recipes/recommendations/home"
    );
}

export function getRecipeRecommendations(id) {
    return request(
        `/recipes/recommendations/${id}`
    );
}

export function getFavourites() {
    return request(
        "/favourites"
    );
}

export function addFavourite(id) {
    return request(
        `/favourites/${id}`,
        {
            method: "POST",
        }
    );
}

export function removeFavourite(id) {
    return request(
        `/favourites/${id}`,
        {
            method: "DELETE",
        }
    );
}

export function getSearchHistory() {
    return request(
        "/search-history"
    );
}

export function addSearchHistory(query) {
    return request(
        "/search-history",
        {
            method: "POST",
            body: JSON.stringify({
                query,
            }),
        }
    );
}

export function clearSearchHistory() {
    return request(
        "/search-history",
        {
            method: "DELETE",
        }
    );
}

export function getPosts() {
    return request(
        "/posts"
    );
}

export function addPost(formData) {
    return request(
        "/posts",
        {
            method: "POST",
            body: formData,
            headers: {},
        }
    );
}

export function removePost(id) {
    return request(
        `/posts/${id}`,
        {
            method: "DELETE",
        }
    );
}

export function toggleLike(id) {
    return request(
        `/posts/${id}/like`,
        {
            method: "POST",
        }
    );
}

export function addComment(id, text) {
    return request(
        `/posts/${id}/comments`,
        {
            method: "POST",
            body: JSON.stringify({
                text
            }),
        }
    );
}
