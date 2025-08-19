const jwt= require('jsonwebtoken');
const userModel = require('../models/user');
require("dotenv").config();


const checkAuth=async(req,res,next)=>{
    const token = req.cookies.token
    //console.log(token)
    if (!token)return res.status(401).json({message : "Unauthorized"});
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded)

        //fetch full user from db 
        const user = await userModel.findById(decoded.ID);
        if(!user)return res.status(401).json({message: "user not found"});
        req.user=user; //full user now avaliable including email 
        next();
    } catch(error){
        console.log(error)
        res.status(401).json({message: "invalid token"})
    }
}
module.exports=checkAuth 