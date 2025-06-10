---
title: Protection
description: Learn how to create, update, and manage AWS Shield Protections using Alchemy Cloud Control.
---


The Protection resource lets you manage [AWS Shield Protections](https://docs.aws.amazon.com/shield/latest/userguide/) to safeguard your applications against DDoS attacks and ensure high availability.

## Minimal Example

Create a basic AWS Shield Protection with required properties and common optional ones like health checks and tags.

```ts
import AWS from "alchemy/aws/control";

const basicProtection = await AWS.Shield.Protection("basicProtection", {
  resourceArn: "arn:aws:elasticloadbalancing:us-west-2:123456789012:loadbalancer/app/my-load-balancer/50dc6c495c0c9188",
  healthCheckArns: [
    "arn:aws:route53:::healthcheck/12345678-1234-1234-1234-123456789012"
  ],
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Project", value: "MyApp" }
  ],
  name: "MyApplicationProtection"
});
```

## Advanced Configuration

Configure advanced settings for application layer automatic responses to enhance security during attacks.

```ts
import AWS from "alchemy/aws/control";

const advancedProtection = await AWS.Shield.Protection("advancedProtection", {
  resourceArn: "arn:aws:cloudfront::123456789012:distribution/E1234567890",
  applicationLayerAutomaticResponseConfiguration: {
    automaticResponseStatus: "ENABLED",
    responseAction: {
      action: "BLOCK",
      blockResponse: {
        blockResponse: "MALICIOUS_REQUEST"
      }
    }
  },
  name: "MyAdvancedProtection"
});
```

## Custom Protection with Adoption

Create a protection resource while adopting an existing resource if it already exists.

```ts
import AWS from "alchemy/aws/control";

const customProtection = await AWS.Shield.Protection("customProtection", {
  resourceArn: "arn:aws:ec2:us-east-1:123456789012:instance/i-1234567890abcdef0",
  adopt: true,  // Adopt existing resource instead of failing
  healthCheckArns: [
    "arn:aws:route53:::healthcheck/87654321-4321-4321-4321-abcdefabcdef"
  ],
  tags: [
    { key: "Environment", value: "Staging" },
    { key: "Owner", value: "Team Alpha" }
  ],
  name: "StagingProtection"
});
```
