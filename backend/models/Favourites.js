import mongoose from "mongoose";

const FavouriteRecipeSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

},{
    timestamps:true
});
// export default FavouriteRecipes;

export default mongoose.model("Favourites",FavouriteRecipeSchema)