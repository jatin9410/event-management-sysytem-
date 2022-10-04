const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const isAuthenticatedUser =(async (req, res, next) => {
    
    const  token  = req.cookies.token;
    
  
    if (!token) {
      return  res.status(200).json({
        success: false,
        message: "Token not found",
    })
    }
  
    const decodedData = jwt.verify(token,"jatin");
    console.log(decodedData)
  
    req.user = await User.findByPk(decodedData.id);
  
    next();
  });

  module.exports = {
    isAuthenticatedUser
   };
