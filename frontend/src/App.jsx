import { BrowserRouter as Router , Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Meal from './pages/Meal'
import Favourites from "./pages/Favourites";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home category="Pork"/>}/>
          <Route path="/favourites" element={<Favourites/>}/>
          <Route path="/sign-in" element={<Login/>}/>
          <Route path="/recipe/pork" element={<Home category="Pork"/>}/>
          <Route path="/recipe/beef" element={<Home category="Beef"/>}/>
          <Route path="/recipe/chicken" element={<Home category="Chicken"/>}/>
          <Route path="/recipe/lamb" element={<Home category="Lamb"/>}/>
          <Route path="/recipe/pasta" element={<Home category="Pasta"/>}/>
          <Route path="/recipe/:mealId" element={<Meal/>}/>
          <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App;