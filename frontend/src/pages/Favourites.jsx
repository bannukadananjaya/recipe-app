
import { useContext } from "react";
import Header from "../components/Header";
import { RecipeContext } from "../context/RecipeContext";
import Item from "../components/Item";
import { Link } from "react-router-dom";

const Favourites = () => {
  const { favItems, recipes, isLoggedIn } = useContext(RecipeContext); // Assuming `recipes` holds all the meals
  console.log("Favourite items:", favItems);

  // Get favorite recipes by filtering recipes based on favItems
  const favouriteRecipes = recipes.flatMap((category) => 
    category.meals.filter((meal) => favItems[meal.idMeal])
  );

  return (
    <div className="min-h-screen flex flex-col bg-zinc-100">
      <Header />
      {/* <Navbar /> */}
      <div className="grid grid-cols-4 gap-4 mt-2">
        {favouriteRecipes.length > 0 ? (
          favouriteRecipes.map((item, i) => (
            <Item
              key={i}
              id={item.idMeal}
              name={item.strMeal}
              img={item.strMealThumb}
              category={item.category}
              delete={<i className="fa-solid fa-trash"></i>}
            />
          ))
        ) : (
            <div className="col-span-4 flex flex-col justify-center items-center">
          <p className="text-xl text-slate-500 font-bold mt-4 gap-4 pt-16">
            You don't have any favorite recipes yet.
          </p>
          {!isLoggedIn && (
            <p className="text-xl text-slate-500 font-bold m-4 gap-4 pb-16">
              <span className="text-white cursor-pointer rounded-xl mx-2 bg-slate-400 py-2 px-4 hover:text-red-400 hover:bg-white">
                <Link to="/sign-in">Login</Link>
              </span>{" "}
              to start adding your favorites!
            </p>
          )}
        </div>
        )}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Favourites;
