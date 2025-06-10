---
title: Campaign
description: Learn how to create, update, and manage AWS Pinpoint Campaigns using Alchemy Cloud Control.
---


The Campaign resource lets you manage [AWS Pinpoint Campaigns](https://docs.aws.amazon.com/pinpoint/latest/userguide/) for targeted messaging to selected segments of your audience.

## Minimal Example

Create a basic Pinpoint campaign with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicCampaign = await AWS.Pinpoint.Campaign("basicCampaign", {
  applicationId: "your-pinpoint-app-id",
  name: "Welcome Campaign",
  segmentId: "your-segment-id",
  schedule: {
    startTime: "2023-10-01T12:00:00Z",
    endTime: "2023-10-07T12:00:00Z",
    frequency: "ONCE"
  }
});
```

## Advanced Configuration

Configure a campaign with additional treatments and message customization.

```ts
const advancedCampaign = await AWS.Pinpoint.Campaign("advancedCampaign", {
  applicationId: "your-pinpoint-app-id",
  name: "Special Offer Campaign",
  segmentId: "your-segment-id",
  schedule: {
    startTime: "2023-11-01T12:00:00Z",
    endTime: "2023-11-15T12:00:00Z",
    frequency: "DAILY"
  },
  messageConfiguration: {
    emailMessage: {
      fromAddress: "noreply@yourdomain.com",
      subject: "Exclusive Offer Just for You!",
      htmlBody: "<h1>Don't miss out!</h1><p>Get 20% off your next purchase.</p>",
      textBody: "Don't miss out! Get 20% off your next purchase."
    }
  },
  additionalTreatments: [
    {
      messageConfiguration: {
        smsMessage: {
          body: "Get 20% off your next purchase! Visit our site.",
          senderId: "YourBrand"
        }
      },
      treatmentName: "SMS Treatment"
    }
  ]
});
```

## Paused Campaign

Create a campaign that is initially paused.

```ts
const pausedCampaign = await AWS.Pinpoint.Campaign("pausedCampaign", {
  applicationId: "your-pinpoint-app-id",
  name: "Paused Campaign",
  segmentId: "your-segment-id",
  isPaused: true,
  schedule: {
    startTime: "2023-12-01T12:00:00Z",
    frequency: "ONCE"
  }
});
```

## Custom Delivery Configuration

Configure a campaign with a custom delivery option.

```ts
const customDeliveryCampaign = await AWS.Pinpoint.Campaign("customDeliveryCampaign", {
  applicationId: "your-pinpoint-app-id",
  name: "Custom Delivery Campaign",
  segmentId: "your-segment-id",
  schedule: {
    startTime: "2024-01-01T12:00:00Z",
    frequency: "WEEKLY"
  },
  customDeliveryConfiguration: {
    deliveryUri: "http://your-custom-delivery-endpoint.com",
    method: "POST"
  }
});
```
