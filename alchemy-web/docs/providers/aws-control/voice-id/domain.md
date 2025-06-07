---
title: Managing AWS VoiceID Domains with Alchemy
description: Learn how to create, update, and manage AWS VoiceID Domains using Alchemy Cloud Control.
---

# Domain

The Domain resource lets you create and manage [AWS VoiceID Domains](https://docs.aws.amazon.com/voiceid/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-voiceid-domain.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const domain = await AWS.VoiceID.Domain("domain-example", {
  ServerSideEncryptionConfiguration: "example-serversideencryptionconfiguration",
  Name: "domain-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A domain resource managed by Alchemy",
});
```

## Advanced Configuration

Create a domain with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDomain = await AWS.VoiceID.Domain("advanced-domain", {
  ServerSideEncryptionConfiguration: "example-serversideencryptionconfiguration",
  Name: "domain-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A domain resource managed by Alchemy",
});
```

