import { RequestHandler } from 'express';
import MenuItem from '../models/MenuItem';

// @desc    Get all menu items  GET /api/menu  Public
export const getMenuItems: RequestHandler = async (_req, res): Promise<void> => {
    try {
        const menuItems = await MenuItem.find();
        res.status(200).json({ success: true, count: menuItems.length, data: menuItems });
    } catch (err: any) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Get single menu item  GET /api/menu/:id  Public
export const getMenuItem: RequestHandler = async (req, res): Promise<void> => {
    try {
        const menuItem = await MenuItem.findById(req.params.id);
        if (!menuItem) { res.status(404).json({ success: false, error: 'Item not found' }); return; }
        res.status(200).json({ success: true, data: menuItem });
    } catch (err: any) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Create menu item  POST /api/menu  Private/Admin
export const createMenuItem: RequestHandler = async (req, res): Promise<void> => {
    try {
        const menuItem = await MenuItem.create(req.body);
        res.status(201).json({ success: true, data: menuItem });
    } catch (err: any) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Update menu item  PUT /api/menu/:id  Private/Admin
export const updateMenuItem: RequestHandler = async (req, res): Promise<void> => {
    try {
        const menuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!menuItem) { res.status(404).json({ success: false, error: 'Item not found' }); return; }
        res.status(200).json({ success: true, data: menuItem });
    } catch (err: any) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Delete menu item  DELETE /api/menu/:id  Private/Admin
export const deleteMenuItem: RequestHandler = async (req, res): Promise<void> => {
    try {
        const menuItem = await MenuItem.findByIdAndDelete(req.params.id);
        if (!menuItem) { res.status(404).json({ success: false, error: 'Item not found' }); return; }
        res.status(200).json({ success: true, data: {} });
    } catch (err: any) {
        res.status(400).json({ success: false, error: err.message });
    }
};
