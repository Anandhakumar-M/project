const asyncErrorHandler = require('../../Error/asyncErr');
const UserPermissions = require('../../Moduls/userpermission');
const AppError = require("../../Error/AppErr");


exports.restrict = (...role) => {
    return asyncErrorHandler(async(req,res,next)=>{
      const userpermission = await UserPermissions.findById(req.user.id);
      console.log(role);
      console.log(req.user.id);
  
      if(!userpermission){
        const error = new AppError('This user does not exist',401);
        return next(error);
      }
      if(!role.includes(userpermission.role)){
        const error = new AppError('you cannot assess the route',403);
        return next(error);
      }
      next();
    })
  }
  