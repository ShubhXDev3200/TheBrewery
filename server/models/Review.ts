import mongoose, { Schema } from 'mongoose';
import { IReview } from '../types';

const reviewSchema = new Schema<IReview>({
    title: { type: String, trim: true, required: [true, 'Please add a title for the review'] },
    text: { type: String, required: [true, 'Please add some text'] },
    rating: { type: Number, min: 1, max: 5, required: [true, 'Please add a rating between 1 and 5'] },
    createdAt: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
});

export default mongoose.model<IReview>('Review', reviewSchema);
