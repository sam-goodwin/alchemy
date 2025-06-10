---
title: ReportPlan
description: Learn how to create, update, and manage AWS Backup ReportPlans using Alchemy Cloud Control.
---


The ReportPlan resource allows you to create and manage [AWS Backup ReportPlans](https://docs.aws.amazon.com/backup/latest/userguide/) which help automate and manage backup reports for your AWS resources.

## Minimal Example

Create a basic backup report plan with required properties and some optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicReportPlan = await AWS.Backup.ReportPlan("basicReportPlan", {
  ReportSetting: {
    ReportTemplate: "resource-report-template",
    ReportScope: {
      Resources: [
        "arn:aws:ec2:us-west-2:123456789012:volume/vol-0abcd1234efgh5678"
      ],
      ResourceTypes: ["EBS"]
    }
  },
  ReportPlanDescription: "A basic report plan for EBS volume backups",
  ReportPlanName: "BasicReportPlan",
  ReportDeliveryChannel: {
    S3BucketName: "my-backup-reports",
    S3KeyPrefix: "reports",
    Format: "pdf"
  },
  ReportPlanTags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

## Advanced Configuration

Configure an advanced report plan with enhanced settings for more detailed reporting.

```ts
const advancedReportPlan = await AWS.Backup.ReportPlan("advancedReportPlan", {
  ReportSetting: {
    ReportTemplate: "detailed-report-template",
    ReportScope: {
      Resources: [
        "arn:aws:ec2:us-west-2:123456789012:volume/vol-0abcd1234efgh5678",
        "arn:aws:rds:us-west-2:123456789012:db:mydatabase"
      ],
      ResourceTypes: ["EBS", "RDS"]
    }
  },
  ReportPlanDescription: "An advanced report plan for comprehensive backup reports",
  ReportPlanName: "AdvancedReportPlan",
  ReportDeliveryChannel: {
    S3BucketName: "my-detailed-backup-reports",
    S3KeyPrefix: "detailed-reports",
    Format: "csv"
  },
  ReportPlanTags: [
    {
      Key: "Project",
      Value: "BackupAutomation"
    },
    {
      Key: "Owner",
      Value: "AdminTeam"
    }
  ]
});
```

## Scheduled Reporting

Create a report plan that generates scheduled reports for backups.

```ts
const scheduledReportPlan = await AWS.Backup.ReportPlan("scheduledReportPlan", {
  ReportSetting: {
    ReportTemplate: "weekly-report-template",
    ReportScope: {
      Resources: [
        "arn:aws:ec2:us-west-2:123456789012:volume/vol-0abcd1234efgh5678"
      ],
      ResourceTypes: ["EBS"]
    }
  },
  ReportPlanDescription: "A scheduled report plan for weekly EBS backup reports",
  ReportPlanName: "ScheduledReportPlan",
  ReportDeliveryChannel: {
    S3BucketName: "my-weekly-backup-reports",
    S3KeyPrefix: "weekly-reports",
    Format: "json"
  },
  ReportPlanTags: [
    {
      Key: "Frequency",
      Value: "Weekly"
    }
  ],
  adopt: true // Allow adoption of existing resources
});
```
