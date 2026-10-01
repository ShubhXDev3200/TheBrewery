import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, Clock } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Thank you for reaching out! We will get back to you soon.');
    };

    return (
        <div className="pt-32 pb-24 bg-cream-light dark:bg-dark-dark overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 dark:text-cream-light">Get in <span className="text-accent">Touch</span></h1>
                    <p className="text-dark-light dark:text-cream-dark">Have a question or just want to say hello? We'd love to hear from you.</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Contact Form */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass p-8 md:p-12 rounded-3xl"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium dark:text-cream-light ml-1">Name</label>
                                    <input type="text" required className="w-full px-4 py-3 rounded-2xl bg-white/50 dark:bg-dark-light border-none focus:ring-2 focus:ring-primary transition-all dark:text-cream-light" placeholder="Your Name" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium dark:text-cream-light ml-1">Email</label>
                                    <input type="email" required className="w-full px-4 py-3 rounded-2xl bg-white/50 dark:bg-dark-light border-none focus:ring-2 focus:ring-primary transition-all dark:text-cream-light" placeholder="Your Email" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium dark:text-cream-light ml-1">Subject</label>
                                <input type="text" required className="w-full px-4 py-3 rounded-2xl bg-white/50 dark:bg-dark-light border-none focus:ring-2 focus:ring-primary transition-all dark:text-cream-light" placeholder="How can we help?" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium dark:text-cream-light ml-1">Message</label>
                                <textarea rows="4" required className="w-full px-4 py-3 rounded-2xl bg-white/50 dark:bg-dark-light border-none focus:ring-2 focus:ring-primary transition-all dark:text-cream-light" placeholder="Your message..."></textarea>
                            </div>
                            <button type="submit" className="w-full btn-primary py-4 flex items-center justify-center gap-2">
                                <Send size={20} /> Send Message
                            </button>
                        </form>
                    </motion.div>

                    {/* Contact Details & Map */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="glass p-6 rounded-3xl flex items-center gap-4">
                                <div className="p-3 bg-primary/10 rounded-2xl text-primary"><Phone size={24} /></div>
                                <div>
                                    <p className="text-xs text-dark-light dark:text-cream-dark uppercase font-bold">Call Us</p>
                                    <p className="font-bold dark:text-cream-light">+91 XXXXXXXXXX</p>
                                </div>
                            </div>
                            <div className="glass p-6 rounded-3xl flex items-center gap-4">
                                <div className="p-3 bg-primary/10 rounded-2xl text-primary"><Mail size={24} /></div>
                                <div>
                                    <p className="text-xs text-dark-light dark:text-cream-dark uppercase font-bold">Email Us</p>
                                    <p className="font-bold dark:text-cream-light">hello@thebrewery.co.in</p>
                                </div>
                            </div>
                        </div>

                        <div className="glass p-8 rounded-3xl space-y-6">
                            <div className="flex gap-4 items-start">
                                <MapPin className="text-accent shrink-0" size={24} />
                                <div>
                                    <h4 className="font-bold dark:text-cream-light">Our Location</h4>
                                    <p className="text-dark-light dark:text-cream-dark">Chocolate heaven, Bilimora, Vankal, Gujarat 396325</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <Clock className="text-accent shrink-0" size={24} />
                                <div>
                                    <h4 className="font-bold dark:text-cream-light">Opening Hours</h4>
                                    <p className="text-dark-light dark:text-cream-dark">Mon - Fri: 8:00 AM - 10:00 PM</p>
                                    <p className="text-dark-light dark:text-cream-dark">Sat - Sun: 9:00 AM - 11:00 PM</p>
                                </div>
                            </div>
                        </div>

                        {/* Real Google Map Integration */}
                        <div className="h-64 rounded-3xl overflow-hidden glass relative border border-white/10 group">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3728.1188365449065!2d73.0183356!3d20.7625492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0ed09c7ad51f7%3A0xfddd1add849cd9c3!2sThe%20Brewery!5e0!3m2!1sen!2sin!4v1715433600000!5m2!1sen!2sin"
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }} 
                                allowFullScreen="" 
                                loading="lazy" 
                                className="opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                            ></iframe>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
