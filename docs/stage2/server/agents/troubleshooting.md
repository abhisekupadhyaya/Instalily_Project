# Troubleshooting Module

The Troubleshooting Module processes user queries to provide detailed troubleshooting guidance for appliance issues, with a focus on refrigerators and dishwashers. It leverages product information and AI-generated responses to deliver comprehensive troubleshooting assistance.

## Service Methods

### processTroubleshootingRequest

```typescript
async processTroubleshootingRequest(userQuery: string, pageUrl?: string): Promise<string>
```

Processes a troubleshooting inquiry and returns an AI-generated response.

#### Parameters

- `userQuery`: string (The user's troubleshooting-related query)
- `pageUrl`: string (Optional URL of the product page)

#### Response

Returns a string containing the AI-generated response to the troubleshooting inquiry.

#### Process

1. Calls `formatPrompt` to prepare the prompt with user query and product information (if available).
2. Utilizes the IntelligenceService to generate a response based on the formatted prompt.
3. Returns the generated response.

### formatPrompt

```typescript
private async formatPrompt(userQuery: string, pageUrl?: string): Promise<string>
```

Formats the prompt for the AI model using the user's query and product information (if available).

#### Parameters

- `userQuery`: string (The user's troubleshooting-related query)
- `pageUrl`: string (Optional URL of the product page)

#### Response

Returns a string containing the formatted prompt for the AI model.

#### Process

1. Initializes the prompt with the base `troubleshootingPrompt`.
2. Replaces the `{userQuery}` placeholder with the actual user query.
3. If `pageUrl` is provided:
   - Retrieves the parsed part information from the database using the provided `pageUrl`.
   - If part information is found, formats it into a detailed string.
   - If no part information is found, sets a default message for unavailable product information.
4. Replaces the `{partInfo}` placeholder in the prompt with the formatted part information or default message.
5. Returns the fully formatted prompt.

## Usage

To use the TroubleshootingService:

1. Import the TroubleshootingModule in the desired module.
2. Inject the TroubleshootingService into the constructor of the class where it's needed.
3. Call the `processTroubleshootingRequest` method with the user's query and optional page URL.

## Performance Considerations

- AI text generation is an asynchronous operation that may take significant time.
- Database queries for part information may impact response time, especially when a `pageUrl` is provided.

## Future Enhancements

1. Implement caching for frequently accessed part information to reduce database load.
2. Expand the troubleshooting capabilities to cover a wider range of appliances.
3. Integrate with a knowledge base to provide more specific and accurate troubleshooting steps.
4. Implement a feedback system to improve the accuracy of troubleshooting responses over time.

## Notes

- The AI-generated content is expected to follow the guidelines specified in the prompt, including the step-by-step troubleshooting guide format.
- The troubleshooting response considers various factors such as symptoms, part details, safety precautions, and brand compatibility.
- The module is currently optimized for refrigerators and dishwashers but can be expanded to cover other appliances in the future.