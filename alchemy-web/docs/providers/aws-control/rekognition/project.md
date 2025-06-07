---
title: Managing AWS Rekognition Projects with Alchemy
description: Learn how to create, update, and manage AWS Rekognition Projects using Alchemy Cloud Control.
---

# Project

The Project resource lets you create and manage [AWS Rekognition Projects](https://docs.aws.amazon.com/rekognition/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rekognition-project.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const project = await AWS.Rekognition.Project("project-example", {
  ProjectName: "project-project",
});
```

