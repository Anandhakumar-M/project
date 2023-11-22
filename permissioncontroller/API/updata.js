const User = require("../../Moduls/userdata");
const UserPermissions = require('../../Moduls/userpermission');
const asyncErrorHandler = require("../../Error/asyncErr");
const AppError = require("../../Error/AppErr");

//update a user by ID
exports.updatedata =asyncErrorHandler(async (req, res,next) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    const updatedUserPermission = await UserPermissions.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      const err = new AppError(`can't find Id=${req.params.id} from Database`,404);
      return next(err)
    }
    res.status(201)
    .json({
      status:"sucess",
      data:{updatedUser,
      updatedUserPermission}
    });
});
