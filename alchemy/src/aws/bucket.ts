import { Effect } from "effect";
import { createAwsClient } from "./client.ts";
import { EffectResource } from "./effect-resource.ts";

/**
 * AWS S3 API response interfaces for type safety
 */
interface S3LocationResponse {
  LocationConstraint?: string;
}

interface S3TaggingResponse {
  Tagging?: {
    TagSet?: Array<{ Key: string; Value: string }>;
  };
}

interface S3VersioningResponse {
  VersioningConfiguration?: {
    Status?: "Enabled" | "Suspended";
  };
}

interface S3AclResponse {
  AccessControlPolicy?: {
    AccessControlList?: {
      Grant?: Array<{
        Permission?: string;
      }>;
    };
  };
}

/**
 * Properties for creating or updating an S3 bucket
 */
export interface BucketProps {
  /**
   * The name of the bucket. Must be globally unique across all AWS accounts.
   * Should be lowercase alphanumeric characters or hyphens.
   */
  bucketName: string;

  /**
   * Optional tags to apply to the bucket for organization and cost tracking.
   * Each tag is a key-value pair.
   */
  tags?: Record<string, string>;
}

/**
 * Output returned after S3 bucket creation/update
 */
export interface Bucket extends Resource<"s3::Bucket">, BucketProps {
  /**
   * The ARN (Amazon Resource Name) of the bucket
   * Format: arn:aws:s3:::bucket-name
   */
  arn: string;

  /**
   * The global domain name for the bucket
   * Format: bucket-name.s3.amazonaws.com
   */
  bucketDomainName: string;

  /**
   * The regional domain name for the bucket
   * Format: bucket-name.s3.region.amazonaws.com
   */
  bucketRegionalDomainName?: string;

  /**
   * The S3 hosted zone ID for the region where the bucket resides
   * Used for DNS configuration with Route 53
   */
  hostedZoneId?: string;

  /**
   * The AWS region where the bucket is located
   */
  region?: string;

  /**
   * The website endpoint URL if static website hosting is enabled
   * Format: http://bucket-name.s3-website-region.amazonaws.com
   */
  websiteEndpoint?: string;

  /**
   * The website domain if static website hosting is enabled
   * Format: bucket-name.s3-website-region.amazonaws.com
   */
  websiteDomain?: string;

  /**
   * Whether versioning is enabled for the bucket
   */
  versioningEnabled?: boolean;

  /**
   * The canned ACL applied to the bucket
   * Common values: private, public-read, public-read-write, authenticated-read
   */
  acl?: string;
}

/**
 * AWS S3 Bucket Resource
 *
 * Creates and manages Amazon S3 buckets with support for versioning, tags, and regional configuration.
 * S3 buckets provide scalable object storage for any type of data, with features like versioning,
 * lifecycle policies, and fine-grained access control.
 *
 * @example
 * // Create a basic S3 bucket with default settings
 * const basicBucket = await Bucket("my-app-storage", {
 *   bucketName: "my-app-storage",
 *   tags: {
 *     Environment: "production",
 *     Project: "my-app"
 *   }
 * });
 *
 * @example
 * // Create a bucket with versioning enabled and specific tags
 * const versionedBucket = await Bucket("document-archive", {
 *   bucketName: "document-archive",
 *   tags: {
 *     Environment: "production",
 *     Purpose: "document-storage",
 *     Versioning: "enabled"
 *   }
 * });
 *
 * @example
 * // Create a development bucket with minimal configuration
 * const devBucket = await Bucket("dev-testing", {
 *   bucketName: "dev-testing",
 *   tags: {
 *     Environment: "development",
 *     Temporary: "true"
 *   }
 * });
 */
export const Bucket = EffectResource<Bucket, BucketProps>(
  "s3::Bucket",
  function* (_id, props) {
    const client = yield* createAwsClient({ service: "s3" });

    if (this.phase === "delete") {
      yield* client
        .delete(`/${props.bucketName}`)
        .pipe(Effect.catchAll(() => Effect.unit));
      return yield* this.destroy();
    }

    // Helper function to create tagging XML
    const createTaggingXml = (tags: Record<string, string>) => {
      const tagSet = Object.entries(tags).map(([Key, Value]) => ({
        Key,
        Value,
      }));
      return `<Tagging><TagSet>${tagSet
        .map(
          ({ Key, Value }) =>
            `<Tag><Key>${Key}</Key><Value>${Value}</Value></Tag>`,
        )
        .join("")}</TagSet></Tagging>`;
    };

    // Try to check if bucket exists and update tags if needed
    const bucketExists = yield* client
      .request("HEAD", `/${props.bucketName}`)
      .pipe(
        Effect.map(() => true),
        Effect.catchTag("AwsNotFoundError", () => Effect.succeed(false)),
      );

    if (bucketExists) {
      // Update tags if they changed and bucket exists
      if (this.phase === "update" && props.tags) {
        const taggingXml = createTaggingXml(props.tags);
        yield* client.put(`/${props.bucketName}?tagging`, taggingXml, {
          "Content-Type": "application/xml",
        });
      }
    } else {
      // Create bucket if it doesn't exist
      yield* client.put(`/${props.bucketName}`);

      // Add tags after creation if specified
      if (props.tags) {
        const taggingXml = createTaggingXml(props.tags);
        yield* client.put(`/${props.bucketName}?tagging`, taggingXml, {
          "Content-Type": "application/xml",
        });
      }
    }

    // Get bucket details in parallel
    const [locationResponse, versioningResponse, aclResponse] =
      yield* Effect.all([
        client.get<S3LocationResponse>(`/${props.bucketName}?location`, {
          Host: `${props.bucketName}.s3.amazonaws.com`,
        }),
        client.get<S3VersioningResponse>(`/${props.bucketName}?versioning`),
        client.get<S3AclResponse>(`/${props.bucketName}?acl`),
      ]);

    const region = locationResponse?.LocationConstraint || "us-east-1";

    // Get tags if they weren't provided
    let tags = props.tags;
    if (!tags) {
      const taggingResponse = yield* client
        .get<S3TaggingResponse>(`/${props.bucketName}?tagging`)
        .pipe(
          Effect.catchTag("AwsNotFoundError", () => Effect.succeed(null)), // Tags don't exist - OK
        );

      if (taggingResponse) {
        // Parse XML response to extract tags
        const tagSet = taggingResponse.Tagging?.TagSet;
        if (Array.isArray(tagSet)) {
          tags = Object.fromEntries(
            tagSet.map(({ Key, Value }) => [Key, Value]) || [],
          );
        }
      }
    }

    return this({
      bucketName: props.bucketName,
      arn: `arn:aws:s3:::${props.bucketName}`,
      bucketDomainName: `${props.bucketName}.s3.amazonaws.com`,
      bucketRegionalDomainName: `${props.bucketName}.s3.${region}.amazonaws.com`,
      region,
      hostedZoneId: getHostedZoneId(region),
      versioningEnabled:
        versioningResponse?.VersioningConfiguration?.Status === "Enabled",
      acl: aclResponse?.AccessControlPolicy?.AccessControlList?.Grant?.[0]?.Permission?.toLowerCase(),
      ...(tags && { tags }),
    });
  },
);

/**
 * Helper function to get S3 hosted zone IDs by region
 *
 * Returns the S3 hosted zone ID for a given AWS region. These IDs are used when
 * configuring Route 53 DNS records that point to S3 buckets. If the region is not
 * found in the mapping, defaults to the us-east-1 hosted zone ID.
 *
 * @param region - The AWS region code (e.g., us-east-1, eu-west-1)
 * @returns The S3 hosted zone ID for the region
 */
function getHostedZoneId(region: string): string {
  const hostedZoneIds: Record<string, string> = {
    "us-east-1": "Z3AQBSTGFYJSTF",
    "us-east-2": "Z2O1EMRO9K5GLX",
    "us-west-1": "Z2F56UZL2M1ACD",
    "us-west-2": "Z3BJ6K6RIION7M",
    "af-south-1": "Z11KHD8FBVPUYU",
    "ap-east-1": "ZNB98KWMFR0R6",
    "ap-south-1": "Z11RGJOFQNVJUP",
    "ap-northeast-1": "Z2M4EHUR26P7ZW",
    "ap-northeast-2": "Z3W03O7B5YMIYP",
    "ap-northeast-3": "Z2YQB5RD63NC85",
    "ap-southeast-1": "Z3O0J2DXBE1FTB",
    "ap-southeast-2": "Z1WCIGYICN2BYD",
    "ca-central-1": "Z1QDHH18159H29",
    "eu-central-1": "Z21DNDUVLTQW6Q",
    "eu-west-1": "Z1BKCTXD74EZPE",
    "eu-west-2": "Z3GKZC51ZF0DB4",
    "eu-west-3": "Z3R1K369G5AVDG",
    "eu-north-1": "Z3BAZG2TWCNX0D",
    "eu-south-1": "Z30OZKI7KPW7MI",
    "me-south-1": "Z1MPMWCPA7YB62",
    "sa-east-1": "Z7KQH4QJS55SO",
  };
  return hostedZoneIds[region] || "Z3AQBSTGFYJSTF"; // Default to us-east-1 if region not found
}
