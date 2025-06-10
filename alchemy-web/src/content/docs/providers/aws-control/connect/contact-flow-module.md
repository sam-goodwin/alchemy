---
title: ContactFlowModule
description: Learn how to create, update, and manage AWS Connect ContactFlowModules using Alchemy Cloud Control.
---


The ContactFlowModule resource allows you to create and manage [AWS Connect ContactFlowModules](https://docs.aws.amazon.com/connect/latest/userguide/) for defining interactive workflows in your contact center.

## Minimal Example

Create a basic ContactFlowModule with required properties and a common optional description.

```ts
import AWS from "alchemy/aws/control";

const contactFlowModule = await AWS.Connect.ContactFlowModule("basicContactFlowModule", {
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcd1234-56ef-78gh-90ij-klmnopqrst",
  Content: JSON.stringify({
    "Version": "2019-10-30",
    "StartAction": "1",
    "Actions": [
      {
        "Identifier": "1",
        "Type": "PlayPrompt",
        "Parameters": {
          "Text": "Welcome to our service."
        }
      }
    ]
  }),
  Name: "Basic Contact Flow Module",
  Description: "A simple contact flow module for greeting customers."
});
```

## Advanced Configuration

Configure a ContactFlowModule with additional properties like tags and state.

```ts
const advancedContactFlowModule = await AWS.Connect.ContactFlowModule("advancedContactFlowModule", {
  InstanceArn: "arn:aws:connect:us-west-2:123456789012:instance/wxyz5678-90ab-cdef-ghij-klmnopqrst",
  Content: JSON.stringify({
    "Version": "2019-10-30",
    "StartAction": "2",
    "Actions": [
      {
        "Identifier": "2",
        "Type": "PlayPrompt",
        "Parameters": {
          "Text": "Thank you for calling. Please hold while we connect you."
        }
      }
    ]
  }),
  Name: "Advanced Contact Flow Module",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "Support" }
  ],
  State: "ACTIVE"
});
```

## Using with Additional Features

Create a ContactFlowModule that incorporates error handling and custom actions.

```ts
const errorHandlingContactFlowModule = await AWS.Connect.ContactFlowModule("errorHandlingContactFlowModule", {
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/ijkl9012-34mn-opqr-stuv-wxyzabcdefg",
  Content: JSON.stringify({
    "Version": "2019-10-30",
    "StartAction": "3",
    "Actions": [
      {
        "Identifier": "3",
        "Type": "CheckContactAttributes",
        "Parameters": {
          "Attribute": "IsCustomerVIP"
        }
      },
      {
        "Identifier": "4",
        "Type": "PlayPrompt",
        "Parameters": {
          "Text": "Connecting you to a VIP representative."
        }
      },
      {
        "Identifier": "5",
        "Type": "Error",
        "Parameters": {
          "ErrorMessage": "An error occurred while processing your request."
        }
      }
    ]
  }),
  Name: "Error Handling Contact Flow Module",
  Description: "A contact flow module that handles customer VIP status and errors.",
  Tags: [
    { Key: "UseCase", Value: "VIPSupport" }
  ]
});
```
