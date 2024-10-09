# Installation Help Module

The Installation Help Module processes user queries to provide detailed installation instructions for specific appliance parts. It utilizes product information and AI-generated responses to offer comprehensive guidance tailored to the user's needs.

## Service Methods

### processInstallationHelpRequest

```typescript
async processInstallationHelpRequest(chatQuery: string, pageUrl: string): Promise<string>
```

Processes an installation help request and returns an AI-generated response with detailed instructions.

#### Parameters

- `chatQuery`: string (The user's installation-related query)
- `pageUrl`: string (URL of the product page)

#### Response

Returns a string containing the AI-generated response with installation instructions.

#### Process

1. Calls `formatPrompt` to prepare the prompt with user query and product information.
2. Utilizes the IntelligenceService to generate a response based on the formatted prompt.
3. Returns the generated response.

### formatPrompt

```typescript
private async formatPrompt(chatQuery: string, pageUrl: string): Promise<string>
```

Formats the prompt for the AI model using the user's query and product information.

#### Parameters

- `chatQuery`: string (The user's installation-related query)
- `pageUrl`: string (URL of the product page)

#### Response

Returns a string containing the formatted prompt for the AI model.

#### Process

1. Initializes the prompt with the base `installationHelpPrompt`.
2. Retrieves the parsed part information from the database using the provided `pageUrl`.
3. If part information is found:
   - Replaces placeholders in the prompt with actual product details.
4. If no part information is found, sets a default message for unavailable product information.
5. Returns the fully formatted prompt.

## Usage

To use the InstallationHelpService:

1. Import the InstallationHelpModule in the desired module.
2. Inject the InstallationHelpService into the constructor of the class where it's needed.
3. Call the `processInstallationHelpRequest` method with the user's query and page URL.

## Performance Considerations

- AI text generation is an asynchronous operation that may take significant time.
- Database queries for part information may impact response time.

## Future Enhancements

1. Implement caching for frequently accessed part information.
2. Add support for multimedia content in installation instructions (e.g., images, videos).
3. Enhance the prompt to include model-specific installation variations.

## Notes

- The AI-generated content is expected to follow the guidelines specified in the prompt, including safety precautions and general installation steps.
- The installation help considers specific part details, compatibility information, and potential replacement scenarios.