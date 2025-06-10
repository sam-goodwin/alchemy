---
title: TestCase
description: Learn how to create, update, and manage AWS AppTest TestCases using Alchemy Cloud Control.
---


The TestCase resource lets you manage [AWS AppTest TestCases](https://docs.aws.amazon.com/apptest/latest/userguide/) for automating application testing.

## Minimal Example

Create a basic AppTest TestCase with essential properties.

```ts
import AWS from "alchemy/aws/control";

const basicTestCase = await AWS.AppTest.TestCase("basicTestCase", {
  Name: "BasicTestCase",
  Steps: [
    {
      Action: "Click",
      Target: "button#submit"
    },
    {
      Action: "Type",
      Target: "input#username",
      Value: "testUser"
    }
  ],
  Description: "A basic test case for user login"
});
```

## Advanced Configuration

Configure an AppTest TestCase with additional steps and tags for better organization.

```ts
const advancedTestCase = await AWS.AppTest.TestCase("advancedTestCase", {
  Name: "AdvancedTestCase",
  Steps: [
    {
      Action: "Click",
      Target: "button#submit"
    },
    {
      Action: "Type",
      Target: "input#username",
      Value: "testUser"
    },
    {
      Action: "Type",
      Target: "input#password",
      Value: "securePassword123"
    },
    {
      Action: "Click",
      Target: "button#login"
    },
    {
      Action: "AssertVisible",
      Target: "div#dashboard"
    }
  ],
  Description: "An advanced test case for user login with validation",
  Tags: {
    environment: "staging",
    priority: "high"
  }
});
```

## Debugging and Logging

Create a TestCase that includes logging steps for better debugging during test execution.

```ts
const loggingTestCase = await AWS.AppTest.TestCase("loggingTestCase", {
  Name: "LoggingTestCase",
  Steps: [
    {
      Action: "Log",
      Message: "Starting the login process"
    },
    {
      Action: "Type",
      Target: "input#username",
      Value: "testUser"
    },
    {
      Action: "Log",
      Message: "Username entered, now typing password"
    },
    {
      Action: "Type",
      Target: "input#password",
      Value: "securePassword123"
    },
    {
      Action: "Click",
      Target: "button#login"
    },
    {
      Action: "AssertVisible",
      Target: "div#dashboard"
    },
    {
      Action: "Log",
      Message: "Login process completed"
    }
  ],
  Description: "Test case with logging for each step"
});
```
