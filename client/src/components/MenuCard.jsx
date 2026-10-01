import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

const MenuCard = ({ item }) => {
    const { addToCart } = useCart();

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
            }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -8 }}
            className="group relative bg-[#1a1a1a] rounded-[2rem] overflow-hidden border border-white/5 shadow-sm hover:shadow-2xl transition-all duration-500"
        >
            {/* Image Container */}
            <div className="relative h-72 overflow-hidden">
                <img 
                    src={item.image} 
                    alt={item.name} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {item.isPopular && (
                        <span className="bg-accent text-white text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5">
                            <Star size={12} fill="currentColor" /> Trending
                        </span>
                    )}
                    <span className="bg-black/60 text-white text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/20">
                        {item.category}
                    </span>
                </div>

                <div className="absolute bottom-4 right-4 bg-primary text-white px-4 py-2 rounded-2xl font-serif font-bold text-lg shadow-xl translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    ₹{item.price}
                </div>
            </div>

            {/* Content Container */}
            <div className="p-8">
                <h3 className="text-2xl font-serif font-bold mb-3 text-cream-light group-hover:text-primary transition-colors">
                    {item.name}
                </h3>
                <p className="text-cream-dark/60 text-sm leading-relaxed mb-8 line-clamp-2 font-light">
                    {item.description}
                </p>
                
                <button 
                    onClick={() => addToCart(item)}
                    className="w-full py-4 rounded-2xl border border-primary/20 text-primary font-bold text-sm tracking-widest uppercase hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-3"
                >
                    <ShoppingCart size={18} /> Add to Cart
                </button>
            </div>
        </motion.div>
    );
};

export default MenuCard;
