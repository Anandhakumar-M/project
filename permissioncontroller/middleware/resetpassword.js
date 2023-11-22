const asyncErrorHandler = require('../../Error/asyncErr');
const User = require('../../Moduls/userdata');
const jwt = require('jsonwebtoken');
const AppError = require("../../Error/AppErr");

//use jwt token 
const createtoken =id =>{
    return jwt.sign({id:id},process.env.SECRET_STR,{
    expiresIn:'60d'
  })
}


exports.restPassword = asyncErrorHandler(async(req,res,next)=>{
    // If the user exists the given token & token is not expired
    const token = req.params.token ;
    const user = await User.findOne({passwordResetToken: token,passwordResetTokenExpiration:{$gt: Date.now()}});
  
    if (!user) {
      const error = new AppError(`token has been expired`,404);
      return next(error);
    }
    
    // reset the password in database
    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiration = undefined;
    user.isPasswordChangedAt = Date.now();
  
    user.save();
  
    const logintoken = createtoken(user._id);
  
  
    res.status(201)
    .json({
      status:"sucess",
      token:logintoken,
      data:{
        user:user
    }
    });
  })