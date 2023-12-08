const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    select: false,
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

userSchema.pre('save', async function (next) {
  // Only run when password is modified
  if (!this.isModified('password')) return next();

  // Encrypt password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete the password confirm field so it doesn't persist to database
  this.passwordConfirm = undefined;

  // Call the next middleware in the stack
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(
    candidatePassword,
    userPassword,
  );
};

const User = mongoose.model('User', userSchema);

module.exports = User;
