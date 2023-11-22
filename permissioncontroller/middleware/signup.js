const asyncErrorHandler = require('../../Error/asyncErr');
const User = require('../../Moduls/userdata');
const UserPermissions = require('../../Moduls/userpermission');
const jwt = require('jsonwebtoken');


//use jwt token 
const createtoken =id =>{
    return jwt.sign({id:id},process.env.SECRET_STR,{
    expiresIn:'60d'
  })
}


exports.signup = asyncErrorHandler(async(req,res,next)=>{
    const newUser = await User.create(req.body);
    const {role,module} = req.body
    const userpermissions = new UserPermissions({
      _id:newUser._id,
      userId:newUser._id,
      name:newUser.name,
      role:role,
      module:module,
    })
    const newUserPermissions=await userpermissions.save();    
    const token = createtoken(newUser._id);

    res.status(201)
    .json({
      status:"sucess",
      token,
      data:{
        user:newUser,
        userpermission:newUserPermissions
    }
    });
});