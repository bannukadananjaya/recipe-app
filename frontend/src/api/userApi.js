import api from './api';

export const login = async (data) => {
    try{
        console.log(api);
        console.log("hi",data);
        const res = await api.post('auth/login',data);

        if(res.data.token){
            localStorage.setItem('token', res.data.token);
        }

        // Save the token to localStorage or sessionStorage
        // localStorage.setItem("token", res.data.token);
        // localStorage.setItem("user", JSON.stringify(res.data.user));
        // if(response){
        //     localStorage.setItem('userId',JSON.stringify(response.data._id));
        // }
        
        // console.log("in auth",res.data);
        return res.data;
    }catch(err){
        console.log(err);
    }
}

// export const register = async (data) => {
//     api.post('auth/register',data).then((res)=>{
//         return res.data;
//     }).catch((err)=>{
//         console.log(err)
//     })
// }
export const register = async (data) => {
    try {
        
        // console.log("come here")
        console.log(data);
        const res = await api.post('auth/register', data); // Await the response
        return res.status; // Return the data directly
    } catch (err) {
        console.log(err);
        throw err; // Rethrow the error to be handled in `handleRegister`
    }
};

export const addFavourite = async (meal) => {
    try{
        // const userId = localStorage.getItem('userId');
        // const user = JSON.parse(localStorage.getItem("userId"));
        // console.log("user",user);
        // const userId = user._id;  // Get userId from localStorage

        // const token = localStorage.getItem("token"); // Retrieve the token
        console.log("addtoDB",meal);
        const res = await api.post('recipes/favourites', meal);

        if(res){
            return res.data;
        }
    }catch(err){
        console.log("Failed to add favourite",err)
    }
}

// export const getFavourites = async (id) => {
//     try{

//         const res = await api.get('recipes/user-favourites',id);
//         // console.log("getting favourites")
//         if(res){
//             // console.log(res.data);
//             return res.data.userFavourites;
//         }
//     }catch(err){
//         console.log("error",err);
//     }

// }
export const getFavourites = async () => {
    try {
      // Make a GET request to fetch the user's favorites from the backend
      const response = await api.get('/recipes/user-favourites');
      
      if (response.data && response.data.success) {
        console.log(response.data);
        return response.data.userFavourites.map(fav => fav.id); // Extracting meal IDs from response
      } else {
        return [];
      }
    } catch (err) {
      console.error('Error fetching favourites from DB:', err);
      return [];
    }
  };

export const removeFavourite = async (mealId) => {
try {
    // Make a DELETE request to remove the mealId from the user's favorites
    console.log("deletfromDB");
    const response = await api.delete(`/recipes/user-favourites/${mealId.id}`);

    if (response.data && response.data.success) {
        console.log(`Meal with ID ${mealId.id} has been removed from favourites`);
        return true; // Return true if removal was successful
    } else {
        console.error('Failed to remove favourite from DB');
        return false;
    }
} catch (err) {
    console.error('Error removing favourite from DB:', err);
    return false;
}
};