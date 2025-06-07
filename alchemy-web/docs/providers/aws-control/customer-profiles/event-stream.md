---
title: Managing AWS CustomerProfiles EventStreams with Alchemy
description: Learn how to create, update, and manage AWS CustomerProfiles EventStreams using Alchemy Cloud Control.
---

# EventStream

The EventStream resource allows you to manage [AWS CustomerProfiles EventStreams](https://docs.aws.amazon.com/customerprofiles/latest/userguide/) for capturing and processing customer events seamlessly.

## Minimal Example

This example demonstrates creating a basic EventStream with required properties and a couple of optional tags.

```ts
import AWS from "alchemy/aws/control";

const BasicEventStream = await AWS.CustomerProfiles.EventStream("BasicEventStream", {
  DomainName: "example-domain",
  EventStreamName: "CustomerEvents",
  Uri: "https://example.com/event-stream",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Analytics" }
  ]
});
```

## Advanced Configuration

This example shows how to create an EventStream with additional configurations, including the adoption of an existing resource.

```ts
const AdvancedEventStream = await AWS.CustomerProfiles.EventStream("AdvancedEventStream", {
  DomainName: "example-domain",
  EventStreamName: "AdvancedCustomerEvents",
  Uri: "https://example.com/advanced-event-stream",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Marketing" }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## Specific Use Case: Event Stream for User Signups

This example illustrates how to create an EventStream specifically for capturing user sign-up events.

```ts
const UserSignupEventStream = await AWS.CustomerProfiles.EventStream("UserSignupEventStream", {
  DomainName: "example-domain",
  EventStreamName: "UserSignups",
  Uri: "https://example.com/user-signup-stream",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "User Engagement" }
  ]
});
```

## Specific Use Case: Event Stream for Purchase Transactions

This example demonstrates creating an EventStream for tracking purchase transactions.

```ts
const PurchaseTransactionEventStream = await AWS.CustomerProfiles.EventStream("PurchaseTransactionEventStream", {
  DomainName: "example-domain",
  EventStreamName: "PurchaseTransactions",
  Uri: "https://example.com/purchase-transaction-stream",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Sales" }
  ]
});
```