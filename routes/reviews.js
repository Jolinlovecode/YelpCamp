const express = require('express');
const router = express.Router({ mergeParams:true });
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const Campground = require("../models/campground");
const Review = require("../models/review");
const reviews = require('../controllers/reviews');
const catchAsync = require('../utils/catchAsync');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(async (req, res,next) => {
  const { id, reviewId } = req.params;
  await Campground.findByIdAndUpdate(id, { $pull: {reviews: reviewId }});
  await Review.findByIdAndDelete(reviewId);
  req.flash('success', 'Successfully delete review!')
  res.redirect(`/campgrounds/${id}`);
}))


module.exports = router;