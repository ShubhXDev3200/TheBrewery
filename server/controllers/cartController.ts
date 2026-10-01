import { RequestHandler } from 'express';
import Cart from '../models/Cart';
import { AuthRequest } from '../types';

// @desc    Get user cart  GET /api/cart  Private
export const getCart: RequestHandler = async (req: AuthRequest, res): Promise<void> => {
    try {
        let cart = await Cart.findOne({ user: req.user!.id });
        if (!cart) cart = await Cart.create({ user: req.user!.id, items: [], totalPrice: 0 });
        res.status(200).json({ success: true, data: cart });
    } catch (err: any) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Add item to cart  POST /api/cart  Private
export const addToCart: RequestHandler = async (req: AuthRequest, res): Promise<void> => {
    try {
        const { menuItemId, name, price, image, quantity = 1 } = req.body as { menuItemId: string; name: string; price: number; image: string; quantity?: number };
        let cart = await Cart.findOne({ user: req.user!.id });
        if (!cart) cart = await Cart.create({ user: req.user!.id, items: [], totalPrice: 0 });

        const itemIndex = cart.items.findIndex((item) => item.menuItemId === menuItemId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ menuItemId, name, price, image, quantity } as any);
        }
        cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        await cart.save();
        res.status(200).json({ success: true, data: cart });
    } catch (err: any) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Update cart item  PUT /api/cart/:itemId  Private
export const updateCartItem: RequestHandler = async (req: AuthRequest, res): Promise<void> => {
    try {
        const { quantity } = req.body as { quantity: number };
        const cart = await Cart.findOne({ user: req.user!.id });
        if (!cart) { res.status(404).json({ success: false, error: 'Cart not found' }); return; }

        const itemIndex = cart.items.findIndex((item) => item._id.toString() === req.params.itemId);
        if (itemIndex > -1) {
            if (quantity <= 0) {
                cart.items.splice(itemIndex, 1);
            } else {
                cart.items[itemIndex].quantity = quantity;
            }
            cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
            await cart.save();
            res.status(200).json({ success: true, data: cart });
        } else {
            res.status(404).json({ success: false, error: 'Item not found in cart' });
        }
    } catch (err: any) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Remove item from cart  DELETE /api/cart/:itemId  Private
export const removeFromCart: RequestHandler = async (req: AuthRequest, res): Promise<void> => {
    try {
        const cart = await Cart.findOne({ user: req.user!.id });
        if (!cart) { res.status(404).json({ success: false, error: 'Cart not found' }); return; }
        cart.items = cart.items.filter((item) => item._id.toString() !== req.params.itemId) as any;
        cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        await cart.save();
        res.status(200).json({ success: true, data: cart });
    } catch (err: any) {
        res.status(400).json({ success: false, error: err.message });
    }
};
