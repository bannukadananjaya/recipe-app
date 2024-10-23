import express from 'express'
import User from '../models/User.js'

const router = express.Router()

router.get("/getuser/:id", async (req,res) => {
    try{
        const user = await User.findById(req.params.id)
        const { email,password } = user

    }catch(err){
        console.log(err.message);
    }
})

export default router;