import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import ItemDisplay from "../components/ItemDisplay";

const Meal = () => {

  const {mealId} = useParams();
  const [data,setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    const fetchItem = async()=>{
      try{
        console.log(mealId);
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
        );

        if(res.ok){
          const mealData = await res.json();
          setData(mealData.meals[0]); // Access the first meal in the response
          setLoading(false);
         
        }
      }catch(err){
        console.log("item",err)
      }
    } 
    fetchItem();    
  },[mealId]);

  console.log(data);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-zinc-100">
      <Header/>
      <Navbar/>
      <ItemDisplay meal={data}/>
    </div>

  )
}

export default Meal