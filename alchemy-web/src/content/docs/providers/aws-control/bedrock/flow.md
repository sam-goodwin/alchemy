---
title: Flow
description: Learn how to create, update, and manage AWS Bedrock Flows using Alchemy Cloud Control.
---


The Flow resource allows you to create and manage [AWS Bedrock Flows](https://docs.aws.amazon.com/bedrock/latest/userguide/) which are essential for orchestrating AI model interactions and deployments.

## Minimal Example

Create a basic Flow with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const basicFlow = await AWS.Bedrock.Flow("basicFlow", {
  executionRoleArn: "arn:aws:iam::123456789012:role/BedrockExecutionRole",
  name: "BasicFlow",
  tags: {
    project: "AIModelIntegration"
  }
});
```

## Advanced Configuration

Configure a Flow with a detailed definition and custom encryption key.

```ts
import AWS from "alchemy/aws/control";

const advancedFlow = await AWS.Bedrock.Flow("advancedFlow", {
  executionRoleArn: "arn:aws:iam::123456789012:role/BedrockExecutionRole",
  name: "AdvancedFlow",
  definitionString: JSON.stringify({
    version: "1.0",
    states: {
      StartState: {
        Type: "Task",
        Resource: "arn:aws:bedrock:us-west-2:123456789012:framework/my-framework",
        End: true
      }
    }
  }),
  customerEncryptionKeyArn: "arn:aws:kms:us-west-2:123456789012:key/abcdefgh-ijkl-mnop-qrst-uvwxyz123456"
});
```

## Flow with Substitutions

Create a Flow that includes definition substitutions for dynamic values.

```ts
import AWS from "alchemy/aws/control";

const flowWithSubstitutions = await AWS.Bedrock.Flow("flowWithSubstitutions", {
  executionRoleArn: "arn:aws:iam::123456789012:role/BedrockExecutionRole",
  name: "FlowWithSubstitutions",
  definition: {
    version: "1.0",
    states: {
      InitialState: {
        Type: "Pass",
        Result: "Hello, {name}!",
        Next: "FinalState"
      },
      FinalState: {
        Type: "Succeed"
      }
    }
  },
  definitionSubstitutions: {
    name: "World"
  }
});
```

## Flow with S3 Definition Location

Configure a Flow that pulls its definition from an S3 bucket.

```ts
import AWS from "alchemy/aws/control";

const flowWithS3Location = await AWS.Bedrock.Flow("flowWithS3Location", {
  executionRoleArn: "arn:aws:iam::123456789012:role/BedrockExecutionRole",
  name: "FlowWithS3",
  definitionS3Location: {
    bucket: "my-bucket",
    key: "path/to/flow-definition.json"
  }
});
```
