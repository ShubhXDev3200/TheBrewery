import { RequestHandler } from 'express';
import Review from '../models/Review';
import { AuthRequest } from '../types';

// @desc    Get approved reviews  GET /api/reviews  Public
export const getReviews: RequestHandler = async (_req, res): Promise<void> => {
    try {
        const reviews = await Review.find({ status: 'approved' }).populate({ path: 'user', select: 'name' });
        res.status(200).json({ success: true, count: reviews.length, data: reviews });
    } catch (err: any) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Add review  POST /api/reviews  Private
export const addReview: RequestHandler = async (req: AuthRequest, res): Promise<void> => {
    try {
        req.body.user = req.user!.id;
        const review = await Review.create(req.body);
        res.status(201).json({ success: true, data: review });
    } catch (err: any) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Get all reviews for admin  GET /api/reviews/admin  Private/Admin
export const getAdminReviews: RequestHandler = async (_req, res): Promise<void> => {
    try {
        const reviews = await Review.find().populate({ path: 'user', select: 'name email' });
        res.status(200).json({ success: true, count: reviews.length, data: reviews });
    } catch (err: any) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Update review status  PUT /api/reviews/:id  Private/Admin
export const updateReviewStatus: RequestHandler = async (req, res): Promise<void> => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true });
        if (!review) { res.status(404).json({ success: false, error: 'Review not found' }); return; }
        res.status(200).json({ success: true, data: review });
    } catch (err: any) {
        res.status(400).json({ success: false, error: err.message });
    }
};
