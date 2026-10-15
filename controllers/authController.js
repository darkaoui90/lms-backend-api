const user = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
     console.log("LOGIN CONTROLLER HIT");
  try {
    const { name, email, password } = req.body;
    

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "all field are required ",
      });



    } 
      const existingUser = await user.findOne({ email });
     if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already in use",
      });
    }
      
    const newUser = await user.create({
      name,
      email,
      password,
      role: "learner",
    });
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
   

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "all field required to be fulfilled ",
      });
    }
 const existingUser = await user.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password ",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password ",
      });
    }

    
        const token =jwt.sign(
      { userId: existingUser._id } ,
      process.env.JWT_SECRET ,
      {expiresIn : "1h"}
     

        );
        return res.status(200).json({
            success: true ,
            message : "login succesful" , 
            token

        })
    

  } catch (error) {
    next(error);
  }
};
