---
title: Managing AWS MediaLive Multiplexprograms with Alchemy
description: Learn how to create, update, and manage AWS MediaLive Multiplexprograms using Alchemy Cloud Control.
---

# Multiplexprogram

The Multiplexprogram resource lets you create and manage [AWS MediaLive Multiplexprograms](https://docs.aws.amazon.com/medialive/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-medialive-multiplexprogram.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const multiplexprogram = await AWS.MediaLive.Multiplexprogram("multiplexprogram-example", {});
```

