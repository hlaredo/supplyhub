/**
 * Feature Type Definitions
 * 
 * This module defines the structure for feature cards displayed in the Features section.
 * Features represent the main product offerings and capabilities of the platform.
 */

/**
 * Feature Interface
 * 
 * Represents a product feature or capability with its associated metadata.
 * Used to generate feature cards in the Features component.
 * 
 * Properties:
 * @property {string} title - Display title of the feature
 *                           Should be in uppercase for consistency
 *                           Used as the main heading in feature cards
 * 
 * @property {string} description - Detailed description of the feature
 *                                 Explains the value proposition
 *                                 Displayed in the feature card body
 * 
 * @property {string} icon - Path to the feature's SVG icon
 *                          Must be relative to the public directory
 *                          Should be 24x24px for consistency
 * 
 * @property {'primary' | 'secondary' | 'accent'} color - Brand color theme for the feature
 *                                                       Used for icons and accents
 *                                                       Matches the design system
 * 
 * @example
 * ```typescript
 * const feature: Feature = {
 *   title: "STAY UP TO DATE",
 *   description: "Get the latest supply chain insights",
 *   icon: "/icons/features/news.svg",
 *   color: "primary"
 * };
 * ```
 */
export interface Feature {
  title: string;
  description: string;
  icon: string;
  color: 'primary' | 'secondary' | 'accent';
} 