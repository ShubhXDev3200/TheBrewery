const Review = require('../models/Review');

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
exports.getReviews = async (req, res) => {
    try {
        // Only show approved reviews to the public
        const reviews = await Review.find({ status: 'approved' }).populate({
            path: 'user',
            select: 'name'
        });
        res.status(200).json({ success: true, count: reviews.length, data: reviews });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Add review
// @route   POST /api/reviews
// @access  Private
exports.addReview = async (req, res) => {
    try {
        req.body.user = req.user.id;
        const review = await Review.create(req.body);
        res.status(201).json({ success: true, data: review });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Get all reviews for admin
// @route   GET /api/reviews/admin
// @access  Private (Admin)
exports.getAdminReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate({
            path: 'user',
            select: 'name email'
        });
        res.status(200).json({ success: true, count: reviews.length, data: reviews });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Update review status (Moderate)
// @route   PUT /api/reviews/:id
// @access  Private (Admin)
exports.updateReviewStatus = async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, { status: req.body.status }, {
            new: true,
            runValidators: true
        });
        if (!review) {
            return res.status(404).json({ success: false, error: 'Review not found' });
        }
        res.status(200).json({ success: true, data: review });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
