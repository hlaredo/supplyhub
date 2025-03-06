/**
 * Footer Component
 * 
 * A responsive footer section containing navigation links, social media,
 * and company information organized in a clean grid layout.
 * 
 * Features:
 * - Responsive multi-column layout
 * - Social media links with icons
 * - Quick navigation links
 * - Newsletter subscription
 * - Copyright notice
 * 
 * @component
 */

import Link from 'next/link';
import Image from 'next/image';
import { footerSections, socialLinks } from '../../constants';

/**
 * Footer Component Implementation
 * 
 * @returns {JSX.Element} Rendered footer section
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info & Newsletter */}
          <div className="space-y-4">
            {/* Logo */}
            <Link href="/" className="inline-block">
              <div className="relative w-36 h-8">
                <Image
                  src="/logo.svg"
                  alt="SupplyHub"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
            </Link>
            
            {/* Newsletter Signup */}
            <div className="space-y-2">
              <h3 className="text-white text-sm font-semibold">Stay Updated</h3>
              <form className="flex gap-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-1.5 text-sm rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* Navigation Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="hover:text-blue-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <p className="text-sm">
              © {currentYear} SupplyHub. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-6">
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                  aria-label={`Follow us on ${social.platform}`}
                >
                  <div className="relative w-6 h-6">
                    <Image
                      src={social.icon}
                      alt={social.platform}
                      fill
                      className="object-contain brightness-0 invert"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 