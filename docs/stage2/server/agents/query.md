# Query Processing API

This documentation provides a comprehensive overview of the Query Processing Module, which is responsible for handling user queries, processing them with AI, and managing chat sessions.

## Data Model

### Query Entity

| Property | Type | Description |
|----------|------|-------------|
| chatID | string | Required, unique identifier for the chat session |
| messages | array of Message | Required, contains the chat history |
| pageUrl | string | Required, URL of the associated webpage |

### Message Entity

| Property | Type | Description |
|----------|------|-------------|
| role | string | Required, either 'user' or 'assistant' |
| content | string | Required, the message content |
| timestamp | Date | Required, timestamp of the message |

## Service Overview

The QueryService is responsible for processing user queries, interacting with AI, and managing chat sessions.

## Methods

### Process Query Request

```typescript
async processQueryRequest(chatId: string, chatQuery: string): Promise<{ role: string, content: string }>
```

Processes a user query and generates an AI response.

#### Parameters

- `chatId`: string (Unique identifier for the chat session)
- `chatQuery`: string (User's query)

#### Response

Returns an object containing the AI's response:
- `role`: string ('assistant')
- `content`: string (AI-generated response)

#### Process

1. Retrieves or creates a Query document for the given chatId.
2. Adds the user's query to the messages array.
3. If a pageUrl exists, retrieves associated parsed webpage content.
4. Sends the query (with parsed content if available) to the IntelligenceService.
5. Adds the AI response to the messages array.
6. Saves the updated Query document.

### Process User Query

```typescript
async processUserQuery(chatId: string, chatQuery: string): Promise<{ success: boolean, pageUrl: string }>
```

Adds a user query to the chat history.

#### Parameters

- `chatId`: string (Unique identifier for the chat session)
- `chatQuery`: string (User's query)

#### Response

Returns an object indicating success and the associated pageUrl.

### Process Intelligence Response

```typescript
async processIntelligenceResponse(chatId: string, ollamaResponse: any): Promise<{ success: boolean, role: string, content: string }>
```

Adds an AI-generated response to the chat history.

#### Parameters

- `chatId`: string (Unique identifier for the chat session)
- `ollamaResponse`: any (Response object from the IntelligenceService)

#### Response

Returns an object containing the success status and the AI's response.

### Create Chat

```typescript
async createChat(chatId: string, pageUrl: string): Promise<{ success: boolean, message: string, chatId: string, pageUrl: string }>
```

Creates or updates a chat session.

#### Parameters

- `chatId`: string (Unique identifier for the chat session)
- `pageUrl`: string (URL of the associated webpage)

#### Response

Returns an object indicating the success status and details of the created/updated chat.

## Usage

To use the QueryService in other parts of the application:

1. Import the QueryModule in the desired module.
2. Inject the QueryService into the constructor of the class where it's needed.


## Performance Considerations

- AI text generation is an asynchronous operation that may take significant time.

## Dependencies

- MongoDB (via Mongoose) for data storage
- IntelligenceService for AI-powered text generation

## Future Enhancements

1. Add support for multi-turn conversations with context preservation.