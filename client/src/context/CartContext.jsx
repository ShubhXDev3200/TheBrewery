import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { toast } from 'react-hot-toast';
import { API_URL } from '../services/api';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({ items: [], totalPrice: 0 });
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { user } = useAuth();


    useEffect(() => {
        if (user) {
            fetchCart();
        } else {
            setCart({ items: [], totalPrice: 0 });
        }
    }, [user]);

    const fetchCart = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${API_URL}/cart`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCart(res.data.data);
        } catch (err) {
            console.error('Error fetching cart:', err);
        }
    };

    const addToCart = async (item) => {
        if (!user) {
            toast.error('Please login to add items to cart');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(`${API_URL}/cart`, {
                menuItemId: item._id,
                name: item.name,
                price: item.price,
                image: item.image,
                quantity: 1
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCart(res.data.data);
            toast.success(`${item.name} added to cart!`);
        } catch (err) {
            toast.error('Failed to add item to cart');
        }
    };

    const updateQuantity = async (itemId, quantity) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.put(`${API_URL}/cart/${itemId}`, { quantity }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCart(res.data.data);
        } catch (err) {
            toast.error('Failed to update quantity');
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.delete(`${API_URL}/cart/${itemId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCart(res.data.data);
            toast.success('Item removed from cart');
        } catch (err) {
            toast.error('Failed to remove item');
        }
    };

    const clearCart = () => {
        setCart({ items: [], totalPrice: 0 });
    };

    return (
        <CartContext.Provider value={{ 
            cart, 
            addToCart, 
            updateQuantity, 
            removeFromCart, 
            clearCart,
            isCartOpen,
            setIsCartOpen
        }}>
            {children}
        </CartContext.Provider>
    );
};
