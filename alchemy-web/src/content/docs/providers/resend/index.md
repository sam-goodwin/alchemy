---
title: Resend
description: Email infrastructure provider for modern applications
---

# Resend

Resend is a modern email API built for developers. The Resend provider in Alchemy enables you to manage email domains, audiences, and broadcast campaigns with a simple, type-safe interface.

## Official Links

- [Resend Website](https://resend.com)
- [Resend API Documentation](https://resend.com/docs/api-reference)
- [Resend Dashboard](https://resend.com/dashboard)

## Resources

- [Domain](./domain.md) - Manage email domains for sending emails
- [Audience](./audience.md) - Manage contact lists for organizing recipients
- [Broadcast](./broadcast.md) - Manage email campaigns sent to audiences

## Example Usage

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