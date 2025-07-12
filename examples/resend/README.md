# Resend Email Infrastructure Example

This example demonstrates how to set up a complete email infrastructure using Resend with Alchemy. It creates domains, audiences, and email broadcasts for a typical application.

## What's Included

### Email Infrastructure
- **Domain Setup**: Configures `mail.example.com` for sending emails
- **DNS Configuration**: Provides DNS records for domain verification
- **Regional Support**: Uses US East region (easily changeable to EU West for GDPR)

### Audience Segmentation
- **Newsletter Subscribers**: For regular updates and content
- **System Alerts**: For maintenance notifications and system status
- **Marketing Updates**: For promotional campaigns and announcements

### Email Broadcasts
- **Welcome Email**: Responsive HTML email for new user onboarding
- **Weekly Newsletter**: Scheduled newsletter with platform updates
- **System Alert**: Maintenance notification template (as draft)

## Prerequisites

1. **Resend Account**: Sign up at [resend.com](https://resend.com)
2. **API Key**: Get your API key from [Resend Dashboard](https://resend.com/api-keys)
3. **Domain**: Own a domain that you can configure DNS records for

## Setup

1. **Install Dependencies**:
   ```bash
   bun install
   ```

2. **Configure Environment**:
   Create a `.env` file in the project root:
   ```env
   RESEND_API_KEY=re_your_api_key_here
   ```

3. **Update Domain**:
   Edit `alchemy.run.ts` and replace `mail.example.com` with your actual domain.

## Deployment

Deploy your email infrastructure:

```bash
bun run deploy
```

This will:
1. Create the email domain
2. Display DNS records to configure
3. Create three audience segments
4. Set up three different email broadcasts

## DNS Configuration

After deployment, you'll see DNS records like:

```
📋 Configure these DNS records with your DNS provider:
  TXT: mail.example.com -> v=DKIM1; k=rsa; p=...
  TXT: _dmarc.mail.example.com -> v=DMARC1; p=none
  MX: mail.example.com -> 10 mx.resend.com
```

Add these records to your DNS provider to verify domain ownership.

## Managing Contacts

Once your domain is verified, add contacts to your audiences:

### Via Resend Dashboard
1. Visit [Resend Dashboard](https://resend.com/dashboard)
2. Navigate to Audiences
3. Select an audience and add contacts

### Via API
```javascript
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

## Email Templates

### Welcome Email
- **Purpose**: New user onboarding
- **Features**: Responsive design, call-to-action button, personalization
- **Status**: Draft (ready to send)

### Weekly Newsletter
- **Purpose**: Regular platform updates
- **Features**: Feature highlights, statistics, upcoming announcements
- **Status**: Scheduled for next Monday at 9 AM UTC

### System Alert
- **Purpose**: Maintenance notifications
- **Features**: Warning styling, maintenance details, status page link
- **Status**: Draft template

## Customization

### Updating Email Content
Modify the HTML and text content in `alchemy.run.ts` to match your brand and messaging.

### Changing Schedule
Update the `scheduled_at` property to change when emails are sent:

```typescript
// Schedule for specific date and time
scheduled_at: "2024-12-25T10:00:00Z"

// Schedule relative to current time
scheduled_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
```

### Adding More Audiences
Create additional audience segments for better targeting:

```typescript
const vipCustomers = await ResendAudience("vip-customers", {
  name: "VIP Customers"
});

const betaTesters = await ResendAudience("beta-testers", {
  name: "Beta Test Program"
});
```

## Monitoring and Analytics

After sending emails, monitor performance via:

1. **Resend Dashboard**: [resend.com/dashboard](https://resend.com/dashboard)
   - Delivery rates
   - Open and click statistics
   - Bounce and complaint tracking

2. **API Webhooks**: Set up webhooks for real-time event tracking
3. **Analytics Integration**: Connect with your analytics platform

## Best Practices

### Email Content
- Always provide both HTML and text versions
- Use responsive design for mobile compatibility
- Include unsubscribe links and privacy policy
- Personalize content with recipient data

### Audience Management
- Segment audiences based on user behavior
- Respect unsubscribe requests
- Maintain clean contact lists
- Follow GDPR and CAN-SPAM guidelines

### Sending Strategy
- Start with small batches to test deliverability
- Monitor engagement metrics
- Avoid spam trigger words
- Maintain consistent sending schedule

## Cleanup

Remove all resources when done:

```bash
bun run destroy
```

This will delete:
- Email domain and DNS configuration
- All audience segments and contacts
- All broadcast campaigns

**Note**: Already sent emails remain in recipient inboxes.

## Troubleshooting

### Domain Verification Issues
- Check DNS record configuration
- Allow time for DNS propagation (up to 24 hours)
- Verify record values match exactly

### Low Delivery Rates
- Ensure domain is fully verified
- Check email content for spam triggers
- Monitor sender reputation
- Review bounce and complaint rates

### API Errors
- Verify API key permissions
- Check rate limits
- Review error responses for specific issues

## Next Steps

1. **Add Real Contacts**: Import your actual contact list
2. **Send Test Campaigns**: Start with small test audiences
3. **Monitor Performance**: Track delivery and engagement metrics
4. **Scale Gradually**: Increase sending volume based on performance
5. **Automate Workflows**: Set up triggered emails based on user actions

For more information, see the [Resend documentation](https://resend.com/docs) and [Alchemy provider guide](../../alchemy-web/src/content/docs/guides/resend.md).