const User = require('./../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const filterObj = require('../utils/filterObj');
const factory = require('./handlerFactory');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet implemented',
  });
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data (and also prevent role manipulation)
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'You cannot update password here. Please use /changePassword',
        400,
      ),
    );
  }

  // 2) Filter disallowed field names and update
  const filteredBody = filterObj(req.body, 'name', 'email');

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    filteredBody,
    { new: true, runValidators: true },
  );

  // 3) Send document to client
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, {
    isActive: false,
  });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet implemented',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet implemented',
  });
};

exports.deleteUser = factory.deleteOne(User);
// exports.deleteUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not yet implemented',
//   });
// };
