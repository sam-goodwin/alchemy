---
title: SourceCredential
description: Learn how to create, update, and manage AWS CodeBuild SourceCredentials using Alchemy Cloud Control.
---


The SourceCredential resource allows you to create, update, and manage credentials that AWS CodeBuild uses to access source code repositories. This can include GitHub, Bitbucket, and other supported source providers. For more information, refer to the [AWS CodeBuild SourceCredentials documentation](https://docs.aws.amazon.com/codebuild/latest/userguide/).

## Minimal Example

Create a basic SourceCredential with the required properties and a common optional username.

```ts
import AWS from "alchemy/aws/control";

const basicSourceCredential = await AWS.CodeBuild.SourceCredential("basicSourceCredential", {
  ServerType: "GitHub",
  Username: "myGitHubUser",
  Token: alchemy.secret(process.env.GITHUB_TOKEN!),
  AuthType: "personal_access_token"
});
```

## Advanced Configuration

Configure a SourceCredential for Bitbucket with an authentication type and an adoption flag.

```ts
const advancedSourceCredential = await AWS.CodeBuild.SourceCredential("advancedSourceCredential", {
  ServerType: "Bitbucket",
  Username: "myBitbucketUser",
  Token: alchemy.secret(process.env.BITBUCKET_TOKEN!),
  AuthType: "personal_access_token",
  adopt: true // If true, adopt existing resource instead of failing when resource already exists
});
```

## Use Case: Multiple Credentials

Create multiple SourceCredentials for different source providers to manage access in a single project.

```ts
const githubSourceCredential = await AWS.CodeBuild.SourceCredential("githubSourceCredential", {
  ServerType: "GitHub",
  Username: "myGitHubUser",
  Token: alchemy.secret(process.env.GITHUB_TOKEN!),
  AuthType: "personal_access_token"
});

const bitbucketSourceCredential = await AWS.CodeBuild.SourceCredential("bitbucketSourceCredential", {
  ServerType: "Bitbucket",
  Username: "myBitbucketUser",
  Token: alchemy.secret(process.env.BITBUCKET_TOKEN!),
  AuthType: "personal_access_token"
});
```

## Use Case: Token Management

Dynamically manage tokens for different environments by using secrets stored in your environment variables.

```ts
const stagingSourceCredential = await AWS.CodeBuild.SourceCredential("stagingSourceCredential", {
  ServerType: "GitHub",
  Username: "myGitHubUser",
  Token: alchemy.secret(process.env.STAGING_GITHUB_TOKEN!),
  AuthType: "personal_access_token"
});

const productionSourceCredential = await AWS.CodeBuild.SourceCredential("productionSourceCredential", {
  ServerType: "Bitbucket",
  Username: "myBitbucketUser",
  Token: alchemy.secret(process.env.PRODUCTION_BITBUCKET_TOKEN!),
  AuthType: "personal_access_token"
});
```
