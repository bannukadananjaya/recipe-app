import { useNavigate } from "react-router-dom";

const ItemDisplay = (props) => {

  const navigate = useNavigate(); 
  const {meal} = props;
  
  // Go back to the previous page
  const goBack = () => {
    navigate(-1); 
  };
  return (
    <div className=" flex flex-col w-[70%] my-10 mx-auto">
      <div className="">
        <i className="fa-solid fa-arrow-left text-xl cursor-pointer" onClick={goBack}></i>
      </div>
      <div className="flex ">
      <div className="flex-1 flex justify-center mt-5 gap-3 ">
        {/* left */}
          <img src={meal.strMealThumb} className="w-[500px] h-[500px] rounded-2xl " alt="" />
      </div>

      <div className="flex flex flex-col ml-12 my-5 gap-2 ">
        {/* right    */}
        <h1 className="text-2xl font-semibold">{meal.strMeal}</h1>
        <div className="flex text-xs  mt-2 ">
          <p className="pl-2 text-slate-600 text-xs">Category: {meal.strCategory}</p>
        </div>
        <div className="flex flex-col py-5 gap-5 text-xl font-normal">
          <h2 className="text-slate-400">Ingredients</h2>
          <ul className="pl-4">
            <li>{meal.strIngredient1}</li>
            <li>{meal.strIngredient2}</li>
            <li>{meal.strIngredient3}</li>
            <li>{meal.strIngredient4}</li>
            <li>{meal.strIngredient5}</li>
            <li>{meal.strIngredient6}</li>
            <li>{meal.strIngredient7}</li>
            <li>{meal.strIngredient8}</li>
            <li>{meal.strIngredient9}</li>
          </ul>
          
        </div>
        
       
        <p className="font-semibold">Tags :<span className="text-s font-normal">{meal.strTags}</span></p>
      </div>
      </div>
      <div className="flex flex-col mt-10">
          <h2 className="text-slate-400 text-xl font-normal">Instructions</h2>
          <p className="text-slate-500" dangerouslySetInnerHTML={{ __html: meal.strInstructions.replace(/\n/g, '<br />') }} />
      </div>
      
    </div>
  )
}

export default ItemDisplay