const Farm = require("../../Moduls/farmdata");
const Animals = require("../../Moduls/animaldata");
const asyncErrorHandler = require("../../Error/asyncErr");
const AppError = require("../../Error/AppErr");

//get a farm data
exports.getfarmdata = asyncErrorHandler(async (req, res,next) => {
    const farm = await Farm.findOne({farm_user_Id:req.params.id});
    const animaldata = await Animals.findOne({farmId:farm.id});
    if (!farm) {
        const err = new AppError(`can't find Id=${req.params.id} from Database`,404);
        return next(err)
      }
    res.status(201)
    .json({
      status:"sucess",
      data:{farm,
        animaldata
      }
    })
  });