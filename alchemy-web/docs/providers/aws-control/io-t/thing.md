---
title: Managing AWS IoT Things with Alchemy
description: Learn how to create, update, and manage AWS IoT Things using Alchemy Cloud Control.
---

# Thing

The Thing resource lets you create and manage [AWS IoT Things](https://docs.aws.amazon.com/iot/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-thing.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const thing = await AWS.IoT.Thing("thing-example", {});
```

