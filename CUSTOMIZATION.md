# SupplyHub Customization Guide

## Table of Contents
1. [Component Structure](#component-structure)
2. [Quick Customizations](#quick-customizations)
3. [Theme Configuration](#theme-configuration)
4. [Layout System](#layout-system)
5. [Best Practices](#best-practices)

## Component Structure
```
components/
├── auth/
│   └── LoginModal.tsx    # Authentication modal
├── features/
│   ├── Hero.tsx         # Article carousel
│   └── Features.tsx     # Feature cards grid
└── layout/
    ├── Header.tsx       # Navigation bar
    └── Footer.tsx       # Site footer
```

## Quick Customizations

### 1. Article Carousel (Hero.tsx)

```typescript
// 1. Update article content in constants/articles.ts
export const articles: Article[] = [
  {
    id: 1,
    title: "Your Title",
    image: "/images/article1.jpg",
    summary: "Your summary"
  }
];

// 2. Carousel timing in Hero.tsx
useEffect(() => {
  const timer = setInterval(() => {
    setCurrentArticle((prev) => (prev + 1) % articles.length);
  }, 5000); // 5 seconds
  return () => clearInterval(timer);
}, []);
```

### 2. Feature Cards (Features.tsx)

```typescript
// Update feature content in constants/features.ts
export const features: Feature[] = [
  {
    title: "YOUR FEATURE",
    description: "Your description",
    icon: "/icons/your-icon.svg",
    items: ["Item 1", "Item 2"],
    color: "blue" // Options: blue, green, mauve
  }
];
```

### 3. Footer Configuration

```typescript
// Update in constants/navigation.ts
export const footerSections: FooterSection[] = [
  {
    title: "Section Name",
    links: [
      { label: "Link Text", href: "/path" }
    ]
  }
];

export const socialLinks: SocialLink[] = [
  {
    platform: "Platform Name",
    href: "https://your-url.com",
    icon: "/icons/platform.svg"
  }
];
```

## Theme Configuration

### 1. Colors

```typescript
// config/theme.ts
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
  }
};
```

### 2. Typography

```typescript
// config/theme.ts
export const typography = {
  fontFamily: {
    primary: 'Arial, sans-serif',
    secondary: 'system-ui, sans-serif',
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem' // 30px
  }
};
```

### 3. Layout

```typescript
// config/theme.ts
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
  }
};
```

## Layout System

### 1. Responsive Breakpoints

```typescript
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'sm': '640px',   // Mobile landscape
      'md': '768px',   // Tablet
      'lg': '1024px',  // Desktop
      'xl': '1280px',  // Large desktop
    }
  }
};
```

### 2. Grid System

```typescript
// Common grid layouts
const gridLayouts = {
  features: "grid grid-cols-1 md:grid-cols-3 gap-12",
  footer: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12",
  hero: "grid grid-cols-1 md:grid-cols-2 gap-8"
};
```

### 3. Spacing System

```typescript
// Common spacing utilities
const spacing = {
  section: "py-20",
  container: "px-4",
  stack: "space-y-6",
  grid: "gap-8"
};
```

## Best Practices

### 1. Image Guidelines

- Article images:
  - Format: JPG/PNG
  - Dimensions: 800x400px
  - Location: `/public/images/`
  - Quality: High resolution, optimized for web

- Icons:
  - Format: SVG
  - Dimensions: 24x24px
  - Location: `/public/icons/`
  - Style: Consistent stroke width

### 2. Performance Optimization

```typescript
// 1. Image optimization
<Image
  src={src}
  alt={alt}
  fill
  priority={isPriority}
  sizes="(max-width: 768px) 100vw, 50vw"
/>

// 2. Conditional rendering
{isVisible && <Component />}

// 3. Event debouncing
const debouncedHandler = useCallback(
  debounce((value) => {
    // Handle event
  }, 300),
  []
);
```

### 3. Accessibility

```typescript
// 1. ARIA labels
<button
  aria-label="Open menu"
  aria-expanded={isOpen}
>
  {/* Button content */}
</button>

// 2. Semantic HTML
<nav>
  <ul role="menubar">
    <li role="menuitem">
      <a href="/path">Link</a>
    </li>
  </ul>
</nav>
```

### 4. SEO Best Practices

```typescript
// pages/_app.tsx
import Head from 'next/head';

<Head>
  <title>SupplyHub - Supply Chain Intelligence</title>
  <meta
    name="description"
    content="Supply chain intelligence platform"
  />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</Head>
```

## Quick Tips

1. **File Organization**
   - Keep related files together
   - Use index files for exports
   - Maintain consistent naming

2. **Style Management**
   - Use Tailwind utilities
   - Create reusable classes
   - Follow color scheme

3. **Component Updates**
   - Update constants first
   - Test responsive views
   - Verify accessibility

4. **Common Issues**
   - Check image paths
   - Verify color classes
   - Test all breakpoints

## Support

For customization help:
1. Review component documentation
2. Check Tailwind documentation
3. Consult theme configuration
4. Contact development team