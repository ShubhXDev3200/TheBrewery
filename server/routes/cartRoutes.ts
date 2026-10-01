import express from 'express';
import { getCart, addToCart, updateCartItem, removeFromCart } from '../controllers/cartController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.route('/').get(protect, getCart).post(protect, addToCart);
router.route('/:itemId').put(protect, updateCartItem).delete(protect, removeFromCart);

export default router;
