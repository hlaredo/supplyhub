# SupplyHub Customization Guide

## Table of Contents
1. [Component Structure](#component-structure)
2. [Asset Management](#asset-management)
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

## Asset Management

### Directory Structure
```
public/
├── images/              # Application images
│   ├── articles/       # Article-related images (800x400px)
│   └── backgrounds/    # Background images
├── icons/              # Application icons (24x24px SVG)
│   ├── features/       # Feature-specific icons
│   └── social/        # Social media icons
└── logo.svg           # Main application logo
```

### Image Guidelines

1. Article Images:
   ```typescript
   // 1. Image specifications
   dimensions: "800x400px"
   format: "JPG/PNG"
   location: "/public/images/articles/"
   
   // 2. Update article configuration
   const article: Article = {
     id: 1,
     title: "Article Title",
     image: "/images/articles/article1.jpg",
     summary: "Article summary"
   };
   ```

2. Background Images:
   ```typescript
   // Image specifications
   desktop: "1920x1080px"
   mobile: "750x1334px"
   format: "JPG/PNG/WebP"
   location: "/public/images/backgrounds/"
   ```

3. Feature Icons:
   ```typescript
   // 1. Icon specifications
   format: "SVG"
   size: "24x24px"
   location: "/public/icons/features/"
   
   // 2. Update feature configuration
   const feature: Feature = {
     title: "FEATURE NAME",
     icon: "/icons/features/name.svg",
     description: "Feature description",
     color: "primary" // primary | secondary | accent
   };
   ```

4. Social Icons:
   ```typescript
   // 1. Icon specifications
   format: "SVG"
   size: "24x24px"
   location: "/public/icons/social/"
   
   // 2. Update social link configuration
   const socialLink: SocialLink = {
     platform: "Platform Name",
     icon: "/icons/social/platform.svg",
     href: "https://platform.com/supplyhub"
   };
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

### 2. Image Component Usage

```typescript
// Responsive image with Next.js Image
<Image
  src={src}
  alt={alt}
  width={800}
  height={400}
  priority={isPriority}
  sizes="(max-width: 768px) 100vw, 50vw"
  className="object-cover rounded-lg"
/>

// SVG icon with color
<Image
  src={icon}
  alt={title}
  width={24}
  height={24}
  className={`text-${color}-600`}
/>
```

## Best Practices

### 1. Image Optimization

```typescript
// 1. Use Next.js Image component
import Image from 'next/image';

// 2. Enable WebP/AVIF formats
// next.config.js
images: {
  formats: ['image/avif', 'image/webp']
}

// 3. Implement responsive sizes
sizes="(max-width: 768px) 100vw, 50vw"

// 4. Use appropriate loading priority
priority={isHeroImage}
```

### 2. Icon Management

```typescript
// 1. Use consistent dimensions
width={24}
height={24}

// 2. Support dark mode
className="dark:invert"

// 3. Implement color themes
className={`text-${color}-600`}
```

### 3. Performance Optimization

```typescript
// 1. Enable image caching
// next.config.js
images: {
  minimumCacheTTL: 60,
}

// 2. Configure domains for CDN
images: {
  domains: ['your-cdn.com']
}

// 3. Implement responsive loading
<Image
  {...props}
  sizes="(max-width: 640px) 100vw,
         (max-width: 1024px) 50vw,
         33vw"
/>
```

### 4. Accessibility

```typescript
// 1. Provide meaningful alt text
<Image
  alt="Detailed description of the image"
/>

// 2. Use ARIA labels for icons
<button aria-label="Share on Twitter">
  <Image src="/icons/social/twitter.svg" />
</button>

// 3. Support reduced motion
className="motion-safe:transition-transform"
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
1. Review [DEPLOYMENT.md](DEPLOYMENT.md) for asset guidelines
2. Check [TECHNICAL_REFERENCE.md](TECHNICAL_REFERENCE.md) for implementation details
3. Consult Next.js Image documentation
4. Contact development team at dev@supplyhub.com