import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-900 to-blue-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Company Info */}
        <div>
          <h3 className="text-2xl font-bold mb-4 text-amber-300">AK Industries</h3>
          <p className="text-sm text-gray-300">
            Taste the tradition with AK's authentic snacks made with love and hygiene. Freshness in every bite.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h4 className="text-xl font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-amber-400">Home</Link></li>
            <li><Link to="/about" className="hover:text-amber-400">About Us</Link></li>
            <li><Link to="/favorite" className="hover:text-amber-400">Favorite</Link></li>
            <li><Link to="/cart" className="hover:text-amber-400">Cart</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-xl font-semibold mb-3">Contact</h4>
          <ul className="text-sm space-y-2 text-gray-300">
            <li>📞 +91 9876543210</li>
            <li>📧 akindustries@example.com</li>
            <li>📍 Pune, Maharashtra</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-xl font-semibold mb-3">Follow Us</h4>
          <div className="flex gap-4 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-400">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-400">Instagram</a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="text-center text-gray-400 py-4 text-sm border-t border-gray-700">
        © {new Date().getFullYear()} AK Industries. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
