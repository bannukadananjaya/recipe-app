import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
        min:3,
        max:50
    },
    lastName:{
        type:String,
        require:true,
        min:3,
        max:50
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    phoneNumber:{
        type:Number,
        require:true,
    },
    password:{
        type:String,
        require:true,
        min:6
    }
},{
    timestamps:true
});

// export default User;

export default mongoose.model("User",UserSchema);