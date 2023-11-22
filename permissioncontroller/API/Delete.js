const User = require("../../Moduls/userdata");
const UserPermissions = require('../../Moduls/userpermission');
const asyncErrorHandler = require("../../Error/asyncErr");
const AppError = require("../../Error/AppErr");

// delete a user by ID
exports.deletedata = asyncErrorHandler(async (req, res,next) => {
    const user = await User.findOne({_id:req.params.id});
      await User.findByIdAndDelete(req.params.id)
      await UserPermissions.findByIdAndDelete(req.params.id)
      if (!user) {
        const err = new AppError(`can't find Id=${req.params.id} from Database`,404);
        return next(err)
      }
      res.send({
        status:'success',
        data:null,
        message:`id: ${req.params.id} this user deleted in Database`
      });
    
  });