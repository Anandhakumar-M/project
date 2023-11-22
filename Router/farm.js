const express = require('express');
const Authentication = require('../permissioncontroller/middleware/Authentication');
const Authorisation = require('./../permissioncontroller/middleware/Authorisation');
const farmdata = require('../permissioncontroller/Farm-Middleware/Farm-gets');
const farmpost = require('../permissioncontroller/Farm-Middleware/Farm-post');
const farmget = require('../permissioncontroller/Farm-Middleware/Farm-get');


const farmrouter = express.Router();

farmrouter.route('/farm')
            .get(Authentication.protect,Authorisation.restrict('admin','manager'),farmdata.framdatas)
            .post(Authentication.protect,Authorisation.restrict('admin','manager'),farmpost.farmpost);
farmrouter.route('/farm/:id')
            .get(Authentication.protect,Authorisation.restrict('admin','manager'),farmget.getfarmdata)

module.exports = farmrouter;
