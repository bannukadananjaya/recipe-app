import { useState } from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {

    const [menu,setMenu] = useState("Pork");

  return (
    <div >
        <ul className='flex w-[80vh] justify-around mx-auto mt-5'>
            <li onClick={()=>setMenu("Pork")} ><Link to="/recipe/pork">{menu === "Pork"? <p className='rounded-full py-4 px-12 bg-rose-400 text-white'>Pork</p>:<p className='rounded-full py-4 px-12 bg-zinc-100 text-rose-400 border border-solid border-rose-400'>Pork</p>}</Link></li>
            <li onClick={()=>setMenu("Beef")}><Link to="/recipe/beef">{menu === "Beef"?  <p className='rounded-full py-4 px-12 bg-rose-400 text-white'>Beef</p>:<p className='rounded-full py-4 px-12 bg-zinc-100 text-rose-400 border border-solid border-rose-400'>Beef</p>}</Link></li>
            <li onClick={()=>setMenu("Chicken")}><Link to="/recipe/chicken">{menu === "Chicken"? <p className='rounded-full py-4 px-12 bg-rose-400 text-white'>Chicken</p>:<p className='rounded-full py-4 px-12 bg-zinc-100 text-rose-400 border border-solid border-rose-400'>Chicken</p>}</Link></li>
            <li onClick={()=>setMenu("Lamb")}><Link to="/recipe/lamb">{menu === "Lamb"? <p className='rounded-full py-4 px-12 bg-rose-400 text-white'>Lamb</p>:<p className='rounded-full py-4 px-12 bg-zinc-100 text-rose-400 border border-solid border-rose-400'>Lamb</p>}</Link></li>
            <li onClick={()=>setMenu("Pasta")}><Link to="/recipe/pasta">{menu === "Pasta"? <p className='rounded-full py-4 px-12 bg-rose-400 text-white'>Pasta</p>:<p className='rounded-full py-4 px-12 bg-zinc-100 text-rose-400 border border-solid border-rose-400'>Pasta</p>}</Link></li>
        </ul>
    </div>
  )
}

export default Navbar