---
title: Assessment
description: Learn how to create, update, and manage AWS AuditManager Assessments using Alchemy Cloud Control.
---


The Assessment resource lets you manage [AWS AuditManager Assessments](https://docs.aws.amazon.com/auditmanager/latest/userguide/) to help you evaluate the compliance of your AWS resources against your organization's standards and regulations.

## Minimal Example

Create a basic assessment with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicAssessment = await AWS.AuditManager.Assessment("basicAssessment", {
  Name: "Quarterly Compliance Assessment",
  Description: "Assessment to evaluate compliance for Q1",
  FrameworkId: "framework-12345",
  Status: "ACTIVE"
});
```

## Advanced Configuration

Configure an assessment with additional properties such as delegations and tags.

```ts
const advancedAssessment = await AWS.AuditManager.Assessment("advancedAssessment", {
  Name: "Annual Security Assessment",
  Description: "Comprehensive assessment for annual security audit",
  FrameworkId: "framework-67890",
  Status: "ACTIVE",
  Delegations: [
    {
      Role: "ComplianceOfficer",
      Assignee: "john.doe@example.com"
    }
  ],
  Tags: [
    {
      Key: "Department",
      Value: "Compliance"
    },
    {
      Key: "Project",
      Value: "Audit2023"
    }
  ]
});
```

## Assessment with Reports Destination

Create an assessment that specifies a destination for the assessment reports.

```ts
const reportDestinationAssessment = await AWS.AuditManager.Assessment("reportDestinationAssessment", {
  Name: "Monthly Risk Assessment",
  Description: "Monthly assessment to identify risks",
  FrameworkId: "framework-54321",
  Status: "ACTIVE",
  AssessmentReportsDestination: {
    S3Bucket: "audit-reports-bucket",
    S3KeyPrefix: "monthly-risk-reports/"
  }
});
```

## Assessment Scope Configuration

Define the scope of the assessment to focus on specific AWS resources.

```ts
const scopedAssessment = await AWS.AuditManager.Assessment("scopedAssessment", {
  Name: "Cloud Security Assessment",
  Description: "Assessment focused on cloud security aspects",
  FrameworkId: "framework-98765",
  Status: "ACTIVE",
  Scope: {
    ComplianceResourceTypes: [
      "AWS::EC2::Instance",
      "AWS::S3::Bucket"
    ]
  }
});
```
