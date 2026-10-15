const express = require('express') ;

const router = express.Router();
const auth = require("../middlewares/authMiddleware");

// const authController = require('../controllers/authController');

const {register ,login} = require('../controllers/authController');


router.post('/register' , register)
router.post('/login', login);

router.get("/me" , auth , (req , res) => {
   return res.status(200).json({
success : true ,
user : req.user 

   });

});

module.exports = router ;