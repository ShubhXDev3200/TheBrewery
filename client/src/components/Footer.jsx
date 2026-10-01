import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import {
  Coffee,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

const Footer = () => {
  const location = useLocation();
  
  if (location.pathname === '/menu' || location.pathname === '/about') {
      return null;
  }

  return (
    <footer className="bg-white dark:bg-dark pt-24 pb-12 border-t border-black/5 dark:border-white/5 transition-colors">
      
      <div className="container mx-auto px-6">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand Section */}
          <div className="space-y-6">

            <Link to="/" className="flex items-center gap-2">

              <div className="p-2 bg-primary rounded-xl text-white">
                <Coffee size={24} />
              </div>

              <span className="text-2xl font-serif font-bold tracking-tight dark:text-cream-light">
                THE <span className="text-accent">BREWERY</span>
              </span>

            </Link>

            <p className="text-dark-light dark:text-cream-dark leading-relaxed">
              Serving the finest artisanal coffee and delicious bites in Bilimora.
              Experience luxury in every cup.
            </p>

            
          </div>

          {/* Quick Links */}
          <div>

            <h4 className="text-xl font-serif font-bold mb-8 dark:text-cream-light">
              Quick Links
            </h4>

            <ul className="space-y-4">

              {['Home', 'Menu', 'About', 'Contact'].map((link) => (
                <li key={link}>
                  <Link
                    to={`/${link.toLowerCase()}`}
                    className="text-dark-light dark:text-cream-dark hover:text-accent transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}

            </ul>

          </div>

          {/* Opening Hours */}
         <div>
  <h4 className="text-xl font-serif font-bold mb-8 dark:text-cream-light">
    Opening Hours
  </h4>

  <ul className="space-y-2 text-dark-light dark:text-cream-dark">

    <li className="flex items-center gap-2">
      <span>Mon - Fri:</span>
      <span>8 AM - 10 PM</span>
    </li>

    <li className="flex items-center gap-2">
      <span>Sat - Sun:</span>
      <span>9 AM - 11 PM</span>
    </li>

  </ul>
</div>
          {/* Contact Info */}
          <div>

            <h4 className="text-xl font-serif font-bold mb-8 dark:text-cream-light">
              Contact Us
            </h4>

            <ul className="space-y-4 text-dark-light dark:text-cream-dark">

              <li className="flex gap-3 items-start">
                <MapPin className="text-accent shrink-0" size={20} />

                <span>
                  Chocolate Heaven, Bilimora, Vankal, Gujarat 396325
                </span>
              </li>

              <li className="flex gap-3 items-center">
                <Phone className="text-accent shrink-0" size={20} />

                <span>+91 XXXXXXXXXX</span>
              </li>

              <li className="flex gap-3 items-center">
                <Mail className="text-accent shrink-0" size={20} />

                <span>hello@thebrewery.co.in</span>
              </li>

            </ul>

          </div>

        </div>

        {/* Bottom Footer */}
<div className="pt-12 border-t border-black/5 dark:border-white/5 text-gray-600 dark:text-white text-sm text-center">

  <p>
    &copy; {new Date().getFullYear()} The Brewery.
    All rights reserved.
  </p>

</div>

      </div>

    </footer>
  );
};

export default Footer;