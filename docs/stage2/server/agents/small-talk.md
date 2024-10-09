# Small Talk Module

The Small Talk Module processes user queries to engage in light conversation while guiding the discussion back to appliance parts-related topics. It utilizes product information and AI-generated responses to provide friendly and helpful customer service.

## Service Methods

### processSmallTalkRequest

```typescript
async processSmallTalkRequest(chatQuery: string, pageUrl?: string): Promise<string>
```

Processes a small talk request and returns an AI-generated response.

#### Parameters

- `chatQuery`: string (The user's chat message)
- `pageUrl`: string (Optional URL of the product page)

#### Response

Returns a string containing the AI-generated response to the small talk request.

#### Process

1. Calls `formatPrompt` to prepare the prompt with the user's message and product information (if available).
2. Utilizes the IntelligenceService to generate a response based on the formatted prompt.
3. Returns the generated response.

### formatPrompt

```typescript
private async formatPrompt(chatQuery: string, pageUrl?: string): Promise<string>
```

Formats the prompt for the AI model using the user's message and product information (if available).

#### Parameters

- `chatQuery`: string (The user's chat message)
- `pageUrl`: string (Optional URL of the product page)

#### Response

Returns a string containing the formatted prompt for the AI model.

#### Process

1. Initializes the prompt with the base `smallTalkPrompt`.
2. If a `pageUrl` is provided, retrieves the parsed part information from the database.
3. If part information is found:
   - Formats the product information including manufacturer, compatible brands, symptoms, part name, part number, description, and additional details if available.
4. Replaces placeholders in the prompt with the product information (if any) and user's message.
5. Returns the fully formatted prompt.

## Usage

To use the SmallTalkService:

1. Import the SmallTalkModule in the desired module.
2. Inject the SmallTalkService into the constructor of the class where it's needed.
3. Call the `processSmallTalkRequest` method with the user's message and optionally, the page URL.

## Performance Considerations

- AI text generation is an asynchronous operation that may take significant time.
- Database queries for part information may impact response time when a page URL is provided.

## Future Enhancements

1. Implement caching for frequently accessed part information.
2. Add support for personalized small talk based on user history or preferences.
3. Enhance the prompt to include more specific conversation topics related to appliances.

## Notes

- The AI-generated content is expected to follow the guidelines specified in the prompt, including acknowledging the user's message and steering the conversation back to appliance parts.
- The small talk functionality is designed to maintain a balance between friendly conversation and focusing on the primary goal of assisting with appliance parts.