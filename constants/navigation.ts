/**
 * Navigation Constants
 * 
 * Defines navigation links and social media links.
 * Social icons should be SVG format (24x24px) and placed in the social directory.
 * @see DEPLOYMENT.md for icon guidelines
 */

import { FooterSection, SocialLink } from '../types';

export const footerSections: FooterSection[] = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Blog", href: "/blog" }
    ]
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Support", href: "/support" },
      { label: "API", href: "/api" },
      { label: "Partners", href: "/partners" }
    ]
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Security", href: "/security" }
    ]
  }
];

export const socialLinks: SocialLink[] = [
  {
    platform: "LinkedIn",
    icon: "/icons/social/linkedin.svg",
    href: "https://linkedin.com/company/supplyhub"
  },
  {
    platform: "Twitter",
    icon: "/icons/social/twitter.svg",
    href: "https://twitter.com/supplyhub"
  },
  {
    platform: "GitHub",
    icon: "/icons/social/github.svg",
    href: "https://github.com/hlaredo/supplyhub"
  }
]; 