import {
  CreateTableCommand,
  DeleteTableCommand,
  DescribeTableCommand,
  DynamoDBClient,
  InternalServerError,
  type KeySchemaElement,
  ResourceInUseException,
  ResourceNotFoundException,
} from "@aws-sdk/client-dynamodb";
import { ignore } from "../error";
import { type Context, Resource } from "../resource";
import { withExponentialBackoff } from "../utils/retry";

export interface TableProps {
  tableName: string;
  partitionKey: {
    name: string;
    type: "S" | "N" | "B";
  };
  sortKey?: {
    name: string;
    type: "S" | "N" | "B";
  };
  billingMode?: "PROVISIONED" | "PAY_PER_REQUEST";
  readCapacity?: number;
  writeCapacity?: number;
  tags?: Record<string, string>;
}

export interface TableOutput extends TableProps {
  id: string; // Same as tableName
  arn: string;
  streamArn?: string;
  tableId: string;
}

export class Table extends Resource(
  "dynamo::Table",
  async (
    ctx: Context<TableOutput>,
    props: TableProps,
  ): Promise<TableOutput | void> => {
    const client = new DynamoDBClient({});

    if (ctx.event === "delete") {
      await withExponentialBackoff(
        async () => {
          await ignore(ResourceNotFoundException.name, () =>
            client.send(
              new DeleteTableCommand({
                TableName: props.tableName,
              }),
            ),
          );
        },
        (error) =>
          error instanceof ResourceInUseException ||
          error instanceof InternalServerError,
        10, // Max attempts
        200, // Initial delay in ms
      );

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

      return;
    } else {
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

      // Attempt to create the table with exponential backoff for ResourceInUseException
      await withExponentialBackoff(
        async () => {
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
        },
        (error) => error instanceof ResourceInUseException,
        10, // Max attempts
        200, // Initial delay in ms
      );

      // Wait for table to be active with timeout
      let tableActive = false;
      let tableDescription;
      let retryCount = 0;
      const maxRetries = 60; // Wait up to 60 seconds

      while (!tableActive && retryCount < maxRetries) {
        try {
          const response = await client.send(
            new DescribeTableCommand({
              TableName: props.tableName,
            }),
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

      return {
        ...props,
        id: props.tableName,
        arn: tableDescription!.TableArn!,
        streamArn: tableDescription!.LatestStreamArn,
        tableId: tableDescription!.TableId!,
      };
    }
  },
) {}
