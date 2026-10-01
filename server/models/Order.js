const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    menuItemId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    quantity: {
        type: Number,
        required: true
    }
});

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [orderItemSchema],
    totalAmount: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending'
    },
    paymentId: {
        type: String, // Razorpay payment_id
    },
    razorpayOrderId: {
        type: String, // Razorpay order_id
    },
    deliveryStatus: {
        type: String,
        enum: ['Processing', 'Out for Delivery', 'Delivered'],
        default: 'Processing'
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
