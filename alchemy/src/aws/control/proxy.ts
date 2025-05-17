import { createResourceType } from "./resource.js";

/**
 * Proxy-based interface for dynamically accessing AWS resource handlers.
 * This allows for a natural, namespace-like access pattern (e.g., AWS.S3.Bucket)
 * while lazily creating resource handlers as needed.
 */
export const AWS = new Proxy(
  {},
  {
    get(_, serviceName: string) {
      // Skip internal properties
      if (typeof serviceName !== "string" || serviceName.startsWith("_")) {
        return undefined;
      }

      // Create a nested proxy for the service namespace
      return new Proxy(
        {},
        {
          get(_, resourceName: string) {
            // Skip internal properties
            if (
              typeof resourceName !== "string" ||
              resourceName.startsWith("_")
            ) {
              return undefined;
            }

            // Construct the CloudFormation resource type name
            const typeName = `AWS::${serviceName}::${resourceName}`;

            // Return the memoized resource handler
            return createResourceType(typeName);
          },
        },
      );
    },
  },
) as typeof import("./types");
