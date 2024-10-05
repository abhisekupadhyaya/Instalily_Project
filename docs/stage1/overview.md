# Stage 1: Scrappy Start

This document outlines a very scrappy implementation for processing the HTML of the page the chatbot have access to and implements the agentic workflow with bare LLM calls.

### System Overview

The system consists of three main components:
1. Frontend
2. Backend
3. MongoDB Database

## Frontend

### Key Functions:

- **HTML Capture**: Implement a function to extract the full HTML content of the current webpage.
- **Chat Initialization**: Send the captured HTML to the backend and wait for a "ready" signal before allowing the user to start chatting.
- **Message Handling**: Manage sending user messages and receiving agent responses.

## Backend

### Key Components:

- **HTML Parser**: Implement a parser to extract relevant information from the received HTML.
- **Agentic Workflow**: Design a workflow that uses bare LLM calls to process user queries based on the parsed HTML data.
- **Chat Session Manager**: Handle the creation and tracking of chat sessions using unique chatIDs.

## MongoDB Database

The database stores two main types of data:

1. Parsed HTML content
2. Chat histories

### Data Models:

**Parsed HTML Content**:
```
{
  _id: ObjectId,
  pageUrl: String,
  product: String,
  parsedContent: Object,
  timestamp: Date
}
```

**Chat History**:
```
{
  _id: ObjectId,
  chatID: String,
  messages: [
    {
      role: String,
      content: String,
      timestamp: Date
    }
  ],
  pageUrl: String
}
```

## Agent Workflow

### Stage 1: Query Analysis

**Agent: Query Analyzer**

- Analyzes the user's query to determine its intent and key components
- Identifies the type of request (e.g., product information, installation help, compatibility check)
- Extracts relevant entities (e.g., part numbers, model numbers, product types)
- Determines if the query is within the scope of the chatbot's capabilities

### Stage 2: Context Retrieval

**Agent: Context Retriever**

- Accesses the parsed HTML content from the database based on the current page URL
- Retrieves relevant product information, specifications, and other contextual data
- If necessary, fetches previous chat history for the current session

### Stage 3: Information Synthesis

**Agent: Information Synthesizer**

- Combines the query analysis results with the retrieved context
- Identifies gaps in information that may require additional data or clarification
- Prepares a structured summary of available information relevant to the query

### Stage 4: Response Generation

**Agent: Response Generator**

- Formulates a clear and concise response based on the synthesized information
- Ensures the response directly addresses the user's query
- Incorporates product-specific details, installation instructions, or compatibility information as needed
- Generates follow-up questions or suggestions if more information is required from the user

### Stage 5: Quality Assurance

**Agent: QA Checker**

- Reviews the generated response for accuracy, relevance, and completeness
- Ensures the response adheres to the chatbot's scope and doesn't provide information outside its domain
- Checks for consistency with previous responses in the chat history

### Stage 6: Response Optimization

**Agent: Response Optimizer**

- Refines the response for clarity and conciseness
- Formats the response appropriately for the chat interface
- Incorporates any necessary disclaimers or additional information