/**
 * Article Type Definitions
 * 
 * This module defines the core structure for articles in the application.
 * Articles are used primarily in the Hero carousel and related content sections.
 */

/**
 * Article Interface
 * 
 * Represents a single article in the system with all its required properties.
 * Used for both display and data management purposes.
 * 
 * Properties:
 * @property {number} id - Unique identifier for the article
 *                        Must be a positive integer
 *                        Used for article tracking and relationships
 * 
 * @property {string} title - Article headline
 *                           Should be concise yet descriptive
 *                           Used in UI displays and URL generation
 * 
 * @property {string} image - Path to article's image file
 *                           Must be relative to the public directory
 *                           Supports JPG/PNG formats (800x400px)
 * 
 * @property {string} summary - Detailed description of the article
 *                             Provides context and preview content
 *                             Displayed in article cards and previews
 * 
 * @example
 * ```typescript
 * const article: Article = {
 *   id: 1,
 *   title: "Supply Chain Innovation",
 *   image: "/images/article1.jpg",
 *   summary: "Exploring the latest innovations in supply chain management"
 * };
 * ```
 */
export interface Article {
  id: number;
  title: string;
  image: string;
  summary: string;
} 