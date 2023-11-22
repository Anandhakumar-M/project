const asyncErrorHandler = require('../../Error/asyncErr');
const User = require('../../Moduls/userdata');
const UserPermissions = require('../../Moduls/userpermission');
const jwt = require('jsonwebtoken');
const AppError = require("../../Error/AppErr");
const bcrypt = require('bcrypt');

//use jwt token 
const createtoken =id =>{
    return jwt.sign({id:id},process.env.SECRET_STR,{
    expiresIn:'60d'
  })
}


exports.login = asyncErrorHandler(async(req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password){
        const err = new AppError(`Please provide email Id & password for login`,404);
        return next(err)
    }
    // check if the user is exists with the given email
    const user = await User.findOne({email}).select('+password');
    if(!user){
        const err = new AppError(`Please check this email = ${req.body.email} is not found`,404);
        return next(err)
    }
    //Check if the provided password matches the stored password
    console.log(user.password,' hiii this consolelog is show in acces.js line:53');
    console.log(user,' hiii this consolelog is show in acces.js line:54');
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        const err = new AppError(`Please check this password = ${req.body.password}`,404);
        return next(err)
    }
    const newUserPermissions= await UserPermissions.findOne(user._id);
    if (!newUserPermissions) {
      await User.findByIdAndDelete(user.id)
      const err = new AppError(`can't login the user please signup again`,404);
      return next(err)
    }

    const token = createtoken(user._id);


    res.status(201)
    .json({
      status:"sucess",
      token:token,
      data:{
        user:user
    }
    });
});

