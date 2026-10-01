import { Response, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import cloudinary from '../config/cloudinary';
import { AuthRequest, IUser } from '../types';

const sendTokenResponse = (user: IUser, statusCode: number, res: Response): void => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '30d' });
    res.status(statusCode).json({
        success: true,
        token,
        data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
        },
    });
};

// @desc    Register user
// @route   POST /api/auth/register
export const register: RequestHandler = async (req, res): Promise<void> => {
    try {
        const { name, email, password, role } = req.body as { name: string; email: string; password: string; role?: string };
        const user = await User.create({ name, email, password, role });
        sendTokenResponse(user, 201, res);
    } catch (err: any) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
export const login: RequestHandler = async (req, res): Promise<void> => {
    try {
        const { email, password } = req.body as { email: string; password: string };
        if (!email || !password) {
            res.status(400).json({ success: false, error: 'Please provide an email and password' });
            return;
        }
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            res.status(401).json({ success: false, error: 'Invalid credentials' });
            return;
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            res.status(401).json({ success: false, error: 'Invalid credentials' });
            return;
        }
        sendTokenResponse(user, 200, res);
    } catch (err: any) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Get current user
// @route   GET /api/auth/me
export const getMe: RequestHandler = async (req: AuthRequest, res): Promise<void> => {
    const user = await User.findById(req.user!.id);
    res.status(200).json({ success: true, data: user });
};

// @desc    Update profile
// @route   PUT /api/auth/me
export const updateProfile: RequestHandler = async (req: AuthRequest, res): Promise<void> => {
    try {
        const { name, phone } = req.body as { name?: string; phone?: string };
        const updateFields: Partial<IUser> = {};

        if (name) updateFields.name = name;
        if (phone) updateFields.phone = phone;

        if (req.file) {
            const b64 = Buffer.from(req.file.buffer).toString('base64');
            const dataURI = `data:${req.file.mimetype};base64,${b64}`;
            const result = await cloudinary.uploader.upload(dataURI, { folder: 'the_brewery', width: 150, crop: 'scale' });
            updateFields.avatar = result.secure_url;
        }

        const user = await User.findByIdAndUpdate(req.user!.id, updateFields, { new: true, runValidators: true });
        res.status(200).json({ success: true, data: user });
    } catch (err: any) {
        res.status(400).json({ success: false, error: err.message });
    }
};
