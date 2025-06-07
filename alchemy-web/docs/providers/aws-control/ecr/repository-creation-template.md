---
title: Managing AWS ECR RepositoryCreationTemplates with Alchemy
description: Learn how to create, update, and manage AWS ECR RepositoryCreationTemplates using Alchemy Cloud Control.
---

# RepositoryCreationTemplate

The RepositoryCreationTemplate resource lets you create and manage [AWS ECR RepositoryCreationTemplates](https://docs.aws.amazon.com/ecr/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ecr-repositorycreationtemplate.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const repositorycreationtemplate = await AWS.ECR.RepositoryCreationTemplate(
  "repositorycreationtemplate-example",
  {
    AppliedFor: ["example-appliedfor-1"],
    Prefix: "example-prefix",
    Description: "A repositorycreationtemplate resource managed by Alchemy",
  }
);
```

## Advanced Configuration

Create a repositorycreationtemplate with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedRepositoryCreationTemplate = await AWS.ECR.RepositoryCreationTemplate(
  "advanced-repositorycreationtemplate",
  {
    AppliedFor: ["example-appliedfor-1"],
    Prefix: "example-prefix",
    Description: "A repositorycreationtemplate resource managed by Alchemy",
  }
);
```

