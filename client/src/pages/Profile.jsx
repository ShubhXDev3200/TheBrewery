import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone, MapPin, Camera, Save, Package, Clock, CheckCircle, PackageCheck, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_URL } from '../services/api';

const Profile = () => {
    const { user, updateUser } = useAuth();
    const [activeTab, setActiveTab] = useState('settings');
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(true);
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        name: user?.name || '',
        phone: user?.phone || ''
    });
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '');


    useEffect(() => {
        if (activeTab === 'orders') {
            fetchOrders();
        }
    }, [activeTab]);

    const fetchOrders = async () => {
        try {
            setOrdersLoading(true);
            const token = localStorage.getItem('token');
            const res = await axios.get(`${API_URL}/orders`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOrders(res.data.data);
        } catch (err) {
            toast.error('Failed to fetch orders');
        } finally {
            setOrdersLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const data = new FormData();
            data.append('name', formData.name);
            data.append('phone', formData.phone);
            if (avatarFile) {
                data.append('avatar', avatarFile);
            }

            const res = await axios.put(`${API_URL}/auth/me`, data, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            updateUser(res.data.data);
            toast.success('Profile updated successfully!');
        } catch (err) {
            toast.error(err.response?.data?.error || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = (status) => {
        switch(status) {
            case 'Pending': return <Clock size={16} className="text-amber-400" />;
            case 'Processing': return <Package size={16} className="text-blue-400" />;
            case 'Out for Delivery': return <Package size={16} className="text-indigo-400" />;
            case 'Delivered': return <PackageCheck size={16} className="text-green-400" />;
            case 'Completed': return <CheckCircle size={16} className="text-green-400" />;
            default: return <Clock size={16} />;
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 bg-black">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-cream-light mb-4">
                        Your <span className="text-primary">Profile</span>
                    </h1>
                    <p className="text-cream-dark/60">Manage your account settings and view your order history.</p>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8 border-b border-white/10 pb-4">
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`px-6 py-2 rounded-xl text-sm font-bold tracking-wider uppercase transition-all ${
                            activeTab === 'settings' 
                                ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                                : 'text-cream-dark/60 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        Settings
                    </button>
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`px-6 py-2 rounded-xl text-sm font-bold tracking-wider uppercase transition-all ${
                            activeTab === 'orders' 
                                ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                                : 'text-cream-dark/60 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        My Orders
                    </button>
                </div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    {activeTab === 'settings' ? (
                        <motion.div
                            key="settings"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl"
                        >
                            <form onSubmit={handleUpdateProfile} className="space-y-8">
                                {/* Avatar Upload */}
                                <div className="flex items-center gap-8">
                                    <div className="relative group">
                                        <div className="w-24 h-24 rounded-full overflow-hidden bg-dark border-2 border-primary/50 flex items-center justify-center text-3xl font-bold text-primary">
                                            {avatarPreview ? (
                                                <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                                            ) : (
                                                user?.name?.charAt(0).toUpperCase()
                                            )}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition-transform"
                                        >
                                            <Camera size={16} />
                                        </button>
                                        <input 
                                            type="file" 
                                            ref={fileInputRef} 
                                            onChange={handleImageChange} 
                                            accept="image/*" 
                                            className="hidden" 
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-medium text-white">{user?.name}</h3>
                                        <p className="text-cream-dark/60 text-sm">Member since {new Date(user?.createdAt).getFullYear()}</p>
                                    </div>
                                </div>

                                {/* Form Fields */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-cream-dark/80 flex items-center gap-2">
                                            <User size={16} /> Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-cream-dark/80 flex items-center gap-2">
                                            <Phone size={16} /> Phone Number
                                        </label>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                            placeholder="+91 XXXXX XXXXX"
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="btn-primary py-3 px-8 flex items-center gap-2"
                                    >
                                        {loading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="orders"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6"
                        >
                            {ordersLoading ? (
                                <div className="flex justify-center py-20">
                                    <Loader2 className="animate-spin text-primary" size={40} />
                                </div>
                            ) : orders.length === 0 ? (
                                <div className="text-center py-20 bg-white/5 border border-white/10 rounded-3xl">
                                    <Package size={48} className="mx-auto text-cream-dark/30 mb-4" />
                                    <p className="text-xl text-cream-dark/60 font-serif">No orders placed yet.</p>
                                </div>
                            ) : (
                                orders.map((order) => (
                                    <div key={order._id} className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-white/20 transition-colors">
                                        <div className="flex flex-wrap justify-between items-start gap-4 mb-6 border-b border-white/10 pb-4">
                                            <div>
                                                <p className="text-sm text-cream-dark/60 mb-1">Order #{order._id.slice(-8).toUpperCase()}</p>
                                                <p className="text-sm text-cream-light">{new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute:'2-digit' })}</p>
                                            </div>
                                            <div className="flex gap-3">
                                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-cream-light">
                                                    {getStatusIcon(order.paymentStatus)} Payment {order.paymentStatus}
                                                </div>
                                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary">
                                                    {getStatusIcon(order.deliveryStatus)} {order.deliveryStatus}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4 mb-6">
                                            {order.items.map((item, index) => (
                                                <div key={index} className="flex justify-between items-center text-sm">
                                                    <div className="flex items-center gap-3">
                                                        <span className="w-6 h-6 rounded bg-white/10 flex items-center justify-center text-xs text-cream-dark">{item.quantity}x</span>
                                                        <span className="text-cream-light">{item.name}</span>
                                                    </div>
                                                    <span className="text-cream-dark">₹{item.price * item.quantity}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex justify-between items-center pt-4 border-t border-white/10">
                                            <span className="text-cream-dark font-medium">Total Amount</span>
                                            <span className="text-xl font-bold text-primary">₹{order.totalAmount}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Profile;
