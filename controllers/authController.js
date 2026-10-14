const user = require('../models/User');

exports.register = async (req , res , next ) => {

     try {
        const {name , email , password} = req.body ; 
        const existingUser = await user.findOne({email});

          if (!name || !email || !password) {
            return res.status(400).json({
                message : "all field are required " , 
            })
        }

        else if(existingUser) {
             return res.status(400).json({
                success: false,
                message: 'Email already in use'
            });
        }

          const newUser = await user.create({
            name,
            email,
            password,
            role: 'learner'
        });
            return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
     });
    }
    
   catch(error) {
    next(error) ; 
   }



     }