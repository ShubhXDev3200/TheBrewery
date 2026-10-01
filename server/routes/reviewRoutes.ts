import express from 'express';
import { getReviews, addReview, getAdminReviews, updateReviewStatus } from '../controllers/reviewController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router.route('/').get(getReviews).post(protect, addReview);
router.get('/admin', protect, authorize('admin'), getAdminReviews);
router.put('/:id', protect, authorize('admin'), updateReviewStatus);

export default router;
