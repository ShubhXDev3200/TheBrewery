import mongoose, { Schema } from 'mongoose';
import { ICart } from '../types';

const cartItemSchema = new Schema({
    menuItemId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    quantity: { type: Number, required: true, min: 1, default: 1 },
});

const cartSchema = new Schema<ICart>(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
        items: [cartItemSchema],
        totalPrice: { type: Number, required: true, default: 0 },
    },
    { timestamps: true }
);

export default mongoose.model<ICart>('Cart', cartSchema);
