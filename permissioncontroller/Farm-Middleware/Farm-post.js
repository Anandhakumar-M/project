const Farm = require("../../Moduls/farmdata");
const User = require('../../Moduls/userdata');
const asyncErrorHandler = require("../../Error/asyncErr");

exports.farmpost= asyncErrorHandler(async(req,res,next)=>{
    console.log(req.user.email,'hiiiiiiiiii');
    const val =req.user.email
    const user = await User.findOne({email:val})
    console.log(user,'higgh')
    const {farmname} = req.body
    const farm = new Farm({
        farm_user_Id:user._id,
        farmname:farmname
    })
    const newUser=await farm.save();    

    res.status(201)
    .json({
      status:"sucess",
      data:{
        user:newUser
    }
    });
});