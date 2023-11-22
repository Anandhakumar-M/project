const User = require("../../Moduls/userdata");
const asyncErrorHandler = require("../../Error/asyncErr");


exports.getdatas =asyncErrorHandler(async (req, res) => {
    const users = await User.find({});
    res.status(201)
    .json({
      status:"sucess",
      data:{users}
    });
});