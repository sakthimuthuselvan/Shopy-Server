const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: String,
  }
});

const UserSchema = mongoose.model('users', userSchema);

module.exports =  {UserSchema };
