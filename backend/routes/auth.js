import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// router.post("/register", async (req,res) => {
//     try{
//         //Salting and Hashing the password
//         const salt = await bcrypt.genSalt(10);
//         const hashPassword = await bcrypt.hash(req.body.password, salt);
//         console.log(req.body);
//         //create a new user
//         const newuser = await new User({
//             firstName:req.body.firstName,
//             lastName:req.body.lastName,
//             email:req.body.email,
//             phoneNumber:req.body.phoneNumber,
//             password:hashPassword,
//         })

//         const user =await newuser.save();

//         res.status(200).json(user);

//     }catch(err){
//         console.log(err.message);
//     }
// })

router.post("/register", async (req, res) => {
    try {
        // Check if user already exists by email
        console.log(req.body);
        const { firstName, secondName, email, phoneNumber, password } = req.body;
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Salting and hashing the password

        // console.log(req.body.data);
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        
        // Creating a new user
        const newUser = new User({
            firstName: firstName,
            lastName: secondName,
            email: email,
            phoneNumber: phoneNumber,
            password: hashPassword,
        });

        // Save the user to the database
        const savedUser = await newUser.save();
        
        // Send back the saved user as a response (usually without password)
        res.status(201).json({ 
            id: savedUser._id,
            firstName: savedUser.firstName,
            lastName: savedUser.lastName,
            email: savedUser.email,
            phoneNumber: savedUser.phoneNumber,
        });
        
    } catch (err) {
        console.error(err.message);
        console.log("error");
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

router.post("/login",async (req,res) => {
    try{
        console.log(req.body);
        const user = await User.findOne({email:req.body.email});
    
        if(!user){
            console.log("User not found")
            return res.status(404).json({message:"User not found"});
        }

        const validPass = bcrypt.compare(req.body.password, user.password);
        
        if(!validPass){
            console.log("Wrnog password")
            return res.status(400).json({message:"Wrong Password"});
        }

        const data ={
                id:user._id
        }


        const token = jwt.sign(data,process.env.JWT_SECRET,{expiresIn:60*60})
        
        res.status(200).json({
            success:true,
            token
        });
        
    }catch(err){
        console.log("error",err.message);
        res.status(500).json({
            success:false,
            message:"Server error"
        });
    }

})

export default router;