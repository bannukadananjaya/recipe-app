import { Link } from "react-router-dom"
import { useEffect, useState, useContext } from "react";
import { RecipeContext } from "../context/RecipeContext";
import {addFavourite, removeFavourite} from '../api/userApi'

const Item = (props) => {

  const {favItems, addToFav, removeFromFav} = useContext(RecipeContext);
  const [isFavourite,setIsFavourite] = useState(false);

  useEffect(() => {
    // Check if the item is in favorites from the context
    setIsFavourite(favItems[props.id]);
  }, [favItems, props.id]);


  const handleFavourite = async() => {
    if(isFavourite){
      await removeFavourite(props);
      console.log("remove");
      removeFromFav(props.id);
      
    }else{
      await addFavourite(props);
      addToFav(props.id);
      console.log("add",props.id);
    }
    setIsFavourite(!isFavourite);
  }
  // console.log(props);
  console.log(isFavourite);
  // console.log(props.id);
  return (
    <div className="flex flex-col p-4 border rounded-lg shadow-md">
        <div className="overflow-hidden m-2 rounded-2xl ">
         <Link to={`/recipe/${props.id}`}><img src={props.img} className="rounded-2xl hover:scale-110 transition duration-500 " alt="" /></Link>
        </div>
        <p className="mt-2 text-sm text-slate-500 font-light">{props.name} <i className={`fa-solid fa-heart px-1 text-xl cursor-pointer ${isFavourite ? 'text-red-500' : 'text-slate-400'} `} onClick={handleFavourite}></i></p>
        <h3 className="mt-2 text-xl">{props.name}</h3>
        {/* <i onClick={()=>removeFavourite(props.id)}>{props.delete}</i> */}
    </div>
  )
}

export default Item