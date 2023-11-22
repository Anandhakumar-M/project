const User = require("../../Moduls/userdata");
const UserPermissions = require('../../Moduls/userpermission');
const asyncErrorHandler = require("../../Error/asyncErr");
const AppError = require("../../Error/AppErr");

//get a single user by ID
exports.getdata = asyncErrorHandler(async (req, res,next) => {
    const user = await User.findOne({_id:req.params.id});
    const userpermission = await UserPermissions.findOne({_id:req.params.id});
    if (!user) {
        const err = new AppError(`can't find Id=${req.params.id} from Database`,404);
        return next(err)
      }
    res.status(201)
    .json({
      status:"sucess",
      data:{user,
      userpermission}
    })
  });