---
title: Managing AWS SSMGuiConnect Preferencess with Alchemy
description: Learn how to create, update, and manage AWS SSMGuiConnect Preferencess using Alchemy Cloud Control.
---

# Preferences

The Preferences resource lets you create and manage [AWS SSMGuiConnect Preferencess](https://docs.aws.amazon.com/ssmguiconnect/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ssmguiconnect-preferences.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const preferences = await AWS.SSMGuiConnect.Preferences("preferences-example", {});
```

