import { ResendDomain, ResendAudience, ResendBroadcast } from "alchemy/resend";

// Set up email domain for your application
const domain = await ResendDomain("app-domain", {
  name: "mail.example.com", // Replace with your actual domain
  region: "us-east-1", // Change to "eu-west-1" for GDPR compliance if needed
});

console.log(`📧 Domain: ${domain.name} (${domain.status})`);

if (domain.status === "pending") {
  console.log("\n📋 Configure these DNS records with your DNS provider:");
  domain.records.forEach((record) => {
    console.log(`  ${record.type}: ${record.name} -> ${record.value}`);
    if (record.priority) console.log(`    Priority: ${record.priority}`);
  });
  console.log("\n⏳ Domain verification may take a few minutes...\n");
}

// Create audience segments for different types of communications
const newsletterAudience = await ResendAudience("newsletter", {
  name: "Newsletter Subscribers",
});

const alertsAudience = await ResendAudience("alerts", {
  name: "System Alerts",
});

const marketingAudience = await ResendAudience("marketing", {
  name: "Marketing Updates",
});

console.log("👥 Audiences created:");
console.log(`  - ${newsletterAudience.name}: ${newsletterAudience.id}`);
console.log(`  - ${alertsAudience.name}: ${alertsAudience.id}`);
console.log(`  - ${marketingAudience.name}: ${marketingAudience.id}`);

// Create a welcome email for new subscribers
const welcomeEmail = await ResendBroadcast("welcome-email", {
  name: "Welcome Email",
  subject: "Welcome to Our Platform!",
  from: `welcome@${domain.name}`,
  reply_to: `support@${domain.name}`,
  html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Welcome!</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .header { background: #4f46e5; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .button { 
            display: inline-block; 
            background: #4f46e5; 
            color: white; 
            padding: 12px 24px; 
            text-decoration: none; 
            border-radius: 6px; 
            margin: 16px 0;
          }
          .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Welcome to Our Platform!</h1>
        </div>
        <div class="content">
          <p>Hello {{first_name}},</p>
          <p>Thank you for joining our platform! We're excited to have you on board.</p>
          
          <h2>What's next?</h2>
          <ul>
            <li>Complete your profile setup</li>
            <li>Explore our features</li>
            <li>Join our community</li>
          </ul>
          
          <a href="https://app.example.com/onboarding" class="button">Get Started</a>
          
          <p>If you have any questions, feel free to reach out to our support team.</p>
          
          <p>Best regards,<br>The Team</p>
        </div>
        <div class="footer">
          <p>You're receiving this email because you signed up for our platform.</p>
          <p><a href="{{unsubscribe_url}}">Unsubscribe</a> | <a href="https://example.com/privacy">Privacy Policy</a></p>
        </div>
      </body>
    </html>
  `,
  text: `
    Welcome to Our Platform!
    
    Hello {{first_name}},
    
    Thank you for joining our platform! We're excited to have you on board.
    
    What's next?
    - Complete your profile setup
    - Explore our features  
    - Join our community
    
    Get started: https://app.example.com/onboarding
    
    If you have any questions, feel free to reach out to our support team.
    
    Best regards,
    The Team
    
    ---
    You're receiving this email because you signed up for our platform.
    Unsubscribe: {{unsubscribe_url}}
    Privacy Policy: https://example.com/privacy
  `,
  audience: newsletterAudience,
});

// Create a weekly newsletter scheduled for Mondays
const nextMonday = new Date();
nextMonday.setDate(nextMonday.getDate() + ((1 + 7 - nextMonday.getDay()) % 7));
nextMonday.setHours(9, 0, 0, 0); // 9 AM UTC

const weeklyNewsletter = await ResendBroadcast("weekly-newsletter", {
  name: "Weekly Newsletter #1",
  subject: "This Week's Platform Updates",
  from: `newsletter@${domain.name}`,
  reply_to: `support@${domain.name}`,
  html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Weekly Newsletter</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .header { background: #059669; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .highlight { background: #f0fdf4; padding: 16px; border-left: 4px solid #059669; margin: 16px 0; }
          .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Weekly Platform Updates</h1>
          <p>Week of ${new Date().toLocaleDateString()}</p>
        </div>
        <div class="content">
          <p>Hello {{first_name}},</p>
          
          <h2>🚀 What's New This Week</h2>
          <ul>
            <li><strong>New Dashboard</strong> - Redesigned user interface with better navigation</li>
            <li><strong>Performance Improvements</strong> - 40% faster page load times</li>
            <li><strong>Mobile App Update</strong> - Enhanced offline capabilities</li>
          </ul>
          
          <div class="highlight">
            <h3>💡 Feature Spotlight</h3>
            <p>Try our new automated workflows feature to streamline your daily tasks. 
            Set up custom triggers and actions to save time and reduce manual work.</p>
          </div>
          
          <h2>📊 Platform Stats</h2>
          <ul>
            <li>99.9% uptime this week</li>
            <li>500+ new users joined</li>
            <li>10,000+ workflows automated</li>
          </ul>
          
          <h2>🎯 Upcoming</h2>
          <p>Next week we're launching our new integration marketplace with 50+ popular tools. 
          Keep an eye out for the announcement!</p>
          
          <p>Thanks for being part of our community!</p>
          <p>The Team</p>
        </div>
        <div class="footer">
          <p>You're receiving this because you subscribed to our newsletter.</p>
          <p><a href="{{unsubscribe_url}}">Unsubscribe</a> | <a href="https://example.com/newsletter-archive">View Archive</a></p>
        </div>
      </body>
    </html>
  `,
  text: `
    Weekly Platform Updates
    Week of ${new Date().toLocaleDateString()}
    
    Hello {{first_name}},
    
    🚀 What's New This Week
    - New Dashboard: Redesigned user interface with better navigation
    - Performance Improvements: 40% faster page load times  
    - Mobile App Update: Enhanced offline capabilities
    
    💡 Feature Spotlight
    Try our new automated workflows feature to streamline your daily tasks.
    Set up custom triggers and actions to save time and reduce manual work.
    
    📊 Platform Stats
    - 99.9% uptime this week
    - 500+ new users joined
    - 10,000+ workflows automated
    
    🎯 Upcoming
    Next week we're launching our new integration marketplace with 50+ popular tools.
    Keep an eye out for the announcement!
    
    Thanks for being part of our community!
    The Team
    
    ---
    You're receiving this because you subscribed to our newsletter.
    Unsubscribe: {{unsubscribe_url}}
    View Archive: https://example.com/newsletter-archive
  `,
  audience: newsletterAudience,
  scheduled_at: nextMonday.toISOString(),
});

// Create a system alert broadcast (draft)
const systemAlert = await ResendBroadcast("system-alert", {
  name: "Scheduled Maintenance Alert",
  subject: "Scheduled Maintenance - Sunday 2 AM UTC",
  from: `alerts@${domain.name}`,
  reply_to: `support@${domain.name}`,
  html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Maintenance Alert</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .header { background: #dc2626; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .warning { background: #fef2f2; border: 1px solid #fecaca; padding: 16px; border-radius: 6px; margin: 16px 0; }
          .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>⚠️ Scheduled Maintenance Notice</h1>
        </div>
        <div class="content">
          <p>Hello,</p>
          
          <div class="warning">
            <h3>Maintenance Window</h3>
            <p><strong>Date:</strong> Sunday, ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}<br>
            <strong>Time:</strong> 2:00 AM - 4:00 AM UTC<br>
            <strong>Duration:</strong> Approximately 2 hours</p>
          </div>
          
          <h2>What to Expect</h2>
          <ul>
            <li>The platform will be temporarily unavailable</li>
            <li>API requests will return maintenance status</li>
            <li>Scheduled workflows will be queued and run after maintenance</li>
            <li>No data will be lost during this process</li>
          </ul>
          
          <h2>What We're Doing</h2>
          <ul>
            <li>Database optimization and indexing</li>
            <li>Security updates and patches</li>
            <li>Infrastructure scaling improvements</li>
          </ul>
          
          <p>We apologize for any inconvenience and appreciate your patience as we make these important improvements.</p>
          
          <p>Best regards,<br>The Operations Team</p>
        </div>
        <div class="footer">
          <p>For real-time updates, check our status page: <a href="https://status.example.com">status.example.com</a></p>
          <p><a href="mailto:support@${domain.name}">Contact Support</a></p>
        </div>
      </body>
    </html>
  `,
  text: `
    ⚠️ Scheduled Maintenance Notice
    
    Hello,
    
    Maintenance Window:
    Date: Sunday, ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
    Time: 2:00 AM - 4:00 AM UTC
    Duration: Approximately 2 hours
    
    What to Expect:
    - The platform will be temporarily unavailable
    - API requests will return maintenance status
    - Scheduled workflows will be queued and run after maintenance  
    - No data will be lost during this process
    
    What We're Doing:
    - Database optimization and indexing
    - Security updates and patches
    - Infrastructure scaling improvements
    
    We apologize for any inconvenience and appreciate your patience as we make these important improvements.
    
    Best regards,
    The Operations Team
    
    ---
    For real-time updates, check our status page: https://status.example.com
    Contact Support: support@${domain.name}
  `,
  audience: alertsAudience,
  // No scheduled_at - remains as draft
});

console.log("\n📧 Broadcasts created:");
console.log(`  - ${welcomeEmail.name}: ${welcomeEmail.status}`);
console.log(
  `  - ${weeklyNewsletter.name}: ${weeklyNewsletter.status} (${weeklyNewsletter.scheduled_at})`,
);
console.log(`  - ${systemAlert.name}: ${systemAlert.status}`);

console.log("\n🎉 Resend email infrastructure deployed!");
console.log(`📧 Domain: ${domain.name}`);
console.log(
  `👥 Audiences: ${[newsletterAudience, alertsAudience, marketingAudience].map((a) => a.name).join(", ")}`,
);
console.log("📬 Broadcasts: 3 created (1 draft, 1 scheduled, 1 ready)");

if (domain.status === "pending") {
  console.log("\n⚠️  Next steps:");
  console.log("1. Configure the DNS records shown above");
  console.log("2. Wait for domain verification");
  console.log("3. Add contacts to audiences via Resend dashboard or API");
  console.log("4. Send your broadcasts!");
} else if (domain.status === "verified") {
  console.log("\n✅ Domain verified! Ready to send emails.");
  console.log(
    "📊 Visit your Resend dashboard to manage contacts and view analytics:",
  );
  console.log("   https://resend.com/dashboard");
}
