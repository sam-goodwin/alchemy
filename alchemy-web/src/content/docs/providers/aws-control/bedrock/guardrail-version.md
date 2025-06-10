---
title: GuardrailVersion
description: Learn how to create, update, and manage AWS Bedrock GuardrailVersions using Alchemy Cloud Control.
---


The GuardrailVersion resource allows you to manage versions of guardrails in AWS Bedrock. Guardrails are essential for implementing safety and compliance controls in your AI models. For more information, refer to the [AWS Bedrock GuardrailVersions documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/).

## Minimal Example

Create a basic GuardrailVersion with required properties and a common optional description:

```ts
import AWS from "alchemy/aws/control";

const guardrailVersion = await AWS.Bedrock.GuardrailVersion("myGuardrailVersion", {
  GuardrailIdentifier: "arn:aws:bedrock:us-west-2:123456789012:guardrail/my-guardrail",
  Description: "Initial version of the guardrail for AI model compliance"
});
```

## Advanced Configuration

Configure a GuardrailVersion with the option to adopt an existing resource if it already exists:

```ts
const advancedGuardrailVersion = await AWS.Bedrock.GuardrailVersion("advancedGuardrailVersion", {
  GuardrailIdentifier: "arn:aws:bedrock:us-west-2:123456789012:guardrail/my-advanced-guardrail",
  Description: "Advanced guardrail version with adoption enabled",
  adopt: true
});
```

## Update Existing GuardrailVersion

Update an existing GuardrailVersion by providing the new description:

```ts
const updatedGuardrailVersion = await AWS.Bedrock.GuardrailVersion("updatedGuardrailVersion", {
  GuardrailIdentifier: "arn:aws:bedrock:us-west-2:123456789012:guardrail/my-guardrail",
  Description: "Updated version of the guardrail for enhanced compliance"
});
```

## View GuardrailVersion Metadata

Retrieve the metadata of a specific GuardrailVersion:

```ts
const guardrailVersionMetadata = await AWS.Bedrock.GuardrailVersion("guardrailVersionMetadata", {
  GuardrailIdentifier: "arn:aws:bedrock:us-west-2:123456789012:guardrail/my-guardrail"
});

// Access additional properties if needed
console.log(`ARN: ${guardrailVersionMetadata.Arn}`);
console.log(`Created At: ${guardrailVersionMetadata.CreationTime}`);
console.log(`Last Updated: ${guardrailVersionMetadata.LastUpdateTime}`);
```
