const Review = require('./../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const filterObj = require('../utils/filterObj');

exports.getAllReviews = catchAsync(
  async (req, res, next) => {
    const reviews = await Review.find();

    res.status(200).json({
      status: 'success',
      results: reviews.length,
      data: {
        reviews,
      },
    });
  },
);

exports.getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    next(new AppError('No review found with that ID', 404));
    return;
  }

  res.status(200).json({
    status: 'success',
    data: {
      review,
    },
  });
});

exports.createReview = catchAsync(
  async (req, res, next) => {
    const newReview = await Review.create({
      contents: req.body.contents,
      rating: req.body.rating,
      createdAt: req.body.createdAt,
      author: req.user.id,
      tour: req.body.tour,
    });

    res.status(201).json({
      status: 'success',
      data: {
        newReview,
      },
    });
  },
);

exports.updateReview = catchAsync(
  async (req, res, next) => {
    if (req.body.author !== req.user.id) {
      return next(
        new AppError(
          'You can only update your own reviews.',
          401,
        ),
      );
    }

    const filteredBody = filterObj(
      req.body,
      'contents',
      'rating',
    );

    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      filteredBody,
      { new: true, runValidators: true },
    );

    if (!updatedReview) {
      next(
        new AppError('No review found with that ID', 404),
      );
      return;
    }

    res.status(200).json({
      status: 'success',
      data: {
        updatedReview,
      },
    });
  },
);

exports.deleteReview = catchAsync(
  async (req, res, next) => {
    if (req.body.author !== req.user.id) {
      return next(
        new AppError(
          'You can only delete your own reviews',
          401,
        ),
      );
    }

    const review = await Review.findByIdAndDelete(
      req.params.id,
    );

    if (!review) {
      next(
        new AppError('No review found with that ID', 404),
      );
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  },
);
