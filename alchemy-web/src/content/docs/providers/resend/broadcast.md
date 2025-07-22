---
title: Broadcast
description: Manage email campaigns sent to audiences
---

# Broadcast

The `ResendBroadcast` resource manages broadcast email campaigns sent to audiences. Broadcasts are created as drafts and can be updated before sending.

## Example Usage

### Basic Broadcast

Create a draft broadcast:

```ts
import { ResendAudience, ResendBroadcast } from "alchemy/resend";

const audience = await ResendAudience("subscribers", {
  name: "Subscribers"
});

const broadcast = await ResendBroadcast("newsletter", {
  name: "Weekly Newsletter",
  subject: "This Week's Updates",
  from: "news@example.com",
  html: "<h1>Weekly Newsletter</h1><p>Content here...</p>",
  audience: audience
});

console.log(`Broadcast ID: ${broadcast.id}`);
console.log(`Status: ${broadcast.status}`);
```

### Complete Broadcast with All Options

Create a comprehensive broadcast with all available options:

```ts
const audience = await ResendAudience("premium-users", {
  name: "Premium Users"
});

const broadcast = await ResendBroadcast("premium-newsletter", {
  name: "Premium Monthly Newsletter",
  subject: "Exclusive Updates for Premium Members",
  from: "premium@example.com",
  reply_to: "support@example.com",
  html: `
    <html>
      <head><title>Premium Newsletter</title></head>
      <body>
        <h1>Exclusive Updates</h1>
        <p>Thank you for being a premium member!</p>
        <p>Here's what's new this month...</p>
      </body>
    </html>
  `,
  text: `
    Exclusive Updates
    
    Thank you for being a premium member!
    
    Here's what's new this month...
  `,
  audience: audience,
  apiKey: alchemy.secret(process.env.RESEND_API_KEY)
});
```

### Using Domain with Broadcast

Combine verified domain with broadcast:

```ts
import { ResendDomain, ResendAudience, ResendBroadcast } from "alchemy/resend";

const domain = await ResendDomain("company-domain", {
  name: "mail.company.com"
});

const audience = await ResendAudience("customers", {
  name: "Customer List"
});

const broadcast = await ResendBroadcast("company-update", {
  name: "Company Update",
  subject: "Important Company News",
  from: `news@${domain.name}`,
  reply_to: `support@${domain.name}`,
  html: "<h1>Company Update</h1><p>Important news...</p>",
  audience: audience
});
```

## Properties

### Input Properties

- **`name`** (required): Name of the broadcast for identification
- **`subject`** (required): Subject line of the broadcast email
- **`from`** (required): From email address (must be from a verified domain)
- **`audience`** (required): Target audience - can be:
  - Audience ID string (e.g., `"aud_123456"`)
  - `ResendAudience` resource reference
- **`html`** (optional): HTML content of the broadcast
- **`text`** (optional): Plain text content of the broadcast
- **`reply_to`** (optional): Reply-to email address
- **`apiKey`** (optional): API key for authentication. Falls back to `RESEND_API_KEY` environment variable
- **`baseUrl`** (optional): Custom API base URL. Defaults to `"https://api.resend.com"`

### Output Properties

All input properties (except `audience` which becomes `audience_id`), plus:

- **`id`**: The unique identifier for the broadcast
- **`audience_id`**: ID of the target audience
- **`status`**: Current broadcast status (`"draft"`, `"scheduled"`, `"sent"`, `"cancelled"`)
- **`sent_at`**: Timestamp when the broadcast was sent (if applicable)
- **`created_at`**: Timestamp when the broadcast was created

## Broadcast Status

Broadcasts can have different statuses:

- **`draft`**: Created but not scheduled or sent
- **`sent`**: Successfully sent to the audience
- **`cancelled`**: Cancelled before sending

## Content Best Practices

### HTML and Text Content

Always provide both HTML and text content for better deliverability:

```ts
const broadcast = await ResendBroadcast("accessible-newsletter", {
  name: "Accessible Newsletter",
  subject: "Newsletter with Great Accessibility",
  from: "newsletter@example.com",
  html: `
    <h1>Newsletter Title</h1>
    <p>This is the HTML version with <strong>formatting</strong>.</p>
    <a href="https://example.com">Visit our website</a>
  `,
  text: `
    Newsletter Title
    
    This is the plain text version with formatting.
    
    Visit our website: https://example.com
  `,
  audience: audience
});
```

### Personalization Placeholder

```ts
const personalizedBroadcast = await ResendBroadcast("personalized-welcome", {
  name: "Personalized Welcome",
  subject: "Welcome to Our Service!",
  from: "welcome@example.com",
  html: `
    <h1>Welcome {{first_name}}!</h1>
    <p>Thank you for joining us, {{first_name}}.</p>
    <p>Your account email: {{email}}</p>
  `,
  text: `
    Welcome {{first_name}}!
    
    Thank you for joining us, {{first_name}}.
    Your account email: {{email}}
  `,
  audience: audience
});
```

## Updating Broadcasts

You can update broadcast content before it's sent:

```ts
// Initial creation
let broadcast = await ResendBroadcast("draft-newsletter", {
  name: "Draft Newsletter",
  subject: "Draft Subject",
  from: "draft@example.com",
  html: "<h1>Draft Content</h1>",
  audience: audience
});

// Update content
broadcast = await ResendBroadcast("draft-newsletter", {
  name: "Final Newsletter",
  subject: "Final Subject - Newsletter",
  from: "newsletter@example.com",
  html: "<h1>Final Content</h1><p>Ready to send!</p>",
  text: "Final Content\n\nReady to send!",
  audience: audience,
});
```

## Important Notes

- **Domain Verification**: The `from` address must be from a verified domain
- **Content Requirements**: At least one of `html` or `text` content is required
- **Audience Reference**: You can use either audience resource references or ID strings
- **Time Zones**: All timestamps use ISO 8601 format in UTC
- **Delivery**: Resend handles the actual delivery and tracking of broadcasts