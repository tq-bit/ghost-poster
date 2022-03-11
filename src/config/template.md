# Sample template for a devto config

```ts
// ./devto.config.ts
import { GhosterConfig } from '../lib/Ghoster';

export default {
  targetUrl: 'https://dev.to/api',
  headers: { 'content-type': 'application/json' },
  convertToMarkdown: true,
  targetApiKeyName: 'api-key',
  targetApiKeyValue: - your-api-key -,
} as GhosterConfig;
```