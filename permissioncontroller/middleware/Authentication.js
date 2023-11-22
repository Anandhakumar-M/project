const asyncErrorHandler = require('../../Error/asyncErr');
const User = require('../../Moduls/userdata');
const jwt = require('jsonwebtoken');
const AppError = require("../../Error/AppErr");
const util =require('util');




exports.protect = asyncErrorHandler(async(req,res,next)=>{
    //read the token & check if it exist
    const testToken = req.headers.authorization;
    let token;
    if(testToken && testToken.startsWith('Bearer')){
        token=testToken.split(' ')[1];
    }
    if(!token){
        next(new AppError('Yor are not login!!'));
    }
    //validate the token
    const decodedToken = await util.promisify(jwt.verify)(token,process.env.SECRET_STR);
    //if the user exists
    const user = await User.findById(decodedToken.id);

    if(!user){
      const error = new AppError('This user does not exist',401);
      return next(error);
    }
    //if the use has been changed the password after issued Token
    const isPasswordChanged = await user.isPasswordChanged(decodedToken.iat);
    if(isPasswordChanged){
      const error = new AppError('The password has been changed recently ,so please login again',401);
      return next(error);
    }
    // allow to acces the API for user
    req.user = user;
    next();
})
