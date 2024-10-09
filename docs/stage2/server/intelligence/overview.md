# Intelligence Module Documentation

This documentation provides a comprehensive overview of the Intelligence Module.

## Service Overview

The Intelligence Service integrates Ollama's capabilities for chat completion into the application using the Llama 3.2 3B model.

## Methods

### Complete Chat

```typescript
async completeChat(chatQuery: string): Promise<OllamaResponse>
```

Generates a chat completion based on a given query using Ollama's Llama 3.2 3B model.

#### Parameters

- `chatQuery`: string (The input query for chat completion)

#### Response

Returns an `OllamaResponse` object containing the generated chat completion.

## Implementation Details

- Chat completion uses the Llama 3.2 3B model.
- The Ollama client is initialized with a configurable host URL.

## Configuration

The service uses the following configuration:

- `OLLAMA_URL`: The URL of the Ollama server (default: 'http://localhost:11434')

## Usage

To use the IntelligenceService in other parts of the application:

1. Import the IntelligenceModule in the desired module.
2. Inject the IntelligenceService into the constructor of the class where it's needed.

Example:

```typescript
import { IntelligenceService } from './intelligence/intelligence.service';

@Injectable()
export class SomeService {
  constructor(private intelligenceService: IntelligenceService) {}

  async someMethod() {
    const chatCompletion = await this.intelligenceService.completeChat('Your chat query here');
    // Use the chat completion as needed
  }
}
```

## Module Structure

The IntelligenceModule is set up as follows:

- Imports the ConfigModule for accessing configuration values.
- Provides the IntelligenceService.
- Exports the IntelligenceService for use in other modules.

## Performance Considerations

- API calls to Ollama are asynchronous to prevent blocking.

## Future Enhancements

1. Implement error handling and retries for API calls.
2. Add support for different models and RAG.
3. Implement caching mechanisms for frequently used queries.
4. Add support for streaming responses.

## Notes

- The IntelligenceModule is set up for dependency injection, allowing easy integration with other parts of the application.
- This service does not include any controllers, as it's designed to be used internally by other services.
- The Ollama client is initialized in the constructor of the IntelligenceService, ensuring a single instance is used throughout the application lifecycle.