const Order = require('../models/Order');
const Cart = require('../models/Cart');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
    try {
        // Get user's cart
        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ success: false, error: 'Your cart is empty' });
        }

        // Total amount is just the cart total price
        const totalAmount = cart.totalPrice;

        // Create order
        const order = await Order.create({
            user: req.user.id,
            items: cart.items,
            totalAmount: totalAmount,
            paymentStatus: 'Pending',
            deliveryStatus: 'Processing'
        });

        // Clear user's cart
        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        res.status(201).json({ success: true, data: order });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders
// @access  Private
exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).sort('-createdAt');
        res.status(200).json({ success: true, count: orders.length, data: orders });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
