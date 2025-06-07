---
title: Managing AWS Alexa ASKSkills with Alchemy
description: Learn how to create, update, and manage AWS Alexa ASKSkills using Alchemy Cloud Control.
---

# ASKSkill

The ASKSkill resource lets you create and manage [AWS Alexa ASKSkills](https://docs.aws.amazon.com/alexa/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ask-skill.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const askskill = await AWS.Alexa.ASKSkill("askskill-example", {
  AuthenticationConfiguration: "example-authenticationconfiguration",
  VendorId: "example-vendorid",
  SkillPackage: "example-skillpackage",
});
```

