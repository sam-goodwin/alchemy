import { fromNodeProviderChain } from "@aws-sdk/credential-providers";
import { AwsClient } from "aws4fetch";
import { flattenParams } from "../../util/params.js";
import { getRegion } from "../utils.js";

/**
 * Shared EC2 utilities for all EC2 resources
 */

/**
 * Create an AWS EC2 client
 */
export async function createEC2Client(): Promise<AwsClient> {
  const credentials = await fromNodeProviderChain()();
  const region = await getRegion();

  return new AwsClient({
    ...credentials,
    service: "ec2",
    region,
  });
}

/**
 * Make an EC2 API call with custom response parser
 */
export async function callEC2Api<T>(
  client: AwsClient,
  action: string,
  responseParser: (xmlText: string) => T,
  params: Record<string, any> = {},
): Promise<T> {
  // Try the API call, and retry once with fresh credentials on auth failure
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const region = await getRegion();
      const url = `https://ec2.${region}.amazonaws.com/`;

      const body = new URLSearchParams({
        Action: action,
        Version: "2016-11-15",
        ...flattenParams(params),
      });

      const signedRequest = await client.sign(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });

      const response = await fetch(signedRequest);

      if (!response.ok) {
        const errorText = await response.text();

        // Parse AWS error code from XML response
        const errorCodeMatch = errorText.match(/<Code>([^<]+)<\/Code>/);
        const errorCode = errorCodeMatch ? errorCodeMatch[1] : null;

        // If this is an auth failure and we haven't retried yet, create a fresh client and retry
        if (errorCode === "AuthFailure" && attempt === 1) {
          console.log(
            `🔄 Auth failure detected, refreshing credentials and retrying ${action}...`,
          );
          // Create a fresh client with new credentials
          client = await createEC2Client();
          continue; // Retry with fresh client
        }

        const error = new Error(
          `EC2 API error: ${response.status} ${response.statusText}\n${errorText}`,
        );

        // Set the error code for the ignore function
        if (errorCode) {
          (error as any).code = errorCode;
        }

        throw error;
      }

      const xmlText = await response.text();
      const parsed = responseParser(xmlText);
      return parsed;
    } catch (error) {
      // If it's not an auth failure or we've already retried, throw the error
      if (attempt === 2 || !(error as any)?.message?.includes("AuthFailure")) {
        throw error;
      }
      // Otherwise, continue to retry
    }
  }

  // This should never be reached, but TypeScript needs it
  throw new Error("Unexpected error in API call retry logic");
}

// Re-export getRegion for convenience
export { getRegion };
