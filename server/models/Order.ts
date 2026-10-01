import mongoose, { Schema } from 'mongoose';
import { IOrder } from '../types';

const orderItemSchema = new Schema({
    menuItemId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    quantity: { type: Number, required: true },
});

const orderSchema = new Schema<IOrder>(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        items: [orderItemSchema],
        totalAmount: { type: Number, required: true },
        paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
        paymentId: { type: String },
        razorpayOrderId: { type: String },
        deliveryStatus: { type: String, enum: ['Processing', 'Out for Delivery', 'Delivered'], default: 'Processing' },
    },
    { timestamps: true }
);

export default mongoose.model<IOrder>('Order', orderSchema);
