# Test URLs for Shortcut Generator

Use these URLs to test your shortcut generator service after deployment.

## 🧪 Basic App Tests

### Popular Social Media Apps
```
https://yourusername.github.io/shortcutgen-web/?app=instagram&wait=60&type=mindfulness
https://yourusername.github.io/shortcutgen-web/?app=tiktok&wait=120&type=mindfulness
https://yourusername.github.io/shortcutgen-web/?app=twitter&wait=90&type=productivity
https://yourusername.github.io/shortcutgen-web/?app=facebook&wait=60&type=mindfulness
https://yourusername.github.io/shortcutgen-web/?app=reddit&wait=180&type=mindfulness
```

### Entertainment Apps
```
https://yourusername.github.io/shortcutgen-web/?app=youtube&wait=120&type=productivity
https://yourusername.github.io/shortcutgen-web/?app=netflix&wait=300&type=productivity
https://yourusername.github.io/shortcutgen-web/?app=spotify&wait=60&type=default
```

### Communication Apps
```
https://yourusername.github.io/shortcutgen-web/?app=whatsapp&wait=30&type=mindfulness
https://yourusername.github.io/shortcutgen-web/?app=discord&wait=90&type=mindfulness
```

## ⚙️ Parameter Variations

### Different Wait Times
```
# Quick reflection (30 seconds)
https://yourusername.github.io/shortcutgen-web/?app=instagram&wait=30

# Standard reflection (1 minute)
https://yourusername.github.io/shortcutgen-web/?app=instagram&wait=60

# Extended reflection (5 minutes)
https://yourusername.github.io/shortcutgen-web/?app=instagram&wait=300
```

### Different Reflection Types
```
# Mindfulness questions
https://yourusername.github.io/shortcutgen-web/?app=instagram&type=mindfulness

# Productivity focus
https://yourusername.github.io/shortcutgen-web/?app=youtube&type=productivity

# Gratitude practice
https://yourusername.github.io/shortcutgen-web/?app=facebook&type=gratitude

# General reflection
https://yourusername.github.io/shortcutgen-web/?app=twitter&type=default
```

## 🚨 Error Testing

### Unsupported Apps
```
# Should show "App not supported" error
https://yourusername.github.io/shortcutgen-web/?app=unsupportedapp&wait=60
```

### Missing Parameters
```
# Should show "No app specified" error
https://yourusername.github.io/shortcutgen-web/

# Should use default values
https://yourusername.github.io/shortcutgen-web/?app=instagram
```

### Invalid Parameters
```
# Invalid wait time (should default to 60)
https://yourusername.github.io/shortcutgen-web/?app=instagram&wait=invalid

# Invalid reflection type (should default to mindfulness)
https://yourusername.github.io/shortcutgen-web/?app=instagram&type=invalid
```

## 📱 iOS Testing Workflow

1. **Open test URL on iOS device**
2. **Verify app info displays correctly**
3. **Customize settings if desired**
4. **Tap "Generate Shortcut"**
5. **Download the .shortcut file**
6. **Open file to install in Shortcuts app**
7. **Test the installed shortcut**

### Expected Shortcut Behavior
When the installed shortcut is tapped:
1. Should open the Intentional app
2. Should navigate to reflection screen
3. Should show correct app name and settings
4. Should eventually allow access to target app

## 🛠️ Development Testing

### Local Development URLs
```
# If running locally on port 8000
http://localhost:8000/?app=instagram&wait=60&type=mindfulness
http://localhost:8000/?app=youtube&wait=120&type=productivity
```

### Test with curl
```bash
# Test basic accessibility
curl -I https://yourusername.github.io/shortcutgen-web/

# Test with parameters
curl "https://yourusername.github.io/shortcutgen-web/?app=instagram&wait=60"
```

## 📊 Analytics Testing

Track these events during testing:
- `page_load`: When the service loads
- `shortcut_generated`: When a shortcut is created
- `download_started`: When user downloads shortcut
- `error_occurred`: When errors happen

## ✅ Testing Checklist

- [ ] All supported apps load correctly
- [ ] Parameter parsing works for all combinations
- [ ] Error handling shows appropriate messages
- [ ] Shortcut generation produces valid files
- [ ] Downloaded shortcuts work on iOS device
- [ ] Deep links navigate to correct Expo app screens
- [ ] UI is responsive on mobile devices
- [ ] Copy link functionality works
- [ ] Instructions are clear and helpful

## 🔄 Automated Testing Script

```bash
#!/bin/bash
# test-all-apps.sh

BASE_URL="https://yourusername.github.io/shortcutgen-web"
APPS=("instagram" "tiktok" "youtube" "twitter" "facebook")

echo "Testing all supported apps..."

for app in "${APPS[@]}"; do
    echo "Testing $app..."
    response=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/?app=$app&wait=60")
    if [ "$response" = "200" ]; then
        echo "✅ $app works"
    else
        echo "❌ $app failed (HTTP $response)"
    fi
done

echo "Testing complete!"
```

Run this script after any changes to verify all apps still work correctly. 