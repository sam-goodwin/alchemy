---
title: Managing AWS Amplify Branchs with Alchemy
description: Learn how to create, update, and manage AWS Amplify Branchs using Alchemy Cloud Control.
---

# Branch

The Branch resource lets you manage [AWS Amplify Branches](https://docs.aws.amazon.com/amplify/latest/userguide/) for deploying and managing different versions of web applications.

## Minimal Example

Create a basic Amplify Branch with essential properties.

```ts
import AWS from "alchemy/aws/control";

const AmplifyBranch = await AWS.Amplify.Branch("MainBranch", {
  AppId: "your-app-id",
  BranchName: "main",
  EnableAutoBuild: true,
  Description: "Main branch for production deployment"
});
```

## Advanced Configuration

Configure an Amplify Branch with additional settings such as environment variables and performance mode.

```ts
const AdvancedAmplifyBranch = await AWS.Amplify.Branch("FeatureBranch", {
  AppId: "your-app-id",
  BranchName: "feature-branch",
  EnableAutoBuild: true,
  EnablePerformanceMode: true,
  EnvironmentVariables: [
    { Name: "NODE_ENV", Value: "development" },
    { Name: "API_URL", Value: "https://api.example.com" }
  ],
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "Frontend" }
  ]
});
```

## Pull Request Preview

Create a branch specifically for previewing pull requests with skew protection enabled.

```ts
const PullRequestBranch = await AWS.Amplify.Branch("PR-Preview-Branch", {
  AppId: "your-app-id",
  BranchName: "pr-1234",
  PullRequestEnvironmentName: "pr-1234-preview",
  EnablePullRequestPreview: true,
  EnableSkewProtection: true,
  Description: "Preview branch for pull request #1234"
});
```

## Custom Build Specifications

Set up a branch with a custom build specification to control the build process.

```ts
const CustomBuildSpecBranch = await AWS.Amplify.Branch("CustomBuildSpecBranch", {
  AppId: "your-app-id",
  BranchName: "custom-build",
  BuildSpec: "version: 0.1\nfrontend:\n  phases:\n    build:\n      commands:\n        - npm install\n        - npm run build",
  EnableAutoBuild: true,
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "QA" }
  ]
});
```