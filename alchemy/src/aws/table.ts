import {
  CreateTableCommand,
  DeleteTableCommand,
  DescribeTableCommand,
  DynamoDBClient,
  type KeySchemaElement,
  ResourceNotFoundException,
} from "@aws-sdk/client-dynamodb";
import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { ignore } from "../util/ignore.ts";
import { retry } from "./retry.ts";

/**
 * Properties for creating or updating a DynamoDB table
 */
export interface TableProps {
  /**
   * Name of the DynamoDB table
   */
  tableName: string;

  /**
   * Primary partition key (hash key) configuration
   * Defines the main identifier for items in the table
   */
  partitionKey: {
    /**
     * Name of the partition key attribute
     */
    name: string;
    /**
     * Data type of the partition key
     * S: String, N: Number, B: Binary
     */
    type: "S" | "N" | "B";
  };

  /**
   * Optional sort key (range key) configuration
   * Used to sort items with the same partition key
   */
  sortKey?: {
    /**
     * Name of the sort key attribute
     */
    name: string;
    /**
     * Data type of the sort key
     * S: String, N: Number, B: Binary
     */
    type: "S" | "N" | "B";
  };

  /**
   * Billing mode for the table
   * PROVISIONED: Set read/write capacity units
   * PAY_PER_REQUEST: Pay per request pricing
   */
  billingMode?: "PROVISIONED" | "PAY_PER_REQUEST";

  /**
   * Read capacity units when using PROVISIONED billing mode
   * Default: 5
   */
  readCapacity?: number;

  /**
   * Write capacity units when using PROVISIONED billing mode
   * Default: 5
   */
  writeCapacity?: number;

  /**
   * Tags to apply to the table
   * Key-value pairs for resource organization
   */
  tags?: Record<string, string>;
}

/**
 * Output returned after DynamoDB table creation/update
 */
export interface Table extends Resource<"dynamo::Table">, TableProps {
  /**
   * ARN of the table
   * Format: arn:aws:dynamodb:region:account-id:table/table-name
   */
  arn: string;

  /**
   * ARN of the table's stream if enabled
   * Format: arn:aws:dynamodb:region:account-id:table/table-name/stream/timestamp
   */
  streamArn?: string;

  /**
   * Unique identifier for the table
   */
  tableId: string;
}

/**
 * AWS DynamoDB Table Resource
 *
 * Creates and manages DynamoDB tables with support for partition and sort keys,
 * flexible billing modes, and automatic table status monitoring.
 *
 * @example
 * // Create a table with partition and sort key
 * const table = await Table("user-events", {
 *   tableName: "user-events",
 *   partitionKey: {
 *     name: "id",
 *     type: "S"
 *   },
 *   sortKey: {
 *     name: "timestamp",
 *     type: "N"
 *   },
 *   tags: {
 *     Environment: "test"
 *   }
 * });
 *
 * @example
 * // Create a table with provisioned capacity
 * const table = await Table("high-throughput", {
 *   tableName: "high-throughput",
 *   partitionKey: {
 *     name: "userId",
 *     type: "S"
 *   },
 *   billingMode: "PROVISIONED",
 *   readCapacity: 100,
 *   writeCapacity: 50
 * });
 */
export const Table = Resource(
  "dynamo::Table",
  async function (
    this: Context<Table>,
    _id: string,
    props: TableProps,
  ): Promise<Table> {
    const client = new DynamoDBClient({
      endpoint: process.env.AWS_ENDPOINT,
    });

    if (this.phase === "delete") {
      await retry(async () => {
        await ignore(ResourceNotFoundException.name, () =>
          client.send(
            new DeleteTableCommand({
              TableName: props.tableName,
            }),
          ),
        );
      });

      // Wait for table to be deleted
      let tableDeleted = false;
      let retryCount = 0;
      const maxRetries = 60; // Wait up to 60 seconds

      while (!tableDeleted && retryCount < maxRetries) {
        try {
          await client.send(
            new DescribeTableCommand({
              TableName: props.tableName,
            }),
          );
          // If we get here, table still exists
          retryCount++;
          // Increasing delay for each retry with some jitter
          const delay = Math.min(1000 * (1 + 0.1 * Math.random()), 5000);
          await new Promise((resolve) => setTimeout(resolve, delay));
        } catch (error) {
          if (error instanceof ResourceNotFoundException) {
            tableDeleted = true;
          } else {
            throw error;
          }
        }
      }

      if (!tableDeleted) {
        throw new Error(
          `Timed out waiting for table ${props.tableName} to be deleted`,
        );
      }

      return this.destroy();
    }
    // Setup for table creation
    const attributeDefinitions = [
      {
        AttributeName: props.partitionKey.name,
        AttributeType: props.partitionKey.type,
      },
    ];

    const keySchema: KeySchemaElement[] = [
      {
        AttributeName: props.partitionKey.name,
        KeyType: "HASH",
      },
    ];

    if (props.sortKey) {
      attributeDefinitions.push({
        AttributeName: props.sortKey.name,
        AttributeType: props.sortKey.type,
      });
      keySchema.push({
        AttributeName: props.sortKey.name,
        KeyType: "RANGE",
      });
    }

    // Attempt to create the table with retry for retryable errors
    await retry(async () => {
      try {
        // First check if table already exists
        const describeResponse = await client.send(
          new DescribeTableCommand({
            TableName: props.tableName,
          }),
        );

        // If table exists and is ACTIVE, no need to create it
        if (describeResponse.Table?.TableStatus === "ACTIVE") {
          return;
        }

        // If table exists but not ACTIVE, wait for it in the polling loop below
        if (describeResponse.Table) {
          return;
        }
      } catch (error) {
        if (error instanceof ResourceNotFoundException) {
          // Table doesn't exist, try to create it
          await client.send(
            new CreateTableCommand({
              TableName: props.tableName,
              AttributeDefinitions: attributeDefinitions,
              KeySchema: keySchema,
              BillingMode: props.billingMode || "PAY_PER_REQUEST",
              ProvisionedThroughput:
                props.billingMode === "PROVISIONED"
                  ? {
                      ReadCapacityUnits: props.readCapacity || 5,
                      WriteCapacityUnits: props.writeCapacity || 5,
                    }
                  : undefined,
              Tags: props.tags
                ? Object.entries(props.tags).map(([Key, Value]) => ({
                    Key,
                    Value,
                  }))
                : undefined,
            }),
          );
        } else {
          throw error;
        }
      }
    });

    // Wait for table to be active with timeout
    let tableActive = false;
    let tableDescription;
    let retryCount = 0;
    const maxRetries = 60; // Wait up to 60 seconds

    while (!tableActive && retryCount < maxRetries) {
      try {
        const response = await retry(
          async () =>
            await client.send(
              new DescribeTableCommand({
                TableName: props.tableName,
              }),
            ),
        );

        tableActive = response.Table?.TableStatus === "ACTIVE";
        if (tableActive) {
          tableDescription = response.Table;
        } else {
          retryCount++;
          // Increasing delay for each retry with some jitter
          const delay = Math.min(1000 * (1 + 0.1 * Math.random()), 5000);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      } catch (error) {
        retryCount++;
        if (!(error instanceof ResourceNotFoundException)) {
          throw error;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    if (!tableActive) {
      throw new Error(
        `Timed out waiting for table ${props.tableName} to become active`,
      );
    }

    return this({
      ...props,
      arn: tableDescription!.TableArn!,
      streamArn: tableDescription!.LatestStreamArn,
      tableId: tableDescription!.TableId!,
    });
  },
);
