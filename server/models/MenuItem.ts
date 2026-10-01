import mongoose, { Schema } from 'mongoose';
import { IMenuItem } from '../types';

const menuItemSchema = new Schema<IMenuItem>({
    name: { type: String, required: [true, 'Please add a name'], trim: true },
    description: { type: String, required: [true, 'Please add a description'] },
    price: { type: Number, required: [true, 'Please add a price'] },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        enum: ['Coffee', 'Cold Coffee', 'Snacks', 'Desserts'],
    },
    image: { type: String, default: 'no-photo.jpg' },
    isPopular: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IMenuItem>('MenuItem', menuItemSchema);
