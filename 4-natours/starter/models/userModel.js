const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

// name, email, photo, password, passwordConfirm

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    minlength: [
      4,
      'A username must have at least 4 characters',
    ],
    maxlength: [
      32,
      'A username must not exceed 32 characters',
    ],
  },
  email: {
    type: String,
    required: [
      true,
      'A user must have a valid email address',
    ],
    unique: [
      true,
      'A user is already registered with this email',
    ],
    validate: [
      validator.isEmail,
      'Please provide a valid email address',
    ],
    lowercase: true,
  },
  photo: String,
  password: {
    type: String,
    minlength: [
      8,
      'A password must have at least 8 characters',
    ],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on 'CREATE' + 'SAVE'
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords do not match',
    },
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
