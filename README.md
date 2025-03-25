# SupplyHub

A modern supply chain management platform built with Next.js.

## Features

- Real-time supply chain analytics
- AI-powered insights and recommendations
- Optimized images and icons with CDN support
- Responsive design for all devices
- Dark mode support
- TypeScript for type safety
- Tailwind CSS for styling

## Project Structure

```bash
supplyhub/
├── app/                    # Next.js app directory
├── components/            # React components
├── config/               # Configuration files
├── public/               # Static assets
│   ├── images/          # Optimized images
│   │   └── articles/    # Article images (800x400px)
│   └── icons/           # SVG icons
│       ├── features/    # Feature icons (24x24px)
│       └── social/      # Social media icons (24x24px)
├── styles/              # Global styles
├── types/               # TypeScript definitions
└── utils/               # Utility functions
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/hlaredo/supplyhub.git
   cd supplyhub
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Asset Management

### Images
- Article images: 800x400px (JPG/WebP)
- Background images:
  - Desktop: 1920x1080px
  - Mobile: 750x1334px
- Formats: AVIF (primary), WebP (fallback), JPG/PNG (legacy)
- Automatic optimization via Next.js Image component

### Icons
- SVG format (24x24px)
- Theme-color support
- Dark mode compatible
- Organized by category (features, social)

## Documentation

- [Deployment Guide](DEPLOYMENT.md)
- [Customization Guide](CUSTOMIZATION.md)
- [Technical Reference](TECHNICAL_REFERENCE.md)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.