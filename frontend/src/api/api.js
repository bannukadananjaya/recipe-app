import axios from "axios";
import { getToken } from "./Auth";
const apiUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL:`${apiUrl}`
})

api.interceptors.request.use((config) => {
    const token = getToken();
    
    if(token){
        config.headers.authorization = `Bearer ${token}`;
        // console.log(token);
    }
    return config;
},(err)=>{
    return Promise.reject(err);
    
}
);

export default api;