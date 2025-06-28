---
title: RepositoryWebhook
description: Learn how to create and manage webhooks in your GitHub repositories using Alchemy.
---

# RepositoryWebhook

Manage GitHub repository webhooks with automatic lifecycle management.

Webhooks allow external services to be notified when certain events happen in a repository. This resource manages the full lifecycle of repository webhooks including creation, updates, and deletion.

## Basic Usage

Create a simple webhook for push events:

```ts
import { RepositoryWebhook } from "alchemy/github";

const webhook = await RepositoryWebhook("my-webhook", {
  owner: "my-org",
  repository: "my-repo",
  url: "https://my-service.com/github-webhook",
  events: ["push"]
});
```

## With Secret Validation

Add webhook secret for payload validation:

```ts
import { RepositoryWebhook } from "alchemy/github";
import { alchemy } from "alchemy";

const webhook = await RepositoryWebhook("secure-webhook", {
  owner: "my-org",
  repository: "my-repo",
  url: "https://ci.example.com/webhook",
  secret: alchemy.secret("GITHUB_WEBHOOK_SECRET"),
  events: ["push", "pull_request", "release"],
  contentType: "application/json"
});
```

## Multiple Events

Listen to multiple GitHub events:

```ts
import { RepositoryWebhook } from "alchemy/github";

const ciWebhook = await RepositoryWebhook("ci-webhook", {
  owner: "my-org",
  repository: "my-repo",
  url: "https://ci.example.com/webhook",
  events: [
    "push",
    "pull_request",
    "release",
    "issues",
    "issue_comment"
  ]
});
```

## All Events

Create a webhook that listens to all repository events:

```ts
import { RepositoryWebhook } from "alchemy/github";

const monitoringWebhook = await RepositoryWebhook("monitoring-webhook", {
  owner: "my-org", 
  repository: "my-repo",
  url: "https://monitoring.internal.com/github",
  events: ["*"], // Listen to all events
  insecureSsl: true, // For internal services with self-signed certs
  contentType: "application/x-www-form-urlencoded"
});
```

## Custom SSL Configuration

For internal services or development environments:

```ts
import { RepositoryWebhook } from "alchemy/github";

const devWebhook = await RepositoryWebhook("dev-webhook", {
  owner: "my-org",
  repository: "my-repo", 
  url: "https://localhost:3000/webhook",
  insecureSsl: true, // Skip SSL verification
  active: false, // Create inactive webhook
  events: ["push", "pull_request"]
});
```

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `owner` | string | ✅ | Repository owner (user or organization) |
| `repository` | string | ✅ | Repository name |
| `url` | string | ✅ | The URL to which the payloads will be delivered |
| `secret` | string | | Webhook secret for payload validation |
| `contentType` | `"application/json"` \| `"application/x-www-form-urlencoded"` | | The media type used to serialize the payloads (default: `"application/json"`) |
| `insecureSsl` | boolean | | Determines whether the SSL certificate of the host for url will be verified (default: `false`) |
| `active` | boolean | | Determines if notifications are sent when the webhook is triggered (default: `true`) |
| `events` | string[] | | Determines what events the hook is triggered for (default: `["push"]`) |
| `token` | string | | Optional GitHub API token (overrides environment variable) |

## Returns

| Property | Type | Description |
|----------|------|-------------|
| `id` | string | Resource identifier |
| `webhookId` | number | The numeric ID of the webhook in GitHub |
| `url` | string | The webhook URL that was configured |
| `createdAt` | string | Time at which the webhook was created |
| `updatedAt` | string | Time at which the webhook was last updated |
| `pingUrl` | string | The ping URL for testing the webhook |
| `testUrl` | string | The test URL for the webhook |

## GitHub Events

Common GitHub webhook events you can listen to:

- `push` - Any Git push to a Repository
- `pull_request` - Pull request activity
- `issues` - Issue activity
- `issue_comment` - Issue comment activity
- `release` - Release activity
- `create` - Branch or tag created
- `delete` - Branch or tag deleted
- `fork` - Repository forked
- `star` - Repository starred
- `watch` - Repository watched
- `workflow_run` - GitHub Actions workflow run
- `*` - All events

For a complete list of available events, see the [GitHub Webhooks documentation](https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads).

## Authentication

The resource requires a GitHub token with appropriate permissions:

```bash
export GITHUB_TOKEN="ghp_your_token_here"
```

The token must have:
- `repo` scope for private repositories
- `public_repo` scope for public repositories
- Admin access to the repository to manage webhooks

## Error Handling

The resource handles common GitHub API errors:

- **403 Forbidden**: Token lacks admin rights to the repository
- **422 Unprocessable Entity**: Invalid webhook configuration (bad URL, invalid events, etc.)
- **404 Not Found**: Repository doesn't exist or token lacks access

## Updates

When updating a webhook, you can change:
- Webhook URL
- Events list
- Secret
- Content type
- SSL verification settings
- Active status

The webhook ID remains the same during updates.

## Security

- Always use HTTPS URLs for webhook endpoints
- Use webhook secrets to validate payload authenticity
- Consider using `insecureSsl: false` (default) for production
- Regularly rotate webhook secrets

## Best Practices

1. **Use secrets**: Always configure webhook secrets for payload validation
2. **Specific events**: Only listen to events your application needs
3. **Error handling**: Implement proper error handling in your webhook receiver
4. **Testing**: Use the `pingUrl` to test webhook connectivity
5. **Monitoring**: Monitor webhook delivery success rates in GitHub 