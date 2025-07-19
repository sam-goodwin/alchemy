# Resend Provider

The Resend provider enables you to manage email infrastructure with Resend, a modern email API built for developers. This provider supports domain management, audience management, and broadcast campaigns.

## Official Links

- [Resend Website](https://resend.com)
- [Resend API Documentation](https://resend.com/docs/api-reference)
- [Resend Dashboard](https://resend.com/dashboard)

## Resources

### [Domain](./domain.ts)
Manages email domains for sending emails through Resend. Domains must be verified via DNS records before they can be used for sending emails.

**Key Features:**
- Domain verification with DNS records
- Multi-region support (us-east-1, eu-west-1, sa-east-1)
- Immutable properties (name and region cannot be changed after creation)

### [Audience](./audience.ts)
Manages audiences (contact lists) for organizing email recipients. Audiences are used to group contacts for targeted email campaigns.

**Key Features:**
- Contact list management
- Simple name-based organization
- Used as targets for broadcast campaigns

### [Broadcast](./broadcast.ts)
Manages broadcast email campaigns sent to audiences. Broadcasts can be created as drafts, scheduled for later, or sent immediately.

**Key Features:**
- HTML and text content support
- Audience targeting (by ID or resource reference)
- Draft and scheduled broadcast support
- Reply-to configuration

## Authentication

All resources require a Resend API key for authentication. You can provide this in several ways:

1. **Environment Variable** (recommended):
   ```bash
   export RESEND_API_KEY="re_your_api_key_here"
   ```

2. **Direct API Key**:
   ```ts
   import { alchemy } from "alchemy";
   
   const domain = await ResendDomain("my-domain", {
     name: "example.com",
     apiKey: alchemy.secret(process.env.RESEND_API_KEY)
   });
   ```

## Complete Example

```ts
import { ResendDomain, ResendAudience, ResendBroadcast } from "alchemy/resend";

// Create a domain for sending emails
const domain = await ResendDomain("primary-domain", {
  name: "mail.example.com",
  region: "us-east-1"
});

// Create an audience for newsletter subscribers
const audience = await ResendAudience("newsletter-subscribers", {
  name: "Newsletter Subscribers"
});

// Create a newsletter broadcast
const newsletter = await ResendBroadcast("weekly-newsletter", {
  name: "Weekly Newsletter - Week 1",
  subject: "Your Weekly Update",
  from: `newsletter@${domain.name}`,
  reply_to: `support@${domain.name}`,
  html: `
    <h1>Weekly Newsletter</h1>
    <p>Here's what happened this week...</p>
    <p>Thanks for subscribing!</p>
  `,
  text: `
    Weekly Newsletter
    
    Here's what happened this week...
    
    Thanks for subscribing!
  `,
  audience: audience,
  // Schedule for tomorrow at 9 AM
  scheduled_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
});

console.log(`Domain: ${domain.name} (${domain.status})`);
console.log(`Audience: ${audience.name} (${audience.id})`);
console.log(`Broadcast: ${newsletter.name} (${newsletter.status})`);
```

## Regional Considerations

Resend supports multiple regions for compliance and performance:

- **us-east-1**: United States East (default)
- **eu-west-1**: Europe West (GDPR compliant)
- **sa-east-1**: South America East

Choose the appropriate region based on your audience location and compliance requirements.

## DNS Configuration

When creating a domain, Resend provides DNS records that must be configured with your DNS provider:

```ts
const domain = await ResendDomain("company-domain", {
  name: "mail.company.com"
});

// Access DNS records for configuration
domain.records.forEach(record => {
  console.log(`${record.type} ${record.name} -> ${record.value}`);
  if (record.priority) {
    console.log(`Priority: ${record.priority}`);
  }
});
```

The domain status will change from `pending` to `verified` once DNS records are properly configured.

## Error Handling

All resources include comprehensive error handling for common scenarios:

- Invalid API keys
- Domain verification failures
- Audience not found
- Broadcast scheduling conflicts
- Network and retry logic

Errors are thrown with descriptive messages to help diagnose and resolve issues quickly.