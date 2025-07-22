---
order: 12
title: Resend
description: Get started with Resend email infrastructure using Alchemy
---

# Getting Started with Resend

This tutorial will set you up with a complete email infrastructure using Resend, including domain verification, audience management, and broadcast campaigns.

## Install

Create a new project and install Alchemy:

::: code-group

```sh [bun]
bun create alchemy@latest resend-email-app
cd resend-email-app
```

```sh [npm]
npm create alchemy@latest resend-email-app
cd resend-email-app
```

```sh [pnpm]
pnpm create alchemy@latest resend-email-app
cd resend-email-app
```

```sh [yarn]
yarn create alchemy@latest resend-email-app
cd resend-email-app
```

:::

## Credentials

1. **Sign up for Resend**: Visit [resend.com](https://resend.com) and create an account
2. **Get your API key**: Go to the [API Keys section](https://resend.com/api-keys) in your dashboard
3. **Create a new API key** with the necessary permissions for domains, audiences, and broadcasts

Add your credentials to your `.env` file:

```env
RESEND_API_KEY=re_your_api_key_here
```

## Create a Resend Email Application

Create an `alchemy.run.ts` file to set up your email infrastructure:

```ts
import { ResendDomain, ResendAudience, ResendBroadcast } from "alchemy/resend";

// Step 1: Set up your email domain
const emailDomain = await ResendDomain("company-domain", {
  name: "mail.example.com", // Replace with your domain
  region: "us-east-1" // or "eu-west-1" for GDPR compliance
});

console.log("📧 Domain created:", emailDomain.name);
console.log("📋 DNS Records to configure:");
emailDomain.records.forEach(record => {
  console.log(`  ${record.type}: ${record.name} -> ${record.value}`);
});

// Step 2: Create audience segments
const newsletterAudience = await ResendAudience("newsletter-subscribers", {
  name: "Newsletter Subscribers"
});

const announcementAudience = await ResendAudience("product-announcements", {
  name: "Product Announcements"
});

console.log("👥 Audiences created:");
console.log(`  - ${newsletterAudience.name}: ${newsletterAudience.id}`);
console.log(`  - ${announcementAudience.name}: ${announcementAudience.id}`);

// Step 3: Create a welcome email broadcast
const welcomeBroadcast = await ResendBroadcast("welcome-series", {
  name: "Welcome Email Series",
  subject: "Welcome to Our Service!",
  from: `welcome@${emailDomain.name}`,
  reply_to: `support@${emailDomain.name}`,
  html: `
    <html>
      <head><title>Welcome!</title></head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h1 style="color: #333;">Welcome to Our Service!</h1>
        <p>Thank you for joining us. We're excited to have you on board!</p>
        <p>Here's what you can expect:</p>
        <ul>
          <li>Weekly newsletters with updates</li>
          <li>Product announcements</li>
          <li>Exclusive offers for subscribers</li>
        </ul>
        <p>Best regards,<br>The Team</p>
      </body>
    </html>
  `,
  text: `
    Welcome to Our Service!
    
    Thank you for joining us. We're excited to have you on board!
    
    Here's what you can expect:
    - Weekly newsletters with updates
    - Product announcements  
    - Exclusive offers for subscribers
    
    Best regards,
    The Team
  `,
  audience: newsletterAudience
});

// Step 4: Create a scheduled newsletter
const scheduledNewsletter = await ResendBroadcast("weekly-newsletter", {
  name: "Weekly Newsletter #1",
  subject: "This Week's Updates",
  from: `newsletter@${emailDomain.name}`,
  reply_to: `support@${emailDomain.name}`,
  html: `
    <html>
      <head><title>Weekly Newsletter</title></head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h1 style="color: #333;">Weekly Newsletter</h1>
        <h2>What's New This Week</h2>
        <p>Here are the highlights from this week:</p>
        <ul>
          <li>New feature release</li>
          <li>Performance improvements</li>
          <li>Customer success stories</li>
        </ul>
        <h2>Upcoming Events</h2>
        <p>Don't miss these upcoming events...</p>
        <p>Thanks for reading!</p>
      </body>
    </html>
  `,
  text: `
    Weekly Newsletter
    
    What's New This Week
    Here are the highlights from this week:
    - New feature release
    - Performance improvements  
    - Customer success stories
    
    Upcoming Events
    Don't miss these upcoming events...
    
    Thanks for reading!
  `,
  audience: newsletterAudience,
  // Schedule for next Monday at 9 AM UTC
  scheduled_at: (() => {
    const nextMonday = new Date();
    nextMonday.setDate(nextMonday.getDate() + (1 + 7 - nextMonday.getDay()) % 7);
    nextMonday.setHours(9, 0, 0, 0);
    return nextMonday.toISOString();
  })()
});

console.log("📧 Broadcasts created:");
console.log(`  - ${welcomeBroadcast.name}: ${welcomeBroadcast.status}`);
console.log(`  - ${scheduledNewsletter.name}: ${scheduledNewsletter.status}`);

// Summary
console.log("\n🎉 Email infrastructure setup complete!");
console.log(`📧 Domain: ${emailDomain.name} (${emailDomain.status})`);
console.log(`👥 Audiences: ${newsletterAudience.name}, ${announcementAudience.name}`);
console.log(`📬 Broadcasts: Welcome email (${welcomeBroadcast.status}), Newsletter (${scheduledNewsletter.status})`);

if (emailDomain.status === "pending") {
  console.log("\n⚠️  Next steps:");
  console.log("1. Configure the DNS records shown above with your DNS provider");
  console.log("2. Wait for domain verification (usually takes a few minutes)");
  console.log("3. Add contacts to your audiences via Resend dashboard or API");
  console.log("4. Send your first broadcast!");
}
```

## Deploy

Run the `alchemy.run.ts` script to deploy your email infrastructure:

::: code-group

```sh [bun]
bun ./alchemy.run.ts
```

```sh [npm]
npx tsx ./alchemy.run.ts
```

```sh [pnpm]
pnpm tsx ./alchemy.run.ts
```

```sh [yarn]
yarn tsx ./alchemy.run.ts
```

:::

You should see output similar to:

```sh
📧 Domain created: mail.example.com
📋 DNS Records to configure:
  TXT: mail.example.com -> v=DKIM1; k=rsa; p=...
  TXT: _dmarc.mail.example.com -> v=DMARC1; p=none
  MX: mail.example.com -> 10 mx.resend.com

👥 Audiences created:
  - Newsletter Subscribers: aud_12345
  - Product Announcements: aud_67890

📧 Broadcasts created:
  - Welcome Email Series: draft
  - Weekly Newsletter #1: scheduled

🎉 Email infrastructure setup complete!
📧 Domain: mail.example.com (pending)
👥 Audiences: Newsletter Subscribers, Product Announcements
📬 Broadcasts: Welcome email (draft), Newsletter (scheduled)

⚠️  Next steps:
1. Configure the DNS records shown above with your DNS provider
2. Wait for domain verification (usually takes a few minutes)
3. Add contacts to your audiences via Resend dashboard or API
4. Send your first broadcast!
```

## Next Steps

### Configure DNS Records

Add the displayed DNS records to your domain's DNS settings. This typically involves:

1. **TXT Records**: For domain verification and DKIM
2. **MX Records**: For email routing
3. **DMARC Records**: For email authentication

### Add Contacts to Audiences

You can add contacts to your audiences using the Resend API or dashboard:

```ts
// Example using Resend API directly
const response = await fetch('https://api.resend.com/audiences/{audience_id}/contacts', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'user@example.com',
    first_name: 'John',
    last_name: 'Doe'
  })
});
```

### Send Your First Broadcast

Once your domain is verified and you have contacts in your audience, you can send broadcasts:

```ts
// Update a draft broadcast to send immediately
const immediateBroadcast = await ResendBroadcast("immediate-send", {
  name: "Immediate Welcome",
  subject: "Welcome! Let's get started",
  from: `onboarding@${emailDomain.name}`,
  html: "<h1>Welcome!</h1><p>Your account is ready.</p>",
  audience: newsletterAudience
  // No scheduled_at means it's ready to send
});
```

### Monitor Your Campaigns

Visit your [Resend dashboard](https://resend.com/dashboard) to:

- Monitor delivery rates
- View open and click statistics
- Manage bounces and complaints
- Add more contacts to audiences

## Tear Down

Clean up your email infrastructure when you're done:

::: code-group

```sh [bun]
bun ./alchemy.run.ts --destroy
```

```sh [npm]
npx tsx ./alchemy.run.ts --destroy
```

```sh [pnpm]
pnpm tsx ./alchemy.run.ts --destroy
```

```sh [yarn]
yarn tsx ./alchemy.run.ts --destroy
```

:::

This will remove all domains, audiences, and broadcasts created by Alchemy, but any emails already sent will remain in the recipient inboxes.