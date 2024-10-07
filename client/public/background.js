// Cache for storing the latest logHTML messages by tabId
const tabCache = {};

// Retry function to send cached messages every 30 seconds
function retrySendingCachedMessages() {
    Object.keys(tabCache).forEach(tabId => {
        const cachedMessage = tabCache[tabId];
        
        if (cachedMessage) {
            // Send the message to the side panel
            chrome.runtime.sendMessage({
                tabId: parseInt(tabId), 
                action: "updateHTML",
                html: cachedMessage.html,
                url: cachedMessage.url
            }).then(() => {
                // If successful, remove the message from the cache
                console.log(`Successfully sent message for tab ${tabId}. Removing from cache.`);
                delete tabCache[tabId];
            }).catch(error => {
                console.log(`Error sending message to side panel for tab ${tabId}:`, error);
            });
        }
    });
}

// Listen for tab updates and set up the side panel
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url && !tab.url.startsWith('chrome://')) {
        chrome.sidePanel.setOptions({
            tabId,
            path: 'index.html',
            enabled: true
        }).catch(error => console.error('Error setting side panel options:', error));
    }
});

// Listen for new logHTML messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "logHTML") {
        if (sender.tab) {
            const tabId = sender.tab.id;
            console.log('Received new HTML from tab:', tabId);
            
            // Update the cache with the latest HTML and URL for the tab
            tabCache[tabId] = {
                html: message.html,
                url: message.url
            };
            
            // Try sending the message immediately to the side panel
            chrome.runtime.sendMessage({
                tabId: tabId, 
                action: "updateHTML",
                html: message.html,
                url: message.url
            }).then(() => {
                // If successful, remove the message from the cache
                console.log(`Successfully sent message for tab ${tabId}. Removing from cache.`);
                delete tabCache[tabId];
            }).catch(error => {
                console.log(`Error sending message to side panel for tab ${tabId}:`, error);
            });
        } else {
            console.error('Received message without sender tab information');
        }
    }
});

// Set up the retry mechanism every 30 seconds
setInterval(retrySendingCachedMessages, 30000);

// Listen for tab removal and cleanup cache
chrome.tabs.onRemoved.addListener((tabId) => {
    console.log(`Tab ${tabId} closed. Removing cache.`);
    delete tabCache[tabId]; // Remove cached message when the tab is closed
});