# Compatibility Check Module

The Compatibility Check Module processes user queries to determine if a specific part is compatible with a given appliance model. It utilizes product information and AI-generated responses to provide detailed compatibility assessments.

## Service Methods

### processCompatibilityCheck

```typescript
async processCompatibilityCheck(userQuery: string, pageUrl: string): Promise<string>
```

Processes a compatibility check inquiry and returns an AI-generated response.

#### Parameters

- `userQuery`: string (The user's compatibility-related query)
- `pageUrl`: string (URL of the product page)

#### Response

Returns a string containing the AI-generated response to the compatibility check inquiry.

#### Process

1. Calls `formatPrompt` to prepare the prompt with user query and product information.
2. Utilizes the IntelligenceService to generate a response based on the formatted prompt.
3. Returns the generated response.

### formatPrompt

```typescript
private async formatPrompt(userQuery: string, pageUrl: string): Promise<string>
```

Formats the prompt for the AI model using the user's query and product information.

#### Parameters

- `userQuery`: string (The user's compatibility-related query)
- `pageUrl`: string (URL of the product page)

#### Response

Returns a string containing the formatted prompt for the AI model.

#### Process

1. Initializes the prompt with the base `compatibilityCheckPrompt`.
2. Retrieves the parsed part information from the database using the provided `pageUrl`.
3. If part information is found:
   - Formats the product information including part numbers, manufacturer, brands, and compatibility details.
4. If no part information is found, sets a default message for unavailable product information.
5. Replaces placeholders in the prompt with the product information and user query.
6. Returns the fully formatted prompt.

## Prompt Structure

The compatibility check prompt includes:
- Context about the AI assistant's role
- Detailed part information (if available)
- User's query
- Instructions for determining compatibility
- Guidelines for response format

## Usage

To use the CompatibilityCheckService:

1. Import the CompatibilityCheckModule in the desired module.
2. Inject the CompatibilityCheckService into the constructor of the class where it's needed.
3. Call the `processCompatibilityCheck` method with the user's query and page URL.

## Performance Considerations

- AI text generation is an asynchronous operation that may take significant time.
- Database queries for part information may impact response time.

## Future Enhancements

1. Implement caching for frequently accessed part information.
2. Add support for batch compatibility checks for multiple parts or models.
3. Enhance the prompt to include more specific compatibility criteria or rules.

## Notes

- The service relies on up-to-date information in the ParsedParts collection.
- The AI-generated content is expected to follow the guidelines specified in the prompt, including the response format.
- The compatibility check considers exact model matches, similarities in model numbers, brand information, and additional product compatibility data.