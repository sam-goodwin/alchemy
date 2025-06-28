---
title: Comment
description: Learn how to create, update, and manage comments on GitHub issues and pull requests using Alchemy.
---

The Comment resource lets you manage [GitHub issue and pull request comments](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/commenting-on-an-issue). Comments support full GitHub Markdown and can be updated or deleted as needed.

## Minimal Example

Create a comment on an issue:

```ts
import { Comment } from "alchemy/github";

const comment = await Comment("issue-comment", {
  owner: "my-org",
  repository: "my-repo",
  issueNumber: 123,
  body: "This is a comment created by Alchemy!"
});
```

## Pull Request Comment

Comments work the same way for pull requests:

```ts
import { Comment } from "alchemy/github";

const prComment = await Comment("pr-comment", {
  owner: "my-org",
  repository: "my-repo",
  issueNumber: 456, // PR number
  body: "## Deployment Status\n\n✅ Successfully deployed to staging!"
});
```

## Update Comment Content

Comments can be updated by changing the body content:

```ts
import { Comment } from "alchemy/github";

const comment = await Comment("status-comment", {
  owner: "my-org",
  repository: "my-repo",
  issueNumber: 789,
  body: "🔄 Deployment in progress..."
});

// Later, update the comment
await Comment("status-comment", {
  owner: "my-org",
  repository: "my-repo",
  issueNumber: 789,
  body: "✅ Deployment completed successfully!"
});
```

## Allow Comment Deletion

By default comments are preserved to maintain discussion history, but you can opt-in to deletion:

```ts
import { Comment } from "alchemy/github";

const comment = await Comment("temp-comment", {
  owner: "my-org",
  repository: "my-repo",
  issueNumber: 123,
  body: "This comment can be deleted",
  allowDelete: true
});
```

## Custom Authentication

Pass a custom GitHub token for authentication:

```ts
import { Comment } from "alchemy/github";

const comment = await Comment("authenticated-comment", {
  owner: "my-org",
  repository: "my-repo",
  issueNumber: 123,
  body: "Comment with custom token",
  token: alchemy.secret(process.env.CUSTOM_GITHUB_TOKEN)
});
```

## Properties

The Comment resource supports the following properties:

### Input Properties

- `owner` (string, required): Repository owner (user or organization)
- `repository` (string, required): Repository name
- `issueNumber` (number, required): Issue or Pull Request number to comment on
- `body` (string, required): Comment body (supports GitHub Markdown)
- `allowDelete` (boolean, optional): Whether to allow deletion of the comment. Default: `false` to preserve discussion history
- `token` (Secret, optional): GitHub API token. If not provided, uses environment variables `GITHUB_TOKEN` or `GITHUB_ACCESS_TOKEN`

### Output Properties

- `id` (string): The resource ID
- `commentId` (number): The numeric ID of the comment in GitHub
- `htmlUrl` (string): URL to view the comment
- `updatedAt` (string): Time at which the comment was created/updated
- All input properties except `token`

## Authentication

Authentication is handled in the following order:

1. `token` parameter in the resource props (if provided)
2. `GITHUB_ACCESS_TOKEN` environment variable (for actions with admin permissions)
3. `GITHUB_TOKEN` environment variable
4. GitHub CLI token (if gh is installed and authenticated)

The token must have the following permissions:
- 'repo' scope for private repositories
- 'public_repo' scope for public repositories