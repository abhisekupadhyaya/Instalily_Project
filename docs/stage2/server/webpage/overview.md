# Webpage History Documentation

This documentation provides a comprehensive overview of the Webpage History Module.

## Service Overview

The Webpage History Service manages the storage and retrieval of webpage content and parsed product information. It utilizes MongoDB for data persistence and Cheerio for HTML parsing.

## API Methods

### Create Webpage History

```typescript
async create(pageUrl: string, product: string, parsedContent: string): Promise<WebpageHistory>
```

Creates or updates a webpage history entry with the given URL, product, and parsed content.

#### Parameters

- `pageUrl`: string (The URL of the webpage)
- `product`: string (The product associated with the webpage)
- `parsedContent`: string (The parsed HTML content of the webpage)

#### Response

Returns a `WebpageHistory` object containing the created or updated entry.

### Find One Webpage History

```typescript
async findOne(pageUrl: string): Promise<WebpageHistory | null>
```

Retrieves a webpage history entry by its URL.

#### Parameters

- `pageUrl`: string (The URL of the webpage to find)

#### Response

Returns a `WebpageHistory` object if found, or null if not found.

### Get Processed Product Info

```typescript
async getProcessedProductInfo(pageUrl: string): Promise<Record<string, any> | null>
```

Retrieves and processes the product information from a stored webpage history entry.

#### Parameters

- `pageUrl`: string (The URL of the webpage to process)

#### Response

Returns a `Record<string, any>` object containing the processed product information, or null if not found.

## Implementation Details

- Uses Mongoose for MongoDB interactions.
- Employs Cheerio for HTML parsing and data extraction.
- Implements upsert operations for efficient data management.

## Data Model

### WebpageHistory Entity

| Property | Type | Description |
|----------|------|-------------|
| pageUrl | string | Required, indexed, unique identifier for the webpage |
| product | string | Required, the product associated with the webpage |
| parsedContent | string | Required, the parsed HTML content of the webpage |
| timestamp | Date | Required, default: current date, timestamp of the entry |

### ParsedParts Entity

| Property | Type | Description |
|----------|------|-------------|
| pageUrl | string | Required, indexed, unique identifier for the webpage |
| title | string | Required, title of the product |
| partSelectNumber | string | Required, PartSelect's unique number for the part |
| manufacturerPartNumber | string | Required, manufacturer's part number |
| manufacturer | string | Required, name of the manufacturer |
| forBrands | string | Required, brands the part is compatible with |
| description | string | Required, description of the part |
| symptoms | array of string | Optional, symptoms the part addresses |
| worksWithProducts | string | Optional, products the part works with |
| worksWithInfo | array of WorksWithInfo | Optional, detailed compatibility information |
| replacedParts | string | Optional, parts that this part replaces |

### WorksWithInfo Entity

| Property | Type | Description |
|----------|------|-------------|
| brand | string | Required, brand of the compatible product |
| modelNumber | string | Required, model number of the compatible product |
| description | string | Required, description of the compatibility |

## Module Structure

The WebpageHistoryModule is set up as follows:

- Imports MongooseModule for both WebpageHistory and ParsedParts schemas.
- Provides the WebpageHistoryService.
- Exports the WebpageHistoryService for use in other modules.

## Usage

To use the WebpageHistoryService in other parts of the application:

1. Import the WebpageHistoryModule in the desired module.
2. Inject the WebpageHistoryService into the constructor of the class where it's needed.

Example:

```typescript
import { WebpageHistoryService } from './webpage-history/webpage-history.service';

@Injectable()
export class SomeService {
  constructor(private webpageHistoryService: WebpageHistoryService) {}

  async someMethod() {
    const webpageHistory = await this.webpageHistoryService.create('https://example.com', 'Product A', '<html>...</html>');
    // Use the webpage history as needed
  }
}
```

## Performance Considerations

- Indexes are created on the `pageUrl` field for both schemas to optimize query performance.
- The WebpageHistory schema has a compound index on `pageUrl` and `product` for efficient lookups.

## Future Enhancements

1. Implement caching mechanisms for frequently accessed webpage histories.
2. Add support for bulk operations to handle multiple webpages efficiently.
3. Implement versioning for webpage histories to track changes over time.
4. Add data validation and sanitization for input parameters.
5. Implement backend scraping of the website based on `URL` rather than receiving from the frontend.
6. Implement cron job to ensure website content is up to date.

## Notes

- The WebpageHistoryModule is designed for dependency injection, allowing easy integration with other parts of the application.
- The `getProcessedProductInfo` method performs complex HTML parsing and data extraction, which may be computationally intensive for large webpages.
- Error handling should be implemented at the application level to manage potential exceptions during database operations or HTML parsing.