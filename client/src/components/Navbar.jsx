import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Coffee, User, LogOut, ShoppingBag, Settings, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { user, logout } = useAuth();
    const { cart, setIsCartOpen } = useCart();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Always force dark mode
        document.documentElement.classList.add('dark');
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Menu', path: '/menu' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    const totalCartItems = cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-3 glass' : 'py-5 bg-transparent'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 group">
                    <motion.div
                        whileHover={{ rotate: 20 }}
                        className="p-2 bg-primary rounded-xl text-white"
                    >
                        <Coffee size={24} />
                    </motion.div>
                   <span
  className={`text-2xl font-serif font-bold tracking-tight ${
    scrolled ? 'text-amber-100' : 'text-stone-200'
  }`}
>
  THE{" "}
  <span className="text-amber-400">
    BREWERY
  </span>
</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`font-medium transition-colors hover:text-accent ${location.pathname === link.path ? 'text-accent' : 'text-cream-light'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    
                    <div className="flex items-center gap-6 ml-4">
                        {/* Cart Button */}
                        <button 
                            onClick={() => setIsCartOpen(true)}
                            className="relative text-cream-light hover:text-primary transition-colors p-2"
                        >
                            <ShoppingBag size={24} />
                            {totalCartItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg">
                                    {totalCartItems}
                                </span>
                            )}
                        </button>

                        {user ? (
                            <div className="relative">
                                <button 
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center gap-3 p-1 pr-3 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 transition-all"
                                >
                                    <div className="w-8 h-8 rounded-full overflow-hidden bg-primary/20 flex items-center justify-center text-primary font-bold">
                                        {user.avatar ? (
                                            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                        ) : (
                                            user.name.charAt(0).toUpperCase()
                                        )}
                                    </div>
                                    <span className="text-sm font-medium text-cream-light">{user.name.split(' ')[0]}</span>
                                </button>

                                {/* Profile Dropdown */}
                                <AnimatePresence>
                                    {isProfileOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 mt-3 w-64 glass rounded-2xl border border-white/10 shadow-2xl overflow-hidden py-2"
                                        >
                                            <div className="px-4 py-3 border-b border-white/10">
                                                <p className="text-sm text-cream-light font-medium">{user.name}</p>
                                                <p className="text-xs text-cream-dark/60 truncate">{user.email}</p>
                                            </div>
                                            
                                            <div className="py-2">
                                                <Link 
                                                    to="/profile" 
                                                    onClick={() => setIsProfileOpen(false)}
                                                    className="flex items-center gap-3 px-4 py-2 text-sm text-cream-dark hover:text-white hover:bg-white/5 transition-colors"
                                                >
                                                    <Settings size={16} /> Profile & Orders
                                                </Link>
                                                {user.role === 'admin' && (
                                                    <Link 
                                                        to="/admin" 
                                                        onClick={() => setIsProfileOpen(false)}
                                                        className="flex items-center gap-3 px-4 py-2 text-sm text-cream-dark hover:text-white hover:bg-white/5 transition-colors"
                                                    >
                                                        <LayoutDashboard size={16} /> Admin Dashboard
                                                    </Link>
                                                )}
                                            </div>
                                            
                                            <div className="pt-2 border-t border-white/10">
                                                <button 
                                                    onClick={() => {
                                                        setIsProfileOpen(false);
                                                        logout();
                                                    }} 
                                                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors"
                                                >
                                                    <LogOut size={16} /> Logout
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link to="/login" className="btn-primary py-2 px-6">
                                Login
                            </Link>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-4">
                    <button 
                        onClick={() => setIsCartOpen(true)}
                        className="relative text-cream-light p-2"
                    >
                        <ShoppingBag size={24} />
                        {totalCartItems > 0 && (
                            <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                {totalCartItems}
                            </span>
                        )}
                    </button>
                    <button className="p-2 text-white" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass overflow-hidden"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {user && (
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 mb-2">
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                                        {user.avatar ? (
                                            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                        ) : (
                                            user.name.charAt(0).toUpperCase()
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">{user.name}</p>
                                        <p className="text-sm text-cream-dark/60">{user.email}</p>
                                    </div>
                                </div>
                            )}

                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg font-medium text-white"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <hr className="border-white/10" />
                            
                            {user ? (
                                <div className="flex flex-col gap-3">
                                    <Link 
                                        to="/profile" 
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-3 text-lg font-medium text-white"
                                    >
                                        <Settings size={20} /> Profile Settings
                                    </Link>
                                    {user.role === 'admin' && (
                                        <Link 
                                            to="/admin" 
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center gap-3 text-lg font-medium text-white"
                                        >
                                            <LayoutDashboard size={20} /> Admin Dashboard
                                        </Link>
                                    )}
                                    <button 
                                        onClick={() => {
                                            setIsOpen(false);
                                            logout();
                                        }} 
                                        className="btn-outline py-2 border-white/20 text-red-400 mt-4 flex justify-center items-center gap-2"
                                    >
                                        <LogOut size={20} /> Logout
                                    </button>
                                </div>
                            ) : (
                                <Link to="/login" onClick={() => setIsOpen(false)} className="btn-primary py-2 w-full text-center mt-4">Login</Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
