# Intentional - iOS Shortcut Generator

A static web service that dynamically generates iOS shortcuts for app blocking. This service integrates with the Intentional app to create mindful barriers between users and their distracting apps.

## 🌐 Live Service

**Production URL:** `https://yourusername.github.io/shortcutgen-web/`

**URL Format:** `https://yourusername.github.io/shortcutgen-web/?app={appname}&wait={seconds}&type={reflection_type}`

### URL Parameters

| Parameter | Description | Default | Examples |
|-----------|-------------|---------|----------|
| `app` | App to block (required) | - | `instagram`, `tiktok`, `youtube` |
| `wait` | Reflection time in seconds | `60` | `30`, `90`, `120`, `300` |
| `type` | Reflection question type | `mindfulness` | `productivity`, `gratitude`, `default` |

## 🚀 Features

- **Dynamic Shortcut Generation**: Creates iOS shortcuts on-demand with custom parameters
- **No Backend Required**: Fully static, hosted on GitHub Pages
- **Mobile Optimized**: Responsive design for iOS Safari
- **Multiple Reflection Types**: Supports different question categories
- **Easy Integration**: Simple URL-based API for the Expo app

## 📱 Supported Apps

The service supports all major social media and entertainment apps:

- **Social**: Instagram, TikTok, Twitter, Facebook, Reddit, Snapchat, Pinterest, LinkedIn, WhatsApp, Discord
- **Entertainment**: YouTube, Netflix, Spotify, Apple Music, Twitch
- **News**: Apple News
- **Browsers**: Safari

## 🛠️ Technical Implementation

### File Structure
```
shortcutgen-web/
├── index.html          # Main interface
├── style.css           # Styling and responsive design
├── script.js           # Core logic and shortcut generation
├── .github/workflows/  # GitHub Actions for deployment
└── README.md           # This file
```

### iOS Shortcuts Format

The service generates shortcuts in Apple's native format with these key components:

1. **Deep Link Action**: Opens `intentional://reflect?app={appname}`
2. **Metadata**: Includes reflection time and type settings
3. **Error Handling**: Graceful fallbacks for unsupported apps

### Example Generated Shortcut

```json
{
  "WFWorkflowActions": [
    {
      "WFWorkflowActionIdentifier": "is.workflow.actions.openurl",
      "WFWorkflowActionParameters": {
        "WFURLActionURL": "intentional://reflect?app=instagram"
      }
    }
  ]
}
```

## 🔧 Setup and Deployment

### Quick Setup

1. **Fork this repository**
2. **Enable GitHub Pages:**
   - Go to repository Settings
   - Navigate to Pages section
   - Set source to "GitHub Actions"
3. **Update URLs:**
   - Replace `yourusername` in URLs with your GitHub username
   - Update the Expo app's `ShortcutService.ts` with your GitHub Pages URL

### Custom Domain (Optional)

1. Add a `CNAME` file with your domain
2. Configure DNS to point to `yourusername.github.io`
3. Update the Expo app with your custom domain

### Local Development

```bash
# Serve locally (Python)
python -m http.server 8000

# Or with Node.js
npx serve .

# Open in browser
open http://localhost:8000/?app=instagram&wait=120
```

## 🔗 Integration with Expo App

### ShortcutService Integration

```typescript
// In your Expo app's ShortcutService.ts
private getWebServiceURL(): string {
  return 'https://yourusername.github.io/shortcutgen-web';
}

generateShortcutURL(appConfig: AppConfig): string {
  const baseURL = this.getWebServiceURL();
  const params = new URLSearchParams({
    app: appConfig.name.toLowerCase().replace(/\s+/g, '-'),
    wait: (appConfig.delaySeconds || 60).toString(),
    type: 'mindfulness'
  });
  return `${baseURL}?${params.toString()}`;
}
```

### Deep Link Handling

The generated shortcuts create deep links that your Expo app handles:

```typescript
// Format: intentional://reflect?app={appname}
// Example: intentional://reflect?app=instagram
```

## 📊 Analytics and Monitoring

The service includes optional analytics hooks:

```javascript
// Track shortcut generation
trackEvent('shortcut_generated', {
  app: appName,
  waitTime: waitTime,
  reflectionType: reflectionType
});
```

## 🔒 Security and Privacy

- **No Data Collection**: No personal data is stored or transmitted
- **Client-Side Only**: All processing happens in the browser
- **HTTPS Enforced**: Secure connections via GitHub Pages
- **No Cookies**: Stateless operation

## 🐛 Troubleshooting

### Common Issues

1. **Shortcut Won't Download**: Ensure iOS Safari is being used
2. **Deep Link Not Working**: Verify the Intentional app is installed
3. **App Not Supported**: Check the `APP_CONFIGS` in `script.js`

### Error Handling

The service includes comprehensive error handling:
- Invalid app names show helpful error messages
- Network issues provide retry options
- iOS compatibility checks prevent installation failures

## 🤝 Contributing

### Adding New Apps

1. Update `APP_CONFIGS` in `script.js`:
```javascript
'newapp': {
    name: 'New App',
    deepLink: 'newapp://',
    icon: '📱',
    category: 'social'
}
```

2. Test the URL: `/?app=newapp&wait=60`

### Improving UX

- Update `style.css` for design changes
- Modify `index.html` for new features
- Enhance `script.js` for functionality improvements

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/shortcutgen-web/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/shortcutgen-web/discussions)
- **Email**: your@email.com

---

Made with ❤️ for mindful technology use 