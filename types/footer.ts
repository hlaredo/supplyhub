/**
 * Footer Type Definitions
 * 
 * This module defines the structure for the footer navigation and social links.
 * These types are used to generate the site footer's content and navigation.
 */

/**
 * FooterLink Interface
 * 
 * Represents a single navigation link in the footer.
 * Used for both section links and general navigation.
 * 
 * Properties:
 * @property {string} label - Display text for the link
 *                           Should be clear and concise
 *                           Used as the clickable text
 * 
 * @property {string} href - URL or path for the link
 *                          Can be internal route or external URL
 *                          Must start with "/" for internal routes
 * 
 * @example
 * ```typescript
 * const link: FooterLink = {
 *   label: "About Us",
 *   href: "/about"
 * };
 * ```
 */
export interface FooterLink {
  label: string;
  href: string;
}

/**
 * FooterSection Interface
 * 
 * Represents a group of related links in the footer.
 * Used to organize navigation into logical sections.
 * 
 * Properties:
 * @property {string} title - Section heading
 *                           Groups related links
 *                           Displayed above the links
 * 
 * @property {FooterLink[]} links - Array of links in the section
 *                                 Should be related to the section title
 *                                 Maximum of 6 links per section recommended
 * 
 * @example
 * ```typescript
 * const section: FooterSection = {
 *   title: "Company",
 *   links: [
 *     { label: "About", href: "/about" },
 *     { label: "Careers", href: "/careers" }
 *   ]
 * };
 * ```
 */
export interface FooterSection {
  title: string;
  links: FooterLink[];
}

/**
 * SocialLink Interface
 * 
 * Represents a social media link in the footer.
 * Used for external social media platform links.
 * 
 * Properties:
 * @property {string} platform - Name of the social media platform
 *                              Used for accessibility and tracking
 *                              Should match the icon context
 * 
 * @property {string} href - URL to the social media profile
 *                          Must be a full external URL
 *                          Should include https://
 * 
 * @property {string} icon - Path to the platform's SVG icon
 *                          Must be relative to the public directory
 *                          Should be 24x24px for consistency
 * 
 * @example
 * ```typescript
 * const social: SocialLink = {
 *   platform: "LinkedIn",
 *   href: "https://linkedin.com/company/supplyhub",
 *   icon: "/icons/linkedin.svg"
 * };
 * ```
 */
export interface SocialLink {
  platform: string;
  href: string;
  icon: string;
} 