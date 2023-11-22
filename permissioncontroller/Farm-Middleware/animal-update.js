const Animals = require("../../Moduls/animaldata");
const asyncErrorHandler = require("../../Error/asyncErr");
const AppError = require("../../Error/AppErr");

//update a user by ID
exports.updateanimaldata =asyncErrorHandler(async (req, res,next) => {
    const animal = await Animals.findByIdAndUpdate(req.params.animalId, req.body, { new: true });
    if (!animal) {
      const err = new AppError(`can't find Id=${req.params.id} from Database`,404);
      return next(err)
    }
    res.status(201)
    .json({
      status:"sucess",
      data:{
      animal}
    });
});
