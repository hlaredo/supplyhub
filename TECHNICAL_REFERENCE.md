# SupplyHub Technical Reference

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Component Architecture](#component-architecture)
3. [Asset Management](#asset-management)
4. [State Management](#state-management)
5. [Routing System](#routing-system)
6. [Performance Optimizations](#performance-optimizations)
7. [Testing Strategy](#testing-strategy)
8. [Security Considerations](#security-considerations)
9. [Image Optimization](#image-optimization)
10. [SVG Handling](#svg-handling)
11. [Asset Configuration](#asset-configuration)
12. [Performance Considerations](#performance-considerations)

## Architecture Overview

SupplyHub is built with:
- Next.js 14 (Pages Router)
- TypeScript
- Tailwind CSS
- React Hooks
- Next.js Image Optimization

### Project Structure
```
supplyhub/
├── components/           # React components
│   ├── auth/            # Authentication components
│   ├── features/        # Feature components
│   └── layout/          # Layout components
├── config/              # Configuration files
├── constants/           # Constant definitions
├── pages/              # Next.js pages
├── public/             # Static assets
├── styles/             # Global styles
├── types/              # TypeScript types
└── utils/              # Utility functions
```

## Component Architecture

### Authentication Components
```typescript
// components/auth/LoginModal.tsx
interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  // Implementation
}
```

### Feature Components
```typescript
// components/features/Hero.tsx
export default function Hero() {
  const [currentArticle, setCurrentArticle] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentArticle((prev) => (prev + 1) % articles.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
}

// components/features/Features.tsx
export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Implementation */}
      </div>
    </section>
  );
}
```

### Layout Components
```typescript
// components/layout/Header.tsx
interface HeaderProps {
  onLoginClick: () => void;
}

// components/layout/Footer.tsx
interface FooterProps {}
```

### Image Components
```typescript
// components/common/OptimizedImage.tsx
interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
}

export default function OptimizedImage({ src, alt, ...props }: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      {...props}
      sizes="(max-width: 768px) 100vw, 50vw"
    />
  );
}
```

### Icon Components
```typescript
// components/common/ThemedIcon.tsx
interface ThemedIconProps {
  src: string;
  alt: string;
  color: 'primary' | 'secondary' | 'accent';
  className?: string;
}

export default function ThemedIcon({ src, alt, color, ...props }: ThemedIconProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={24}
      height={24}
      className={`text-${color}-600 ${props.className || ''}`}
    />
  );
}
```

## Asset Management

### Image Configuration
```typescript
// next.config.js
module.exports = {
  images: {
    domains: process.env.NODE_ENV === 'production'
      ? ['d1234abcd.cloudfront.net']
      : ['localhost'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  }
};
```

### Image Types and Constants
```typescript
// types/article.ts
interface Article {
  id: number;
  title: string;
  image: string;  // Path relative to /public/images/articles/
  summary: string;
}

// constants/articles.ts
export const articles: Article[] = [
  {
    id: 1,
    title: "Revolutionary AI Solutions Transform Supply Chain Management",
    image: "/images/articles/placeholder-1.svg",  // SVG placeholder with gradient background
    summary: "Article summary"
  }
];
```

### Icon Types and Constants
```typescript
// types/feature.ts
interface Feature {
  title: string;
  icon: string;  // Path relative to /public/icons/features/
  description: string;
  color: 'primary' | 'secondary' | 'accent';
}

// constants/features.ts
export const features: Feature[] = [
  {
    title: "FEATURE NAME",
    icon: "/icons/features/feature.svg",
    description: "Feature description",
    color: "primary"
  }
];
```

## State Management

### Local Component State
```typescript
// Using useState
const [state, setState] = useState<StateType>(initialState);

// Using useReducer for complex state
const [state, dispatch] = useReducer(reducer, initialState);
```

### Shared State
```typescript
// pages/index.tsx
const [isLoginOpen, setIsLoginOpen] = useState(false);

// Prop drilling for shared state
<Header onLoginClick={() => setIsLoginOpen(true)} />
<LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
```

## Routing System

### Page Routes
```typescript
// pages/index.tsx
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </>
  );
}
```

### Dynamic Routes
```typescript
// pages/[slug].tsx
import { useRouter } from 'next/router';

export default function FeaturePage() {
  const router = useRouter();
  const { slug } = router.query;
  // Implementation
}
```

## Performance Optimizations

### Image Optimization
```typescript
// 1. Automatic WebP/AVIF conversion
<Image
  src="/images/articles/article1.jpg"
  alt="Article 1"
  width={800}
  height={400}
/>

// 2. Responsive loading
<Image
  {...props}
  sizes="(max-width: 640px) 100vw,
         (max-width: 1024px) 50vw,
         33vw"
/>

// 3. Priority loading for LCP
<Image
  priority={true}
  {...props}
/>
```

### Icon Optimization
```typescript
// 1. SVG optimization with SVGO
// svgo.config.js
module.exports = {
  plugins: [
    'removeViewBox',
    'removeDimensions',
    'removeUnusedNS',
    'cleanupIDs'
  ]
};

// 2. Inline SVG with SVGR
import { ReactComponent as Icon } from './icon.svg';
```

### CDN Integration
```typescript
// 1. Production CDN configuration
const imageLoader = ({ src, width, quality }) => {
  return `https://d1234abcd.cloudfront.net${src}?w=${width}&q=${quality || 75}`;
};

// 2. Component implementation
<Image
  loader={process.env.NODE_ENV === 'production' ? imageLoader : undefined}
  {...props}
/>
```

### Code Splitting
```typescript
// Dynamic imports for modals
const LoginModal = dynamic(() => import('../components/auth/LoginModal'), {
  loading: () => <LoadingSpinner />
});
```

### Performance Monitoring
```typescript
// Custom performance hooks
const usePerformanceMetrics = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Measure and report metrics
    }
  }, []);
};
```

## Testing Strategy

### Unit Tests
```typescript
// Component testing
describe('Hero', () => {
  it('should auto-rotate articles', () => {
    // Test implementation
  });
});

// Utility testing
describe('titleToSlug', () => {
  it('should convert title to URL-friendly slug', () => {
    expect(titleToSlug('Test Title')).toBe('test-title');
  });
});
```

### Integration Tests
```typescript
describe('Home Page', () => {
  it('should render all sections', () => {
    // Test implementation
  });
});
```

### Image Testing
```typescript
// __tests__/components/OptimizedImage.test.tsx
describe('OptimizedImage', () => {
  it('should render with correct dimensions', () => {
    const { container } = render(
      <OptimizedImage
        src="/test.jpg"
        alt="Test"
        width={800}
        height={400}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
```

### Icon Testing
```typescript
// __tests__/components/ThemedIcon.test.tsx
describe('ThemedIcon', () => {
  it('should apply correct color class', () => {
    const { container } = render(
      <ThemedIcon
        src="/icon.svg"
        alt="Icon"
        color="primary"
      />
    );
    expect(container.firstChild).toHaveClass('text-primary-600');
  });
});
```

## Security Considerations

### Image Security
```typescript
// 1. Content Security Policy
// next.config.js
{
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  }
}

// 2. Domain Allowlist
{
  images: {
    domains: ['trusted-domain.com'],
  }
}
```

### SVG Security
```typescript
// 1. SVG sanitization
import DOMPurify from 'dompurify';

const sanitizedSVG = DOMPurify.sanitize(svgContent, {
  USE_PROFILES: { svg: true },
});

// 2. SVGO security configuration
// svgo.config.js
module.exports = {
  plugins: [
    {
      name: 'removeScriptElements',
      active: true
    }
  ]
};
```

### Authentication Flow
```typescript
// Protected route wrapper
export function withAuth(Component: React.ComponentType) {
  return function AuthenticatedComponent(props: any) {
    const router = useRouter();
    const [isAuthenticated] = useAuth();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/login');
      }
    }, [isAuthenticated, router]);

    return <Component {...props} />;
  };
}
```

## Error Handling

### Global Error Boundary
```typescript
class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to monitoring service
  }

  render() {
    return this.props.children;
  }
}
```

### API Error Handling
```typescript
const handleApiError = (error: unknown) => {
  if (error instanceof ApiError) {
    // Handle specific API errors
  } else {
    // Handle generic errors
  }
};
```

## Monitoring and Logging

### Performance Monitoring
```typescript
export const reportWebVitals = (metric: any) => {
  // Send metrics to analytics
};
```

### Error Logging
```typescript
const logError = (error: Error, context?: any) => {
  // Send error to logging service
};
```

## Build and Deployment

### Build Configuration
```typescript
// next.config.js
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['your-image-domain.com'],
  },
  // Other config options
};
```

### Environment Variables
```typescript
// .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
```

## Support and Resources

1. Documentation
   - Component documentation
   - API documentation
   - Deployment guides
   - [Next.js Image Documentation](https://nextjs.org/docs/api-reference/next/image)
   - [SVGR Documentation](https://react-svgr.com/docs/getting-started/)

2. Development Resources
   - Next.js documentation
   - Tailwind CSS documentation
   - TypeScript documentation
   - [Image Optimization Guide](https://nextjs.org/docs/basic-features/image-optimization)
   - [SVG Best Practices](https://github.com/svg/svgo)

3. Contact
   - Technical support: support@supplyhub.com
   - Development team: dev@supplyhub.com

## Image Optimization

### Configuration
The application uses Next.js Image Optimization with the following settings:

```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'd1234abcd.cloudfront.net',
    },
  ],
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 60,
  dangerouslyAllowSVG: true,
  contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
}
```

### Supported Formats
- AVIF (primary format for modern browsers)
- WebP (fallback format)
- JPG/PNG (legacy support)

### Image Dimensions
- Article Images: 800x400px
- Background Images:
  - Desktop: 1920x1080px
  - Mobile: 750x1334px
- Icons: 24x24px (SVG)

## SVG Handling

### Webpack Configuration
SVG files are processed using @svgr/webpack:

```javascript
webpack(config) {
  config.module.rules.push({
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  });
  return config;
}
```

### Directory Structure
- `/public/icons/features/` - Feature icons
- `/public/icons/social/` - Social media icons
- `/public/images/articles/` - Article images

## Asset Configuration

### Image Components
Use the Next.js Image component for optimized image loading:

```jsx
import Image from 'next/image'

<Image
  src="/images/articles/article1.jpg"
  alt="Article title"
  width={800}
  height={400}
  priority={true}
/>
```

### Icon Components
SVG icons are imported as React components:

```jsx
import { Icon } from '@/components/ui/Icon'

<Icon name="feature-name" size={24} />
```

## Performance Considerations

### Image Loading
- Use `priority` prop for above-the-fold images
- Implement lazy loading for below-the-fold images
- Set appropriate `sizes` prop for responsive images

### Caching
- Images are cached for a minimum of 60 seconds
- CDN configuration recommended for production
- Use appropriate cache-control headers

### Security
- SVG content security policy implemented
- Remote patterns restricted to trusted domains
- Sanitization of SVG content enabled

### Best Practices
1. Always specify image dimensions
2. Use responsive image sizes
3. Implement proper alt text
4. Optimize images before upload
5. Use appropriate image format for content type

### SVG Placeholders
The application uses SVG placeholders for article images with the following specifications:

1. Dimensions: 800x400px
2. Gradient Backgrounds:
   - placeholder-1: Blue gradient (#3B82F6 to #1D4ED8)
   - placeholder-2: Green gradient (#10B981 to #059669)
   - placeholder-3: Indigo gradient (#6366F1 to #4F46E5)
   - placeholder-4: Purple gradient (#8B5CF6 to #7C3AED)
   - placeholder-5: Pink gradient (#EC4899 to #DB2777)
3. Features:
   - Diagonal gradients (0% to 100%)
   - Subtle grid pattern overlay
   - Decorative circles with varying positions
   - White accents with 0.1 opacity

### Image Component Implementation
```typescript
// components/features/Hero.tsx
<div className="relative h-[400px] rounded-lg overflow-hidden bg-gradient-to-r from-blue-100 to-blue-200">
  <Image
    src={article.image}
    alt={article.title}
    fill
    priority={article.id === 1}
    className="object-cover"
    sizes="(max-width: 768px) 100vw, 50vw"
    onError={(e) => {
      e.currentTarget.onerror = null;
      e.currentTarget.style.display = 'none';
    }}
  />
  {/* Fallback content */}
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="text-2xl font-bold text-gray-600">
      {article.title.split(' ').slice(0, 2).join(' ')}
    </div>
  </div>
</div>
```