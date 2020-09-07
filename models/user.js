// to create schema , import mongoose
const mongoose = require('mongoose');

// importing multer
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatar');

// create userSchema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    // fieldname in which we are storing files
    avatar:{
        type: String
    }
}, {
    timestamps: true
});


// we will connect the schema(avatar) to it's destination folder(AVATAR_PATH)
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname , '..' , AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  });

//  we define static functions for user
userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;
   


// telling mongoose that this is a  model
const User = mongoose.model('User', userSchema);

// export user model
module.exports = User;