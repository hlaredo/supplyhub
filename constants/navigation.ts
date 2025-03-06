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
    href: "https://linkedin.com/company/supplyhub",
    icon: "/icons/linkedin.svg"
  },
  {
    platform: "Twitter",
    href: "https://twitter.com/supplyhub",
    icon: "/icons/twitter.svg"
  },
  {
    platform: "GitHub",
    href: "https://github.com/supplyhub",
    icon: "/icons/github.svg"
  }
]; 