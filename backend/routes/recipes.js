import mongoose from "mongoose";
import express from 'express';
import Favourites from '../models/Favourites.js';
import User from '../models/User.js';
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.post('/favourites', authMiddleware, async (req,res) => {
    try{
        console.log(req.body);
        const {id, name, img} = req.body;
        const userId = req.user.id;
        console.log(userId);
       
        const favourites = new Favourites({
            id:id,
            name:name,
            img:img,
            user:userId
        })
        
        const savedFavourites = await favourites.save();
        console.log("saved");
        res.status(201).json({
            success:true,
           savedFavourites
        });
            
    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:'Server error'})
    }
})

router.get('/user-favourites', authMiddleware, async (req,res) => {
    try{
        const userId = req.user.id;
        
        const userFavourites = await Favourites.find( {user:userId} );

        res.status(200).json({
            success: true,
            userFavourites,
        });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve favourites',
        error: err.message,
      });
    }
})

router.delete('/user-favourites/:mealId', authMiddleware, async (req, res) => {
    try {
        console.log("favMeal",req.params);
        const { mealId } = req.params;
        const userId = req.user.id; // User ID from the token

        // Find and delete the favourite meal for the user
        const deletedFavourite = await Favourites.findOneAndDelete({
            id: mealId,  // Match the meal ID
            user: userId // Ensure it's for the current user
        });

        if (!deletedFavourite) {
            return res.status(404).json({ success: false, message: 'Meal not found in favourites' });
        }
        console.log("Done");
        res.json({ success: true, message: 'Favourite removed successfully', deletedFavourite });
    } catch (err) {
        console.error('Error removing favourite:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});



export default router;