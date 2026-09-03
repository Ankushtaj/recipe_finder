import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home.jsx";
import RecipeDetail from "./pages/RecipeDetail.jsx";
import Favourites from "./pages/Favourites.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import SearchHistory from "./pages/SearchHistory.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Community from "./pages/Community.jsx";
import CreatePost from "./components/CreatePost.jsx";


function App() {

  return (
    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/recipes/:id"
        element={<RecipeDetail />}
      />

      <Route
        element={<ProtectedRoute />}
      >

        <Route
          path="/favourites"
          element={<Favourites />}
        />

        <Route
          path="/search-history"
          element={<SearchHistory />}
        />

      </Route>

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/community"
        element={<Community />}
      />

      <Route
        path="/community/create"
        element={<CreatePost />}
      />

    </Routes>

  );

}

export default App;