---
title: TopicRule
description: Learn how to create, update, and manage AWS IoT TopicRules using Alchemy Cloud Control.
---


The TopicRule resource allows you to manage [AWS IoT TopicRules](https://docs.aws.amazon.com/iot/latest/userguide/) that define actions to be taken when messages are published to specific MQTT topics.

## Minimal Example

Create a basic TopicRule with a payload that triggers an action based on incoming MQTT messages.

```ts
import AWS from "alchemy/aws/control";

const simpleTopicRule = await AWS.IoT.TopicRule("simpleTopicRule", {
  TopicRulePayload: {
    ruleDisabled: false,
    sql: "SELECT * FROM 'sensors/temperature'",
    actions: [{
      lambda: {
        functionArn: "arn:aws:lambda:us-west-2:123456789012:function:TemperatureAlerts",
        payload: {
          type: "json",
          data: {
            temperatureThreshold: 75
          }
        }
      }
    }],
    description: "Triggers Lambda function on temperature readings."
  },
  RuleName: "TemperatureAlertRule",
  Tags: [{ Key: "Environment", Value: "Production" }]
});
```

## Advanced Configuration

Configure a TopicRule with multiple actions and specific IAM role permissions for enhanced functionality.

```ts
const advancedTopicRule = await AWS.IoT.TopicRule("advancedTopicRule", {
  TopicRulePayload: {
    ruleDisabled: false,
    sql: "SELECT * FROM 'home/+/temperature'",
    actions: [{
      sns: {
        targetArn: "arn:aws:sns:us-west-2:123456789012:TemperatureAlerts",
        roleArn: "arn:aws:iam::123456789012:role/SNSTopicRole",
        messageFormat: "RAW"
      }
    }, {
      dynamoDB: {
        tableName: "TemperatureRecords",
        roleArn: "arn:aws:iam::123456789012:role/DynamoDBRole",
        hashKeyField: "deviceId",
        hashKeyType: "S",
        hashKeyValue: "${deviceId}",
        payloadField: "temperature"
      }
    }],
    description: "Sends alerts to SNS and stores readings in DynamoDB."
  },
  RuleName: "HomeTemperatureRule",
  Tags: [{ Key: "Project", Value: "SmartHome" }]
});
```

## Custom SQL Filters

Define a TopicRule with a custom SQL filter to trigger actions based on specific message attributes.

```ts
const filteredTopicRule = await AWS.IoT.TopicRule("filteredTopicRule", {
  TopicRulePayload: {
    ruleDisabled: false,
    sql: "SELECT * FROM 'sensors/+/alerts' WHERE alertSeverity = 'high'",
    actions: [{
      lambda: {
        functionArn: "arn:aws:lambda:us-west-2:123456789012:function:HighAlertHandler"
      }
    }],
    description: "Handles high severity alerts from sensors."
  },
  RuleName: "HighSeverityAlertRule",
  Tags: [{ Key: "AlertType", Value: "Critical" }]
});
``` 

## Multi-Action Example

Set up a TopicRule with multiple actions to send notifications and log data simultaneously.

```ts
const multiActionTopicRule = await AWS.IoT.TopicRule("multiActionTopicRule", {
  TopicRulePayload: {
    ruleDisabled: false,
    sql: "SELECT * FROM 'factory/machine/status'",
    actions: [{
      lambda: {
        functionArn: "arn:aws:lambda:us-west-2:123456789012:function:MachineStatusHandler"
      }
    }, {
      kinesis: {
        streamArn: "arn:aws:kinesis:us-west-2:123456789012:stream/MachineStatusStream",
        partitionKey: "${machineId}"
      }
    }],
    description: "Handles machine status updates and logs them to Kinesis."
  },
  RuleName: "MachineStatusRule",
  Tags: [{ Key: "Application", Value: "FactoryMonitoring" }]
});
```
