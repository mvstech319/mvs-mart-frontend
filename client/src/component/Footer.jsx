import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Footer Top Section */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-semibold text-yellow-400">MVS-Mart</h2>
            <p className="mt-4 text-gray-400">
              Your one-stop shop for the best products at unbeatable prices. Explore a variety of categories and find what you need today.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-yellow-400">Quick Links</h3>
            <ul className="mt-4 text-gray-400">
              <li><Link to="/" className="hover:text-yellow-400">Home</Link></li>
              <li><Link to="/about" className="hover:text-yellow-400">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-yellow-400">Contact</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-yellow-400">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-yellow-400">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-xl font-semibold text-yellow-400">Customer Support</h3>
            <ul className="mt-4 text-gray-400">
              <li><Link to="/faq" className="hover:text-yellow-400">FAQ</Link></li>
              <li><Link to="/returns" className="hover:text-yellow-400">Returns & Exchanges</Link></li>
              <li><Link to="/shipping" className="hover:text-yellow-400">Shipping Information</Link></li>
              <li><Link to="/contact" className="hover:text-yellow-400">Contact Support</Link></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-xl font-semibold text-yellow-400">Follow Us</h3>
            <div className="flex space-x-4 mt-4 text-gray-400">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">
                <FaFacebookF size={24} />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">
                <FaTwitter size={24} />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">
                <FaInstagram size={24} />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">
                <FaLinkedinIn size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-gray-600 mt-12 pt-6 text-center text-gray-400">
          <p>© 2024 MVS-Mart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
