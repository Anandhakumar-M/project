const express = require("express");
const url = require("./Router/URL");
const authrouter = require('./Router/signup-login');
const bodyParser=require("body-parser");
const golbalErrorHandler = require("./Error/globleErr");
const AppError = require("./Error/AppErr");
const farm = require('./Router/farm');
const animal = require('./Router/animal');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use("/acces/user",authrouter);
app.use("/user",url);
app.use("/user",farm);
app.use("/user",animal);
app.all('*',(req,res,next)=>{
    const err = new AppError(`can't find ${req.originalUrl} value`,404);
    next(err)
})

app.use(golbalErrorHandler);


module.exports= app;