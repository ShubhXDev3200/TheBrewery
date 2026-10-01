import express from 'express';
import { getMenuItems, getMenuItem, createMenuItem, updateMenuItem, deleteMenuItem } from '../controllers/menuController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router.route('/').get(getMenuItems).post(protect, authorize('admin'), createMenuItem);
router.route('/:id').get(getMenuItem).put(protect, authorize('admin'), updateMenuItem).delete(protect, authorize('admin'), deleteMenuItem);

export default router;
