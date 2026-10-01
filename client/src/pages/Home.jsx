import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, ArrowRight, Star, Clock, MapPin, Phone, Users, Utensils, Zap, Heart, Award, Wifi, ShieldCheck, Leaf, Music, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import MenuCard from '../components/MenuCard';

const Home = () => {
    const featuredItems = [
        { _id: 'f1', name: 'Signature Gold Cappuccino', price: 180, category: 'Coffee', description: 'Double shot of premium Arabica topped with 24k gold dust and velvety foam.', image: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/11/ac/ae/c7.jpg', isPopular: true },
        { _id: 'f2', name: 'Mexican Nachos', price: 260, category: 'Snacks', description: 'Cheese Crunch and loaded with Mexican flavor in every bite.', image: 'https://honestcooking.com/wp-content/uploads/2026/04/crunchy-mexican-salad-cheese-nacho-chips-recipe-hc-2026.jpg', isPopular: true },
        { _id: 'f3', name: 'Blueberry Smoothie', price: 180, category: 'Smoothies', description: 'Antioxidant-rich blueberry goodness with fresh berries.', image: 'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2019/03/Blueberry-Smoothie-main.jpg' },
    ];

    const stats = [
        { label: 'Cups Brewed', value: '25k+', icon: <Coffee size={24} /> },
        { label: 'Happy Guests', value: '12k+', icon: <Users size={24} /> },
        { label: 'Artisan Blends', value: '45+', icon: <Zap size={24} /> },
    ];

    const testimonials = [
        { name: "Rahul Sharma", role: "Coffee Enthusiast", text: "The best coffee in Bilimora! The ambiance is amazing and the Gold Cappuccino is a masterpiece.", rating: 5 },
        { name: "Priya Patel", role: "Food Blogger", text: "I love their pasta and the new mocktail range. A perfect spot for both working and chilling with friends.", rating: 5 },
        { name: "Amit Shah", role: "Local Guide", text: "Quality and consistency are what define The Brewery. Highly recommended for any coffee lover.", rating: 5 },
    ];

    return (
        <div className="overflow-hidden bg-dark-dark">
            {/* Hero Section */}
            <section className="relative h-[110vh] flex items-center justify-center pt-20 overflow-hidden">
                {/* Background with Parallax Zoom */}
                <motion.div 
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute inset-0 z-0"
                >
                    <img 
                        src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
                        alt="Cafe Background" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-dark-dark"></div>
                </motion.div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <motion.span 
                            initial={{ letterSpacing: "0.5em", opacity: 0 }}
                            animate={{ letterSpacing: "0.1em", opacity: 1 }}
                            transition={{ duration: 1.5 }}
                            className="inline-block py-2 px-6 rounded-full bg-white/5 border border-white/10 text-accent font-serif italic mb-8 backdrop-blur-md"
                        >
                            Since 2024 • Bilimora
                        </motion.span>
                        
                        <h1 className="text-6xl md:text-9xl font-serif font-bold mb-8 leading-tight text-white">
                            The <span className="text-accent">Art</span> of <br />
                            <span className="italic font-light text-cream-light/90">Fine Coffee</span>
                        </h1>
                        
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 1 }}
                            className="text-lg md:text-2xl text-cream-light/60 max-w-3xl mx-auto mb-12 font-light leading-relaxed"
                        >
                            Where tradition meets innovation. Experience the most sophisticated coffee culture in the heart of Gujarat.
                        </motion.p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link to="/menu" className="btn-secondary px-10 py-5 text-lg group">
                                View Our Menu 
                                <motion.span
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                >
                                    <ArrowRight className="inline ml-2" />
                                </motion.span>
                            </Link>
                            <Link to="/about" className="glass px-10 py-5 rounded-full font-semibold hover:bg-white hover:text-black transition-all">
                                Our Story
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Floating Elements */}
                <motion.div 
                    animate={{ y: [0, -30, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 right-[5%] hidden xl:block"
                >
                    <div className="glass p-6 rounded-3xl border border-white/20 backdrop-blur-xl">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-accent rounded-2xl text-white"><Star size={24} fill="currentColor" /></div>
                            <div>
                                <p className="text-xl font-bold text-white">4.9/5.0</p>
                                <p className="text-xs text-cream-dark uppercase tracking-widest">Customer Love</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div 
                    animate={{ y: [0, 30, 0], rotate: [0, -5, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-1/4 left-[5%] hidden xl:block"
                >
                    <div className="glass p-6 rounded-3xl border border-white/20 backdrop-blur-xl">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary rounded-2xl text-white"><Coffee size={24} /></div>
                            <div>
                                <p className="text-xl font-bold text-white">100%</p>
                                <p className="text-xs text-cream-dark uppercase tracking-widest">Arabica Beans</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div 
                    animate={{ y: [0, 10, 0], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-accent to-transparent"></div>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-accent">Scroll</span>
                </motion.div>
            </section>

            {/* Why Choose Us */}
            <section className="py-32 relative bg-dark-dark overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full"></div>
                
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:w-1/2"
                        >
                            <span className="text-accent uppercase tracking-[0.3em] text-sm mb-4 block font-bold">Why Choose Us</span>
                            <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8 text-white leading-tight">
                                Crafting <span className="text-accent italic">Moments</span> <br />
                                and Memories
                            </h2>
                            <p className="text-cream-dark/60 text-lg mb-12 font-light leading-relaxed">
                                At The Brewery, we believe that coffee is more than just a drink—it's an experience. We meticulously source our beans and craft our menu to bring you the finest flavors in a setting that feels like home.
                            </p>
                            
                            <div className="space-y-6">
                                {[
                                    "Artisanal Coffee Blends",
                                    "Sustainable Sourcing",
                                    "Professional Baristas",
                                    "Modern & Cozy Atmosphere"
                                ].map((text, i) => (
                                    <div key={i} className="flex items-center gap-4 text-white/80">
                                        <CheckCircle2 className="text-accent" size={24} />
                                        <span className="text-lg font-light">{text}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, ease: "easeOut" }}
                            className="lg:w-1/2 relative"
                        >
                            <div className="relative z-10 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group">
                                <img 
                                    src="/cafe.jpeg"
                                    alt="Coffee Craft" 
                                    className="w-full h-[700px] object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                                />
                                {/* Gradient overlay at bottom */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

                                {/* Floating badge inside image */}
                                <div className="absolute bottom-8 left-8 flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3">
                                    <div className="p-2 bg-accent rounded-xl">
                                        <Coffee size={18} className="text-white" />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-sm">Handcrafted</p>
                                        <p className="text-white/60 text-xs">with Premium Beans</p>
                                    </div>
                                </div>
                            </div>

                            {/* Glow blobs */}
                            <div className="absolute -top-10 -right-10 w-72 h-72 bg-accent/20 blur-[100px] rounded-full -z-10"></div>
                            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-primary/20 blur-[100px] rounded-full -z-10"></div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Featured Section */}
            <section className="py-32 bg-dark-dark/50 border-y border-white/5">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div>
                            <span className="text-accent uppercase tracking-[0.3em] text-sm mb-4 block font-bold">The Best Sellers</span>
                            <h2 className="text-5xl md:text-6xl font-serif font-bold text-white">Signature <span className="text-accent italic">Creations</span></h2>
                        </div>
                        <Link to="/menu" className="group flex items-center gap-3 text-cream-light hover:text-accent transition-colors text-lg uppercase tracking-widest font-bold">
                            View Full Menu <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10">
                        {featuredItems.map((item, index) => (
                            <motion.div
                                key={item._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <MenuCard item={item} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-24 bg-dark-dark relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 bg-white/5 border border-white/10 rounded-[3rem] p-12 backdrop-blur-md">
                        {stats.map((stat, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="text-center flex flex-col items-center gap-4"
                            >
                                <div className="p-4 bg-accent/20 text-accent rounded-2xl mb-2">
                                    {stat.icon}
                                </div>
                                <h4 className="text-5xl font-serif font-bold text-white">{stat.value}</h4>
                                <p className="text-cream-dark/60 uppercase tracking-widest text-sm font-bold">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0">
                    <img 
                        src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1920&q=80" 
                        alt="Cafe Ambience" 
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-dark-dark via-dark-dark/80 to-transparent"></div>
                </div>
                
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-2xl">
                        <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8 text-white">The Perfect <br /> <span className="text-accent italic">Sip</span> Awaits</h2>
                        <p className="text-cream-light/70 text-xl mb-12 font-light leading-relaxed">
                            Whether you're starting your morning or winding down your evening, our curated space provides the perfect backdrop for your daily coffee ritual.
                        </p>
                        <div className="grid grid-cols-2 gap-8 mb-12">
                            <div className="flex items-center gap-4 text-white">
                                <Wifi className="text-accent" />
                                <span className="font-light">Free High-Speed Wifi</span>
                            </div>
                            <div className="flex items-center gap-4 text-white">
                                <Music className="text-accent" />
                                <span className="font-light">Soulful Music</span>
                            </div>
                        </div>
                        <Link to="/contact" className="btn-secondary px-12 py-5 text-lg inline-block">Visit Us Today</Link>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-32 bg-dark-dark">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <span className="text-accent uppercase tracking-[0.3em] text-sm mb-4 block font-bold">Guest Reviews</span>
                        <h2 className="text-5xl md:text-6xl font-serif font-bold text-white">What People <span className="text-accent italic">Say</span></h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10">
                        {testimonials.map((t, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="glass p-10 rounded-[2.5rem] border border-white/5 relative"
                            >
                                <div className="flex gap-1 mb-6">
                                    {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill="#E8B07D" className="text-accent" />)}
                                </div>
                                <p className="text-cream-light/80 text-lg italic mb-8 font-light">"{t.text}"</p>
                                <div>
                                    <h5 className="text-white font-bold text-xl">{t.name}</h5>
                                    <p className="text-accent/60 text-sm font-bold uppercase tracking-widest">{t.role}</p>
                                </div>
                                <div className="absolute top-10 right-10 opacity-5">
                                    <Coffee size={80} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            
        </div>
    );
};

export default Home;

