---
title: TaskTemplate
description: Learn how to create, update, and manage AWS Connect TaskTemplates using Alchemy Cloud Control.
---


The TaskTemplate resource allows you to manage [AWS Connect TaskTemplates](https://docs.aws.amazon.com/connect/latest/userguide/) for defining tasks within your Amazon Connect instance.

## Minimal Example

Create a basic TaskTemplate with required properties and some optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicTaskTemplate = await AWS.Connect.TaskTemplate("basicTaskTemplate", {
  instanceArn: "arn:aws:connect:us-west-2:123456789012:instance/abcd1234-5678-90ef-ghij-klmnopqrst",
  status: "ACTIVE",
  name: "Basic Task Template",
  description: "A simple task template for demonstration purposes."
});
```

## Advanced Configuration

Configure a TaskTemplate with additional fields and constraints for enhanced task management.

```ts
const advancedTaskTemplate = await AWS.Connect.TaskTemplate("advancedTaskTemplate", {
  instanceArn: "arn:aws:connect:us-west-2:123456789012:instance/abcd1234-5678-90ef-ghij-klmnopqrst",
  status: "ACTIVE",
  name: "Advanced Task Template",
  description: "An advanced task template with custom fields.",
  fields: [
    {
      type: "STRING",
      label: "Customer Feedback",
      required: true,
      placeholder: "Enter feedback here"
    },
    {
      type: "NUMBER",
      label: "Satisfaction Rating",
      required: true,
      placeholder: "Rate from 1 to 5"
    }
  ],
  constraints: {
    stringConstraints: {
      minLength: 1,
      maxLength: 500
    },
    numberConstraints: {
      minValue: 1,
      maxValue: 5
    }
  }
});
```

## Using Tags

Demonstrate how to use tags with your TaskTemplate for better resource organization.

```ts
const taggedTaskTemplate = await AWS.Connect.TaskTemplate("taggedTaskTemplate", {
  instanceArn: "arn:aws:connect:us-west-2:123456789012:instance/abcd1234-5678-90ef-ghij-klmnopqrst",
  status: "ACTIVE",
  name: "Tagged Task Template",
  tags: [
    {
      key: "Project",
      value: "Customer Support"
    },
    {
      key: "Environment",
      value: "Production"
    }
  ]
});
```

## Self-Assign Contact Flow

Create a TaskTemplate that includes a self-assign contact flow for improved task handling.

```ts
const selfAssignContactFlowTemplate = await AWS.Connect.TaskTemplate("selfAssignContactFlowTemplate", {
  instanceArn: "arn:aws:connect:us-west-2:123456789012:instance/abcd1234-5678-90ef-ghij-klmnopqrst",
  status: "ACTIVE",
  name: "Self-Assign Contact Flow Template",
  selfAssignContactFlowArn: "arn:aws:connect:us-west-2:123456789012:contact-flow/abcdef12-3456-7890-abcd-ef1234567890"
});
```
