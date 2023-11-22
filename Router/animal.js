const express = require('express');
const Authentication = require('../permissioncontroller/middleware/Authentication');
const Authorisation = require('./../permissioncontroller/middleware/Authorisation');
const animalupdate = require('../permissioncontroller/Farm-Middleware/animal-update');
const animalpost = require('../permissioncontroller/Farm-Middleware/animal-post');


const farmrouter = express.Router();

farmrouter.route('/farm/animal')
            .post(Authentication.protect,Authorisation.restrict('admin','manager'),animalpost.animalpost);

farmrouter.route('/farm/animal/:animalId')
            .patch(Authentication.protect,Authorisation.restrict('admin','manager'),animalupdate.updateanimaldata)

module.exports = farmrouter;
