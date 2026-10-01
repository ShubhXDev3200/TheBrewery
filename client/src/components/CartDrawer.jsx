import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2, CreditCard, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_URL } from '../services/api';

// Dynamically load Razorpay script
const loadRazorpay = () => {
    return new Promise((resolve) => {
        if (window.Razorpay) return resolve(true);
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

const CartDrawer = () => {
    const { isCartOpen, setIsCartOpen, cart, updateQuantity, removeFromCart, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [paying, setPaying] = useState(false);

    const grandTotal = cart.totalPrice;

    const handleRazorpayPayment = async () => {
        if (!user) {
            toast.error('Please login to continue');
            return;
        }

        setPaying(true);

        try {
            const loaded = await loadRazorpay();
            if (!loaded) {
                toast.error('Payment gateway failed to load. Check your internet.');
                setPaying(false);
                return;
            }

            const token = localStorage.getItem('token');

            // Step 1: Create Razorpay order on backend
            const { data } = await axios.post(
                `${API_URL}/payment/create-order`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Step 2: Open Razorpay checkout
            const options = {
                key: data.keyId,
                amount: data.amount,
                currency: data.currency,
                name: 'The Brewery',
                description: 'Your delicious order ☕',
                image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&h=100&fit=crop',
                order_id: data.orderId,
                handler: async (response) => {
                    try {
                        // Step 3: Verify payment on backend
                        await axios.post(
                            `${API_URL}/payment/verify`,
                            {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            },
                            { headers: { Authorization: `Bearer ${token}` } }
                        );

                        clearCart();
                        setIsCartOpen(false);
                        toast.success('🎉 Payment successful! Order placed.', { duration: 4000 });
                        navigate('/profile');
                    } catch (err) {
                        toast.error('Payment verification failed. Contact support.');
                    } finally {
                        setPaying(false);
                    }
                },
                prefill: {
                    name: user?.name || '',
                    email: user?.email || '',
                },
                theme: {
                    color: '#C8976E', // accent color matches the app
                    backdrop_color: 'rgba(0,0,0,0.85)',
                },
                modal: {
                    ondismiss: () => {
                        setPaying(false);
                        toast('Payment cancelled.', { icon: '⚠️' });
                    },
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', (response) => {
                toast.error(`Payment failed: ${response.error.description}`);
                setPaying(false);
            });
            rzp.open();
        } catch (err) {
            toast.error(err.response?.data?.error || 'Could not initiate payment');
            setPaying(false);
        }
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-dark border-l border-white/10 shadow-2xl z-[70] flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <h2 className="text-2xl font-serif font-bold text-cream-light flex items-center gap-3">
                                <ShoppingBag className="text-primary" /> Your Cart
                            </h2>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 rounded-full hover:bg-white/5 transition-colors text-cream-dark/60 hover:text-white"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cart.items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                                    <ShoppingBag size={64} className="mb-4" />
                                    <p className="text-xl font-serif">Your cart is empty</p>
                                </div>
                            ) : (
                                cart.items.map((item) => (
                                    <div key={item._id} className="flex gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            loading="lazy"
                                            className="w-20 h-20 object-cover rounded-xl"
                                        />
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-medium text-cream-light line-clamp-1">{item.name}</h3>
                                                <button
                                                    onClick={() => removeFromCart(item._id)}
                                                    className="text-red-400 hover:text-red-300 transition-colors p-1"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                            <div className="text-primary font-bold">₹{item.price}</div>
                                            <div className="flex items-center gap-3 bg-black/40 w-fit rounded-lg p-1 border border-white/5">
                                                <button
                                                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                    className="p-1 hover:bg-white/10 rounded-md transition-colors"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="w-6 text-center text-sm">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                    className="p-1 hover:bg-white/10 rounded-md transition-colors"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cart.items.length > 0 && (
                            <div className="p-6 border-t border-white/10 bg-dark-dark/50">
                                <div className="space-y-3 mb-6 text-sm">
                                    <div className="flex justify-between text-cream-dark/80">
                                        <span>Subtotal</span>
                                        <span>₹{cart.totalPrice}</span>
                                    </div>
                                    <div className="pt-3 border-t border-white/10 flex justify-between text-lg font-bold text-white">
                                        <span>Grand Total</span>
                                        <span className="text-primary">₹{grandTotal}</span>
                                    </div>
                                </div>

                                {/* Razorpay Pay Button */}
                                <button
                                    onClick={handleRazorpayPayment}
                                    disabled={paying}
                                    className="w-full py-4 bg-primary text-white rounded-xl font-bold tracking-widest uppercase hover:bg-primary-dark transition-all duration-300 shadow-lg shadow-primary/30 flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {paying ? (
                                        <>
                                            <Loader2 size={20} className="animate-spin" />
                                            Opening Payment...
                                        </>
                                    ) : (
                                        <>
                                            <CreditCard size={20} />
                                            Pay ₹{grandTotal} Securely
                                        </>
                                    )}
                                </button>

                                {/* Trust badge */}
                                <p className="text-center text-xs text-white/30 mt-3 flex items-center justify-center gap-1">
                                    🔒 Secured by Razorpay · UPI · Cards · Wallets
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
