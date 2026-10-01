import { Request } from 'express';
import { Document, Types } from 'mongoose';

// Mongoose document types
export interface IUser extends Document {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    avatar: string;
    phone: string;
    createdAt: Date;
    matchPassword(enteredPassword: string): Promise<boolean>;
}

export interface ICartItem {
    _id: Types.ObjectId;
    menuItemId: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

export interface ICart extends Document {
    user: Types.ObjectId;
    items: ICartItem[];
    totalPrice: number;
}

export interface IMenuItem extends Document {
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    isPopular: boolean;
    createdAt: Date;
}

export interface IOrderItem {
    menuItemId: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

export interface IOrder extends Document {
    user: Types.ObjectId;
    items: IOrderItem[];
    totalAmount: number;
    paymentStatus: 'Pending' | 'Completed' | 'Failed';
    paymentId?: string;
    razorpayOrderId?: string;
    deliveryStatus: 'Processing' | 'Out for Delivery' | 'Delivered';
    createdAt: Date;
    updatedAt: Date;
}

export interface IReview extends Document {
    title: string;
    text: string;
    rating: number;
    createdAt: Date;
    user: Types.ObjectId;
    status: 'pending' | 'approved' | 'rejected';
}

// Extended Express Request with user
export interface AuthRequest extends Request {
    user?: IUser;
}
