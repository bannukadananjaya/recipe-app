import { useState,useContext } from "react"
import { RecipeContext } from "../context/RecipeContext"
import { useNavigate,Link } from "react-router-dom"
import {login} from '../api/userApi'
import { register } from "../api/userApi"
import logo from '../assets/logo.png'

const Login = () => {

    const { setIsLoggedIn } = useContext(RecipeContext);
    const navigate = useNavigate();
    const [state,setState] = useState("Login");
    const [data,setData] = useState({email:"", password:""}) 
    const [error,setError] = useState("")


    const handleInput = (e) => {
        // e.preventDefault();
        let newInput = {[e.target.name]:e.target.value};
        setData({
            ...data,
            ...newInput
        });
    }
    
    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            console.log(data.email);
            const res = await login(data);
            console.log(res);
            if(res.success){
                setIsLoggedIn(true);
                navigate("/");

            }else{
                setError("Invalid Email or Password")
            }
        }catch(err){
            console.log(err)
            setError("Login Failed. Please try again later.")
        }
    
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            console.log(data.password);
            if (data.password !== data.confirmPassword) {
                setError("Passwords do not match");
            }else{
                const res = await register(data); // Wait for the register function to complete
                console.log(res);

                if(res){
                    console.log("success");
                    // navigate('/sign-in');
                    setState("Login");
                    setError("");
                }
            }
            
            
           
        } catch (err) {
            console.log(err);
            setError("Register Failed");
        }
    };
   
  return (
    <div className="min-h-screen flex p-2 bg-zinc-100">
        <div className="flex flex-col m-auto bg-white p-6 rounded-xl">
            <Link to="/"><img src={logo} className="w-[150px] h-auto m-auto" alt=""  /></Link>
            <h1 className="text-5xl font-semibold drop-shadow-lg p-4">{state}</h1>
            <div className="flex flex-col p-4 gap-4">
                {state==="Login"?
                <>
                    <div className="form-raw-1">
                        <label className="form-label" htmlFor="email">Email Address</label>
                        <input 
                            className="form-input" 
                            type="text" 
                            name="email" 
                            // placeholder="Enter user name" 
                            // value={data.email}
                            onChange={(e)=>{handleInput(e);}}
                        />
                    </div>

                    <div className="form-raw-2">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input 
                            className="form-input" 
                            type="password" 
                            name="password" 
                            // placeholder="Enter password" 
                            // value={data.password}
                            onChange={(e)=>{handleInput(e);}}
                        />
                    </div>
                </>
                :
                <>
                    <div className="flex gap-4">
                        <div className="form-raw-1">
                            <label className="form-label" htmlFor="firstName">First Name</label>
                            <input 
                                className="form-input" 
                                type="text" 
                                name="firstName" 
                                // placeholder="Enter user name" 
                                // value={data.firstName}
                                onChange={(e)=>{handleInput(e);}}
                            />
                        </div>
                        <div className="form-raw-1">
                            <label className="form-label" htmlFor="secondName">Second Name</label>
                            <input 
                                className="form-input" 
                                type="text" 
                                name="secondName" 
                                // placeholder="Enter user name" 
                                // value={data.secondName}
                                onChange={(e)=>{handleInput(e);}}
                            />

                        </div>
                    </div>    

                    <div className="flex gap-4">
                        <div className="form-raw-2">
                            <label className="form-label" htmlFor="email">Email</label>
                            <input 
                                className="form-input" 
                                type="text" 
                                name="email" 
                                // placeholder="Enter user name" 
                                // value={data.email}
                                onChange={(e)=>{handleInput(e);}}
                            />
                        </div>
                        <div className="form-raw-2">
                            <label className="form-label" htmlFor="phoneNumber">Phone Number</label>
                            <input 
                                className="form-input" 
                                type="text" 
                                name="phoneNumber" 
                                // placeholder="Enter user name" 
                                // value={data.phoneNumber}
                                onChange={(e)=>{handleInput(e);}}
                            />

                        </div>
                    </div>    

                    <div className="flex gap-4">
                        <div className="form-raw-3">
                            <label className="form-label" htmlFor="password">Password</label>
                            <input 
                                className="form-input" 
                                type="text" 
                                name="password" 
                                // placeholder="Enter user name" 
                                // value={data.password}
                                onChange={(e)=>{handleInput(e);}}
                            />
                        </div>
                        <div className="form-raw-3">
                            <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                            <input 
                                className="form-input" 
                                type="text" 
                                name="confirmPassword" 
                                // placeholder="Enter user name" 
                                // value={data.confirmPassword}
                                onChange={(e)=>{handleInput(e);}}
                            />

                        </div>
                    </div>    
                </>}

                    {error && <p className="text-red-500">{error}</p>}
                
                {state==="Login"? 
                <>
                    <input className="mt-4 btn" type="submit" value="Sign In" onClick={handleLogin}/> 
                    
                    <p className="mt-16">Don't have an account? <span className="text-red-400 cursor-pointer" onClick={()=>{setState("Register")}}>Create an account</span></p>        
                </>
                :
                <>
                    <input className="mt-4 btn" type="submit" value="Register" onClick={handleRegister}/>
                    
                    <p className="mt-16">Allready have an account? <span className="text-red-400 cursor-pointer" onClick={()=>{setState("Login")}}>Login</span></p>
                </>}
               
                {/* handle error from response */}
                         

            </div>
            
        </div>
    </div>
  )
}

export default Login