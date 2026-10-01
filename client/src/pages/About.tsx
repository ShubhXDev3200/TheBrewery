import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Coffee, Heart, Users, Award, Zap, Wifi, ShieldCheck, Leaf } from 'lucide-react';

interface PhilosophyValue {
    icon: ReactNode;
    title: string;
    desc: string;
}

const About: React.FC = () => {
    const values: PhilosophyValue[] = [
        { icon: <Heart className="text-primary" size={32} />, title: 'Made with Love', desc: 'Every recipe is crafted with genuine passion and attention to detail.' },
        { icon: <Coffee className="text-primary" size={32} />, title: 'Quality Beans', desc: 'Only the top 1% of Arabica beans make the cut for our signature blends.' },
        { icon: <Users className="text-primary" size={32} />, title: 'Community First', desc: 'A welcoming space for everyone in Bilimora to connect and share stories.' },
        { icon: <Award className="text-primary" size={32} />, title: 'Expert Baristas', desc: 'Skilled hands that know the art of brewing the perfect cup every single time.' },
        { icon: <Zap className="text-primary" size={32} />, title: 'Quick Service', desc: 'Perfect for your morning rush. Efficient service without compromising quality.' },
        { icon: <Wifi className="text-primary" size={32} />, title: 'Cozy Workspace', desc: 'High-speed internet and quiet corners for your productive deep-work sessions.' },
        { icon: <ShieldCheck className="text-primary" size={32} />, title: 'Safe & Hygienic', desc: 'We maintain the highest standards of cleanliness and food safety protocols.' },
        { icon: <Leaf className="text-primary" size={32} />, title: 'Eco-Friendly', desc: 'Committed to sustainability through plastic-free packaging and ethical sourcing.' },
    ];

    return (
        <div className="pt-32 pb-24 bg-cream-light dark:bg-dark-dark overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
                    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="lg:w-1/2">
                        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-8 text-white">
                            Our Story of <br />
                            <span className="text-accent italic">Passion & Aroma</span>
                        </h1>
                        <div className="space-y-6 text-lg text-cream-dark/80 leading-relaxed font-light">
                            <p>
                                Founded in the heart of Bilimora, <span className="text-white font-medium">The Brewery</span> began with a simple dream: to serve the perfect cup of coffee in a space that feels like home. Our journey started with a single vintage roaster and a profound obsession with finding the world's most exceptional beans.
                            </p>
                            <p>
                                We believe that coffee is more than just a drink—it's a ritual, a conversation starter, and a moment of peace in a busy world. We spent years building direct relationships with high-altitude estates, ensuring that every bean we source reflects our reverence for the land and the hands that tend to it.
                            </p>
                            <p>
                                Every cup we brew is a testament to our commitment to quality, community, and the timeless art of slow living. At The Brewery, we invite you to slow down, breathe in the aroma, and join us in celebrating the extraordinary in every sip.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="lg:w-1/2 relative">
                        <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border border-white/5">
                            <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80" alt="Cafe Interior" className="w-full" />
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-accent/20 rounded-full blur-[100px] -z-0" />
                        <div className="absolute -top-10 -left-10 w-80 h-80 bg-primary/20 rounded-full blur-[100px] -z-0" />
                    </motion.div>
                </div>

                <div className="text-center mb-20">
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white">
                        Our <span className="text-accent italic">Philosophy</span>
                    </motion.h2>
                    <div className="h-1 bg-accent w-20 mx-auto" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {values.map((value, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            transition={{ delay: i * 0.05 }}
                            className="glass p-8 rounded-[2rem] border border-white/5 hover:border-accent/30 transition-all duration-500"
                        >
                            <div className="mb-6 p-4 bg-primary/10 rounded-2xl w-fit mx-auto lg:mx-0">{value.icon}</div>
                            <h3 className="text-xl font-serif font-bold mb-4 text-cream-light">{value.title}</h3>
                            <p className="text-cream-dark/60 text-sm leading-relaxed">{value.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;
