const AppError = require("./AppErr")

const devErrors = (res,error)=>{
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
        stackTrace: error.stack,
        error: error
    })  
}

const CastErrorHandler = (error)=>{
    const msg = `Invalid value ${error.path} : ${error.value}!!!`
    return new AppError(msg,404)
}
const duplicatekeyErrorHandler = (error)=>{
    const name = error.keyValue.email;
    if(!name){
        const name = error.keyValue.farmname;
        const msg = `This fild : ${name} is already use .please use another name or value !!!`;
        return new AppError(msg,400);
    }
    const msg = `This email : ${name} is already use .please use another email !!!`;

    return new AppError(msg,400);
}
const validationError = (error)=>{
    const errors = Object.values(error.errors).map(val => val.message);
    const errorMessages = errors.join('. ');
    const msg = `Invalid input data : ${errorMessages}`;

    return new AppError(msg,400);
}
const handleErpiredJWT = (error)=>{
    return new AppError('JWT Token has been expired.please login again',404);
}
const handleJWTError = (error)=>{
    return new AppError('Invalid JWT Token.please login again',404);
}
const prodErrors = (res,error)=>{
    console.log(error,' hiii this consolelog is show in globleErr line:30');
    if (error.isValue) {
        let v=error.isValue;
        console.log(v,'hii this consolelog is show in globleErr line:33');
        res.status(error.statusCode).json({
            status: error.statusCode,
            message: error.message
        })
    }else {
        res.status(500).json({
            status:'error',
            message:'something went wrong! please try again later'
        })
    }
    
}

module.exports = (error,req,res,next)=>{
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error' ;
    
    if (process.env.NODE_ENV == 'development') {
        devErrors(res,error);
        console.log(error,' hiii this consolelog is show in globleErr line:53');
    }else if (process.env.NODE_ENV == 'production') {
        console.log(error,' hiii this consolelog is show in globleErr line:55');
        if (error.name == 'CastError') {
            error = CastErrorHandler(error);
        }
        if (error.code == 11000) {
            error = duplicatekeyErrorHandler(error);
        }
        if (error.name == 'ValidationError') {
            error = validationError(error);
        }
        if(error.name == 'TokenExpiredError'){
            error = handleErpiredJWT(error);
        }
        if(error.name == 'JsonWebTokenError'){
            error = handleJWTError(error);
        }
        prodErrors(res,error);
    }
}