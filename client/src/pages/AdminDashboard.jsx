import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, LayoutDashboard, Utensils, MessageSquare, TrendingUp } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { API_URL } from '../services/api';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [menuItems, setMenuItems] = useState([]);
    const [stats, setStats] = useState({ products: 0, reviews: 0 });


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const menuRes = await axios.get(`${API_URL}/menu`);
            setMenuItems(menuRes.data.data);
            setStats({ products: menuRes.data.count, reviews: 0 }); // Fetch real review stats later
        } catch (err) {
            console.error("Error fetching admin data:", err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`${API_URL}/menu/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                toast.success('Item deleted successfully');
                fetchData();
            } catch (err) {
                toast.error('Failed to delete item');
            }
        }
    };

    return (
        <div className="pt-32 pb-24 min-h-screen bg-cream-light dark:bg-dark-dark">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="w-full md:w-64 space-y-2">
                        {[
                            { id: 'overview', name: 'Overview', icon: <LayoutDashboard size={20} /> },
                            { id: 'menu', name: 'Manage Menu', icon: <Utensils size={20} /> },
                            { id: 'reviews', name: 'Reviews', icon: <MessageSquare size={20} /> },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-6 py-3 rounded-2xl transition-all ${activeTab === tab.id ? 'bg-primary text-white shadow-lg' : 'hover:bg-white dark:hover:bg-dark-light text-dark-light'}`}
                            >
                                {tab.icon} {tab.name}
                            </button>
                        ))}
                    </div>

                    {/* Main Content */}
                    <div className="flex-grow">
                        {activeTab === 'overview' && (
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="glass p-8 rounded-3xl">
                                    <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl w-fit mb-4">
                                        <Utensils size={24} />
                                    </div>
                                    <h3 className="text-4xl font-bold dark:text-cream-light">{stats.products}</h3>
                                    <p className="text-dark-light">Total Products</p>
                                </div>
                                <div className="glass p-8 rounded-3xl">
                                    <div className="p-3 bg-green-500/10 text-green-500 rounded-xl w-fit mb-4">
                                        <MessageSquare size={24} />
                                    </div>
                                    <h3 className="text-4xl font-bold dark:text-cream-light">{stats.reviews}</h3>
                                    <p className="text-dark-light">Customer Reviews</p>
                                </div>
                                <div className="glass p-8 rounded-3xl">
                                    <div className="p-3 bg-orange-500/10 text-orange-500 rounded-xl w-fit mb-4">
                                        <TrendingUp size={24} />
                                    </div>
                                    <h3 className="text-4xl font-bold dark:text-cream-light">High</h3>
                                    <p className="text-dark-light">Customer Satisfaction</p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'menu' && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-serif font-bold dark:text-cream-light">Menu Items</h2>
                                    <button className="btn-primary py-2 flex items-center gap-2">
                                        <Plus size={20} /> Add New Item
                                    </button>
                                </div>

                                <div className="glass rounded-3xl overflow-hidden">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="bg-primary/5">
                                            <tr>
                                                <th className="px-6 py-4 font-bold dark:text-cream-light">Item</th>
                                                <th className="px-6 py-4 font-bold dark:text-cream-light">Category</th>
                                                <th className="px-6 py-4 font-bold dark:text-cream-light">Price</th>
                                                <th className="px-6 py-4 font-bold dark:text-cream-light">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-black/5 dark:divide-white/5">
                                            {menuItems.map(item => (
                                                <tr key={item._id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                                    <td className="px-6 py-4 flex items-center gap-4">
                                                        <img src={item.image} alt="" className="w-12 h-12 rounded-xl object-cover" />
                                                        <span className="font-medium dark:text-cream-light">{item.name}</span>
                                                    </td>
                                                    <td className="px-6 py-4 text-dark-light">{item.category}</td>
                                                    <td className="px-6 py-4 font-bold dark:text-cream-light">₹{item.price}</td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex gap-2">
                                                            <button className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors"><Edit2 size={18} /></button>
                                                            <button onClick={() => handleDelete(item._id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 size={18} /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
