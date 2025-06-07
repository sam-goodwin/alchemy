---
title: Managing AWS Glue Classifiers with Alchemy
description: Learn how to create, update, and manage AWS Glue Classifiers using Alchemy Cloud Control.
---

# Classifier

The Classifier resource lets you create and manage [AWS Glue Classifiers](https://docs.aws.amazon.com/glue/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-classifier.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const classifier = await AWS.Glue.Classifier("classifier-example", {});
```

