import { RequestHandler } from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import Order from '../models/Order';
import Cart from '../models/Cart';
import { AuthRequest } from '../types';

const getRazorpay = (): Razorpay =>
    new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID as string,
        key_secret: process.env.RAZORPAY_KEY_SECRET as string,
    });

// @desc    Create Razorpay order  POST /api/payment/create-order  Private
export const createRazorpayOrder: RequestHandler = async (req: AuthRequest, res): Promise<void> => {
    try {
        const cart = await Cart.findOne({ user: req.user!.id });
        if (!cart || cart.items.length === 0) {
            res.status(400).json({ success: false, error: 'Your cart is empty' });
            return;
        }
        const amount = Math.round(cart.totalPrice * 100);
        const options = {
            amount,
            currency: 'INR',
            receipt: `rcpt_${Date.now().toString().slice(-6)}_${Math.floor(Math.random() * 1000)}`,
            notes: { userId: req.user!.id.toString() },
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
    } catch (err: any) {
        console.error('Razorpay create order error:', err);
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Verify payment & save order  POST /api/payment/verify  Private
export const verifyPayment: RequestHandler = async (req: AuthRequest, res): Promise<void> => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body as {
            razorpay_order_id: string;
            razorpay_payment_id: string;
            razorpay_signature: string;
        };

        const body = `${razorpay_order_id}|${razorpay_payment_id}`;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET as string)
            .update(body)
            .digest('hex');

        if (expectedSignature !== razorpay_signature) {
            res.status(400).json({ success: false, error: 'Payment verification failed' });
            return;
        }

        const cart = await Cart.findOne({ user: req.user!.id });
        if (!cart || cart.items.length === 0) {
            res.status(400).json({ success: false, error: 'Cart not found' });
            return;
        }

        const order = await Order.create({
            user: req.user!.id,
            items: cart.items,
            totalAmount: cart.totalPrice,
            paymentStatus: 'Completed',
            paymentId: razorpay_payment_id,
            razorpayOrderId: razorpay_order_id,
            deliveryStatus: 'Processing',
        });

        cart.items = [] as any;
        cart.totalPrice = 0;
        await cart.save();

        res.status(201).json({ success: true, data: order });
    } catch (err: any) {
        console.error('Payment verify error:', err);
        res.status(500).json({ success: false, error: err.message });
    }
};
