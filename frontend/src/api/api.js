import axios from "axios";
import { getToken } from "./Auth";

const api = axios.create({
    // baseURL:'http://localhost:3000'
    //  baseURL:'http://184.72.198.7'
    baseURL:'https://f12e-112-134-224-44.ngrok-free.app'
})
// baseURL:`${apiUrl}

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