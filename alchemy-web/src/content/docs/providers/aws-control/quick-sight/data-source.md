---
title: DataSource
description: Learn how to create, update, and manage AWS QuickSight DataSources using Alchemy Cloud Control.
---


The DataSource resource lets you manage [AWS QuickSight DataSources](https://docs.aws.amazon.com/quicksight/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic QuickSight DataSource with required properties and a few optional settings.

```ts
import AWS from "alchemy/aws/control";

const quickSightDataSource = await AWS.QuickSight.DataSource("myDataSource", {
  Name: "SalesDataSource",
  Type: "RDS",
  DataSourceParameters: {
    RdsParameters: {
      InstanceId: "my-db-instance",
      Database: "sales_db",
      Port: 5432,
      Username: "admin"
    }
  },
  Credentials: {
    CredentialPair: {
      Username: "admin",
      Password: alchemy.secret(process.env.DB_PASSWORD!)
    }
  },
  Permissions: [{
    Principal: "arn:aws:quicksight:us-east-1:123456789012:user/default/user@example.com",
    Actions: ["quicksight:DescribeDataSource", "quicksight:UpdateDataSource"]
  }],
  Tags: [{
    Key: "Environment",
    Value: "Production"
  }]
});
```

## Advanced Configuration

Configure a DataSource with additional security options and VPC connection properties.

```ts
const advancedDataSource = await AWS.QuickSight.DataSource("secureDataSource", {
  Name: "SecureSalesDataSource",
  Type: "RDS",
  DataSourceParameters: {
    RdsParameters: {
      InstanceId: "my-secure-db-instance",
      Database: "sales_db",
      Port: 5432,
      Username: "admin"
    }
  },
  Credentials: {
    CredentialPair: {
      Username: "admin",
      Password: alchemy.secret(process.env.DB_PASSWORD!)
    }
  },
  VpcConnectionProperties: {
    VpcId: "vpc-0abcd1234efgh5678",
    SecurityGroupId: "sg-0abcd1234efgh5678",
    SubnetId: "subnet-0abcd1234efgh5678"
  },
  SslProperties: {
    SslMode: "require"
  },
  Tags: [{
    Key: "Environment",
    Value: "Staging"
  }]
});
```

## Using Alternate DataSource Parameters

Create a DataSource that uses alternate parameters for different environments.

```ts
const alternateDataSource = await AWS.QuickSight.DataSource("alternateSalesDataSource", {
  Name: "AlternateSalesDataSource",
  Type: "Athena",
  DataSourceParameters: {
    AthenaParameters: {
      WorkGroup: "primary",
      Database: "sales_db"
    }
  },
  AlternateDataSourceParameters: [{
    DataSourceParameters: {
      AthenaParameters: {
        WorkGroup: "dev",
        Database: "dev_sales_db"
      }
    }
  }],
  Tags: [{
    Key: "Environment",
    Value: "Development"
  }]
});
```

## Error Handling Configuration

Define a DataSource that includes error handling information.

```ts
const errorHandlingDataSource = await AWS.QuickSight.DataSource("errorHandlingDataSource", {
  Name: "ErrorHandlingDataSource",
  Type: "S3",
  DataSourceParameters: {
    S3Parameters: {
      ManifestFileLocation: {
        Bucket: "my-data-bucket",
        Key: "data/sales_data_manifest.json"
      }
    }
  },
  ErrorInfo: {
    ErrorType: "DATA_SOURCE_NOT_FOUND",
    Message: "The specified DataSource does not exist."
  },
  Tags: [{
    Key: "Environment",
    Value: "Testing"
  }]
});
```
