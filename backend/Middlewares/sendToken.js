const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
// Create Token and saving in cookie
const sendToken = async(user,statusCode,res)=>{
    // const token = user.getJWTToken();
    
    const userr= await User.findOne({
        where:{
            email:user.email
        }
    });
   
    const token = jwt.sign({_id:userr._id}, 1 * 24 * 60 * 60,{  expiresIn : process.env.JWT_EXPIRE}
      
    )
    // options for Cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE *24*60*60*1000
        ),
        httpOnly:true,
        };

        res.status(statusCode).cookie("token",token,options).json({
            sucess: true,
            user,
            token,
        })
    }

    module.exports = sendToken;