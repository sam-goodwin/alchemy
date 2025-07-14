import type { AwsClient } from "aws4fetch";
import { XMLParser } from "fast-xml-parser";
import type { Context } from "../../context.ts";
import { Resource } from "../../resource.ts";
import { ignore } from "../../util/ignore.ts";
import {
  mergeTimeoutConfig,
  type TimeoutConfig,
  waitForResourceState,
} from "../../util/timeout.js";
import { retry } from "../retry.ts";
import { callEC2Api, createEC2Client } from "./utils.ts";
import type { Vpc } from "./vpc.ts";

/**
 * Parse XML responses specifically for Subnet operations
 */
function parseSubnetXmlResponse<
  T extends
    | CreateSubnetResponse
    | DescribeSubnetsResponse
    | { success: boolean },
>(xmlText: string): T {
  const parser = new XMLParser({
    ignoreAttributes: true,
    parseAttributeValue: true,
    parseTagValue: true,
    trimValues: true,
  });

  const parsed = parser.parse(xmlText);
  const result: Record<string, unknown> = {};

  // Parse CreateSubnetResponse
  if (parsed.CreateSubnetResponse) {
    const subnet = parsed.CreateSubnetResponse.subnet as SubnetXmlResult;
    if (subnet) {
      result.Subnet = {
        SubnetId: subnet.subnetId,
        VpcId: subnet.vpcId,
        State: subnet.state,
        CidrBlock: subnet.cidrBlock,
        AvailabilityZone: subnet.availabilityZone,
        AvailableIpAddressCount: subnet.availableIpAddressCount,
        DefaultForAz: subnet.defaultForAz,
        MapPublicIpOnLaunch: subnet.mapPublicIpOnLaunch,
      };
    }
  }

  // Parse DescribeSubnetsResponse
  if (parsed.DescribeSubnetsResponse) {
    const subnetSet = parsed.DescribeSubnetsResponse.subnetSet;
    if (subnetSet?.item) {
      const subnets = Array.isArray(subnetSet.item)
        ? subnetSet.item
        : [subnetSet.item];
      result.Subnets = subnets.map((subnet: SubnetXmlResult) => ({
        SubnetId: subnet.subnetId,
        VpcId: subnet.vpcId,
        State: subnet.state,
        CidrBlock: subnet.cidrBlock,
        AvailabilityZone: subnet.availabilityZone,
        AvailableIpAddressCount: subnet.availableIpAddressCount,
        DefaultForAz: subnet.defaultForAz,
        MapPublicIpOnLaunch: subnet.mapPublicIpOnLaunch,
      }));
    } else {
      result.Subnets = [];
    }
  }

  // Generic success responses
  const successResponses = [
    "ModifySubnetAttributeResponse",
    "DeleteSubnetResponse",
  ];

  for (const responseType of successResponses) {
    if (parsed[responseType]) {
      result.success = true;
      break;
    }
  }

  return result as T;
}

/**
 * Subnet timeout constants
 */
export const SUBNET_TIMEOUT: TimeoutConfig = {
  maxAttempts: 30,
  delayMs: 1000, // 1 second - Subnets are quick
};

/**
 * Comprehensive AWS Subnet API Parameter Types
 */

// Common structures
interface TagSpecification {
  ResourceType: string;
  Tags: Array<{
    Key: string;
    Value: string;
  }>;
}

// Subnet API Request Parameters
interface CreateSubnetParams {
  VpcId: string;
  CidrBlock?: string;
  Ipv6CidrBlock?: string;
  AvailabilityZone?: string;
  AvailabilityZoneId?: string;
  TagSpecifications?: TagSpecification[];
  OutpostArn?: string;
  CustomerOwnedIpv4Pool?: string;
  MapPublicIpOnLaunch?: boolean;
  MapCustomerOwnedIpOnLaunch?: boolean;
  Ipv4IpamPoolId?: string;
  Ipv4NetmaskLength?: number;
  Ipv6IpamPoolId?: string;
  Ipv6NetmaskLength?: number;
  DryRun?: boolean;
}

// Subnet XML Response Types
interface SubnetXmlTag {
  key: string;
  value: string;
}

interface SubnetXmlResult {
  subnetId: string;
  state: "pending" | "available" | "unavailable";
  vpcId: string;
  cidrBlock: string;
  ipv6CidrBlockAssociationSet?: Array<{
    associationId: string;
    ipv6CidrBlock: string;
    ipv6CidrBlockState: {
      state:
        | "associating"
        | "associated"
        | "disassociating"
        | "disassociated"
        | "failing"
        | "failed";
      statusMessage?: string;
    };
  }>;
  availableIpAddressCount: number;
  availabilityZone: string;
  availabilityZoneId?: string;
  defaultForAz: boolean;
  mapPublicIpOnLaunch: boolean;
  mapCustomerOwnedIpOnLaunch?: boolean;
  customerOwnedIpv4Pool?: string;
  tags?: SubnetXmlTag[];
  assignIpv6AddressOnCreation: boolean;
  privateDnsNameOptionsOnLaunch?: {
    hostnameType: "ip-name" | "resource-name";
    enableResourceNameDnsARecord: boolean;
    enableResourceNameDnsAAAARecord: boolean;
  };
  enableDns64?: boolean;
  ipv6Native?: boolean;
  outpostArn?: string;
  ownerId?: string;
}

/**
 * Helper functions to convert typed parameters to AWS API format
 */
function convertCreateSubnetParamsToAwsFormat(
  params: CreateSubnetParams,
): Record<string, string> {
  const awsParams: Record<string, string> = {
    VpcId: params.VpcId,
  };

  if (params.CidrBlock) {
    awsParams.CidrBlock = params.CidrBlock;
  }

  if (params.Ipv6CidrBlock) {
    awsParams.Ipv6CidrBlock = params.Ipv6CidrBlock;
  }

  if (params.AvailabilityZone) {
    awsParams.AvailabilityZone = params.AvailabilityZone;
  }

  if (params.AvailabilityZoneId) {
    awsParams.AvailabilityZoneId = params.AvailabilityZoneId;
  }

  if (params.OutpostArn) {
    awsParams.OutpostArn = params.OutpostArn;
  }

  if (params.CustomerOwnedIpv4Pool) {
    awsParams.CustomerOwnedIpv4Pool = params.CustomerOwnedIpv4Pool;
  }

  if (params.MapPublicIpOnLaunch !== undefined) {
    awsParams.MapPublicIpOnLaunch = params.MapPublicIpOnLaunch.toString();
  }

  if (params.MapCustomerOwnedIpOnLaunch !== undefined) {
    awsParams.MapCustomerOwnedIpOnLaunch =
      params.MapCustomerOwnedIpOnLaunch.toString();
  }

  if (params.Ipv4IpamPoolId) {
    awsParams.Ipv4IpamPoolId = params.Ipv4IpamPoolId;
  }

  if (params.Ipv4NetmaskLength !== undefined) {
    awsParams.Ipv4NetmaskLength = params.Ipv4NetmaskLength.toString();
  }

  if (params.Ipv6IpamPoolId) {
    awsParams.Ipv6IpamPoolId = params.Ipv6IpamPoolId;
  }

  if (params.Ipv6NetmaskLength !== undefined) {
    awsParams.Ipv6NetmaskLength = params.Ipv6NetmaskLength.toString();
  }

  if (params.DryRun !== undefined) {
    awsParams.DryRun = params.DryRun.toString();
  }

  // Handle TagSpecifications
  if (params.TagSpecifications) {
    params.TagSpecifications.forEach((tagSpec, specIndex) => {
      const specNum = specIndex + 1;
      awsParams[`TagSpecification.${specNum}.ResourceType`] =
        tagSpec.ResourceType;

      tagSpec.Tags.forEach((tag, tagIndex) => {
        const tagNum = tagIndex + 1;
        awsParams[`TagSpecification.${specNum}.Tag.${tagNum}.Key`] = tag.Key;
        awsParams[`TagSpecification.${specNum}.Tag.${tagNum}.Value`] =
          tag.Value;
      });
    });
  }

  return awsParams;
}

/**
 * AWS Subnet API response types
 */
interface AwsSubnet {
  SubnetId: string;
  VpcId: string;
  State: string;
  CidrBlock: string;
  AvailabilityZone: string;
  AvailableIpAddressCount: number;
  DefaultForAz: boolean;
  MapPublicIpOnLaunch: boolean;
  Tags?: Array<{ Key: string; Value: string }>;
}

interface CreateSubnetResponse {
  Subnet: AwsSubnet;
}

interface DescribeSubnetsResponse {
  Subnets: AwsSubnet[];
}

/**
 * Properties for creating or updating a Subnet
 */
export interface SubnetProps {
  /**
   * The VPC to create the subnet in
   */
  vpc: Vpc | string;

  /**
   * The CIDR block for the subnet
   */
  cidrBlock: string;

  /**
   * The availability zone for the subnet
   */
  availabilityZone: string;

  /**
   * Whether instances launched in this subnet should be assigned a public IP address
   * @default false
   */
  mapPublicIpOnLaunch?: boolean;

  /**
   * Tags to apply to the subnet
   */
  tags?: Record<string, string>;

  /**
   * Timeout configuration for subnet operations
   * @default Subnet-specific sensible defaults (30 attempts, 1000ms delay)
   */
  timeout?: Partial<TimeoutConfig>;
}

/**
 * Output returned after Subnet creation/update
 */
export interface Subnet extends Resource<"aws::Subnet">, SubnetProps {
  /**
   * The ID of the subnet
   */
  subnetId: string;

  /**
   * The ID of the VPC the subnet belongs to
   */
  vpcId: string;

  /**
   * The current state of the subnet
   */
  state: "pending" | "available";

  /**
   * The number of available IP addresses in the subnet
   */
  availableIpAddressCount: number;

  /**
   * Whether this is the default subnet for the availability zone
   */
  defaultForAz: boolean;
}

/**
 * Wait for subnet to be in available state
 */
async function waitForSubnetAvailable(
  client: AwsClient,
  subnetId: string,
  timeoutConfig: TimeoutConfig,
): Promise<void> {
  const checkFunction = async () => {
    const response = await callEC2Api<DescribeSubnetsResponse>(
      client,
      "DescribeSubnets",
      parseSubnetXmlResponse,
      {
        "SubnetId.1": subnetId,
      },
    );
    return response.Subnets?.[0];
  };

  const isReady = (subnet: AwsSubnet | undefined) => {
    return subnet?.State === "available";
  };

  await waitForResourceState(
    checkFunction,
    isReady,
    timeoutConfig,
    subnetId,
    "Subnet",
    "is now available",
  );
}

/**
 * Wait for Subnet to be deleted
 */
async function waitForSubnetDeleted(
  client: AwsClient,
  subnetId: string,
  timeoutConfig: TimeoutConfig,
): Promise<void> {
  const checkFunction = async () => {
    try {
      const response = await callEC2Api<DescribeSubnetsResponse>(
        client,
        "DescribeSubnets",
        parseSubnetXmlResponse,
        {
          "SubnetId.1": subnetId,
        },
      );
      return response.Subnets?.[0];
    } catch (error: any) {
      // If Subnet is not found, it's been deleted - return undefined
      if (
        error.code === "InvalidSubnetID.NotFound" ||
        error.code === "InvalidSubnet.NotFound"
      ) {
        return undefined;
      }
      throw error;
    }
  };

  const isReady = (subnet: AwsSubnet | undefined) => {
    // Subnet is deleted if it doesn't exist
    return !subnet;
  };

  await waitForResourceState(
    checkFunction,
    isReady,
    timeoutConfig,
    subnetId,
    "Subnet",
    "be deleted",
  );
}

/**
 * AWS Subnet Resource
 *
 * Creates and manages subnets within a VPC. Subnets are used to segment
 * your VPC into smaller networks for organizing resources.
 *
 * @example
 * // Create a public subnet for web servers
 * const publicSubnet = await Subnet("public-subnet", {
 * vpc: myVpc,
 * cidrBlock: "10.0.1.0/24",
 * availabilityZone: `${process.env.AWS_REGION}a` || "us-east-1a",
 * mapPublicIpOnLaunch: true,
 * tags: {
 * Name: "public-subnet",
 * Type: "public"
 * }
 * });
 *
 * @example
 * // Create a private subnet for databases
 * const privateSubnet = await Subnet("private-subnet", {
 * vpc: myVpc,
 * cidrBlock: "10.0.2.0/24",
 * availabilityZone: "us-west-2b",
 * mapPublicIpOnLaunch: false,
 * tags: {
 * Name: "private-subnet",
 * Type: "private"
 * }
 * });
 *
 * @example
 * // Create a subnet with custom timeout configuration
 * const customSubnet = await Subnet("custom-subnet", {
 * vpc: myVpc,
 * cidrBlock: "10.0.3.0/24",
 * availabilityZone: "us-west-2c",
 * timeout: {
 * maxAttempts: 50,
 * delayMs: 500
 * }
 * });
 */
export const Subnet = Resource(
  "aws::Subnet",
  async function (
    this: Context<Subnet>,
    _id: string,
    props: SubnetProps,
  ): Promise<Subnet> {
    const client = await createEC2Client();
    const vpcId = typeof props.vpc === "string" ? props.vpc : props.vpc.vpcId;

    // Validate timeout config early, but use default for deletion if invalid
    let timeoutConfig: TimeoutConfig;
    try {
      timeoutConfig = mergeTimeoutConfig(SUBNET_TIMEOUT, props.timeout);
    } catch (error) {
      if (this.phase === "delete") {
        // Use default timeout for deletion to avoid blocking cleanup
        timeoutConfig = SUBNET_TIMEOUT;
      } else {
        // Re-throw validation error during creation/update
        throw error;
      }
    }

    if (this.phase === "delete") {
      if (this.output?.subnetId) {
        console.log(`🗑️ Deleting Subnet: ${this.output.subnetId}`);
        await retry(async () => {
          await ignore("InvalidSubnetID.NotFound", async () => {
            await callEC2Api(client, "DeleteSubnet", parseSubnetXmlResponse, {
              SubnetId: this.output!.subnetId,
            });
          });
        });

        // Wait for Subnet to be fully deleted to avoid dependency violations
        console.log(
          `  Waiting for Subnet ${this.output.subnetId} to be fully deleted...`,
        );
        await waitForSubnetDeleted(client, this.output.subnetId, timeoutConfig);
        console.log(`  ✅ Subnet ${this.output.subnetId} deletion completed`);
      }
      return this.destroy();
    }

    let subnet: AwsSubnet;

    if (this.phase === "update" && this.output?.subnetId) {
      // Get existing subnet
      const response = await callEC2Api<DescribeSubnetsResponse>(
        client,
        "DescribeSubnets",
        parseSubnetXmlResponse,
        {
          "SubnetId.1": this.output.subnetId,
        },
      );

      if (!response.Subnets?.[0]) {
        throw new Error(`Subnet ${this.output.subnetId} not found`);
      }

      subnet = response.Subnets[0];

      // Update public IP assignment if it has changed
      if (props.mapPublicIpOnLaunch !== undefined) {
        await callEC2Api(
          client,
          "ModifySubnetAttribute",
          parseSubnetXmlResponse,
          {
            SubnetId: subnet.SubnetId,
            "MapPublicIpOnLaunch.Value": props.mapPublicIpOnLaunch.toString(),
          },
        );
      }

      // Update tags if provided
      if (props.tags) {
        const tagParams: Record<string, string> = {};
        Object.entries(props.tags).forEach(([key, value], index) => {
          tagParams[`Tag.${index + 1}.Key`] = key;
          tagParams[`Tag.${index + 1}.Value`] = value;
        });

        await callEC2Api(client, "CreateTags", parseSubnetXmlResponse, {
          "ResourceId.1": subnet.SubnetId,
          ...tagParams,
        });
      }
    } else {
      // Create new subnet
      const createSubnetParams: CreateSubnetParams = {
        VpcId: vpcId,
        CidrBlock: props.cidrBlock,
        AvailabilityZone: props.availabilityZone,
      };

      // Add tags if specified
      if (props.tags) {
        createSubnetParams.TagSpecifications = [
          {
            ResourceType: "subnet",
            Tags: Object.entries(props.tags).map(([key, value]) => ({
              Key: key,
              Value: value,
            })),
          },
        ];
      }

      const createParams =
        convertCreateSubnetParamsToAwsFormat(createSubnetParams);

      const response = await callEC2Api<CreateSubnetResponse>(
        client,
        "CreateSubnet",
        parseSubnetXmlResponse,
        createParams,
      );

      if (!response.Subnet) {
        throw new Error("Failed to create subnet");
      }

      subnet = response.Subnet;

      // Set public IP assignment if specified
      if (props.mapPublicIpOnLaunch !== undefined) {
        await callEC2Api(
          client,
          "ModifySubnetAttribute",
          parseSubnetXmlResponse,
          {
            SubnetId: subnet.SubnetId,
            "MapPublicIpOnLaunch.Value": props.mapPublicIpOnLaunch.toString(),
          },
        );
      }

      // Wait for subnet to be available
      await waitForSubnetAvailable(client, subnet.SubnetId, timeoutConfig);
    }

    return this({
      subnetId: subnet.SubnetId,
      vpcId: subnet.VpcId,
      state: subnet.State as "pending" | "available",
      availableIpAddressCount: subnet.AvailableIpAddressCount,
      defaultForAz: subnet.DefaultForAz,
      ...props,
      vpc: vpcId,
    });
  },
);
