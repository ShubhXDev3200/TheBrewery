import express from 'express';
import { createOrder, getUserOrders } from '../controllers/orderController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.route('/').post(protect, createOrder).get(protect, getUserOrders);

export default router;
