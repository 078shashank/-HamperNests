import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MapPin, Phone, Mail, Instagram, Facebook, Twitter, Gift } from 'lucide-react';

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: "Quick Links",
      links: [
        { name: "Home", href: "#" },
        { name: "Collections", href: "#" },
        { name: "Custom Hampers", href: "#" },
        { name: "Corporate Gifts", href: "#" },
        { name: "About Us", href: "#" }
      ]
    },
    {
      title: "Categories",
      links: [
        { name: "Romance", href: "#" },
        { name: "Birthdays", href: "#" },
        { name: "New Parents", href: "#" },
        { name: "Wellness", href: "#" },
        { name: "Gourmet", href: "#" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Contact Us", href: "#" },
        { name: "Shipping Info", href: "#" },
        { name: "Returns", href: "#" },
        { name: "Size Guide", href: "#" },
        { name: "FAQ", href: "#" }
      ]
    }
  ];

  const socialLinks = [
    { icon: Instagram, href: "#", color: "hover:text-pink-500" },
    { icon: Facebook, href: "#", color: "hover:text-blue-500" },
    { icon: Twitter, href: "#", color: "hover:text-sky-500" }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-pink-300">
          <Gift size={100} />
        </div>
        <div className="absolute bottom-20 right-20 text-rose-300">
          <Heart size={80} />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">HN</span>
                  </div>
                  <span className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent font-playfair">
                    HamperNests
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Creating meaningful moments through thoughtfully curated gift hampers. 
                  Every hamper tells a story, every gift carries love.
                </p>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex items-center gap-3 text-gray-300 hover:text-pink-400 transition-colors">
                  <MapPin size={18} />
                  <span>123 Gift Avenue, Hamper City, HC 12345</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 hover:text-pink-400 transition-colors">
                  <Phone size={18} />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 hover:text-pink-400 transition-colors">
                  <Mail size={18} />
                  <span>hello@hampernests.com</span>
                </div>
              </motion.div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <h3 className="text-xl font-bold mb-6 font-playfair text-pink-400">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <motion.a
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-300 block"
                        whileHover={{ x: 5 }}
                      >
                        {link.name}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <motion.div
              className="text-gray-400 text-center md:text-left"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p>© 2024 HamperNests. All rights reserved. Made with <Heart size={16} className="inline text-pink-400" /> for gift lovers.</p>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-gray-400 mr-2">Follow us:</span>
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 transition-all duration-300 ${social.color}`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <IconComponent size={18} />
                  </motion.a>
                );
              })}
            </motion.div>

            {/* Legal Links */}
            <motion.div
              className="flex items-center gap-6 text-sm text-gray-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;