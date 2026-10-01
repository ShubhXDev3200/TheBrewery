const express = require('express');
const {
    getReviews,
    addReview,
    getAdminReviews,
    updateReviewStatus
} = require('../controllers/reviewController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router
    .route('/')
    .get(getReviews)
    .post(protect, addReview);

router.get('/admin', protect, authorize('admin'), getAdminReviews);

router.put('/:id', protect, authorize('admin'), updateReviewStatus);

module.exports = router;
