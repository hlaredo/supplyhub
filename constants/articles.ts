/**
 * Article Constants
 * 
 * Defines the main articles displayed in the Hero carousel section.
 * Images should follow the standard dimensions (800x400px) and be placed in the articles directory.
 * @see DEPLOYMENT.md for image guidelines
 */

import { Article } from '../types';

export const articles: Article[] = [
  {
    id: 1,
    title: "Revolutionary AI Solutions Transform Supply Chain Management",
    image: "/images/articles/placeholder-1.svg",
    summary: "How artificial intelligence is reshaping the future of supply chain operations"
  },
  {
    id: 2,
    title: "Sustainable Practices in Modern Supply Chains",
    image: "/images/articles/placeholder-2.svg",
    summary: "Discover how leading companies are implementing eco-friendly practices, reducing carbon footprints, and creating sustainable supply chain networks for a greener future"
  },
  {
    id: 3,
    title: "Digital Transformation in Procurement",
    image: "/images/articles/placeholder-3.svg",
    summary: "Explore the latest digital procurement technologies, from e-sourcing platforms to blockchain integration, revolutionizing how businesses manage their purchasing processes"
  },
  {
    id: 4,
    title: "Building Supply Chain Resilience",
    image: "/images/articles/placeholder-4.svg",
    summary: "Learn key strategies for creating robust and adaptable supply chains that can withstand global disruptions, from risk management to diversification tactics"
  },
  {
    id: 5,
    title: "Innovation in Supply Chain Technology",
    image: "/images/articles/placeholder-5.svg",
    summary: "Emerging technologies reshaping supply chain management"
  }
]; 