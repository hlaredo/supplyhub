/**
 * Theme Configuration Interface
 * Central configuration for all customizable aspects of the website
 */

// Logo Configuration
export const logoConfig = {
  // Main logo settings
  main: {
    path: '/logo.svg',
    width: 48,
    height: 12,
    alt: 'SupplyHub Logo',
  },
  // Logo text settings
  text: {
    content: 'SUPPLYHUB',
    fontSize: '18px',
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    color: '#1e293b',
  },
  // Gradient colors for the logo
  gradient: {
    startColor: '#00e5cc',
    endColor: '#ff7f7f',
  },
  // Slogan settings
  slogan: {
    content: 'Your Supply Chain Intelligence Platform',
    fontSize: 'sm',
    color: 'gray-600',
    showBreakpoint: 'lg', // Tailwind breakpoint where slogan becomes visible
  },
};

// Color Scheme
export const colorScheme = {
  primary: {
    light: '#3b82f6',
    main: '#2563eb',
    dark: '#1d4ed8',
  },
  secondary: {
    light: '#34d399',
    main: '#10b981',
    dark: '#059669',
  },
  accent: {
    light: '#a78bfa',
    main: '#8b5cf6',
    dark: '#7c3aed',
  },
  text: {
    primary: '#1e293b',
    secondary: '#64748b',
    light: '#94a3b8',
  },
  background: {
    primary: '#ffffff',
    secondary: '#f8fafc',
    accent: '#f1f5f9',
  },
};

// Feature Icons Configuration
export const iconConfig = {
  news: {
    path: '/icons/news.svg',
    color: colorScheme.primary.main,
    size: { width: 24, height: 24 },
  },
  network: {
    path: '/icons/network.svg',
    color: colorScheme.secondary.main,
    size: { width: 24, height: 24 },
  },
  value: {
    path: '/icons/value.svg',
    color: colorScheme.accent.main,
    size: { width: 24, height: 24 },
  },
};

// Article Images Configuration
export const articles = {
  article1: {
    id: 1,
    title: 'Revolutionary AI Solutions',
    path: '/article1.jpg',
    description: 'How AI is transforming supply chain management'
  },
  article2: {
    id: 2,
    title: 'Sustainable Supply Chains',
    path: '/article2.jpg',
    description: 'Eco-friendly practices in modern supply chains'
  },
  article3: {
    id: 3,
    title: 'Digital Procurement',
    path: '/article3.jpg',
    description: 'The future of procurement technology'
  },
  article4: {
    id: 4,
    title: 'Supply Chain Resilience',
    path: '/article4.jpg',
    description: 'Building robust supply networks'
  },
  article5: {
    id: 5,
    title: 'Supply Chain Innovation',
    path: '/article5.jpg',
    description: 'Latest trends in supply chain technology'
  }
};

// Typography Configuration
export const typography = {
  fontFamily: {
    primary: 'Arial, sans-serif',
    secondary: 'system-ui, sans-serif',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

// Layout Configuration
export const layout = {
  container: {
    maxWidth: '1280px',
    padding: '1rem',
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    full: '9999px',
  },
};

// Animation Configuration
export const animations = {
  transition: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  },
};

// Export all configurations
const themeConfig = {
  logoConfig,
  colorScheme,
  iconConfig,
  articles,
  typography,
  layout,
  animations,
};

export default themeConfig; 