chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
      chrome.sidePanel.setOptions({
        tabId,
        path: 'index.html',
        enabled: true
      });
    }
  });