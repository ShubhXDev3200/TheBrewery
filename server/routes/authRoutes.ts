import express from 'express';
import { register, login, getMe, updateProfile } from '../controllers/authController';
import { protect } from '../middleware/auth';
import upload from '../config/upload';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.route('/me')
    .get(protect, getMe)
    .put(protect, upload.single('avatar'), updateProfile);

export default router;
