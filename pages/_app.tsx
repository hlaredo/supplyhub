/**
 * App Component
 * 
 * Next.js custom App component that wraps all pages.
 * Provides global styles and common functionality across the application.
 * 
 * Features:
 * - Global CSS imports
 * - Tailwind CSS integration
 * - Common layout elements
 * 
 * @param {AppProps} props - Next.js app props
 * @param {React.ComponentType} props.Component - The active page component
 * @param {object} props.pageProps - Props for the page component
 * @returns {JSX.Element} Rendered application wrapper
 */

import type { AppProps } from 'next/app';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
} 