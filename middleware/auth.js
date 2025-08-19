// const jwt= require('jsonwebtoken');
// const userModel = require('../models/user');
// require("dotenv").config();


// const checkAuth=async(req,res,next)=>{
//     const token = req.cookies.token
//     //console.log(token)
//     if (!token)return res.status(401).json({message : "Unauthorized"});
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         // console.log(decoded)

//         //fetch full user from db 
//         const user = await userModel.findById(decoded.ID);
//         if(!user)return res.status(401).json({message: "user not found"});
//         req.user=user; //full user now avaliable including email 
//         next();
//     } catch(error){
//         console.log(error)
//         res.status(401).json({message: "invalid token"})
//     }
// }
// module.exports=checkAuth 

const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
require("dotenv").config();

const checkAuth = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    // Instead of blocking, just proceed (optional: clear cookie)
    return next(); // Let the route handle missing token
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.ID);
    if (!user) {
      return next(); // User not found, but don't block
    }
    req.user = user; // full user now available
    next();
  } catch (error) {
    console.log("Invalid token:", error);
    next(); // Don't block, just proceed
  }
};

module.exports = checkAuth;
