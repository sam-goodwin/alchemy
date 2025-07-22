---
title: Audience
description: Manage contact lists for organizing email recipients
---

# Audience

The `ResendAudience` resource manages audiences (contact lists) for organizing email recipients. Audiences are used to group contacts for targeted email campaigns and broadcasts.

## Example Usage

### Basic Audience

Create an audience with a name:

```ts
import { ResendAudience } from "alchemy/resend";

const audience = await ResendAudience("newsletter-subscribers", {
  name: "Newsletter Subscribers"
});

console.log(`Audience ID: ${audience.id}`);
console.log(`Audience Name: ${audience.name}`);
console.log(`Created: ${audience.created_at}`);
```

### Audience with Custom API Key

Create an audience with a custom API key:

```ts
const audience = await ResendAudience("premium-users", {
  name: "Premium Users",
  apiKey: alchemy.secret(process.env.RESEND_API_KEY)
});
```

### Multiple Audiences for Segmentation

Create different audiences for different user segments:

```ts
const newsletters = await ResendAudience("newsletters", {
  name: "Newsletter Subscribers"
});

const promotions = await ResendAudience("promotions", {
  name: "Promotional Offers"
});

const announcements = await ResendAudience("announcements", {
  name: "Product Announcements"
});

console.log("Created audiences:");
console.log(`- ${newsletters.name}: ${newsletters.id}`);
console.log(`- ${promotions.name}: ${promotions.id}`);
console.log(`- ${announcements.name}: ${announcements.id}`);
```

### Using Audience for Broadcasts

Create an audience and use it for broadcasts:

```ts
import { ResendAudience, ResendBroadcast } from "alchemy/resend";

const audience = await ResendAudience("marketing-list", {
  name: "Marketing List"
});

// Use the audience for a broadcast
const broadcast = await ResendBroadcast("weekly-newsletter", {
  name: "Weekly Newsletter",
  subject: "This Week's Updates",
  from: "news@example.com",
  html: "<h1>Weekly Newsletter</h1><p>Content here...</p>",
  audience: audience // Pass the audience resource directly
});
```

## Properties

### Input Properties

- **`name`** (required): Name of the audience for identification and organization
- **`apiKey`** (optional): API key for authentication. Falls back to `RESEND_API_KEY` environment variable
- **`baseUrl`** (optional): Custom API base URL. Defaults to `"https://api.resend.com"`

### Output Properties

All input properties, plus:

- **`id`**: The unique identifier for the audience
- **`created_at`**: Timestamp when the audience was created

## Updating Audiences

You can update an audience's name:

```ts
// Initial creation
let audience = await ResendAudience("user-group", {
  name: "Beta Users"
});

// Update the name
audience = await ResendAudience("user-group", {
  name: "Premium Beta Users"
});

console.log(`Updated name: ${audience.name}`);
```

## Audience Management Best Practices

### Descriptive Naming

Use clear, descriptive names that indicate the audience purpose:

```ts
const audiences = [
  await ResendAudience("weekly-newsletter", {
    name: "Weekly Newsletter Subscribers"
  }),
  await ResendAudience("product-updates", {
    name: "Product Update Notifications"
  }),
  await ResendAudience("security-alerts", {
    name: "Security Alert Recipients"
  })
];
```

### Segmentation Strategy

Create audiences based on user behavior and preferences:

```ts
// Geographic segmentation
const usUsers = await ResendAudience("us-users", {
  name: "United States Users"
});

const euUsers = await ResendAudience("eu-users", {
  name: "European Users"
});

// Engagement segmentation
const activeUsers = await ResendAudience("active-users", {
  name: "Active Users (30 days)"
});

const dormantUsers = await ResendAudience("dormant-users", {
  name: "Dormant Users (90+ days)"
});
```

### Compliance and Privacy

Create audiences with privacy considerations in mind:

```ts
const gdprAudience = await ResendAudience("gdpr-subscribers", {
  name: "GDPR Compliant Newsletter (EU)"
});

const optInAudience = await ResendAudience("double-opt-in", {
  name: "Double Opt-in Confirmed Subscribers"
});
```

## Integration with Contact Management

While the audience resource creates the container for contacts, you'll typically manage contacts through the Resend API or dashboard:

```ts
const audience = await ResendAudience("app-users", {
  name: "Application Users"
});

console.log(`Audience created: ${audience.id}`);
console.log(`Add contacts via Resend API or dashboard`);
console.log(`Audience URL: https://resend.com/audiences/${audience.id}`);
```

## Important Notes

- **Contact Management**: Audiences are containers; contacts are managed separately via Resend API
- **Naming**: Use descriptive names to easily identify audience purposes
- **Updates**: Only the audience name can be updated; the ID remains constant
- **Deletion**: Deleting an audience will also remove all associated contacts
- **Broadcast Targeting**: Audiences are the primary way to target broadcasts to specific groups