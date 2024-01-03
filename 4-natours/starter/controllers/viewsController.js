const Tour = require('../models/tourModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  //1) get all tour data from collection
  const tours = await Tour.find();

  // 2) build template

  // 3) render template using tour data from 1
  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({
    slug: req.params.slug,
  }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!tour) {
    res.status(200).render('error', { title: 'Not found' });
    return next(
      new AppError(404, 'No tour found by that name'),
    );
  }

  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
});
