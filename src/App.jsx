
import {Routes, Route} from 'react-router-dom'
import './App.css'
import Home from "./pages/Home.jsx";
import RecipeDetail from './pages/RecipeDetail.jsx';

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
    </Routes>
  )
}

export default App
