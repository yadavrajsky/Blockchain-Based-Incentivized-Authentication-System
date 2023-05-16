const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  wallet: {
    type: String,
    required: [true, 'Please Enter Your Wallet Address'],
    unique: [true, 'Wallet Address is already registered'],
  },
  // password: {
  //   type: String,
  //   required: [true, 'Please Enter Your Password'],
  //   minLength: [8, 'Password should be greater than 8 characters'],
  //   select: false,
  // },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
