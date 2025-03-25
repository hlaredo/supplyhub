# SupplyHub Deployment Guide

This guide provides comprehensive instructions for deploying the SupplyHub Next.js application using two different methods: Bare Metal Ubuntu Server and AWS Amplify.

## Table of Contents
1. [Deployment Methods Overview](#deployment-methods-overview)
2. [Method 1: Bare Metal Ubuntu Server](#method-1-bare-metal-ubuntu-server)
3. [Method 2: AWS Amplify Deployment](#method-2-aws-amplify-deployment)

## Deployment Methods Overview

Choose the deployment method that best suits your needs:

1. **Bare Metal Ubuntu Server**
   - Full control over server configuration
   - Manual setup and maintenance required
   - Suitable for custom infrastructure requirements
   - Lower cost for long-term hosting

2. **AWS Amplify**
   - Managed service with automatic scaling
   - Simplified deployment process
   - Integrated with AWS services
   - Suitable for teams wanting minimal infrastructure management

## Method 1: Bare Metal Ubuntu Server

### Prerequisites

1. Ubuntu Server (20.04 LTS or newer)
   - Minimum specs: 2 CPU cores, 4GB RAM
   - 20GB SSD storage
   - Clean installation recommended
   - Public IP address with DNS configured

2. Required Software Versions:
   ```bash
   # Verify versions after installation
   git --version        # 2.25.0 or newer
   node --version       # 18.17.0 or newer
   npm --version        # 9.x or newer
   pm2 --version        # 5.x or newer
   nginx -v            # 1.18.0 or newer
   ```

### 1. Initial Server Setup

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install essential packages
sudo apt install -y curl git build-essential nginx software-properties-common

# Install Node.js using nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18

# Install PM2 globally
npm install -g pm2

# Configure firewall
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw enable
```

### 2. Application Deployment

```bash
# Create application directory
sudo mkdir -p /var/www/supplyhub/supplyhub
sudo chown -R $USER:$USER /var/www/supplyhub/supplyhub

# Clone repository
cd /var/www/supplyhub/supplyhub
git clone https://github.com/hlaredo/supplyhub.git .

# Install dependencies
npm ci --production

# Create environment file
cat > .env << EOL
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_API_URL=https://www.supplyhubai.com/api
NEXT_PUBLIC_SITE_URL=https://www.supplyhubai.com
EOL

# Build application
npm run build

# Configure PM2
cat > ecosystem.config.js << EOL
module.exports = {
  apps: [{
    name: 'supplyhub',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/supplyhub/supplyhub',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    instances: 'max',
    exec_mode: 'cluster'
  }]
};
EOL

# Start application
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 3. Nginx Configuration

```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/supplyhub

# Add configuration
server {
    listen 80;
    server_name www.supplyhubai.com;
    root /var/www/supplyhub/supplyhub;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable configuration
sudo ln -s /etc/nginx/sites-available/supplyhub /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 4. SSL Configuration

```bash
# Install SSL certificate
sudo mkdir -p /etc/nginx/ssl/supplyhub
sudo chmod 700 /etc/nginx/ssl/supplyhub

# Copy SSL files
sudo cp supplyhubai_com.chained.crt /etc/nginx/ssl/supplyhub/
sudo cp supplyhubai_com.key /etc/nginx/ssl/supplyhub/
sudo chmod 600 /etc/nginx/ssl/supplyhub/*

# Update Nginx configuration for SSL
sudo nano /etc/nginx/sites-available/supplyhub

# Add SSL configuration
server {
    listen 443 ssl http2;
    server_name www.supplyhubai.com;

    ssl_certificate /etc/nginx/ssl/supplyhub/supplyhubai_com.chained.crt;
    ssl_certificate_key /etc/nginx/ssl/supplyhub/supplyhubai_com.key;
    
    # SSL optimization
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_protocols TLSv1.2 TLSv1.3;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Reload Nginx
sudo nginx -t && sudo systemctl reload nginx
```

## Method 2: AWS Amplify Deployment

### Prerequisites

1. AWS Account
   - AWS CLI installed and configured
   - Appropriate IAM permissions
   - GitHub repository access

2. Required Tools:
   ```bash
   # Verify AWS CLI installation
   aws --version
   
   # Configure AWS credentials
   aws configure
   ```

### 1. Initial Setup

1. Fork and Clone Repository:
   ```bash
   git clone https://github.com/hlaredo/supplyhub.git
   cd supplyhub
   ```

2. Create Amplify Configuration:
   ```bash
   # Create amplify.yml in project root
   cat > amplify.yml << EOL
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   EOL
   ```

### 2. Amplify Console Setup

1. Navigate to AWS Amplify Console:
   - Open AWS Management Console
   - Search for "Amplify"
   - Click "New App" → "Host Web App"

2. Connect Repository:
   - Choose GitHub as source
   - Select your repository
   - Choose main branch

3. Build Settings:
   - Framework: Next.js
   - Build settings: Use existing amplify.yml
   - Environment variables:
     ```
     NODE_ENV=production
     NEXT_PUBLIC_API_URL=https://www.supplyhubai.com/api
     NEXT_PUBLIC_SITE_URL=https://www.supplyhubai.com
     ```

### 3. Domain Management

1. Add Custom Domain:
   - In Amplify Console, go to "Domain Management"
   - Click "Add Domain"
   - Enter: www.supplyhubai.com
   - Follow DNS validation steps

2. Configure SSL:
   - SSL certificate is automatically provisioned
   - Wait for DNS validation
   - Verify HTTPS access

### 4. Continuous Deployment

1. Automatic Deployments:
   ```bash
   # Push changes to trigger deployment
   git add .
   git commit -m "Update application"
   git push origin main
   ```

2. Monitor Deployment:
   - Watch build progress in Amplify Console
   - Check build logs for errors
   - Verify deployment success

### 5. Performance Optimization

1. Enable Features:
   - In Amplify Console:
     - Enable performance mode
     - Configure cache settings
     - Enable instant cache invalidation

2. Configure Headers:
   ```yaml
   # Add to amplify.yml
   customHeaders:
     - pattern: '**/*'
       headers:
         - key: Cache-Control
           value: 'public, max-age=31536000, immutable'
     - pattern: '/_next/static/**/*'
       headers:
         - key: Cache-Control
           value: 'public, max-age=31536000, immutable'
   ```

## Monitoring and Maintenance

### For Bare Metal Server:
```bash
# Monitor application logs
pm2 logs supplyhub

# Monitor system resources
htop
df -h
free -m

# Check Nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### For AWS Amplify:
- Monitor through AWS Amplify Console
- Check CloudWatch metrics
- Set up alerts for build failures
- Monitor access logs in CloudWatch

## Image and Icon Management

### Directory Structure
```bash
public/
├── images/              # Application images
│   ├── articles/       # Article-related images
│   │   ├── article1.jpg
│   │   ├── article2.jpg
│   │   └── ...
│   └── backgrounds/    # Background images
├── icons/              # Application icons
│   ├── features/       # Feature-specific icons
│   │   ├── news.svg
│   │   ├── network.svg
│   │   └── value.svg
│   └── social/        # Social media icons
│       ├── linkedin.svg
│       ├── twitter.svg
│       └── github.svg
└── logo.svg           # Main application logo
```

### Image Guidelines

1. Article Images:
   ```bash
   # Standard dimensions
   Width: 800px
   Height: 400px
   Format: JPG/PNG
   Location: /public/images/articles/
   Naming: article{number}.jpg
   ```

2. Background Images:
   ```bash
   # Standard dimensions
   Desktop: 1920x1080px
   Mobile: 750x1334px
   Format: JPG/PNG/WebP
   Location: /public/images/backgrounds/
   ```

3. Image Optimization:
   ```bash
   # Install optimization tools
   npm install -g sharp-cli

   # Optimize images
   sharp -i ./public/images/**/*.{jpg,png} -o ./public/images/optimized/
   ```

### Icon Guidelines

1. Feature Icons:
   ```bash
   # Standard specifications
   Format: SVG
   Size: 24x24px
   Colors: Use theme colors from config/theme.ts
   Location: /public/icons/features/
   ```

2. Social Icons:
   ```bash
   # Standard specifications
   Format: SVG
   Size: 24x24px
   Color: #000000 (will be inverted in dark mode)
   Location: /public/icons/social/
   ```

3. Icon Optimization:
   ```bash
   # Install SVGO
   npm install -g svgo

   # Optimize SVG files
   svgo -f ./public/icons/
   ```

### Replacing Images and Icons

1. Article Images:
   ```bash
   # 1. Prepare new image with correct dimensions
   # 2. Copy to articles directory
   cp new-article.jpg public/images/articles/article1.jpg

   # 3. Update article configuration in constants/articles.ts
   export const articles = [
     {
       id: 1,
       title: "New Article Title",
       image: "/images/articles/article1.jpg",
       summary: "Article summary"
     }
   ];
   ```

2. Feature Icons:
   ```bash
   # 1. Prepare SVG with correct dimensions
   # 2. Copy to features directory
   cp new-icon.svg public/icons/features/news.svg

   # 3. Update feature configuration in constants/features.ts
   export const features = [
     {
       title: "STAY UP TO DATE",
       icon: "/icons/features/news.svg",
       // ... other properties
     }
   ];
   ```

3. Social Icons:
   ```bash
   # 1. Prepare SVG with correct dimensions
   # 2. Copy to social directory
   cp new-social.svg public/icons/social/linkedin.svg

   # 3. Update social links in constants/navigation.ts
   export const socialLinks = [
     {
       platform: "LinkedIn",
       icon: "/icons/social/linkedin.svg",
       href: "https://linkedin.com/company/supplyhub"
     }
   ];
   ```

### Image CDN Integration (Optional)

1. AWS CloudFront Setup:
   ```bash
   # Update next.config.js
   module.exports = {
     images: {
       domains: ['d1234abcd.cloudfront.net'],
       formats: ['image/avif', 'image/webp']
     }
   }
   ```

2. Image Component Usage:
   ```typescript
   import Image from 'next/image';

   // Using CDN
   <Image
     src="https://d1234abcd.cloudfront.net/images/articles/article1.jpg"
     alt="Article 1"
     width={800}
     height={400}
     priority={true}
   />
   ```

### Deployment Considerations

1. Image Versioning:
   ```bash
   # Add cache busting to image URLs
   /images/articles/article1.jpg?v=1.0.0
   ```

2. Development vs Production:
   ```javascript
   // next.config.js
   module.exports = {
     images: {
       domains: process.env.NODE_ENV === 'production'
         ? ['d1234abcd.cloudfront.net']
         : ['localhost']
     }
   }
   ```

3. Backup Strategy:
   ```bash
   # Add to backup script
   #!/bin/bash
   BACKUP_DIR="/var/backups/supplyhub/assets"
   DATE=$(date +%Y%m%d)

   # Backup images and icons
   tar -czf "$BACKUP_DIR/images_$DATE.tar.gz" /var/www/supplyhub/supplyhub/public/images/
   tar -czf "$BACKUP_DIR/icons_$DATE.tar.gz" /var/www/supplyhub/supplyhub/public/icons/

   # Cleanup old backups (keep last 30 days)
   find $BACKUP_DIR -type f -mtime +30 -delete
   ```

## Support and Version Control

- Repository: https://github.com/hlaredo/supplyhub
- Technical Support: lachitoai@lachochingonai2025
- Documentation: Refer to project README.md 