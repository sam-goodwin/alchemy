---
title: Managing AWS SageMaker NotebookInstanceLifecycleConfigs with Alchemy
description: Learn how to create, update, and manage AWS SageMaker NotebookInstanceLifecycleConfigs using Alchemy Cloud Control.
---

# NotebookInstanceLifecycleConfig

The NotebookInstanceLifecycleConfig resource lets you create and manage [AWS SageMaker NotebookInstanceLifecycleConfigs](https://docs.aws.amazon.com/sagemaker/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-notebookinstancelifecycleconfig.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const notebookinstancelifecycleconfig = await AWS.SageMaker.NotebookInstanceLifecycleConfig(
  "notebookinstancelifecycleconfig-example",
  {}
);
```

