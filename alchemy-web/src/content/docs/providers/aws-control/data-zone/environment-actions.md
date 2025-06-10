---
title: EnvironmentActions
description: Learn how to create, update, and manage AWS DataZone EnvironmentActions using Alchemy Cloud Control.
---


The EnvironmentActions resource lets you manage [AWS DataZone EnvironmentActions](https://docs.aws.amazon.com/datazone/latest/userguide/) for various operations within a data environment.

## Minimal Example

Create a basic EnvironmentActions resource with required properties and an optional description:

```ts
import AWS from "alchemy/aws/control";

const basicEnvironmentAction = await AWS.DataZone.EnvironmentActions("basic-env-action", {
  name: "BasicEnvironmentAction",
  environmentIdentifier: "env-12345",
  description: "This is a basic environment action for demonstration purposes."
});
```

## Advanced Configuration

Configure an EnvironmentActions resource with additional properties such as parameters and domain identifier:

```ts
const advancedEnvironmentAction = await AWS.DataZone.EnvironmentActions("advanced-env-action", {
  name: "AdvancedEnvironmentAction",
  environmentIdentifier: "env-12345",
  domainIdentifier: "domain-56789",
  parameters: {
    consoleLink: {
      url: "https://console.aws.amazon.com/datazone/home",
      description: "Link to AWS DataZone Console"
    }
  }
});
```

## Using Adoption Feature

Create an EnvironmentActions resource that adopts an existing resource instead of failing if it already exists:

```ts
const adoptingEnvironmentAction = await AWS.DataZone.EnvironmentActions("adopt-env-action", {
  name: "AdoptedEnvironmentAction",
  environmentIdentifier: "env-12345",
  adopt: true,
  description: "This action will adopt an existing resource if it exists."
});
```

## Environment Action with Parameters

Define an EnvironmentActions resource that includes specific parameters for console linking:

```ts
const parameterizedEnvironmentAction = await AWS.DataZone.EnvironmentActions("parameterized-env-action", {
  name: "ParameterizedEnvironmentAction",
  environmentIdentifier: "env-12345",
  parameters: {
    consoleLink: {
      url: "https://console.aws.amazon.com/datazone/home",
      description: "Access the DataZone Console directly."
    }
  }
});
```
