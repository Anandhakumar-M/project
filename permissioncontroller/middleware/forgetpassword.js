const asyncErrorHandler = require('../../Error/asyncErr');
const User = require('../../Moduls/userdata');
const AppError = require("../../Error/AppErr");
const nodemailer = require('nodemailer');
const uuid = require('uuid');
// **********************   NODEMAILER    ****************

const transporter = nodemailer.createTransport({
  service:'gmail',
  auth:{
    user: 'atreating@gmail.com',
    pass: 'zkzh jbfm cmci frmq'
  }
});





exports.forgetpassword =asyncErrorHandler(async (req, res) => {
    const { email } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
  
      if (!user) {
        const error = new AppError(`Please check this email = ${req.body.email} is not found`,404);
        return next(error)
      }
  
      // Generate a unique token for password reset
      const resetToken = uuid.v4();
  
      user.passwordResetToken = resetToken;
      user.passwordResetTokenExpiration = new Date(Date.now()+36000000)
        
  
      await user.save();
  
      // Send the password reset email
      await transporter.sendMail({
        to: email,
        subject: 'Password Reset',
        text: `Click this link to reset your password:  http://127.0.0.1:3000/acces/user/reset-password/${resetToken}`,
      });
  
      res.json({ message: 'Password reset instructions sent to your email' });
  });
  