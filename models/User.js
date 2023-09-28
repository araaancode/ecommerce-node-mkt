const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator=require("validator")

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim:true,
    },
    lastName: {
        type: String,
        required: true,
        trim:true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      default: './images/frog.png',
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        maxlength: 15,
    },
    confirmPassword: {
        type: String,
        required: [true, 'لطفا گذرواژه خود را تایید کنید'],
        select:false,
        validate: {
            // This only works on CREATE and SAVE!!!
            validator: function (el) {
            return el === this.password
        },
            message: 'گذرواژه ها یکسان نیستند',
        },
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

module.exports = User