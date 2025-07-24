// App configurations with icons and deep links
const APP_CONFIGS = {
    'instagram': {
        name: 'Instagram',
        deepLink: 'instagram://',
        icon: '📷',
        category: 'social'
    },
    'tiktok': {
        name: 'TikTok',
        deepLink: 'tiktok://',
        icon: '🎵',
        category: 'social'
    },
    'youtube': {
        name: 'YouTube',
        deepLink: 'youtube://',
        icon: '📺',
        category: 'entertainment'
    },
    'twitter': {
        name: 'Twitter',
        deepLink: 'twitter://',
        icon: '🐦',
        category: 'social'
    },
    'facebook': {
        name: 'Facebook',
        deepLink: 'fb://',
        icon: '👥',
        category: 'social'
    },
    'reddit': {
        name: 'Reddit',
        deepLink: 'reddit://',
        icon: '🤖',
        category: 'social'
    },
    'snapchat': {
        name: 'Snapchat',
        deepLink: 'snapchat://',
        icon: '👻',
        category: 'social'
    },
    'pinterest': {
        name: 'Pinterest',
        deepLink: 'pinterest://',
        icon: '📌',
        category: 'social'
    },
    'linkedin': {
        name: 'LinkedIn',
        deepLink: 'linkedin://',
        icon: '💼',
        category: 'social'
    },
    'whatsapp': {
        name: 'WhatsApp',
        deepLink: 'whatsapp://',
        icon: '💬',
        category: 'social'
    },
    'discord': {
        name: 'Discord',
        deepLink: 'discord://',
        icon: '🎮',
        category: 'social'
    },
    'twitch': {
        name: 'Twitch',
        deepLink: 'twitch://',
        icon: '🟣',
        category: 'entertainment'
    },
    'netflix': {
        name: 'Netflix',
        deepLink: 'nflx://',
        icon: '🎬',
        category: 'entertainment'
    },
    'spotify': {
        name: 'Spotify',
        deepLink: 'spotify://',
        icon: '🎶',
        category: 'entertainment'
    },
    'apple-music': {
        name: 'Apple Music',
        deepLink: 'music://',
        icon: '🎵',
        category: 'entertainment'
    },
    'news': {
        name: 'News',
        deepLink: 'applenews://',
        icon: '📰',
        category: 'news'
    },
    'safari': {
        name: 'Safari',
        deepLink: 'http://',
        icon: '🧭',
        category: 'entertainment'
    }
};

// Global state
let currentAppConfig = null;
let currentSettings = {
    waitTime: 60,
    reflectionType: 'mindfulness'
};

// DOM elements
const elements = {
    loading: document.getElementById('loading'),
    config: document.getElementById('config'),
    download: document.getElementById('download'),
    error: document.getElementById('error'),
    appIcon: document.getElementById('appIcon'),
    appName: document.getElementById('appName'),
    appDescription: document.getElementById('appDescription'),
    waitTime: document.getElementById('waitTime'),
    reflectionType: document.getElementById('reflectionType'),
    generateBtn: document.getElementById('generateBtn'),
    downloadAppName: document.getElementById('downloadAppName'),
    downloadLink: document.getElementById('downloadLink'),
    copyLink: document.getElementById('copyLink'),
    createAnother: document.getElementById('createAnother'),
    retryBtn: document.getElementById('retryBtn'),
    errorMessage: document.getElementById('errorMessage')
};

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Intentional Shortcut Generator loaded');
    
    // Parse URL parameters
    const urlParams = parseURLParams();
    
    if (urlParams.app) {
        initializeApp(urlParams);
    } else {
        showError('No app specified. Please access this page through the Intentional app.');
    }
    
    // Set up event listeners
    setupEventListeners();
});

// Parse URL parameters
function parseURLParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        app: params.get('app'),
        wait: parseInt(params.get('wait')) || 60,
        type: params.get('type') || 'mindfulness'
    };
}

// Initialize the app with URL parameters
function initializeApp(urlParams) {
    const appKey = urlParams.app.toLowerCase();
    const appConfig = APP_CONFIGS[appKey];
    
    if (!appConfig) {
        showError(`App "${urlParams.app}" is not supported yet. Please contact support to add it.`);
        return;
    }
    
    currentAppConfig = { ...appConfig, key: appKey };
    currentSettings.waitTime = urlParams.wait;
    currentSettings.reflectionType = urlParams.type;
    
    // Update UI
    updateAppInfo();
    updateSettings();
    showSection('config');
}

// Update app information in UI
function updateAppInfo() {
    if (!currentAppConfig) return;
    
    elements.appIcon.textContent = currentAppConfig.icon;
    elements.appName.textContent = currentAppConfig.name;
    elements.appDescription.textContent = `Block ${currentAppConfig.name} with mindful reflection`;
}

// Update settings in UI
function updateSettings() {
    elements.waitTime.value = currentSettings.waitTime;
    elements.reflectionType.value = currentSettings.reflectionType;
}

// Set up event listeners
function setupEventListeners() {
    // Settings changes
    elements.waitTime.addEventListener('change', function() {
        currentSettings.waitTime = parseInt(this.value);
    });
    
    elements.reflectionType.addEventListener('change', function() {
        currentSettings.reflectionType = this.value;
    });
    
    // Generate shortcut button
    elements.generateBtn.addEventListener('click', generateShortcut);
    
    // Download section buttons
    elements.copyLink.addEventListener('click', copyInstallLink);
    elements.createAnother.addEventListener('click', function() {
        showSection('config');
    });
    
    // Error section retry button
    elements.retryBtn.addEventListener('click', function() {
        showSection('config');
    });
}

// Generate the iOS shortcut
async function generateShortcut() {
    try {
        showSection('loading');
        
        // Simulate generation time for better UX
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Create downloadable plist
        const plistData = createShortcutPlist();
        
        // Create downloadable .shortcut file
        const blob = new Blob([plistData], { type: 'application/octet-stream' });
        const downloadUrl = URL.createObjectURL(blob);
        const filename = `Mindful-${currentAppConfig.name.replace(/\s+/g, '-')}.shortcut`;
        
        // Update download section
        elements.downloadAppName.textContent = currentAppConfig.name;
        elements.downloadLink.href = downloadUrl;
        elements.downloadLink.download = filename;
        elements.downloadLink.textContent = '📥 Download .shortcut File';
        
        // Update instructions
        updateInstructions();
        
        showSection('download');
        
        console.log('✅ Real .shortcut file generated successfully');
        
    } catch (error) {
        console.error('❌ Failed to generate shortcut:', error);
        showError('Failed to generate shortcut. Please try again.');
    }
}

// Create actual iOS shortcut plist data
function createShortcutPlist() {
    const appKey = currentAppConfig.key;
    const appName = currentAppConfig.name;
    const reflectionDeepLink = `intentional://reflect?app=${appKey}`;
    
    // Create the shortcut data structure (same as what iOS uses)
    const shortcutData = {
        WFWorkflowClientVersion: "2605.0.5",
        WFWorkflowMinimumClientVersionString: "900",
        WFWorkflowMinimumClientVersion: 900,
        WFWorkflowIcon: {
            WFWorkflowIconStartColor: 2846468607, // Gray color
            WFWorkflowIconGlyphNumber: 61440
        },
        WFWorkflowInputContentItemClasses: [
            "WFAppContentItem",
            "WFAppStoreAppContentItem", 
            "WFGenericFileContentItem"
        ],
        WFWorkflowActions: [
            {
                WFWorkflowActionIdentifier: "is.workflow.actions.comment",
                WFWorkflowActionParameters: {
                    WFCommentActionText: `Intentional ${appName} Blocker\nGenerated by Intentional App\nReflection time: ${currentSettings.waitTime}s\nType: ${currentSettings.reflectionType}`
                }
            },
            {
                WFWorkflowActionIdentifier: "is.workflow.actions.openurl",
                WFWorkflowActionParameters: {
                    WFURLActionURL: reflectionDeepLink
                }
            }
        ],
        WFWorkflowImportQuestions: [],
        WFWorkflowTypes: [],
        WFQuickActionSurfaces: [],
        WFWorkflowHasShortcutInputVariables: false,
        WFWorkflowHasOutputFallback: false,
        WFWorkflowOutputContentItemClasses: []
    };
    
    // Convert to plist format
    // Since we can't easily create binary plists in the browser, we'll use XML format
    // iOS can handle both binary and XML plists
    const plistXML = convertToPlistXML(shortcutData);
    
    return plistXML;
}

// Convert JavaScript object to plist XML format
function convertToPlistXML(obj) {
    const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">`;
    
    const xmlFooter = `</plist>`;
    
    function convertValue(value, indent = '') {
        if (value === null || value === undefined) {
            return `${indent}<string></string>`;
        } else if (typeof value === 'boolean') {
            return `${indent}<${value ? 'true' : 'false'}/>`;
        } else if (typeof value === 'number') {
            return Number.isInteger(value) ? 
                `${indent}<integer>${value}</integer>` : 
                `${indent}<real>${value}</real>`;
        } else if (typeof value === 'string') {
            // Escape XML special characters
            const escaped = value
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&apos;');
            return `${indent}<string>${escaped}</string>`;
        } else if (Array.isArray(value)) {
            if (value.length === 0) {
                return `${indent}<array/>`;
            }
            let xml = `${indent}<array>\n`;
            for (const item of value) {
                xml += convertValue(item, indent + '    ') + '\n';
            }
            xml += `${indent}</array>`;
            return xml;
        } else if (typeof value === 'object') {
            const keys = Object.keys(value);
            if (keys.length === 0) {
                return `${indent}<dict/>`;
            }
            let xml = `${indent}<dict>\n`;
            for (const key of keys) {
                xml += `${indent}    <key>${key}</key>\n`;
                xml += convertValue(value[key], indent + '    ') + '\n';
            }
            xml += `${indent}</dict>`;
            return xml;
        }
        return `${indent}<string>${String(value)}</string>`;
    }
    
    return xmlHeader + '\n' + convertValue(obj) + '\n' + xmlFooter;
}

// Update instructions for the new approach
function updateInstructions() {
    const instructionsElement = document.querySelector('.instructions ol');
    const deepLink = `intentional://reflect?app=${currentAppConfig.key}`;
    
    if (instructionsElement) {
        instructionsElement.innerHTML = `
            <li><strong>Tap "Download .shortcut File"</strong> above to download the real iOS shortcut file</li>
            <li><strong>Open the downloaded file</strong> - it will automatically open in the iOS Shortcuts app</li>
            <li><strong>Tap "Add Shortcut"</strong> when prompted to install it</li>
            <li><strong>Add to Home Screen:</strong>
                <ul>
                    <li>Find your new shortcut in the Shortcuts app</li>
                    <li>Tap the <strong>⋯ (three dots)</strong> menu</li>
                    <li>Select <strong>"Add to Home Screen"</strong></li>
                    <li>Change the name to <strong>"${currentAppConfig.name}"</strong> (same as original app)</li>
                    <li>Choose an icon that matches the original app</li>
                    <li>Tap <strong>"Add"</strong></li>
                </ul>
            </li>
            <li><strong>Hide the original app:</strong> Move it to a folder or App Library</li>
            <li><strong>Test your shortcut:</strong> Tap it to make sure it opens the Intentional app!</li>
            <li><strong>If it doesn't work:</strong> Make sure the Intentional app is installed and the URL scheme is correct: <code>${deepLink}</code></li>
        `;
    }
}

// Copy install link to clipboard
async function copyInstallLink() {
    try {
        // Get the deep link URL instead of the page URL
        const deepLinkURL = `intentional://reflect?app=${currentAppConfig.key}`;
        await navigator.clipboard.writeText(deepLinkURL);
        
        // Show feedback
        const originalText = elements.copyLink.textContent;
        elements.copyLink.textContent = '✅ Copied!';
        elements.copyLink.style.background = '#48bb78';
        
        setTimeout(() => {
            elements.copyLink.textContent = originalText;
            elements.copyLink.style.background = '';
        }, 2000);
        
    } catch (error) {
        console.error('Failed to copy to clipboard:', error);
        
        // Fallback: show the URL in an alert
        const deepLinkURL = `intentional://reflect?app=${currentAppConfig.key}`;
        alert(`Copy this deep link:\n${deepLinkURL}`);
    }
}

// Show specific section and hide others
function showSection(sectionName) {
    // Hide all sections
    elements.loading.style.display = 'none';
    elements.config.style.display = 'none';
    elements.download.style.display = 'none';
    elements.error.style.display = 'none';
    
    // Show requested section
    if (elements[sectionName]) {
        elements[sectionName].style.display = 'block';
    }
}

// Show error message
function showError(message) {
    elements.errorMessage.textContent = message;
    showSection('error');
}

// Utility function to get app config by key
function getAppConfig(appKey) {
    return APP_CONFIGS[appKey.toLowerCase()];
}

// Analytics (optional - for tracking usage)
function trackEvent(eventName, properties = {}) {
    try {
        // Add analytics here if needed
        console.log(`📊 Event: ${eventName}`, properties);
    } catch (error) {
        // Fail silently for analytics
        console.warn('Analytics error:', error);
    }
}

// Track page load
trackEvent('page_load', {
    app: currentAppConfig?.name,
    timestamp: new Date().toISOString()
});

// Enhanced error handling for iOS compatibility
window.addEventListener('error', function(event) {
    console.error('Global error:', event.error);
    showError('An unexpected error occurred. Please refresh and try again.');
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
    showError('An unexpected error occurred. Please refresh and try again.');
});

console.log('🎯 Intentional Shortcut Generator ready!'); 