---
title: App
description: Learn how to create, update, and manage AWS Amplify Apps using Alchemy Cloud Control.
---


The App resource lets you manage [AWS Amplify Apps](https://docs.aws.amazon.com/amplify/latest/userguide/) for building, deploying, and hosting web applications.

## Minimal Example

Create a basic Amplify App with essential properties:

```ts
import AWS from "alchemy/aws/control";

const basicAmplifyApp = await AWS.Amplify.App("basicAmplifyApp", {
  name: "MyFirstAmplifyApp",
  repository: "https://github.com/username/my-first-amplify-app",
  platform: "WEB",
  description: "A simple web application hosted on AWS Amplify",
});
```

## Advanced Configuration

Configure an Amplify App with advanced settings such as auto branch creation and environment variables:

```ts
const advancedAmplifyApp = await AWS.Amplify.App("advancedAmplifyApp", {
  name: "AdvancedAmplifyApp",
  repository: "https://github.com/username/advanced-amplify-app",
  platform: "WEB",
  autoBranchCreationConfig: {
    autoBranchCreationPatterns: ["feature/*", "release/*"],
    basicAuthConfig: {
      username: "admin",
      password: "securepassword",
    },
  },
  environmentVariables: [
    { name: "API_URL", value: "https://api.example.com" },
    { name: "NODE_ENV", value: "production" },
  ],
});
```

## Custom Build Specifications

Set a custom build specification to define the build process for your app:

```ts
const customBuildSpecApp = await AWS.Amplify.App("customBuildSpecApp", {
  name: "CustomBuildSpecAmplifyApp",
  repository: "https://github.com/username/custom-buildspec-app",
  platform: "WEB",
  buildSpec: `
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
  `,
});
```

## Branch Auto Deletion

Enable auto deletion of branches when they are no longer needed:

```ts
const branchAutoDeletionApp = await AWS.Amplify.App("branchAutoDeletionApp", {
  name: "BranchAutoDeletionAmplifyApp",
  repository: "https://github.com/username/branch-auto-deletion-app",
  platform: "WEB",
  enableBranchAutoDeletion: true,
});
```
