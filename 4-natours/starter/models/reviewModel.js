const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');
const User = require('./userModel');
const Tour = require('./tourModel');

const reviewSchema = new mongoose.Schema(
  {
    contents: {
      type: String,
      required: [true, 'Your review cannot be empty'],
    },
    rating: {
      type: Number,
      required: [true, 'You must give a rating'],
      enum: [1, 2, 3, 4, 5],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      enum: [Date.now],
      select: false,
    },
    author: [
      {
        type: mongoose.Schema.ObjectId,
        ref: User,
        required: [true, 'A review must have an author'],
      },
    ],
    tour: [
      {
        type: mongoose.Schema.ObjectId,
        ref: Tour,
        required: [true, 'A review must belong to a tour'],
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// // Populate tours with referenced data
// tourSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'guides',
//     select: '-__v',
//   });
//   next();
// });

reviewSchema.pre(/^find/, function (next) {
  // this.populate({
  //   path: 'author',
  //   select: 'name id photo',
  // }).populate({
  //   path: 'tour',
  //   select: '-guides name',
  // });

  this.populate({
    path: 'author',
    select: 'name photo',
  });
  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
