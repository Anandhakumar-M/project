const express = require('express');
const signup = require('./../permissioncontroller/middleware/signup');
const login = require('./../permissioncontroller/middleware/login');
const restPassword = require('./../permissioncontroller/middleware/resetpassword');
const forgetpassword = require('./../permissioncontroller/middleware/forgetpassword');
const Authentication = require('./../permissioncontroller/middleware/Authentication');
const Authorisation = require('./../permissioncontroller/middleware/Authorisation')

const router = express.Router();

router.route('/signup').post(Authentication.protect,Authorisation.restrict('admin'),signup.signup);
router.route('/login').get(login.login);
router.route('/forgot-password').post(forgetpassword.forgetpassword);
router.route("/reset-password/:token").post(restPassword.restPassword);

module.exports = router;