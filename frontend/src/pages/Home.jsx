import { useContext } from "react"
import Header from "../components/Header"
import { RecipeContext } from "../context/RecipeContext"
import Item from "../components/Item"
import Navbar from "../components/Navbar"

const Home = (props) => {

    const {recipes,loading} = useContext(RecipeContext);
    
    if(loading){
        return null;
    }else{
  return (
    <div className="min-h-screen flex flex-col bg-zinc-100">
        <Header/>
        <Navbar/>
        <div className="m-4">
            {recipes.map((item,i)=>{
                if (props.category === item.category) {
                    return (
                      <div key={i} className="grid grid-cols-4 gap-4 mt-2 ">
                        {item.meals.map((meal, index) => (
                          <Item key={index} id={meal.idMeal} name={meal.strMeal} img={meal.strMealThumb} category={item.category}/>
                        ))}
                      </div>
                    );
                  }
                  return null;
            })}
        </div>
    
    </div>
  )
}

}
export default Home