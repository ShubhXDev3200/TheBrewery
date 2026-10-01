import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { toast } from 'react-hot-toast';
import { API_URL } from '../services/api';
import { Cart, CartContextType, MenuItem, ApiResponse } from '../types';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<Cart>({ items: [], totalPrice: 0 });
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            fetchCart();
        } else {
            setCart({ items: [], totalPrice: 0 });
        }
    }, [user]);

    const fetchCart = async (): Promise<void> => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get<ApiResponse<Cart>>(`${API_URL}/cart`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCart(res.data.data || { items: [], totalPrice: 0 });
        } catch (err) {
            console.error('Error fetching cart:', err);
        }
    };

    const addToCart = async (item: MenuItem): Promise<void> => {
        if (!user) {
            toast.error('Please login to add items to cart');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const res = await axios.post<ApiResponse<Cart>>(`${API_URL}/cart`, {
                menuItemId: item._id,
                name: item.name,
                price: item.price,
                image: item.image,
                quantity: 1
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCart(res.data.data || { items: [], totalPrice: 0 });
            toast.success(`${item.name} added to cart!`);
        } catch (err) {
            toast.error('Failed to add item to cart');
        }
    };

    const updateQuantity = async (itemId: string, quantity: number): Promise<void> => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.put<ApiResponse<Cart>>(`${API_URL}/cart/${itemId}`, { quantity }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCart(res.data.data || { items: [], totalPrice: 0 });
        } catch (err) {
            toast.error('Failed to update quantity');
        }
    };

    const removeFromCart = async (itemId: string): Promise<void> => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.delete<ApiResponse<Cart>>(`${API_URL}/cart/${itemId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCart(res.data.data || { items: [], totalPrice: 0 });
            toast.success('Item removed from cart');
        } catch (err) {
            toast.error('Failed to remove item');
        }
    };

    const clearCart = (): void => {
        setCart({ items: [], totalPrice: 0 });
    };

    const value: CartContextType = {
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        fetchCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
