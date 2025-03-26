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
    title: "AI-Powered Analytics Revolutionizing Supply Chain",
    image: "/images/articles/ai-analytics.jpg",
    summary: "Advanced AI analytics dashboards providing real-time insights into supply chain operations and performance metrics"
  },
  {
    id: 2,
    title: "Machine Learning Transforming Supply Chain Intelligence",
    image: "/images/articles/ai-brain.jpg",
    summary: "How machine learning and artificial intelligence are creating smarter, more efficient supply chain networks"
  },
  {
    id: 3,
    title: "Digital Procurement Solutions",
    image: "/images/articles/procurement.jpg",
    summary: "Modern procurement strategies leveraging digital transformation for better supplier relationships and cost management"
  },
  {
    id: 4,
    title: "Revenue Optimization Through Data",
    image: "/images/articles/revenue.jpg",
    summary: "Data-driven approaches to maximize revenue and optimize supply chain financial performance"
  },
  {
    id: 5,
    title: "Strategic Procurement Management",
    image: "/images/articles/procurement-doc.jpg",
    summary: "Best practices in procurement management for sustainable business growth"
  }
]; 