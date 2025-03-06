# SupplyHub Technical Reference

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Component Architecture](#component-architecture)
3. [State Management](#state-management)
4. [Routing System](#routing-system)
5. [Data Flow](#data-flow)
6. [Performance Optimizations](#performance-optimizations)
7. [Testing Strategy](#testing-strategy)
8. [Security Considerations](#security-considerations)

## Architecture Overview

SupplyHub is built with:
- Next.js 14 (Pages Router)
- TypeScript
- Tailwind CSS
- React Hooks

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

## Data Flow

### Constants and Configuration
```typescript
// constants/articles.ts
export const articles: Article[] = [/* ... */];

// constants/features.ts
export const features: Feature[] = [/* ... */];

// constants/navigation.ts
export const footerSections: FooterSection[] = [/* ... */];
export const socialLinks: SocialLink[] = [/* ... */];
```

### Type Definitions
```typescript
// types/article.ts
export interface Article {
  id: number;
  title: string;
  image: string;
  summary: string;
}

// types/feature.ts
export interface Feature {
  title: string;
  description: string;
  icon: string;
  items: string[];
  color: 'blue' | 'green' | 'mauve';
}
```

## Performance Optimizations

### Image Optimization
```typescript
// Next.js Image component usage
<Image
  src={src}
  alt={alt}
  fill
  priority={isPriority}
  sizes="(max-width: 768px) 100vw, 50vw"
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

## Security Considerations

### XSS Prevention
```typescript
// Sanitize user input
import DOMPurify from 'dompurify';

const sanitizedContent = DOMPurify.sanitize(userContent);
```

### Content Security Policy
```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self';"
  }
];
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

2. Development Resources
   - Next.js documentation
   - Tailwind CSS documentation
   - TypeScript documentation

3. Contact
   - Technical support: support@supplyhub.com
   - Development team: dev@supplyhub.com