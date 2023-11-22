const Animals = require("../../Moduls/animaldata");
const asyncErrorHandler = require("../../Error/asyncErr");
const Farm = require("../../Moduls/farmdata");

exports.animalpost= asyncErrorHandler(async(req,res,next)=>{
    console.log(req.user.id,'hiiiiiiiiii');
    const val =req.user.id
    const user = await Farm.findOne({farm_user_Id:val})
    console.log(user,'higgh')
    const {name,color} = req.body
    const animal = new Animals({
        farmId:user._id,
        name:name,
        color:color
    })
    const newUser=await animal.save();    

    res.status(201)
    .json({
      status:"sucess",
      data:{
        user:newUser
    }
    });
});