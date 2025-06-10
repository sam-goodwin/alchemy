---
title: WebApp
description: Learn how to create, update, and manage AWS Transfer WebApps using Alchemy Cloud Control.
---


The WebApp resource lets you manage [AWS Transfer WebApps](https://docs.aws.amazon.com/transfer/latest/userguide/) for file transfer services, providing a customizable web interface for your users.

## Minimal Example

Create a basic AWS Transfer WebApp with essential properties and one optional customization.

```ts
import AWS from "alchemy/aws/control";

const basicWebApp = await AWS.Transfer.WebApp("basicWebApp", {
  IdentityProviderDetails: {
    ProviderType: "SERVICE_MANAGED"
  },
  WebAppCustomization: {
    Title: "My WebApp",
    Logo: "https://example.com/logo.png"
  }
});
```

## Advanced Configuration

Configure an AWS Transfer WebApp with advanced settings including a custom endpoint policy and additional web app units.

```ts
const advancedWebApp = await AWS.Transfer.WebApp("advancedWebApp", {
  IdentityProviderDetails: {
    ProviderType: "API_GATEWAY",
    Url: "https://example.com/auth"
  },
  WebAppUnits: {
    User: {
      Enable: true,
      MaxSize: 5000
    }
  },
  WebAppEndpointPolicy: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "transfer:ListUsers",
        Resource: "*"
      }
    ]
  }),
  Tags: [
    {
      Key: "Project",
      Value: "WebAppProject"
    }
  ]
});
```

## Custom Access Endpoint

Set up a web app with a specific access endpoint to control user access.

```ts
const customAccessWebApp = await AWS.Transfer.WebApp("customAccessWebApp", {
  IdentityProviderDetails: {
    ProviderType: "SERVICE_MANAGED"
  },
  AccessEndpoint: "https://transfer.example.com",
  WebAppCustomization: {
    Title: "Custom Access WebApp",
    Logo: "https://example.com/custom-logo.png"
  }
});
```

## Adoption of Existing Resource

If you need to adopt an existing AWS Transfer WebApp instead of creating a new one, set the adopt property to true.

```ts
const adoptedWebApp = await AWS.Transfer.WebApp("adoptedWebApp", {
  IdentityProviderDetails: {
    ProviderType: "SERVICE_MANAGED"
  },
  adopt: true
});
```
