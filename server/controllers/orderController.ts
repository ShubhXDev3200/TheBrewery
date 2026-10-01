import { RequestHandler } from 'express';
import Order from '../models/Order';
import Cart from '../models/Cart';
import { AuthRequest } from '../types';

// @desc    Create new order  POST /api/orders  Private
export const createOrder: RequestHandler = async (req: AuthRequest, res): Promise<void> => {
    try {
        const cart = await Cart.findOne({ user: req.user!.id });
        if (!cart || cart.items.length === 0) {
            res.status(400).json({ success: false, error: 'Your cart is empty' });
            return;
        }
        const order = await Order.create({
            user: req.user!.id,
            items: cart.items,
            totalAmount: cart.totalPrice,
            paymentStatus: 'Pending',
            deliveryStatus: 'Processing',
        });
        cart.items = [] as any;
        cart.totalPrice = 0;
        await cart.save();
        res.status(201).json({ success: true, data: order });
    } catch (err: any) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Get user orders  GET /api/orders  Private
export const getUserOrders: RequestHandler = async (req: AuthRequest, res): Promise<void> => {
    try {
        const orders = await Order.find({ user: req.user!.id }).sort('-createdAt');
        res.status(200).json({ success: true, count: orders.length, data: orders });
    } catch (err: any) {
        res.status(400).json({ success: false, error: err.message });
    }
};
