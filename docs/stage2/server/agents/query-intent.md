# Query Intent Module

This documentation provides a comprehensive overview of the Query Intent Module, which is responsible for classifying user intents based on their messages.

## Methods

### Classify User Intent

```typescript
async classifyUserIntent(userMessage: string): Promise<string>
```

Classifies the intent of a user's message.

#### Parameters

- `userMessage`: string (The message from the user to be classified)

#### Response

Returns a string containing the JSON representation of the classified intent.

#### Process

1. Replaces the placeholder in the intent prompt with the user's message.
2. Uses the IntelligenceService to generate a classification based on the prompt.
3. Returns the trimmed content of the AI-generated response.

## Prompt Structure

Intent categories include:
- PRODUCT_INQUIRY
- COMPATIBILITY_CHECK
- INSTALLATION_HELP
- TROUBLESHOOTING
- BRAND_INQUIRY
- SMALL_TALK

## Module Configuration

The QueryIntentModule is configured to:

1. Import the IntelligenceModule.
2. Provide the QueryIntentService.
3. Export the QueryIntentService for use in other parts of the application.

## Usage

To use the QueryIntentService in other parts of the application:

1. Import the QueryIntentModule in the desired module.
2. Inject the QueryIntentService into the constructor of the class where it's needed.

## Performance Considerations

- AI text generation is an asynchronous operation that may take significant time.

## Future Enhancements

1. Expand the list of intent categories to cover more specific use cases.
2. Implement a feedback mechanism to improve classification accuracy over time.

## Notes

- The service does not perform any validation on the AI-generated content, assuming it will always be in the correct JSON format.