class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.status = statusCode >= 400 && statusCode <= 500 ? 'fail' : 'error';

      this.isValue = true;
      const Value=this.isValue;
      console.log(Value,'hiii this consolelog is show in AppErr line:09 ');
      Error.captureStackTrace(this, this.constructor);
    }
  }
  module.exports = AppError;