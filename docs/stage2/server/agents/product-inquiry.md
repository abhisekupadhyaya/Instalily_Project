# Product Inquiry Module

The Product Inquiry Module processes user queries about specific parts, providing detailed information and addressing customer inquiries using product data and AI-generated responses.

## Service Methods

### processProductInquiry

```typescript
async processProductInquiry(chatQuery: string, pageUrl: string): Promise<string>
```

Processes a product inquiry and returns an AI-generated response.

#### Parameters

- `chatQuery`: string (The customer's product-related query)
- `pageUrl`: string (URL of the product page)

#### Response

Returns a string containing the AI-generated response to the product inquiry.

#### Process

1. Calls `formatPrompt` to prepare the prompt with the chat query and product information.
2. Utilizes the IntelligenceService to generate a response based on the formatted prompt.
3. Returns the generated response.

### formatPrompt

```typescript
private async formatPrompt(chatQuery: string, pageUrl: string): Promise<string>
```

Formats the prompt for the AI model using the customer's query and product information.

#### Parameters

- `chatQuery`: string (The customer's product-related query)
- `pageUrl`: string (URL of the product page)

#### Response

Returns a string containing the formatted prompt for the AI model.

#### Process

1. Initializes the prompt with the base `ProductInquiryPrompt`.
2. Retrieves the parsed part information from the database using the provided `pageUrl`.
3. If part information is found:
   - Formats the product details including title, part numbers, manufacturer, brands, description, symptoms, compatibility, and replaced parts.
4. If no part information is found, sets a default message for unavailable product information.
5. Replaces placeholders in the prompt with the product information and chat query.
6. Returns the fully formatted prompt.

## Usage

To use the ProductInquiryService:

1. Import the ProductInquiryModule in the desired module.
2. Inject the ProductInquiryService into the constructor of the class where it's needed.
3. Call the `processProductInquiry` method with the customer's query and page URL.

## Performance Considerations

- AI text generation is an asynchronous operation that may take significant time.
- Database queries for product information may impact response time.

## Future Enhancements

1. Implement caching for frequently accessed product information.
2. Add support for handling multiple product inquiries in a single request.
3. Enhance the prompt to include more specific product categories or specialized knowledge bases.

## Notes

- The service relies on up-to-date information in the ParsedParts collection.
- The AI-generated content is expected to follow the guidelines specified in the prompt, including addressing the customer's inquiry directly and providing relevant additional information.
- The product inquiry considers various aspects of the product, including compatibility, symptoms, and related parts.