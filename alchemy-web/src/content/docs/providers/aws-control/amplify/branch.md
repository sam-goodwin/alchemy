---
title: Branch
description: Learn how to create, update, and manage AWS Amplify Branchs using Alchemy Cloud Control.
---


The Branch resource lets you manage [AWS Amplify Branchs](https://docs.aws.amazon.com/amplify/latest/userguide/) for your applications, allowing for features such as preview environments, performance modes, and more.

## Minimal Example

Create a basic Amplify Branch with required properties and some common optional settings.

```ts
import AWS from "alchemy/aws/control";

const amplifyBranch = await AWS.Amplify.Branch("mainBranch", {
  AppId: "your-amplify-app-id",
  BranchName: "main",
  EnableAutoBuild: true,
  EnablePerformanceMode: false,
  Description: "Main branch for production deployment"
});
```

## Advanced Configuration

Configure an Amplify Branch with advanced settings, including environment variables and pull request previews.

```ts
const featureBranch = await AWS.Amplify.Branch("featureBranch", {
  AppId: "your-amplify-app-id",
  BranchName: "feature/new-feature",
  EnablePullRequestPreview: true,
  PullRequestEnvironmentName: "feature-env",
  EnvironmentVariables: [
    { Name: "API_URL", Value: "https://api.example.com" },
    { Name: "NODE_ENV", Value: "development" }
  ],
  BasicAuthConfig: {
    Username: "admin",
    Password: "securePassword123"
  }
});
```

## Custom Build Specifications

Set a custom build specification for your Amplify Branch to control the build process.

```ts
const customBuildBranch = await AWS.Amplify.Branch("customBuildBranch", {
  AppId: "your-amplify-app-id",
  BranchName: "custom-build",
  BuildSpec: `
    version: 0.1
    frontend:
      phases:
        preBuild:
          commands:
            - npm install
        build:
          commands:
            - npm run build
      artifacts:
        baseDirectory: build
        files:
          - '**/*'
      cache:
        paths:
          - node_modules/**/*
  `
});
```

## Performance Optimizations

Create an Amplify Branch optimized for performance with skew protection enabled.

```ts
const optimizedBranch = await AWS.Amplify.Branch("optimizedBranch", {
  AppId: "your-amplify-app-id",
  BranchName: "optimized",
  EnableSkewProtection: true,
  EnableAutoBuild: true,
  EnablePerformanceMode: true,
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Development" }
  ]
});
```
