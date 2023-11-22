const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");


const userSchema = mongoose.Schema({
    name:{
        type:String,
        required: [true,'Name is required field!'],
        trim:true
    },
    email:{
        type:String,
        unique: true,
        required: [true,'Email is required field!'],
        validate:[validator.isEmail,'plz enter correct email'],
        trim:true
    },
    verificationToken:String,
    isEmailConfirmed:{
        type:Boolean,
        default:false
    },
    emailConfirmedAt:Date,
    password:{
        type:String,
        required: [true,'password is required field!'],
        minlength:8,
        select:false,
        trim:true
    },
    passwordResetToken:String,
    passwordResetTokenExpiration: Date,
    passwordChangedAt: Date,
    UserCreatedAt:{
        type:Date,
        default:Date.now()
    }
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password'))return next();

    //password is save has encrypt
    this.password = await bcrypt.hash(this.password,10);
    next()
})
userSchema.methods.isPasswordChanged = async function(JWTTimestamp) {
    if(this.passwordChangedAt){
        const passwordChangingTime = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

        return JWTTimestamp < passwordChangingTime;
    }
    return false;
}

const User = mongoose.model("User",userSchema);

module.exports=User;