const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });
// merge params allows access to params when coming from the tour routes

router
  .route('/')
  .get(
    authController.protect,
    reviewController.getAllReviews,
  )
  .post(
    authController.protect,
    reviewController.setTourUserIds,
    reviewController.createReview,
  );

router
  .route('/:id')
  .get(authController.protect, reviewController.getReview)
  .patch(
    authController.protect,
    reviewController.setTourUserIds,
    reviewController.updateReview,
  )
  .delete(
    authController.protect,
    authController.checkReviewer,
    reviewController.deleteReview,
  );

// POST /tour/1234/reviews
// GET /tour/1234/reviews
// GET /tour/1234/reviews/5678

router
  .route('/:tourId/reviews')
  .post(
    authController.protect,
    reviewController.setTourUserIds,
    authController.checkReviewer,
    reviewController.createReview,
  );

module.exports = router;
