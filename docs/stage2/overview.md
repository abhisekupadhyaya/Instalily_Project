## Stage 2: Enhanced Implementation

This stage builds upon the scrappy implementation from Stage 1, introducing more sophisticated technologies and techniques to improve the chatbot's performance and capabilities.

### System Overview

The system now consists of five main components:
1. Frontend
2. Backend
3. MongoDB Database
4. Vector Database
5. RAG (Retrieval-Augmented Generation) System

## Frontend

The frontend remain unchanged:

### Key Functions:

- **HTML Capture**: Implement a function to extract the full HTML content of the current webpage.
- **Chat Initialization**: Send the captured HTML to the backend and wait for a "ready" signal before allowing the user to start chatting.
- **Message Handling**: Manage sending user messages and receiving agent responses.

## Backend

The backend now incorporates more advanced processing and retrieval mechanisms:

### Key Components:

- **HTML Parser**: Enhanced parser to extract and structure relevant information from the received HTML.
- **Vector Embeddings Generator**: Convert parsed text into vector embeddings for efficient similarity search.
- **RAG System**: Implement a Retrieval-Augmented Generation system to enhance response quality.
- **Agentic Workflow**: Refined workflow that leverages RAG and vector search for more accurate and contextual responses.
- **Chat Session Manager**: Handle the creation and tracking of chat sessions using unique chatIDs.

## MongoDB Database

The database structure remains similar, with some additions:

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
  pageUrl: String,
  contextEmbedding: Vector
}
```

## Vector Database

Implement a vector database (e.g., Pinecone, Milvus, or Faiss) to store and efficiently retrieve vector embeddings of product information and chat contexts.

### Key Functions:

- **Vector Storage**: Store vector embeddings of parsed HTML content and chat contexts.
- **Similarity Search**: Perform efficient similarity searches to retrieve relevant information.

## RAG (Retrieval-Augmented Generation) System

Implement a RAG system to enhance the quality and accuracy of the chatbot's responses.

### Key Components:

- **Retriever**: Fetch relevant information from the vector database based on the user's query.
- **Generator**: Use the retrieved information to generate more accurate and contextual responses.

## Agent Workflow

### Stage 1: Query Analysis and Embedding

**Agent: Query Analyzer and Embedder**

- Analyzes the user's query to determine its intent and key components.
- Generates a vector embedding of the query for similarity search.
- Identifies the type of request and extracts relevant entities.
- Determines if the query is within the scope of the chatbot's capabilities.

### Stage 2: Context Retrieval

**Agent: Context Retriever**

- Performs a similarity search in the vector database using the query embedding.
- Retrieves relevant product information, specifications, and other contextual data.
- Fetches previous chat history and its embedding for the current session.
- Combines retrieved information from various sources (HTML content, vector search results, chat history).

### Stage 3: RAG Processing

**Agent: RAG Processor**

- Uses the RAG system to generate a preliminary response based on the retrieved context and user query.
- Enhances the response with additional relevant information from the product database.
- Ensures the generated content is coherent and directly addresses the user's query.

### Stage 4: Information Synthesis

**Agent: Information Synthesizer**

- Combines the RAG-generated response with any additional context-specific information.
- Identifies gaps in information that may require additional data or clarification.
- Prepares a structured summary of available information relevant to the query.

### Stage 5: Response Generation

**Agent: Response Generator**

- Refines the RAG-generated response for clarity and conciseness.
- Ensures the response directly addresses the user's query and incorporates product-specific details.
- Generates follow-up questions or suggestions if more information is required from the user.

### Stage 6: Quality Assurance

**Agent: QA Checker**

- Reviews the generated response for accuracy, relevance, and completeness.
- Ensures the response adheres to the chatbot's scope and doesn't provide information outside its domain.
- Checks for consistency with previous responses in the chat history.

### Stage 7: Response Optimization

**Agent: Response Optimizer**

- Refines the response for clarity and conciseness.
- Formats the response appropriately for the chat interface.
- Incorporates any necessary disclaimers or additional information.
- Updates the chat context embedding in the vector database for future reference.