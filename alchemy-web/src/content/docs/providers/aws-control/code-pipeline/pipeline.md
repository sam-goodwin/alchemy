---
title: Pipeline
description: Learn how to create, update, and manage AWS CodePipeline Pipelines using Alchemy Cloud Control.
---


The Pipeline resource lets you create and manage [AWS CodePipeline Pipelines](https://docs.aws.amazon.com/codepipeline/latest/userguide/) for automating the building, testing, and deployment of applications.

## Minimal Example

This example demonstrates how to create a basic pipeline with required properties and a few common optional configurations.

```ts
import AWS from "alchemy/aws/control";

const simplePipeline = await AWS.CodePipeline.Pipeline("simplePipeline", {
  RoleArn: "arn:aws:iam::123456789012:role/AWSCodePipelineServiceRole",
  Stages: [
    {
      Name: "Source",
      Actions: [
        {
          Name: "SourceAction",
          ActionTypeId: {
            Category: "Source",
            Owner: "ThirdParty",
            Provider: "GitHub",
            Version: "1"
          },
          OutputArtifacts: [
            {
              Name: "SourceOutput"
            }
          ],
          Configuration: {
            Owner: "my-github-user",
            Repo: "my-repo",
            Branch: "main",
            OAuthToken: AWS.secret(process.env.GITHUB_TOKEN!)
          }
        }
      ]
    },
    {
      Name: "Build",
      Actions: [
        {
          Name: "BuildAction",
          ActionTypeId: {
            Category: "Build",
            Owner: "AWS",
            Provider: "CodeBuild",
            Version: "1"
          },
          InputArtifacts: [
            {
              Name: "SourceOutput"
            }
          ],
          OutputArtifacts: [
            {
              Name: "BuildOutput"
            }
          ],
          Configuration: {
            ProjectName: "my-codebuild-project"
          }
        }
      ]
    }
  ]
});
```

## Advanced Configuration

This example illustrates how to configure a pipeline with triggers and additional artifact stores.

```ts
const advancedPipeline = await AWS.CodePipeline.Pipeline("advancedPipeline", {
  RoleArn: "arn:aws:iam::123456789012:role/AWSCodePipelineServiceRole",
  Stages: [
    {
      Name: "Source",
      Actions: [
        {
          Name: "SourceAction",
          ActionTypeId: {
            Category: "Source",
            Owner: "AWS",
            Provider: "S3",
            Version: "1"
          },
          OutputArtifacts: [
            {
              Name: "SourceOutput"
            }
          ],
          Configuration: {
            S3Bucket: "my-source-bucket",
            S3ObjectKey: "source.zip"
          }
        }
      ]
    },
    {
      Name: "Deploy",
      Actions: [
        {
          Name: "DeployAction",
          ActionTypeId: {
            Category: "Deploy",
            Owner: "AWS",
            Provider: "CloudFormation",
            Version: "1"
          },
          InputArtifacts: [
            {
              Name: "BuildOutput"
            }
          ],
          Configuration: {
            ActionMode: "CREATE_UPDATE",
            StackName: "my-app-stack",
            TemplatePath: "BuildOutput::template.yaml",
            RoleArn: "arn:aws:iam::123456789012:role/AWSCloudFormationRole"
          }
        }
      ]
    }
  ],
  ArtifactStores: [
    {
      Location: "my-artifact-store-bucket",
      Type: "S3"
    }
  ],
  Triggers: [
    {
      TriggerType: "CloudWatchEvents",
      Trigger: {
        Source: "aws.codepipeline",
        DetailType: "AWS API Call via CloudTrail",
        Detail: {
          eventSource: "codepipeline.amazonaws.com"
        }
      }
    }
  ]
});
```

## Tagging for Resource Management

This example demonstrates how to apply tags to a pipeline for better resource management.

```ts
const taggedPipeline = await AWS.CodePipeline.Pipeline("taggedPipeline", {
  RoleArn: "arn:aws:iam::123456789012:role/AWSCodePipelineServiceRole",
  Stages: [
    {
      Name: "Source",
      Actions: [
        {
          Name: "SourceAction",
          ActionTypeId: {
            Category: "Source",
            Owner: "AWS",
            Provider: "GitHub",
            Version: "1"
          },
          OutputArtifacts: [
            {
              Name: "SourceOutput"
            }
          ],
          Configuration: {
            Owner: "my-github-user",
            Repo: "my-repo",
            Branch: "main",
            OAuthToken: AWS.secret(process.env.GITHUB_TOKEN!)
          }
        }
      ]
    }
  ],
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Project",
      Value: "MyApp"
    }
  ]
});
```
