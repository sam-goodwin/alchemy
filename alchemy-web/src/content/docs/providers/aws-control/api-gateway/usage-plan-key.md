---
title: UsagePlanKey
description: Learn how to create, update, and manage AWS ApiGateway UsagePlanKeys using Alchemy Cloud Control.
---


The UsagePlanKey resource allows you to create, update, and manage [AWS ApiGateway UsagePlanKeys](https://docs.aws.amazon.com/apigateway/latest/userguide/) which are used to associate API keys with usage plans in Amazon API Gateway.

## Minimal Example

Create a basic UsagePlanKey with required properties.

```ts
import AWS from "alchemy/aws/control";

const usagePlanKey = await AWS.ApiGateway.UsagePlanKey("basicUsagePlanKey", {
  KeyType: "API_KEY",
  UsagePlanId: "12345678-abcd-efgh-ijkl-123456789012",
  KeyId: "sample-api-key-id",
  adopt: true // Indicating to adopt an existing resource if it already exists
});
```

## Advanced Configuration

Create a UsagePlanKey with additional configurations if necessary.

```ts
const advancedUsagePlanKey = await AWS.ApiGateway.UsagePlanKey("advancedUsagePlanKey", {
  KeyType: "API_KEY",
  UsagePlanId: "87654321-lkjh-gfed-cba-210987654321",
  KeyId: "advanced-api-key-id",
  adopt: true // Optional: adopt existing resource
});
```

## Using with Multiple Resources

Demonstrate how to create multiple UsagePlanKeys for different API keys.

```ts
const firstUsagePlanKey = await AWS.ApiGateway.UsagePlanKey("firstUsagePlanKey", {
  KeyType: "API_KEY",
  UsagePlanId: "abc12345-def6-7890-gh12-ijklmnopqr",
  KeyId: "first-api-key-id"
});

const secondUsagePlanKey = await AWS.ApiGateway.UsagePlanKey("secondUsagePlanKey", {
  KeyType: "API_KEY",
  UsagePlanId: "xyz09876-uvw3-2109-zyxw-tsrqponmlk",
  KeyId: "second-api-key-id",
  adopt: true // Indicates adopting an existing resource
});
```

## Handling Errors

Show how to handle potential errors during the creation of a UsagePlanKey.

```ts
try {
  const errorHandlingUsagePlanKey = await AWS.ApiGateway.UsagePlanKey("errorHandlingUsagePlanKey", {
    KeyType: "API_KEY",
    UsagePlanId: "error-usage-plan-id",
    KeyId: "error-api-key-id"
  });
} catch (error) {
  console.error("Error creating UsagePlanKey:", error);
}
```
