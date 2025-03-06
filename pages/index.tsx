/**
 * Home Component - Main Landing Page
 * 
 * This is the main entry point of the application that serves as the landing page.
 * It orchestrates the layout and state management for the main sections of the website.
 * 
 * Component Structure:
 * - Header: Navigation and branding (layout)
 * - Hero: Featured articles carousel (features)
 * - Features: Main product offerings (features)
 * - Footer: Site navigation and info (layout)
 * - Login Modal: Authentication interface (auth)
 * 
 * State Management:
 * - Manages login modal visibility through isLoginOpen state
 * - Controls modal display through setIsLoginOpen callback
 * 
 * @returns {JSX.Element} The rendered landing page
 */

import { useState } from 'react';
import Head from 'next/head';
import { Header, Footer } from '../components/layout';
import { Hero, Features } from '../components/features';
import { LoginModal } from '../components/auth';

export default function Home() {
  // Controls the visibility state of the login modal
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Next.js Head component for managing meta tags */}
      <Head>
        <title>SupplyHub - Your Supply Chain Intelligence Platform</title>
        <meta name="description" content="Stay up to date with supply chain news, network with innovative companies, and generate value with automated tools." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header component with login trigger */}
      <Header onLoginClick={() => setIsLoginOpen(true)} />
      
      <main className="flex-grow">
        {/* Hero section with rotating articles */}
        <Hero />
        {/* Features section with three main offerings */}
        <Features />
      </main>

      {/* Footer with navigation and info */}
      <Footer />

      {/* Login modal with controlled visibility */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
} 