---
title: Managing AWS GroundStation MissionProfiles with Alchemy
description: Learn how to create, update, and manage AWS GroundStation MissionProfiles using Alchemy Cloud Control.
---

# MissionProfile

The MissionProfile resource lets you create and manage [AWS GroundStation MissionProfiles](https://docs.aws.amazon.com/groundstation/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-groundstation-missionprofile.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const missionprofile = await AWS.GroundStation.MissionProfile("missionprofile-example", {
  MinimumViableContactDurationSeconds: 1,
  DataflowEdges: [],
  TrackingConfigArn: "example-trackingconfigarn",
  Name: "missionprofile-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a missionprofile with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedMissionProfile = await AWS.GroundStation.MissionProfile("advanced-missionprofile", {
  MinimumViableContactDurationSeconds: 1,
  DataflowEdges: [],
  TrackingConfigArn: "example-trackingconfigarn",
  Name: "missionprofile-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

