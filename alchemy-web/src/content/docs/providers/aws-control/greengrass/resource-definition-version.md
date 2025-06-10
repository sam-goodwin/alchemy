---
title: ResourceDefinitionVersion
description: Learn how to create, update, and manage AWS Greengrass ResourceDefinitionVersions using Alchemy Cloud Control.
---


The ResourceDefinitionVersion resource allows you to manage versions of resource definitions in AWS Greengrass, facilitating the management of resources used by Greengrass groups. For more information, refer to the [AWS Greengrass ResourceDefinitionVersions documentation](https://docs.aws.amazon.com/greengrass/latest/userguide/).

## Minimal Example

Create a basic ResourceDefinitionVersion with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const resourceDefinitionVersion = await AWS.Greengrass.ResourceDefinitionVersion("myResourceDefinitionVersion", {
  ResourceDefinitionId: "myResourceDefinitionId",
  Resources: [
    {
      Id: "MyResource1",
      Name: "MyResource1",
      ResourceDataContainer: {
        LocalVolumeResourceData: {
          SourcePath: "/mnt/myLocalPath",
          DestinationPath: "/myGreengrassDestinationPath",
          GroupOwnerSetting: {
            GroupOwner: "None"
          }
        }
      }
    }
  ],
  adopt: true // Optional: Adopt existing resource if it already exists
});
```

## Advanced Configuration

Configure a ResourceDefinitionVersion with multiple resources and advanced settings.

```ts
const advancedResourceDefinitionVersion = await AWS.Greengrass.ResourceDefinitionVersion("advancedResourceDefinitionVersion", {
  ResourceDefinitionId: "advancedResourceDefinitionId",
  Resources: [
    {
      Id: "MyResource2",
      Name: "MyResource2",
      ResourceDataContainer: {
        LocalVolumeResourceData: {
          SourcePath: "/mnt/anotherLocalPath",
          DestinationPath: "/anotherGreengrassDestinationPath",
          GroupOwnerSetting: {
            GroupOwner: "GID",
            GroupId: "1001"
          }
        }
      }
    },
    {
      Id: "MyResource3",
      Name: "MyResource3",
      ResourceDataContainer: {
        S3ResourceData: {
          S3Uri: "s3://my-bucket/my-resource-data",
          GroupOwnerSetting: {
            GroupOwner: "None"
          }
        }
      }
    }
  ]
});
```

## Example with Local Volume Resource Data

This example shows how to define a ResourceDefinitionVersion that uses local volume resource data.

```ts
const localVolumeResourceDefinitionVersion = await AWS.Greengrass.ResourceDefinitionVersion("localVolumeResourceDefinitionVersion", {
  ResourceDefinitionId: "localVolumeResourceDefinitionId",
  Resources: [
    {
      Id: "MyLocalResource",
      Name: "MyLocalResource",
      ResourceDataContainer: {
        LocalVolumeResourceData: {
          SourcePath: "/mnt/myLocalVolume",
          DestinationPath: "/greengrass/localDestination",
          GroupOwnerSetting: {
            GroupOwner: "None"
          }
        }
      }
    }
  ]
});
```

## Example with S3 Resource Data

This example demonstrates creating a ResourceDefinitionVersion with S3 resource data.

```ts
const s3ResourceDefinitionVersion = await AWS.Greengrass.ResourceDefinitionVersion("s3ResourceDefinitionVersion", {
  ResourceDefinitionId: "s3ResourceDefinitionId",
  Resources: [
    {
      Id: "MyS3Resource",
      Name: "MyS3Resource",
      ResourceDataContainer: {
        S3ResourceData: {
          S3Uri: "s3://my-other-bucket/my-s3-resource-data",
          GroupOwnerSetting: {
            GroupOwner: "None"
          }
        }
      }
    }
  ]
});
```
