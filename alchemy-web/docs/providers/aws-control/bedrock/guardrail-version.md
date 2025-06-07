---
title: Managing AWS Bedrock GuardrailVersions with Alchemy
description: Learn how to create, update, and manage AWS Bedrock GuardrailVersions using Alchemy Cloud Control.
---

# GuardrailVersion

The GuardrailVersion resource lets you create and manage [AWS Bedrock GuardrailVersions](https://docs.aws.amazon.com/bedrock/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-bedrock-guardrailversion.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const guardrailversion = await AWS.Bedrock.GuardrailVersion("guardrailversion-example", {
  GuardrailIdentifier: "example-guardrailidentifier",
  Description: "A guardrailversion resource managed by Alchemy",
});
```

## Advanced Configuration

Create a guardrailversion with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedGuardrailVersion = await AWS.Bedrock.GuardrailVersion("advanced-guardrailversion", {
  GuardrailIdentifier: "example-guardrailidentifier",
  Description: "A guardrailversion resource managed by Alchemy",
});
```

