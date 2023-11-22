const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const farmSchema = new Schema({
    farm_user_Id :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    farmname:{
        type:String,
        unique: true,
        required: [true,'farmname is required field!']
    }
})

const Farm = mongoose.model("Farm",farmSchema);

module.exports=Farm;