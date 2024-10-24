import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import recipes from './routes/recipes.js';
import dotenv from 'dotenv';
// import  path  from 'path';

dotenv.config();
const app = express();

// Serve static files from the dist folder
// app.use(express.static(path.join(__dirname, 'dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
// });

const port = process.env.PORT || 4000;

// middlewares]
connectDB();
app.use(express.json());
app.use(cors(
    {
        origin: ["https://recipe-app-api-iota.vercel.app/","http://localhost:3000"],
        methods:["POST","GET","DELETE","PUT"],
        credentials: true
    }
));


//API routes
app.use("/auth",authRoutes);
app.use("/users",userRoutes);
app.use("/recipes",recipes);

app.get('/',(req,res)=> {
    res.json("Welcome to recipe app");
})


app.listen(port,()=>{
    try{
        console.log("Server is running");
    }catch(err){
        console.log("Error occured",err);
    }
})

export default app;
