const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');
const Cart = require('../models/Cart');

// Helper: get Razorpay instance with current env vars
const getRazorpay = () => new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Create Razorpay order
// @route   POST /api/payment/create-order
// @access  Private
exports.createRazorpayOrder = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ success: false, error: 'Your cart is empty' });
        }

        const amount = Math.round(cart.totalPrice * 100); // Razorpay works in paise, must be integer

        const options = {
            amount,
            currency: 'INR',
            receipt: `rcpt_${Date.now().toString().slice(-6)}_${Math.floor(Math.random() * 1000)}`,
            notes: {
                userId: req.user.id.toString(),
            },
        };

        const razorpay = getRazorpay();
        const razorpayOrder = await razorpay.orders.create(options);

        res.status(200).json({
            success: true,
            orderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            keyId: process.env.RAZORPAY_KEY_ID,
        });
    } catch (err) {
        console.error('================ RAZORPAY CREATE ORDER ERROR ================');
        console.error('Error Message:', err.message);
        console.error('Full Error:', err);
        console.error('=============================================================');
        res.status(500).json({ success: false, error: err.message, stack: err.stack });
    }
};

// @desc    Verify payment & save order
// @route   POST /api/payment/verify
// @access  Private
exports.verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        // Verify signature (for real payments)
        const body = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ success: false, error: 'Payment verification failed' });
        }

        // Get user's cart and create order
        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ success: false, error: 'Cart not found' });
        }

        const order = await Order.create({
            user: req.user.id,
            items: cart.items,
            totalAmount: cart.totalPrice,
            paymentStatus: 'Completed',
            paymentId: razorpay_payment_id,
            razorpayOrderId: razorpay_order_id,
            deliveryStatus: 'Processing',
        });

        // Clear cart
        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        res.status(201).json({ success: true, data: order });
    } catch (err) {
        console.error('Payment verify error:', err);
        res.status(500).json({ success: false, error: err.message });
    }
};
