const express = require("express");
const getdatas = require("../permissioncontroller/API/getdatas");
const getdata = require("../permissioncontroller/API/getdata");
const updata = require("../permissioncontroller/API/updata");
const Delete = require("../permissioncontroller/API/Delete");
const Authentication = require('../permissioncontroller/middleware/Authentication');
const Authorisation = require('./../permissioncontroller/middleware/Authorisation');


const url=express.Router();


url.route("/getdatas")
    .get(Authentication.protect,Authorisation.restrict('admin'),getdatas.getdatas)
url.route("/data/:id")
    .get(Authentication.protect,Authorisation.restrict('admin','manager'),getdata.getdata)
    .patch(Authentication.protect,Authorisation.restrict('admin','manager'),updata.updatedata)
    .delete(Authentication.protect,Authorisation.restrict('admin','manager'),Delete.deletedata)

module.exports=url;