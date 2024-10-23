import { createContext, useEffect, useState } from "react"; 
import { getFavourites } from "../api/userApi";

export const RecipeContext = createContext(null);

const getDefaultFav = (recipes) => {
    let fav = {};
   
    recipes.forEach((recipeCategory) => {
        recipeCategory.meals?.forEach((meal) => {  // Handle undefined meals
          fav[meal.idMeal] = false; // Initialize each meal's favorite status as false
        });
    });
    return fav;
}

const RecipeContextProvider = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false); 

    useEffect(() => {
        const handleStorageChange = () => {
            const token = localStorage.getItem("token");
            if(token){
                setIsLoggedIn(true);
            }
        };
        handleStorageChange();
    }, []);

    const categories = ["Beef", "Chicken", "Lamb", "Pork", "Pasta"];
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [favItems, setFavItems] = useState({});

    const addToFav = (mealId) => {
        if (isLoggedIn) { // Ensure user is logged in
            setFavItems((prevFavItems) => ({
                ...prevFavItems,
                [mealId]: true
            }));
        } else {
            console.log("User not logged in, cannot add to favorites");
        }
    }

    const removeFromFav = (mealId) => {
        if (isLoggedIn) {
            setFavItems((prevFavItems) => ({
                ...prevFavItems,
                [mealId]: false
            }));
        } else {
            console.log("User not logged in, cannot remove from favorites");
        }
    }

    useEffect(() => {
        const fetchRecipes = async () => {
            setLoading(true);
            const allRecipes = [];

            for (const category of categories) {
                try {
                    const response = await fetch(
                        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
                    );
                    const data = await response.json();
                    if (data?.meals) {  // Check if meals exist
                        allRecipes.push({
                            category,
                            meals: data.meals
                        });
                    }
                } catch (err) {
                    console.log("Error fetching data for", category, err.message);
                }
            }

            setRecipes(allRecipes);

            // Fetch favorites from the database for the current user
            if (isLoggedIn) {
                const userFavourites = await getFavourites();
                const favStatus = getDefaultFav(allRecipes);
                // Mark favorites from the database as true
                userFavourites.forEach((favMealId) => {
                    favStatus[favMealId] = true;
                });
                setFavItems(favStatus);
            }

            setLoading(false);
        };
        
        fetchRecipes();
    }, [isLoggedIn]);  // Re-run effect if login status changes
    
    const context = {
        recipes,
        loading,
        favItems,
        addToFav,
        removeFromFav,
        isLoggedIn,
        setIsLoggedIn
    };
    console.log("fav",favItems);
    return (
        <RecipeContext.Provider value={context}>
            {props.children}
        </RecipeContext.Provider>
    );
}

export default RecipeContextProvider;
