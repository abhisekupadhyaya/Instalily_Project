# Brand Inquiry Module

The Brand Inquiry Module processes user queries about specific brands or manufacturers, utilizing product information to provide detailed and helpful responses.

## Service Methods

### processBrandInquiry

```typescript
async processBrandInquiry(userQuery: string, pageUrl?: string): Promise<string>
```

Processes a brand inquiry and returns an AI-generated response.

#### Parameters

- `userQuery`: string (The user's brand-related query)
- `pageUrl`: string (Optional URL of the product page)

#### Response

Returns a string containing the AI-generated response to the brand inquiry.

#### Process

1. Calls `formatPrompt` to prepare the prompt with user query and product information.
2. Utilizes the IntelligenceService to generate a response based on the formatted prompt.
3. Returns the generated response.

### formatPrompt

```typescript
private async formatPrompt(userQuery: string, pageUrl?: string): Promise<string>
```

Formats the prompt for the AI model using the user's query and product information.

#### Parameters

- `userQuery`: string (The user's brand-related query)
- `pageUrl`: string (Optional URL of the product page)

#### Response

Returns a string containing the formatted prompt for the AI model.

#### Process

1. Initializes the prompt with the base `brandInquiryPrompt`.
2. If a `pageUrl` is provided:
   - Retrieves the parsed part information from the database.
   - If found, formats the product information using `formatProductInfo`.
   - If not found, sets a default message for unavailable product information.
3. If no `pageUrl` is provided, sets a default message for no specific product information.
4. Replaces placeholders in the prompt with the product information and user query.
5. Returns the fully formatted prompt.

## Prompt Structure

The brand inquiry prompt includes:
- Context about the AI assistant's role
- Product information (if available)
- User's query
- Instructions for formulating the response

## Usage

To use the BrandInquiryService:

1. Import the BrandInquiryModule in the desired module.
2. Inject the BrandInquiryService into the constructor of the class where it's needed.
3. Call the `processBrandInquiry` method with the user's query and optional page URL.

## Performance Considerations

- AI text generation is an asynchronous operation that may take significant time.

## Future Enhancements

1. Implement caching for frequently accessed product information.
2. Add support for batch compatibility checks for multiple parts or models.
3. Enhance the prompt to include more specific brand-related information.

## Notes

- The service relies on up-to-date information in the ParsedParts collection.
- The AI-generated content is expected to follow the guidelines specified in the prompt.
- The `formatProductInfo` method formats parsed part data into a string for the prompt.