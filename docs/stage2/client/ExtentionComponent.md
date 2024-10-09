# Chrome Extension Component

## Components

The extension consists of three main components:

1. Background Script (background.js)
2. Content Script (contentScript.js)
3. Manifest File (manifest.json)

## Background Script (background.js)

The background script serves as the central hub for managing communication between different parts of the extension.

### Key Features

**Tab Cache Management**
- Maintains a cache (tabCache) to store the latest HTML content for each tab.
- Implements a retry mechanism to resend cached messages every 30 seconds.

**Side Panel Setup**
- Listens for tab updates and sets up the side panel when a tab is fully loaded.
- Enables the side panel for all non-chrome URLs.

**Message Handling**
- Listens for "logHTML" messages from content scripts.
- Attempts to send the received HTML content to the side panel immediately.
- If sending fails, stores the message in the cache for later retry.

**Cache Cleanup**
- Removes cached messages when a tab is closed.

## Content Script (contentScript.js)

The content script runs in the context of web pages matching the specified patterns in the manifest.

### Functionality

- Captures the entire HTML content of the current page.
- Sends the captured HTML along with the current URL to the background script.

## Manifest File (manifest.json)

The manifest file defines the extension's properties, permissions, and behavior.

### Key Configurations

**Metadata**
- Name: Instalily Case Study
- Version: 1.0
- Description: AI Assistant

**Permissions**
- sidePanel
- tabs
- activeTab
- scripting

**Side Panel**
- Default path: index.html

**Background Script**
- Specifies background.js as the service worker

**Content Scripts**
- Matches: https://www.partselect.com/*
- Script: contentScript.js

**Host Permissions**
- Allows access to https://www.partselect.com/*

**Content Security Policy**
- Restricts script and object sources to 'self'
- Allows connections to localhost:8000

## Workflow

1. When a user visits https://www.partselect.com/, the content script captures the page's HTML.
2. The content script sends the HTML and URL to the background script.
3. The background script attempts to forward this information to the side panel.
4. If successful, the side panel displays the HTML content.
5. If unsuccessful, the message is cached and retried every 30 seconds.
6. The side panel is automatically enabled for non-chrome URLs.
7. When a tab is closed, its cached data is removed to conserve memory.

## Security Considerations

- The extension uses a content security policy to mitigate potential security risks.
- Host permissions are limited to the specific domain (https://www.partselect.com/*).
- The extension only injects content scripts into the specified domain, reducing potential attack surfaces.

## Limitations and Future Improvements

- Error handling could be improved with more specific error messages and user notifications.
- The 30-second retry interval for cached messages could be made configurable for better flexibility.
- Better caching and routing methods can be developed