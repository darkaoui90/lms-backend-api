const jwt = require('jsonwebtoken');
const user = require('../models/User');



const auth = async (req ,res , next) => {
 try {
 const authHeader = req.headers.authorization;

  if(!authHeader) {
    return res.status(401).json({
         success: false ,
         message : "you are not authenticated "
    });
  }
  
  const token = authHeader.split(" ")[1];

  const decoded = jwt.verify(token , process.env.JWT_SECRET);

 const existingUser = await user
  .findById(decoded.userId)
  .select("-password");

   if(!existingUser) {
     return res.status(401).json({
         success: false ,
         message : "user no longer exists "
    });
   }

   req.user = existingUser ;


   next();
}
catch(error){
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
}

}
module.exports = auth;