const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const userPermissionsSchema = new Schema({
  _id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  role: {
    type: String,
    enum: ['admin', 'manager', 'user', 'doctor'],
    default:null
  },
  module: {
    type: String,
    enum: ['*', 'animal', 'milk', 'feed', 'bread'],
    required: true,
  },
  permissions: {
    read:{type:Boolean,
      default: false},
    write: {type:Boolean,
      default: false},
    delete:{type:Boolean,
      default: false},
    update: {type:Boolean,
      default: false},
  },
});

const UserPermissions = mongoose.model('UserPermissions', userPermissionsSchema);

module.exports = UserPermissions;
