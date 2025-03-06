/**
 * Header Component
 * 
 * A responsive navigation header that adapts between desktop and mobile layouts.
 * Provides navigation, branding, and authentication access.
 * 
 * Features:
 * - Responsive design with mobile-first approach
 * - Dropdown menus for main navigation items
 * - Mobile hamburger menu with full-screen navigation
 * - Integrated login button
 * 
 * @component
 */

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * HeaderProps Interface
 * 
 * @interface
 * @property {Function} onLoginClick - Callback function triggered when the login button is clicked
 */
interface HeaderProps {
  onLoginClick: () => void;
}

/**
 * MenuItem Interface
 * 
 * @interface
 * @property {string} title - The display title of the menu item
 * @property {string[]} subItems - Array of submenu items under this menu item
 */
interface MenuItem {
  title: string;
  subItems: string[];
}

// Navigation menu structure
const menuItems: MenuItem[] = [
  {
    title: 'Stay up to date',
    subItems: ['News digests', 'Events', 'Associations and groups', 'Customer stories']
  },
  {
    title: 'Network',
    subItems: ['Tech Start-ups', 'Top Tech Companies', 'Diversity Companies']
  },
  {
    title: 'Generate Value',
    subItems: ['Concepts', 'Templates', 'Process Manuals', 'Tools and SW directory', 'AI Agents']
  }
];

/**
 * Header Component Implementation
 * 
 * @param {HeaderProps} props - Component props
 * @param {Function} props.onLoginClick - Login button click handler
 * @returns {JSX.Element} Rendered header component
 */
export default function Header({ onLoginClick }: HeaderProps) {
  // Controls mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and Slogan Section */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <div className="relative w-48 h-12">
              <Image
                src="/logo.svg"
                alt="SupplyHub Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="ml-3 text-gray-600 text-sm font-medium hidden lg:block">
              Your Supply Chain Intelligence Platform
            </span>
          </Link>
        </div>

        {/* Desktop Navigation Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <div key={item.title} className="relative group">
              {/* Menu Item Button */}
              <button className="text-gray-700 hover:text-blue-600 font-medium">
                {item.title}
              </button>
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-lg rounded-md p-4 w-64">
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem}
                    href={`/${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block py-2 text-gray-600 hover:text-blue-600"
                  >
                    {subItem}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          {/* Login Button */}
          <button
            onClick={onLoginClick}
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </nav>

        {/* Mobile Menu Button (Hamburger) */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          {menuItems.map((item) => (
            <div key={item.title} className="px-4 py-2">
              <div className="font-medium text-gray-800">{item.title}</div>
              <div className="ml-4">
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem}
                    href={`/${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block py-2 text-gray-600"
                  >
                    {subItem}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className="p-4">
            <button
              onClick={onLoginClick}
              className="w-full bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </header>
  );
} 