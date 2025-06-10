---
title: Group
description: Learn how to create, update, and manage AWS ResourceGroups Groups using Alchemy Cloud Control.
---


The Group resource lets you manage [AWS ResourceGroups Groups](https://docs.aws.amazon.com/resourcegroups/latest/userguide/) which help you organize AWS resources in a logical manner.

## Minimal Example

Create a basic resource group with a name and an optional description.

```ts
import AWS from "alchemy/aws/control";

const myResourceGroup = await AWS.ResourceGroups.Group("myResourceGroup", {
  Name: "MyResourceGroup",
  Description: "This is a resource group for my application resources."
});
```

## Advanced Configuration

Configure a resource group with a resource query to include specific resources based on tags.

```ts
const taggedResourceGroup = await AWS.ResourceGroups.Group("taggedResourceGroup", {
  Name: "TaggedResourcesGroup",
  Description: "This resource group contains resources tagged with 'App:MyApp'.",
  ResourceQuery: {
    Type: "TAG_FILTERS_1_0",
    Query: {
      ResourceTypeFilters: ["AWS::EC2::Instance"],
      TagFilters: [
        {
          Key: "App",
          Values: ["MyApp"]
        }
      ]
    }
  }
});
```

## Adopting Existing Resources

Create a resource group that adopts existing resources instead of failing if they already exist.

```ts
const adoptExistingResourcesGroup = await AWS.ResourceGroups.Group("adoptExistingResourcesGroup", {
  Name: "AdoptExistingResourcesGroup",
  Description: "This group will adopt existing resources.",
  Resources: ["arn:aws:ec2:us-east-1:123456789012:instance/i-0abcd1234efgh5678"],
  adopt: true
});
```

## Adding Tags

Create a resource group with tags for better organization and management.

```ts
const taggedGroup = await AWS.ResourceGroups.Group("taggedGroup", {
  Name: "MyTaggedGroup",
  Description: "Resource group with tags.",
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Owner",
      Value: "DevTeam"
    }
  ]
});
``` 

## Configuring Group Resources

Create a resource group specifying a list of resources to include.

```ts
const specificResourcesGroup = await AWS.ResourceGroups.Group("specificResourcesGroup", {
  Name: "SpecificResourcesGroup",
  Resources: [
    "arn:aws:s3:::my-bucket",
    "arn:aws:ec2:us-west-2:123456789012:instance/i-0abcd1234efgh5678"
  ]
});
```
