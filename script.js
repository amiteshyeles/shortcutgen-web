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
        
        // Create downloadable plist file for reference
        const plistData = createShortcutPlist();
        const blob = new Blob([plistData], { type: 'application/octet-stream' });
        const downloadUrl = URL.createObjectURL(blob);
        const filename = `Mindful-${currentAppConfig.name.replace(/\s+/g, '-')}.shortcut`;
        
        // Update download section with manual method (primary)
        elements.downloadAppName.textContent = currentAppConfig.name;
        elements.downloadLink.href = '#manual-creation';
        elements.downloadLink.removeAttribute('download');
        elements.downloadLink.textContent = '📋 Create Manually (Recommended)';
        elements.downloadLink.onclick = (e) => {
            e.preventDefault();
            copyDeepLinkAndShowInstructions();
        };
        
        // Add reference download option
        const downloadSection = document.querySelector('.download-buttons');
        let referenceBtn = document.getElementById('referenceDownload');
        if (!referenceBtn) {
            referenceBtn = document.createElement('a');
            referenceBtn.id = 'referenceDownload';
            referenceBtn.className = 'download-btn secondary';
            referenceBtn.innerHTML = '⚠️ Download (Unsigned)';
            referenceBtn.style.fontSize = '0.9em';
            referenceBtn.title = 'This will fail on iOS 15+ due to signing requirements';
            downloadSection.appendChild(referenceBtn);
        }
        referenceBtn.href = downloadUrl;
        referenceBtn.download = filename;
        
        // Update instructions
        updateInstructions();
        
        showSection('download');
        
        console.log('✅ Shortcut ready for manual creation');
        
    } catch (error) {
        console.error('❌ Failed to generate shortcut:', error);
        showError('Failed to generate shortcut. Please try again.');
    }
}

// Copy deep link and show instructions
function copyDeepLinkAndShowInstructions() {
    const deepLink = `intentional://reflect?app=${currentAppConfig.key}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(deepLink).then(() => {
        // Show feedback
        const button = document.getElementById('downloadLink');
        const originalText = button.textContent;
        button.textContent = '✅ Deep Link Copied!';
        button.style.backgroundColor = '#10b981';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
        }, 2000);
        
        // Scroll to instructions
        document.querySelector('.instructions').scrollIntoView({ behavior: 'smooth' });
    }).catch(() => {
        // Fallback for browsers that don't support clipboard API
        alert(`Copy this deep link:\n\n${deepLink}`);
    });
}

// Update instructions for the manual creation approach
function updateInstructions() {
    const instructionsElement = document.querySelector('.instructions ol');
    const deepLink = `intentional://reflect?app=${currentAppConfig.key}`;
    
    if (instructionsElement) {
        instructionsElement.innerHTML = `
            <li><strong>📋 Copy Deep Link:</strong> Tap <strong>"Create Manually"</strong> above to copy the deep link</li>
            <li><strong>🔨 Create Shortcut:</strong>
                <ul>
                    <li>Open the <strong>iOS Shortcuts app</strong></li>
                    <li>Tap the <strong>"+"</strong> button (top right)</li>
                    <li>Tap <strong>"Add Action"</strong></li>
                    <li>Search for <strong>"Open URL"</strong> and select it</li>
                    <li>Tap in the URL field and <strong>paste</strong> the copied link</li>
                    <li>Tap <strong>"Next"</strong></li>
                    <li>Name your shortcut: <strong>"${currentAppConfig.name}"</strong></li>
                    <li>Tap <strong>"Done"</strong></li>
                </ul>
            </li>
            <li><strong>🏠 Add to Home Screen:</strong>
                <ul>
                    <li>Find your new shortcut in the Shortcuts app</li>
                    <li>Tap the <strong>⋯ (three dots)</strong> menu on the shortcut</li>
                    <li>Select <strong>"Add to Home Screen"</strong></li>
                    <li>Change the name to <strong>"${currentAppConfig.name}"</strong></li>
                    <li>Tap the icon to choose one that looks like the original app</li>
                    <li>Tap <strong>"Add"</strong> (top right)</li>
                </ul>
            </li>
            <li><strong>🔄 Replace Original:</strong> Move the real ${currentAppConfig.name} app to a folder or App Library</li>
            <li><strong>✅ Test:</strong> Tap your new shortcut to ensure it opens the Intentional app correctly</li>
            <li><strong>ℹ️ Deep Link Reference:</strong> <code>${deepLink}</code></li>
        `;
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

// Copy install link to clipboard (now copies the deep link)
async function copyInstallLink() {
    try {
        const deepLinkURL = `intentional://reflect?app=${currentAppConfig.key}`;
        await navigator.clipboard.writeText(deepLinkURL);
        
        // Show feedback
        const button = document.getElementById('copyLink');
        const originalText = button.textContent;
        button.textContent = '✅ Copied!';
        button.style.backgroundColor = '#10b981';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
        }, 2000);
        
        console.log('✅ Deep link copied to clipboard:', deepLinkURL);
    } catch (error) {
        console.error('❌ Failed to copy to clipboard:', error);
        // Fallback for browsers that don't support clipboard API
        const deepLinkURL = `intentional://reflect?app=${currentAppConfig.key}`;
        alert(`Copy this deep link:\n\n${deepLinkURL}`);
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