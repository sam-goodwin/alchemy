---
title: Dashboard
description: Learn how to create, update, and manage AWS IoTSiteWise Dashboards using Alchemy Cloud Control.
---


The Dashboard resource lets you manage [AWS IoTSiteWise Dashboards](https://docs.aws.amazon.com/iotsitewise/latest/userguide/) for visualizing and analyzing industrial data.

## Minimal Example

Create a basic IoTSiteWise Dashboard with required properties and one common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicDashboard = await AWS.IoTSiteWise.Dashboard("basicDashboard", {
  dashboardName: "Production Overview",
  dashboardDefinition: JSON.stringify({
    widgets: [
      {
        type: "lineChart",
        properties: {
          title: "Production Metrics",
          data: {
            type: "timeseries",
            values: [
              { time: "2023-01-01T00:00:00Z", value: 100 },
              { time: "2023-01-02T00:00:00Z", value: 150 }
            ]
          }
        }
      }
    ]
  }),
  dashboardDescription: "A dashboard to visualize production metrics."
});
```

## Advanced Configuration

Configure a dashboard with additional optional properties including tags and project ID.

```ts
const advancedDashboard = await AWS.IoTSiteWise.Dashboard("advancedDashboard", {
  dashboardName: "Quality Control Dashboard",
  dashboardDefinition: JSON.stringify({
    widgets: [
      {
        type: "barChart",
        properties: {
          title: "Quality Control Metrics",
          data: {
            type: "barChart",
            values: [
              { label: "Defects", value: 5 },
              { label: "Passes", value: 95 }
            ]
          }
        }
      }
    ]
  }),
  dashboardDescription: "A dashboard to track quality control metrics.",
  projectId: "project-12345",
  tags: [
    { key: "Department", value: "Quality Assurance" },
    { key: "Region", value: "North America" }
  ]
});
```

## Real-Time Data Visualization

Create a dashboard that displays real-time data from IoT devices.

```ts
const realTimeDashboard = await AWS.IoTSiteWise.Dashboard("realTimeDashboard", {
  dashboardName: "Real-Time Temperature Monitoring",
  dashboardDefinition: JSON.stringify({
    widgets: [
      {
        type: "gauge",
        properties: {
          title: "Temperature Gauge",
          value: {
            type: "property",
            propertyId: "temperatureSensor"
          }
        }
      }
    ]
  }),
  dashboardDescription: "A dashboard to monitor real-time temperature data."
});
```

## Historical Data Analysis

Set up a dashboard that analyzes historical data trends over time.

```ts
const historicalDashboard = await AWS.IoTSiteWise.Dashboard("historicalDashboard", {
  dashboardName: "Historical Production Trends",
  dashboardDefinition: JSON.stringify({
    widgets: [
      {
        type: "lineChart",
        properties: {
          title: "Monthly Production Trends",
          data: {
            type: "timeseries",
            values: [
              { time: "2023-01-01T00:00:00Z", value: 200 },
              { time: "2023-02-01T00:00:00Z", value: 250 },
              { time: "2023-03-01T00:00:00Z", value: 300 }
            ]
          }
        }
      }
    ]
  }),
  dashboardDescription: "A dashboard to visualize historical production trends."
});
```
