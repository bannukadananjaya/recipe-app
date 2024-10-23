import { useContext } from "react";
import { RecipeContext } from "../context/RecipeContext";
import { Link,useLocation } from "react-router-dom"
import { logout } from "../api/userApi";
import logo from '../assets/logo.png'

const Header = () => {
  const {isLoggedIn} = useContext(RecipeContext);
  console.log("log",isLoggedIn);
    const location = useLocation(); 

    const handleLogout = () => {
      logout();
      localStorage.clear();
      window.location.href = '/';  

    }
    const isHomePage = ["/", "/recipe/pork", "/recipe/beef", "/recipe/chicken", "/recipe/lamb", "/recipe/pasta"].includes(location.pathname);

  return (
    <div className="w-[100%] mt-4 flex justify-around items-center bg-white">
        <Link to="/"><img src={logo} alt="img" /></Link>
        {/* <div className="flex text-2xl text-black gap-10">
            <a href='/' className='cursor-pointer' onClick={()=>setNav("home")}>{nav==="home"?<b>Home</b>:"Home"}</a>  
            <li onClick={()=>setNav("favourite")}>{navigate('/favourites') && nav==="favourite"?<b>Favourite</b>:"Favourite"}</li>  
        </div> */}
        <ul className="flex text-2xl text-black gap-10">
          <li>
            <Link to="/">  {isHomePage ? <b>Home</b> : "Home"}</Link>
          </li>
          <li>
            <Link to="/favourites">  {location.pathname === "/favourites" ? <b>Favourite</b> : "Favourite"}</Link>
          </li>
        </ul>
        <i 
            className={`fa-solid ${isLoggedIn ? 'fa-arrow-right-from-bracket' : 'fa-arrow-right-to-bracket'} text-2xl cursor-pointer hover:text-red-500`} 
            onClick={isLoggedIn ? handleLogout : () => window.location.href = '/sign-in'}
        ></i>
    </div>
  )
}

export default Header