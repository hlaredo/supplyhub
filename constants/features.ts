/**
 * Feature Constants
 * 
 * Defines the main features displayed in the Features section.
 * Icons should be SVG format (24x24px) and placed in the features directory.
 * @see DEPLOYMENT.md for icon guidelines
 */

import { Feature } from '../types';

export const features: Feature[] = [
  {
    title: "STAY UP TO DATE",
    icon: "/icons/features/news.svg",
    description: "Get real-time updates on market trends, pricing, and supply chain disruptions",
    color: "primary"
  },
  {
    title: "EXPAND YOUR NETWORK",
    icon: "/icons/features/network.svg",
    description: "Connect with verified suppliers and buyers from around the globe",
    color: "secondary"
  },
  {
    title: "MAXIMIZE VALUE",
    icon: "/icons/features/value.svg",
    description: "Optimize your supply chain with AI-powered insights and recommendations",
    color: "accent"
  }
]; 