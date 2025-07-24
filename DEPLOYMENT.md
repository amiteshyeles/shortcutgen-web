# Deployment Guide - Intentional Shortcut Generator

This guide will help you deploy the shortcut generator web service and integrate it with your Expo app.

## 🚀 Quick Start (5 minutes)

### Step 1: GitHub Repository Setup

1. **Create a new GitHub repository:**
   ```bash
   # Option 1: Fork the repository
   # Fork this repository to your GitHub account
   
   # Option 2: Create from scratch
   git init shortcutgen-web
   cd shortcutgen-web
   git remote add origin https://github.com/yourusername/shortcutgen-web.git
   ```

2. **Upload the web service files:**
   ```bash
   # Copy these files to your repository root:
   # - index.html
   # - style.css  
   # - script.js
   # - README.md
   # - .github/workflows/deploy.yml
   
   git add .
   git commit -m "Initial commit: iOS Shortcut Generator"
   git push -u origin main
   ```

### Step 2: Enable GitHub Pages

1. **Go to your repository settings:**
   - Navigate to `https://github.com/yourusername/shortcutgen-web/settings`
   - Click on "Pages" in the left sidebar

2. **Configure GitHub Pages:**
   - **Source**: Select "GitHub Actions"
   - The deployment workflow will automatically run

3. **Wait for deployment:**
   - Check the "Actions" tab for deployment status
   - Your service will be available at: `https://yourusername.github.io/shortcutgen-web/`

### Step 3: Update Your Expo App

1. **Update the web service URL:**
   ```typescript
   // In pause/src/services/ShortcutService.ts
   private getWebServiceURL(): string {
     const isProduction = !__DEV__;
     
     if (isProduction) {
       return 'https://yourusername.github.io/shortcutgen-web'; // ← Replace yourusername
     } else {
       return 'https://yourusername.github.io/shortcutgen-web'; // ← Replace yourusername
     }
   }
   ```

2. **Test the integration:**
   ```bash
   cd pause
   npx expo start
   ```

## 🔧 Advanced Configuration

### Custom Domain (Optional)

1. **Add CNAME file:**
   ```bash
   # In your repository root
   echo "shortcuts.yourdomain.com" > CNAME
   ```

2. **Configure DNS:**
   ```
   # Add a CNAME record in your DNS settings:
   shortcuts.yourdomain.com → yourusername.github.io
   ```

3. **Update the Expo app URL:**
   ```typescript
   return 'https://shortcuts.yourdomain.com';
   ```

### Environment-Specific URLs

For different environments (development/staging/production):

```typescript
private getWebServiceURL(): string {
  if (__DEV__) {
    // Development: Use local server or staging
    return 'http://localhost:8000'; // For local testing
  } else if (process.env.NODE_ENV === 'staging') {
    return 'https://staging-shortcuts.yourdomain.com';
  } else {
    return 'https://shortcuts.yourdomain.com'; // Production
  }
}
```

### Local Development

1. **Serve the web service locally:**
   ```bash
   # Option 1: Python
   cd shortcutgen-web
   python -m http.server 8000
   
   # Option 2: Node.js
   npx serve . -p 8000
   
   # Option 3: Live Server (VS Code)
   # Install "Live Server" extension and right-click index.html
   ```

2. **Test with your Expo app:**
   ```bash
   # Update getWebServiceURL() to return localhost:8000
   # Then test the flow
   ```

## 🧪 Testing Your Setup

### Manual Testing Checklist

1. **✅ Web Service Accessibility:**
   ```bash
   curl -I https://yourusername.github.io/shortcutgen-web/
   # Should return 200 OK
   ```

2. **✅ Parameter Parsing:**
   ```
   https://yourusername.github.io/shortcutgen-web/?app=instagram&wait=120&type=mindfulness
   # Should show Instagram with 2-minute timer
   ```

3. **✅ Shortcut Generation:**
   - Click "Generate Shortcut"
   - Download should start automatically
   - File should be named like "Mindful-Instagram.shortcut"

4. **✅ iOS Integration:**
   - Open downloaded file on iOS device
   - Should open in Shortcuts app
   - Should contain URL: `intentional://reflect?app=instagram`

### Automated Testing

Create a simple test script:

```bash
#!/bin/bash
# test-deployment.sh

BASE_URL="https://yourusername.github.io/shortcutgen-web"

echo "Testing shortcut generator deployment..."

# Test 1: Basic accessibility
echo "1. Testing basic accessibility..."
if curl -s -f "$BASE_URL" > /dev/null; then
    echo "✅ Web service is accessible"
else
    echo "❌ Web service is not accessible"
    exit 1
fi

# Test 2: Parameter handling
echo "2. Testing parameter handling..."
TEST_URL="$BASE_URL/?app=instagram&wait=120"
if curl -s -f "$TEST_URL" > /dev/null; then
    echo "✅ Parameter handling works"
else
    echo "❌ Parameter handling failed"
    exit 1
fi

echo "🎉 All tests passed!"
```

## 🔐 Security Considerations

### HTTPS Enforcement

GitHub Pages automatically enforces HTTPS, but you can add additional security headers:

```html
<!-- Add to <head> in index.html -->
<meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline';">
<meta http-equiv="X-Content-Type-Options" content="nosniff">
<meta http-equiv="X-Frame-Options" content="DENY">
```

### Content Validation

The web service validates input parameters:

```javascript
// In script.js
function validateAppName(appName) {
  const allowedApps = Object.keys(APP_CONFIGS);
  return allowedApps.includes(appName.toLowerCase());
}
```

## 📊 Monitoring and Analytics

### GitHub Pages Analytics

Monitor your deployment in GitHub:
- **Repository Insights**: Traffic and popular pages
- **Actions Tab**: Deployment success/failure
- **Issues Tab**: User-reported problems

### Optional: Add Google Analytics

```html
<!-- Add to <head> in index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Custom Event Tracking

```javascript
// In script.js
function trackEvent(eventName, properties) {
  // Google Analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, properties);
  }
  
  // Console logging for development
  console.log(`📊 Event: ${eventName}`, properties);
}
```

## 🚨 Troubleshooting

### Common Issues

1. **"Web service not accessible"**
   ```
   Solution: Check GitHub Pages deployment status in Actions tab
   ```

2. **"Shortcut file won't download"**
   ```
   Solution: Ensure iOS Safari is being used, not other browsers
   ```

3. **"Deep link doesn't work"**
   ```
   Solution: Verify Expo app URL scheme is 'intentional://' in app.json
   ```

4. **"App not supported error"**
   ```
   Solution: Check APP_CONFIGS in script.js includes the app name
   ```

### Debug Mode

Enable debug mode in the web service:

```javascript
// Add to script.js
const DEBUG_MODE = window.location.hostname === 'localhost';

if (DEBUG_MODE) {
  console.log('🐛 Debug mode enabled');
  // Additional logging...
}
```

### Rollback Plan

If something goes wrong:

1. **Revert to previous version:**
   ```bash
   git revert HEAD
   git push origin main
   ```

2. **Emergency fallback:**
   ```typescript
   // In ShortcutService.ts - temporary fallback
   private getWebServiceURL(): string {
     return 'shortcuts://'; // Opens iOS Shortcuts app directly
   }
   ```

## 📝 Maintenance

### Regular Updates

1. **Monitor GitHub Pages status**
2. **Update supported apps list**
3. **Review user feedback**
4. **Update iOS Shortcuts format if needed**

### Adding New Apps

```javascript
// 1. Add to APP_CONFIGS in script.js
'newapp': {
    name: 'New App',
    deepLink: 'newapp://',
    icon: '📱',
    category: 'social'
}

// 2. Add to ShortcutService.ts app categories
'New App': 'social'

// 3. Test the integration
```

---

## ✅ Completion Checklist

- [ ] GitHub repository created
- [ ] GitHub Pages enabled
- [ ] Web service accessible at your URL
- [ ] Expo app updated with your URL
- [ ] Manual testing completed
- [ ] iOS integration tested
- [ ] Documentation updated
- [ ] Team notified of new URL

**🎉 Congratulations! Your shortcut generator is live and ready to help users create mindful app blockers.**

For support, create an issue in your repository or refer to the main README.md. 