# React Component

## Architecture Overview

The application consists of three main components:

1. API Module (api.js)
2. ChatWindow Component (ChatWindow.js)
3. Main App Component (App.js)

## 1. API Module (api.js)

The API module handles communication with the backend server.

### Key Features:
- Utilizes Axios for HTTP requests
- Configurable base URL and timeout
- Implements three main functions:
  1. `sendChatMessage`: Sends a chat message to a specific chat ID
  2. `getAIMessage`: Retrieves an AI-generated message
  3. `updateWebpage`: Updates webpage information on the server

### Implementation Details:
- Creates an Axios instance with predefined configuration
- Handles errors and logs them to the console
- Uses a hardcoded chat ID ("1234") for `getAIMessage` function. This needed to be made dynamic to ensure each chats is tracked separatly.

## 2. ChatWindow Component (ChatWindow.js)

The ChatWindow component is the core of the chat interface.

### Key Features:
- Manages chat messages state
- Handles user input and message sending
- Processes webpage updates received via Chrome messages
- Renders chat messages with Markdown support

### Implementation Details:
- Implements a message processing function (`processUpdateHTML`) for handling webpage updates on `https://www.partselect.com/`.
- Utilizes the `marked` library for rendering Markdown content
- Implements auto-scrolling to the latest message

### Chrome Extension Integration:
- Listens for Chrome runtime messages using `chrome.runtime.onMessage.addListener`
- Processes HTML content of the current webpage
- Updates the chat interface with webpage information

## 3. Main App Component (App.js)

The App component serves as the entry point of the application.

### Key Features:
- Renders the main application layout
- Includes the ChatWindow component

## Styling

The application uses CSS for styling:
- `App.css` for the main application layout
- `ChatWindow.css` for the chat interface styling

## Workflow

1. The application initializes with a welcome message from the assistant.
2. When a user visits a webpage (specifically https://www.partselect.com/), the Chrome extension captures the HTML content.
3. The captured HTML is sent to the ChatWindow component via Chrome runtime messages.
4. The ChatWindow processes the HTML, extracts relevant information, and updates the chat interface.
5. Users can interact with the chat interface, sending messages and receiving AI-generated responses.
6. The application handles errors, displaying appropriate error messages to the user.

## Security Considerations

- The application uses `dangerouslySetInnerHTML` to render Markdown content, which could potentially introduce XSS vulnerabilities if not properly sanitized.
- The Chrome extension integration assumes trust in the received HTML content.

## Potential Improvements

1. Implement dynamic chat IDs.
2. Add input validation and sanitization for user messages and received HTML content.
3. Implement more robust error handling and user feedback mechanisms.
4. Implement support for longer chat with word streaming.
5. Reduce the axios timeout from "timeout: 500000" to "timeout: 5000".