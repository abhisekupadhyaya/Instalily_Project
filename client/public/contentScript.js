// Log the HTML of the current page
chrome.runtime.sendMessage({
    action: "logHTML",
    html: document.documentElement.outerHTML,
    url: window.location.href
});