# SupplyHub Deployment Guide

This guide outlines the steps to deploy SupplyHub on an Ubuntu server using manual deployment processes.

## Prerequisites

1. Ubuntu Server (20.04 LTS or newer)
2. Root access or sudo privileges
3. Domain name (optional but recommended)
4. Git installed locally and on server
5. Node.js 18.x or newer
6. PM2 process manager
7. Nginx web server

## 1. Initial Server Setup

```bash
# Update system packages
sudo apt update
sudo apt upgrade -y

# Install essential tools
sudo apt install -y curl git build-essential nginx

# Install Node.js and npm (using Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18

# Install PM2 globally
npm install -g pm2
```

## 2. Manual Deployment Steps

### A. First-Time Setup

1. Create the application directory:
```bash
sudo mkdir -p /var/www/supplyhub
sudo chown -R $USER:$USER /var/www/supplyhub
cd /var/www/supplyhub
```

2. Clone the repository:
```bash
git clone https://github.com/yourusername/supplyhub.git .
```

3. Install dependencies:
```bash
npm install
```

4. Create environment file:
```bash
cp .env.example .env
nano .env
```

Add necessary environment variables:
```env
NEXT_PUBLIC_API_URL=https://your-api-url.com
NODE_ENV=production
```

5. Build the application:
```bash
npm run build
```

6. Start with PM2:
```bash
pm2 start npm --name "supplyhub" -- start
pm2 save
pm2 startup
```

### B. Subsequent Deployments

1. Access the application directory:
```bash
cd /var/www/supplyhub
```

2. Pull latest changes:
```bash
git pull origin main
```

3. Install/update dependencies:
```bash
npm install
```

4. Rebuild the application:
```bash
npm run build
```

5. Restart the service:
```bash
pm2 restart supplyhub
```

### C. Deployment Verification

1. Check application status:
```bash
pm2 status supplyhub
pm2 logs supplyhub
```

2. Verify the application is running:
```bash
curl http://localhost:3000
```

## 3. Nginx Configuration

### A. Create Server Block

```bash
sudo nano /etc/nginx/sites-available/supplyhub
```

Add the following configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
}
```

### B. Enable Configuration

```bash
sudo ln -s /etc/nginx/sites-available/supplyhub /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 4. SSL Certificate Setup

### A. Install Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
```

### B. Obtain Certificate

```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

### C. Verify Auto-Renewal

```bash
sudo systemctl status certbot.timer
```

## 5. Security Setup

### A. Configure Firewall

```bash
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

### B. Install and Configure Fail2ban

```bash
sudo apt install -y fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

## 6. Monitoring and Maintenance

### A. Application Monitoring

```bash
# View application logs
pm2 logs supplyhub

# Monitor system resources
htop
```

### B. Regular Maintenance Tasks

1. Update system packages:
```bash
sudo apt update
sudo apt upgrade -y
```

2. Update Node.js dependencies:
```bash
npm outdated
npm update
```

3. Check SSL certificate:
```bash
sudo certbot renew --dry-run
```

## 7. Backup Strategy

### A. Application Backup

1. Create backup script:
```bash
#!/bin/bash
BACKUP_DIR="/var/backups/supplyhub"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup application files
tar -czf $BACKUP_DIR/supplyhub_$TIMESTAMP.tar.gz /var/www/supplyhub

# Backup environment variables
cp /var/www/supplyhub/.env $BACKUP_DIR/env_$TIMESTAMP.backup

# Backup Nginx configuration
cp /etc/nginx/sites-available/supplyhub $BACKUP_DIR/nginx_$TIMESTAMP.backup
```

2. Schedule automatic backups:
```bash
sudo crontab -e
```

Add the following line for daily backups:
```
0 2 * * * /path/to/backup-script.sh
```

## 8. Troubleshooting

### A. Common Issues

1. Application not starting:
```bash
# Check PM2 logs
pm2 logs supplyhub

# Verify Node.js version
node -v

# Check for build errors
npm run build
```

2. Nginx issues:
```bash
# Test configuration
sudo nginx -t

# Check error logs
sudo tail -f /var/log/nginx/error.log
```

3. SSL certificate issues:
```bash
# Check certificate status
sudo certbot certificates

# Test renewal
sudo certbot renew --dry-run
```

### B. Performance Issues

1. Monitor resource usage:
```bash
htop
pm2 monit
```

2. Check Nginx access logs:
```bash
sudo tail -f /var/log/nginx/access.log
```

## Support

For deployment issues:
1. Check application logs
2. Review Nginx error logs
3. Verify environment variables
4. Contact the development team at support@supplyhub.com

## Version Control

- Main branch: Production-ready code
- Develop branch: Development and testing
- Feature branches: New features and updates

Remember to always test deployments in a staging environment before applying to production. 