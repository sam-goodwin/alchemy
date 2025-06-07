---
title: Managing AWS IoTSiteWise Dashboards with Alchemy
description: Learn how to create, update, and manage AWS IoTSiteWise Dashboards using Alchemy Cloud Control.
---

# Dashboard

The Dashboard resource lets you create and manage [AWS IoTSiteWise Dashboards](https://docs.aws.amazon.com/iotsitewise/latest/userguide/) for visualizing and analyzing data from your IoT devices.

## Minimal Example

Create a basic IoTSiteWise Dashboard with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const simpleDashboard = await AWS.IoTSiteWise.Dashboard("SimpleDashboard", {
  DashboardName: "Simple Production Dashboard",
  DashboardDefinition: JSON.stringify({
    widgets: [
      {
        type: "line",
        title: "Temperature Over Time",
        properties: {
          data: {
            type: "timeseries",
            timeSeries: {
              dataType: "double",
              variable: "temperature"
            }
          }
        }
      }
    ]
  }),
  DashboardDescription: "A simple dashboard for monitoring production temperature."
});
```

## Advanced Configuration

Configure an IoTSiteWise Dashboard with more complex definitions and tags.

```ts
const advancedDashboard = await AWS.IoTSiteWise.Dashboard("AdvancedDashboard", {
  DashboardName: "Advanced Production Dashboard",
  DashboardDefinition: JSON.stringify({
    widgets: [
      {
        type: "bar",
        title: "Production Output",
        properties: {
          data: {
            type: "barChart",
            value: {
              variable: "output"
            }
          }
        }
      },
      {
        type: "gauge",
        title: "Current Temperature",
        properties: {
          data: {
            type: "gauge",
            value: {
              variable: "currentTemperature"
            }
          }
        }
      }
    ]
  }),
  DashboardDescription: "An advanced dashboard for tracking production metrics.",
  ProjectId: "project-12345",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "IoT" }
  ]
});
```

## Distinct Use Case: Multi-Dashboard Synchronization

Create multiple dashboards that synchronize data visualizations for different production lines.

```ts
const line1Dashboard = await AWS.IoTSiteWise.Dashboard("Line1Dashboard", {
  DashboardName: "Line 1 Production Dashboard",
  DashboardDefinition: JSON.stringify({
    widgets: [
      {
        type: "line",
        title: "Line 1 Temperature",
        properties: {
          data: {
            type: "timeseries",
            timeSeries: {
              dataType: "double",
              variable: "line1Temperature"
            }
          }
        }
      }
    ]
  }),
  DashboardDescription: "Dashboard for monitoring Line 1 temperature.",
  Tags: [
    { Key: "Line", Value: "1" },
    { Key: "Environment", Value: "production" }
  ]
});

const line2Dashboard = await AWS.IoTSiteWise.Dashboard("Line2Dashboard", {
  DashboardName: "Line 2 Production Dashboard",
  DashboardDefinition: JSON.stringify({
    widgets: [
      {
        type: "line",
        title: "Line 2 Temperature",
        properties: {
          data: {
            type: "timeseries",
            timeSeries: {
              dataType: "double",
              variable: "line2Temperature"
            }
          }
        }
      }
    ]
  }),
  DashboardDescription: "Dashboard for monitoring Line 2 temperature.",
  Tags: [
    { Key: "Line", Value: "2" },
    { Key: "Environment", Value: "production" }
  ]
});