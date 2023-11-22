const Farm = require("../../Moduls/farmdata");
const asyncErrorHandler = require("../../Error/asyncErr");


exports.framdatas =asyncErrorHandler(async (req, res) => {
    const users = await Farm.find({});
    res.status(201)
    .json({
      status:"sucess",
      data:{users}
    });
});