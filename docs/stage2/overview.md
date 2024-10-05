# Stage 2: Agentic Graph Implementation

This stage builds upon the scrappy implementation from Stage 1, introducing an Agentic Graph Architecture that manages a network of specialized agent nodes using bare LLM calls. This approach enhances the chatbot's capabilities and flexibility without introducing advanced technologies like RAG or vector databases yet.

### System Overview

The system now consists of four main components:
1. Frontend (unchanged from Stage 1)
2. Backend (enhanced with Agentic Graph Architecture)
3. MongoDB Database (unchanged from Stage 1)
4. Agentic Graph Orchestrator

## Frontend

The frontend remains unchanged from Stage 1:

### Key Functions:

- **HTML Capture**: Implement a function to extract the full HTML content of the current webpage.
- **Chat Initialization**: Send the captured HTML to the backend and wait for a "ready" signal before allowing the user to start chatting.
- **Message Handling**: Manage sending user messages and receiving agent responses.

## Backend

The backend now incorporates the Agentic Graph Architecture:

### Key Components:

- **HTML Parser**: Enhanced parser to extract and structure relevant information from the received HTML.
- **Agentic Graph Orchestrator**: Manages the network of specialized agent nodes and coordinates their interactions.
- **Chat Session Manager**: Handle the creation and tracking of chat sessions using unique chatIDs.

## MongoDB Database

The database structure remains similar to Stage 1, with a minor addition:

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

## Agentic Graph Architecture

The core of this implementation is the Agentic Graph Orchestrator, which manages a network of specialized agent nodes. Each node represents a specific function or capability, and the orchestrator coordinates their interactions using bare LLM calls to process user queries and generate responses.

### Agentic Graph Orchestrator

The orchestrator is responsible for:
- Initializing and managing agent nodes
- Routing information between nodes
- Handling the overall workflow of query processing
- Managing sequential processing of tasks
- Implementing fallback and error-handling mechanisms

### Specialized Agent Nodes

Each agent node is implemented as a prompt template for the LLM, with specific instructions and context for its role. The main agent nodes are:

1. **Query Analyzer**
   - Parses user input
   - Determines query intent and type
   - Extracts key entities and parameters

2. **Context Retriever**
   - Searches the parsed HTML content
   - Retrieves relevant product information and chat history

3. **Product Specialist**
   - Handles product-specific queries
   - Accesses detailed product information and specifications

4. **Compatibility Checker**
   - Verifies part compatibility with specific models
   - Handles cross-referencing of product and part information

5. **Installation Guide Generator**
   - Creates step-by-step installation instructions
   - Tailors guides to specific parts and models

6. **Troubleshooter**
   - Diagnoses common issues
   - Provides troubleshooting steps

7. **Response Synthesizer**
   - Combines information from multiple agents
   - Ensures coherence and relevance of the final response

8. **Quality Assurance Agent**
   - Checks response accuracy and completeness
   - Ensures adherence to scope and guidelines

## Agentic Workflow

1. **Query Reception and Analysis**
   - The Query Analyzer receives the user input
   - It determines the query type and extracts key information
   - The analyzer suggests relevant specialized agents based on the query type

2. **Context Retrieval**
   - The Context Retriever searches the parsed HTML content
   - It retrieves relevant product information and chat history
   - The Product Specialist is engaged for detailed product information if needed

3. **Specialized Processing**
   - Based on the query type, relevant specialized agents are activated:
     - Compatibility Checker for compatibility queries
     - Installation Guide Generator for installation-related questions
     - Troubleshooter for diagnosing issues

4. **Response Generation**
   - The Response Synthesizer combines inputs from all activated agents
   - It generates a coherent response addressing the user's query

5. **Quality Assurance**
   - The Quality Assurance Agent reviews the synthesized response
   - It checks for accuracy, relevance, and adherence to guidelines
   - The response is refined if necessary

6. **Response Delivery**
   - The final, optimized response is sent back to the user via the frontend

7. **State Management**
   - The orchestrator updates the agentStates field in the chat history document
   - This allows for maintaining context across multiple turns of conversation