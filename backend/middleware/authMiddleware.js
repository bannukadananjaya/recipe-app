// import jwt from 'jsonwebtoken';

// const authMiddleware = (req,res,next) => {
//     const token = req.header('Authorization')?.split(' ')[1];
//     console.log("toekn",token);
//     if(!token) {
//         return res.status(401).json({
//             success:false,
//             message:"Access denied. No token provided"    
//         })
//     }

//     try{
//         // console.log(token);
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
//         req.user = decoded;
//         console.log("u r here",req.user);
//         next();

//     }catch(error){
//         res.status(400).json({
//             success:false,
//             message:"Invalid Token"
//         })
//     }
// }
// export default authMiddleware;
// // module.exports = authMiddleware;

import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    
    // Check if Authorization header is present and starts with 'Bearer'
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: "Access denied. No token provided"    
        });
    }

    const token = authHeader.split(' ')[1];
    
    try {
        // Verify token with the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = decoded; // Attach decoded user data to the request
        console.log("User authenticated:", req.user);
        next(); // Proceed to the next middleware or route handler

    } catch (error) {
        console.error("Token verification failed:", error.message);
        return res.status(403).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

export default authMiddleware;
