---
title: EvaluationForm
description: Learn how to create, update, and manage AWS Connect EvaluationForms using Alchemy Cloud Control.
---


The EvaluationForm resource allows you to manage evaluation forms within AWS Connect. These forms are essential for assessing the performance of agents and ensuring quality control. For more detailed information, refer to the [AWS Connect EvaluationForms documentation](https://docs.aws.amazon.com/connect/latest/userguide/).

## Minimal Example

Create a basic evaluation form with required properties and one optional property:

```ts
import AWS from "alchemy/aws/control";

const basicEvaluationForm = await AWS.Connect.EvaluationForm("basic-evaluation-form", {
  InstanceArn: "arn:aws:connect:us-west-2:123456789012:instance/1a2b3c4d-5678-90ab-cdef-EXAMPLE11111",
  Status: "ACTIVE",
  Title: "Customer Service Evaluation",
  Items: [
    {
      Id: "item-1",
      Type: "QUESTION",
      Question: "How would you rate the agent's professionalism?",
      AnswerOptions: [
        { Value: "Excellent" },
        { Value: "Good" },
        { Value: "Fair" },
        { Value: "Poor" }
      ]
    }
  ]
});
```

## Advanced Configuration

Configure an evaluation form with a scoring strategy and multiple items:

```ts
const advancedEvaluationForm = await AWS.Connect.EvaluationForm("advanced-evaluation-form", {
  InstanceArn: "arn:aws:connect:us-west-2:123456789012:instance/1a2b3c4d-5678-90ab-cdef-EXAMPLE11111",
  Status: "ACTIVE",
  Title: "Technical Support Evaluation",
  ScoringStrategy: {
    EvaluationScore: {
      Type: "SUM",
      Weight: 1
    }
  },
  Items: [
    {
      Id: "item-1",
      Type: "QUESTION",
      Question: "Was the issue resolved in a timely manner?",
      AnswerOptions: [
        { Value: "Yes" },
        { Value: "No" }
      ]
    },
    {
      Id: "item-2",
      Type: "QUESTION",
      Question: "How satisfied are you with the support received?",
      AnswerOptions: [
        { Value: "Very Satisfied" },
        { Value: "Satisfied" },
        { Value: "Neutral" },
        { Value: "Dissatisfied" },
        { Value: "Very Dissatisfied" }
      ]
    }
  ],
  Tags: [
    { Key: "Department", Value: "Technical Support" },
    { Key: "Region", Value: "US-West" }
  ]
});
```

## Custom Status Configuration

Create an evaluation form with a custom status and description:

```ts
const customStatusEvaluationForm = await AWS.Connect.EvaluationForm("custom-status-evaluation-form", {
  InstanceArn: "arn:aws:connect:us-west-2:123456789012:instance/1a2b3c4d-5678-90ab-cdef-EXAMPLE11111",
  Status: "DRAFT",
  Description: "This form is in draft status and under review.",
  Title: "Quality Assurance Evaluation",
  Items: [
    {
      Id: "item-1",
      Type: "QUESTION",
      Question: "Did the agent follow the call script?",
      AnswerOptions: [
        { Value: "Yes" },
        { Value: "No" }
      ]
    }
  ]
});
```
