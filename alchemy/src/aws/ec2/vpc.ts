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
import { callEC2Api, createEC2Client } from "./utils.js";

/**
 * VPC timeout constants
 */
export const VPC_TIMEOUT: TimeoutConfig = {
  maxAttempts: 60,
  delayMs: 2000, // 2 seconds - VPCs are medium speed resources
};

/**
 * Comprehensive AWS VPC API Parameter Types
 */

// Common structures
interface TagSpecification {
  ResourceType: string;
  Tags: Array<{
    Key: string;
    Value: string;
  }>;
}

// VPC API Request Parameters
interface CreateVpcParams {
  CidrBlock: string;
  InstanceTenancy?: "default" | "dedicated" | "host";
  TagSpecifications?: TagSpecification[];
  AmazonProvidedIpv6CidrBlock?: boolean;
  Ipv6Pool?: string;
  Ipv6CidrBlock?: string;
  Ipv4IpamPoolId?: string;
  Ipv4NetmaskLength?: number;
  Ipv6IpamPoolId?: string;
  Ipv6NetmaskLength?: number;
  DryRun?: boolean;
}

interface ModifyVpcAttributeParams {
  VpcId: string;
  EnableDnsHostnames?: {
    Value: boolean;
  };
  EnableDnsSupport?: {
    Value: boolean;
  };
  EnableNetworkAddressUsageMetrics?: {
    Value: boolean;
  };
  DryRun?: boolean;
}

/**
 * Helper function to convert typed VPC parameters to AWS API format
 */
function convertVpcParamsToAwsFormat(
  params: CreateVpcParams,
): Record<string, string> {
  const awsParams: Record<string, string> = {
    CidrBlock: params.CidrBlock,
  };

  if (params.InstanceTenancy) {
    awsParams.InstanceTenancy = params.InstanceTenancy;
  }

  if (params.AmazonProvidedIpv6CidrBlock !== undefined) {
    awsParams.AmazonProvidedIpv6CidrBlock =
      params.AmazonProvidedIpv6CidrBlock.toString();
  }

  if (params.Ipv6Pool) {
    awsParams.Ipv6Pool = params.Ipv6Pool;
  }

  if (params.Ipv6CidrBlock) {
    awsParams.Ipv6CidrBlock = params.Ipv6CidrBlock;
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

function convertModifyVpcAttributeParamsToAwsFormat(
  params: ModifyVpcAttributeParams,
): Record<string, string> {
  const awsParams: Record<string, string> = {
    VpcId: params.VpcId,
  };

  if (params.EnableDnsHostnames) {
    awsParams["EnableDnsHostnames.Value"] =
      params.EnableDnsHostnames.Value.toString();
  }

  if (params.EnableDnsSupport) {
    awsParams["EnableDnsSupport.Value"] =
      params.EnableDnsSupport.Value.toString();
  }

  if (params.EnableNetworkAddressUsageMetrics) {
    awsParams["EnableNetworkAddressUsageMetrics.Value"] =
      params.EnableNetworkAddressUsageMetrics.Value.toString();
  }

  if (params.DryRun !== undefined) {
    awsParams.DryRun = params.DryRun.toString();
  }

  return awsParams;
}

/**
 * AWS VPC API response types
 */
interface AwsVpc {
  VpcId: string;
  State: "pending" | "available";
  CidrBlock: string;
  DhcpOptionsId: string;
  InstanceTenancy: "default" | "dedicated" | "host";
  IsDefault: boolean;
  Tags?: Array<{
    Key: string;
    Value: string;
  }>;
  CidrBlockAssociationSet?: Array<{
    AssociationId: string;
    CidrBlock: string;
    CidrBlockState: {
      State:
        | "associating"
        | "associated"
        | "disassociating"
        | "disassociated"
        | "failing"
        | "failed";
      StatusMessage?: string;
    };
  }>;
  Ipv6CidrBlockAssociationSet?: Array<{
    AssociationId: string;
    Ipv6CidrBlock: string;
    Ipv6CidrBlockState: {
      State:
        | "associating"
        | "associated"
        | "disassociating"
        | "disassociated"
        | "failing"
        | "failed";
      StatusMessage?: string;
    };
    NetworkBorderGroup?: string;
    Ipv6Pool?: string;
  }>;
  OwnerId?: string;
}

interface CreateVpcResponse {
  Vpc: AwsVpc;
}

interface DescribeVpcsResponse {
  Vpcs: AwsVpc[];
}

interface AwsSecurityGroup {
  GroupId: string;
  GroupName: string;
  VpcId: string;
}

interface DescribeSecurityGroupsResponse {
  SecurityGroups: AwsSecurityGroup[];
}

/**
 * Raw XML parsing interfaces for type safety
 */
interface RawVpcXmlItem {
  vpcId: string;
  state: string;
  cidrBlock: string;
  dhcpOptionsId: string;
  instanceTenancy: string;
  isDefault: string | boolean;
  tagSet?: {
    item?:
      | Array<{
          key: string;
          value: string;
        }>
      | {
          key: string;
          value: string;
        };
  };
  cidrBlockAssociationSet?: {
    item?:
      | Array<{
          associationId: string;
          cidrBlock: string;
          cidrBlockState: {
            state: string;
            statusMessage?: string;
          };
        }>
      | {
          associationId: string;
          cidrBlock: string;
          cidrBlockState: {
            state: string;
            statusMessage?: string;
          };
        };
  };
  ipv6CidrBlockAssociationSet?: {
    item?:
      | Array<{
          associationId: string;
          ipv6CidrBlock: string;
          ipv6CidrBlockState: {
            state: string;
            statusMessage?: string;
          };
          networkBorderGroup?: string;
          ipv6Pool?: string;
        }>
      | {
          associationId: string;
          ipv6CidrBlock: string;
          ipv6CidrBlockState: {
            state: string;
            statusMessage?: string;
          };
          networkBorderGroup?: string;
          ipv6Pool?: string;
        };
  };
  ownerId?: string;
}

interface RawSecurityGroupXmlItem {
  groupId: string;
  groupName: string;
  vpcId: string;
}

/**
 * Parse XML responses specifically for VPC operations
 */
function parseVpcXmlResponse<
  T extends
    | CreateVpcResponse
    | DescribeVpcsResponse
    | DescribeSecurityGroupsResponse
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

  // Parse CreateVpcResponse
  if (parsed.CreateVpcResponse) {
    const vpc = parsed.CreateVpcResponse.vpc as RawVpcXmlItem;
    if (vpc) {
      result.Vpc = {
        VpcId: vpc.vpcId,
        State: vpc.state as "pending" | "available",
        CidrBlock: vpc.cidrBlock,
        DhcpOptionsId: vpc.dhcpOptionsId,
        InstanceTenancy: vpc.instanceTenancy as
          | "default"
          | "dedicated"
          | "host",
        IsDefault: vpc.isDefault === "true" || vpc.isDefault === true,
        Tags: vpc.tagSet?.item
          ? Array.isArray(vpc.tagSet.item)
            ? vpc.tagSet.item.map((tag) => ({ Key: tag.key, Value: tag.value }))
            : [{ Key: vpc.tagSet.item.key, Value: vpc.tagSet.item.value }]
          : undefined,
        CidrBlockAssociationSet: vpc.cidrBlockAssociationSet?.item
          ? Array.isArray(vpc.cidrBlockAssociationSet.item)
            ? vpc.cidrBlockAssociationSet.item.map((assoc) => ({
                AssociationId: assoc.associationId,
                CidrBlock: assoc.cidrBlock,
                CidrBlockState: {
                  State: assoc.cidrBlockState.state as
                    | "associating"
                    | "associated"
                    | "disassociating"
                    | "disassociated"
                    | "failing"
                    | "failed",
                  StatusMessage: assoc.cidrBlockState.statusMessage,
                },
              }))
            : [
                {
                  AssociationId: vpc.cidrBlockAssociationSet.item.associationId,
                  CidrBlock: vpc.cidrBlockAssociationSet.item.cidrBlock,
                  CidrBlockState: {
                    State: vpc.cidrBlockAssociationSet.item.cidrBlockState
                      .state as
                      | "associating"
                      | "associated"
                      | "disassociating"
                      | "disassociated"
                      | "failing"
                      | "failed",
                    StatusMessage:
                      vpc.cidrBlockAssociationSet.item.cidrBlockState
                        .statusMessage,
                  },
                },
              ]
          : undefined,
        Ipv6CidrBlockAssociationSet: vpc.ipv6CidrBlockAssociationSet?.item
          ? Array.isArray(vpc.ipv6CidrBlockAssociationSet.item)
            ? vpc.ipv6CidrBlockAssociationSet.item.map((assoc) => ({
                AssociationId: assoc.associationId,
                Ipv6CidrBlock: assoc.ipv6CidrBlock,
                Ipv6CidrBlockState: {
                  State: assoc.ipv6CidrBlockState.state as
                    | "associating"
                    | "associated"
                    | "disassociating"
                    | "disassociated"
                    | "failing"
                    | "failed",
                  StatusMessage: assoc.ipv6CidrBlockState.statusMessage,
                },
                NetworkBorderGroup: assoc.networkBorderGroup,
                Ipv6Pool: assoc.ipv6Pool,
              }))
            : [
                {
                  AssociationId:
                    vpc.ipv6CidrBlockAssociationSet.item.associationId,
                  Ipv6CidrBlock:
                    vpc.ipv6CidrBlockAssociationSet.item.ipv6CidrBlock,
                  Ipv6CidrBlockState: {
                    State: vpc.ipv6CidrBlockAssociationSet.item
                      .ipv6CidrBlockState.state as
                      | "associating"
                      | "associated"
                      | "disassociating"
                      | "disassociated"
                      | "failing"
                      | "failed",
                    StatusMessage:
                      vpc.ipv6CidrBlockAssociationSet.item.ipv6CidrBlockState
                        .statusMessage,
                  },
                  NetworkBorderGroup:
                    vpc.ipv6CidrBlockAssociationSet.item.networkBorderGroup,
                  Ipv6Pool: vpc.ipv6CidrBlockAssociationSet.item.ipv6Pool,
                },
              ]
          : undefined,
        OwnerId: vpc.ownerId,
      };
    }
  }

  // Parse DescribeVpcsResponse
  if (parsed.DescribeVpcsResponse) {
    const vpcSet = parsed.DescribeVpcsResponse.vpcSet;
    if (vpcSet?.item) {
      const vpcs = Array.isArray(vpcSet.item) ? vpcSet.item : [vpcSet.item];
      result.Vpcs = vpcs.map((vpc: RawVpcXmlItem) => ({
        VpcId: vpc.vpcId,
        State: vpc.state as "pending" | "available",
        CidrBlock: vpc.cidrBlock,
        DhcpOptionsId: vpc.dhcpOptionsId,
        InstanceTenancy: vpc.instanceTenancy as
          | "default"
          | "dedicated"
          | "host",
        IsDefault: vpc.isDefault === "true" || vpc.isDefault === true,
        Tags: vpc.tagSet?.item
          ? Array.isArray(vpc.tagSet.item)
            ? vpc.tagSet.item.map((tag) => ({ Key: tag.key, Value: tag.value }))
            : [{ Key: vpc.tagSet.item.key, Value: vpc.tagSet.item.value }]
          : undefined,
        CidrBlockAssociationSet: vpc.cidrBlockAssociationSet?.item
          ? Array.isArray(vpc.cidrBlockAssociationSet.item)
            ? vpc.cidrBlockAssociationSet.item.map((assoc) => ({
                AssociationId: assoc.associationId,
                CidrBlock: assoc.cidrBlock,
                CidrBlockState: {
                  State: assoc.cidrBlockState.state as
                    | "associating"
                    | "associated"
                    | "disassociating"
                    | "disassociated"
                    | "failing"
                    | "failed",
                  StatusMessage: assoc.cidrBlockState.statusMessage,
                },
              }))
            : [
                {
                  AssociationId: vpc.cidrBlockAssociationSet.item.associationId,
                  CidrBlock: vpc.cidrBlockAssociationSet.item.cidrBlock,
                  CidrBlockState: {
                    State: vpc.cidrBlockAssociationSet.item.cidrBlockState
                      .state as
                      | "associating"
                      | "associated"
                      | "disassociating"
                      | "disassociated"
                      | "failing"
                      | "failed",
                    StatusMessage:
                      vpc.cidrBlockAssociationSet.item.cidrBlockState
                        .statusMessage,
                  },
                },
              ]
          : undefined,
        Ipv6CidrBlockAssociationSet: vpc.ipv6CidrBlockAssociationSet?.item
          ? Array.isArray(vpc.ipv6CidrBlockAssociationSet.item)
            ? vpc.ipv6CidrBlockAssociationSet.item.map((assoc) => ({
                AssociationId: assoc.associationId,
                Ipv6CidrBlock: assoc.ipv6CidrBlock,
                Ipv6CidrBlockState: {
                  State: assoc.ipv6CidrBlockState.state as
                    | "associating"
                    | "associated"
                    | "disassociating"
                    | "disassociated"
                    | "failing"
                    | "failed",
                  StatusMessage: assoc.ipv6CidrBlockState.statusMessage,
                },
                NetworkBorderGroup: assoc.networkBorderGroup,
                Ipv6Pool: assoc.ipv6Pool,
              }))
            : [
                {
                  AssociationId:
                    vpc.ipv6CidrBlockAssociationSet.item.associationId,
                  Ipv6CidrBlock:
                    vpc.ipv6CidrBlockAssociationSet.item.ipv6CidrBlock,
                  Ipv6CidrBlockState: {
                    State: vpc.ipv6CidrBlockAssociationSet.item
                      .ipv6CidrBlockState.state as
                      | "associating"
                      | "associated"
                      | "disassociating"
                      | "disassociated"
                      | "failing"
                      | "failed",
                    StatusMessage:
                      vpc.ipv6CidrBlockAssociationSet.item.ipv6CidrBlockState
                        .statusMessage,
                  },
                  NetworkBorderGroup:
                    vpc.ipv6CidrBlockAssociationSet.item.networkBorderGroup,
                  Ipv6Pool: vpc.ipv6CidrBlockAssociationSet.item.ipv6Pool,
                },
              ]
          : undefined,
        OwnerId: vpc.ownerId,
      }));
    } else {
      result.Vpcs = [];
    }
  }

  // Parse DescribeSecurityGroupsResponse
  if (parsed.DescribeSecurityGroupsResponse) {
    const securityGroupSet =
      parsed.DescribeSecurityGroupsResponse.securityGroupInfo;
    if (securityGroupSet?.item) {
      const securityGroups = Array.isArray(securityGroupSet.item)
        ? securityGroupSet.item
        : [securityGroupSet.item];
      result.SecurityGroups = securityGroups.map(
        (sg: RawSecurityGroupXmlItem) => ({
          GroupId: sg.groupId,
          GroupName: sg.groupName,
          VpcId: sg.vpcId,
        }),
      );
    } else {
      result.SecurityGroups = [];
    }
  }

  // Handle success responses
  if (parsed.ModifyVpcAttributeResponse || parsed.DeleteVpcResponse) {
    result.success = true;
  }

  return result as T;
}

/**
 * Wait for VPC to be in available state
 */
async function waitForVpcAvailable(
  client: AwsClient,
  vpcId: string,
  timeoutConfig: TimeoutConfig,
): Promise<void> {
  const checkFunction = async () => {
    const response = await callEC2Api<DescribeVpcsResponse>(
      client,
      "DescribeVpcs",
      parseVpcXmlResponse,
      {
        "VpcId.1": vpcId,
      },
    );
    return response.Vpcs?.[0];
  };

  const isReady = (vpc: AwsVpc | undefined) => {
    return vpc?.State === "available";
  };

  await waitForResourceState(
    checkFunction,
    isReady,
    timeoutConfig,
    vpcId,
    "VPC",
    "is now available",
  );
}

/**
 * Wait for VPC to be deleted
 */
async function waitForVpcDeleted(
  client: AwsClient,
  vpcId: string,
  timeoutConfig: TimeoutConfig,
): Promise<void> {
  const checkFunction = async () => {
    try {
      const response = await callEC2Api<DescribeVpcsResponse>(
        client,
        "DescribeVpcs",
        parseVpcXmlResponse,
        {
          "VpcId.1": vpcId,
        },
      );
      return response.Vpcs?.[0];
    } catch (error: any) {
      // If VPC is not found, it's been deleted - return undefined
      if (
        error.code === "InvalidVpcID.NotFound" ||
        error.code === "InvalidVpc.NotFound"
      ) {
        return undefined;
      }
      throw error;
    }
  };

  const isReady = (vpc: AwsVpc | undefined) => {
    // VPC is deleted if it doesn't exist
    return !vpc;
  };

  await waitForResourceState(
    checkFunction,
    isReady,
    timeoutConfig,
    vpcId,
    "VPC",
    "be deleted",
  );
}

/**
 * Properties for creating or updating a VPC
 */
export interface VpcProps {
  /**
   * The IPv4 network range for the VPC, in CIDR notation
   * @example "10.0.0.0/16"
   */
  cidrBlock: string;

  /**
   * Whether to enable DNS resolution for the VPC
   * @default true
   */
  enableDnsSupport?: boolean;

  /**
   * Whether to enable DNS hostnames for the VPC
   * @default true
   */
  enableDnsHostnames?: boolean;

  /**
   * The tenancy option for instances launched into the VPC
   * @default "default"
   */
  instanceTenancy?: "default" | "dedicated" | "host";

  /**
   * Additional IPv4 CIDR blocks to associate with the VPC
   * These will be associated after VPC creation
   */
  additionalCidrBlocks?: string[];

  /**
   * IPv6 CIDR block configuration
   */
  ipv6Config?: {
    /**
     * Whether to assign an Amazon-provided IPv6 CIDR block
     */
    amazonProvidedIpv6CidrBlock?: boolean;
    /**
     * The ID of an IPv6 address pool from which to allocate the IPv6 CIDR block
     */
    ipv6Pool?: string;
    /**
     * The netmask length of the IPv6 CIDR block
     * @default 56
     */
    ipv6CidrBlockNetworkBorderGroup?: string;
  };

  /**
   * Tags to apply to the VPC
   */
  tags?: Record<string, string>;

  /**
   * Timeout configuration for VPC operations
   * @default VPC-specific sensible defaults (60 attempts, 2000ms delay)
   */
  timeout?: Partial<TimeoutConfig>;
}

/**
 * Output returned after VPC creation/update
 */
export interface Vpc extends Resource<"aws::Vpc">, VpcProps {
  /**
   * The ID of the VPC
   */
  vpcId: string;

  /**
   * The current state of the VPC
   */
  state: "pending" | "available";

  /**
   * Whether the VPC is the default VPC
   */
  isDefault: boolean;

  /**
   * The ID of the set of DHCP options associated with the VPC
   */
  dhcpOptionsId: string;

  /**
   * Information about the IPv4 CIDR blocks associated with the VPC
   */
  cidrBlockAssociationSet?: Array<{
    associationId: string;
    cidrBlock: string;
    cidrBlockState: {
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

  /**
   * Information about the IPv6 CIDR blocks associated with the VPC
   */
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
    networkBorderGroup?: string;
    ipv6Pool?: string;
  }>;

  /**
   * The ID of the AWS account that owns the VPC
   */
  ownerId?: string;
}

/**
 * AWS VPC (Virtual Private Cloud) Resource
 *
 * Creates and manages Amazon VPC instances with configurable CIDR blocks,
 * DNS settings, and instance tenancy options.
 *
 * @example
 * // Create a basic VPC with default settings
 * const vpc = await Vpc("main-vpc", {
 *   cidrBlock: "10.0.0.0/16",
 *   tags: {
 *     Name: "main-vpc",
 *     Environment: "production"
 *   }
 * });
 *
 * @example
 * // Create a VPC with custom DNS settings
 * const vpc = await Vpc("custom-vpc", {
 *   cidrBlock: "172.16.0.0/16",
 *   enableDnsSupport: true,
 *   enableDnsHostnames: true,
 *   instanceTenancy: "default",
 *   tags: {
 *     Name: "custom-vpc"
 *   }
 * });
 *
 * @example
 * // Create a VPC with dedicated tenancy and custom timeout
 * const dedicatedVpc = await Vpc("dedicated-vpc", {
 *   cidrBlock: "192.168.0.0/16",
 *   instanceTenancy: "dedicated",
 *   enableDnsSupport: false,
 *   enableDnsHostnames: false,
 *   timeout: {
 *     maxAttempts: 90,
 *     delayMs: 3000
 *   },
 *   tags: {
 *     Name: "dedicated-vpc",
 *     Type: "isolated"
 *   }
 * });
 */
export const Vpc = Resource(
  "aws::Vpc",
  async function (
    this: Context<Vpc>,
    _id: string,
    props: VpcProps,
  ): Promise<Vpc> {
    const client = await createEC2Client();
    const timeoutConfig = mergeTimeoutConfig(VPC_TIMEOUT, props.timeout);

    if (this.phase === "delete") {
      if (this.output?.vpcId) {
        console.log(`🗑️ Deleting VPC: ${this.output.vpcId}`);

        // Simply delete the VPC - other resources should handle themselves
        await ignore("InvalidVpcID.NotFound", async () => {
          await callEC2Api(client, "DeleteVpc", parseVpcXmlResponse, {
            VpcId: this.output.vpcId,
          });
        });

        // Wait for VPC to be fully deleted
        await waitForVpcDeleted(client, this.output.vpcId, timeoutConfig);

        console.log(`  ✅ VPC ${this.output.vpcId} deletion completed`);
      }
      return this.destroy();
    }

    let vpc: AwsVpc;

    if (this.phase === "update" && this.output?.vpcId) {
      // Get existing VPC
      const response = await callEC2Api<DescribeVpcsResponse>(
        client,
        "DescribeVpcs",
        parseVpcXmlResponse,
        {
          "VpcId.1": this.output.vpcId,
        },
      );

      if (!response.Vpcs?.[0]) {
        throw new Error(`VPC ${this.output.vpcId} not found`);
      }

      vpc = response.Vpcs[0];

      // Update DNS attributes if they've changed
      if (props.enableDnsSupport !== undefined) {
        const modifyParams: ModifyVpcAttributeParams = {
          VpcId: vpc.VpcId,
          EnableDnsSupport: {
            Value: props.enableDnsSupport,
          },
        };
        await callEC2Api(
          client,
          "ModifyVpcAttribute",
          parseVpcXmlResponse,
          convertModifyVpcAttributeParamsToAwsFormat(modifyParams),
        );
      }

      if (props.enableDnsHostnames !== undefined) {
        const modifyParams: ModifyVpcAttributeParams = {
          VpcId: vpc.VpcId,
          EnableDnsHostnames: {
            Value: props.enableDnsHostnames,
          },
        };
        await callEC2Api(
          client,
          "ModifyVpcAttribute",
          parseVpcXmlResponse,
          convertModifyVpcAttributeParamsToAwsFormat(modifyParams),
        );
      }
    } else {
      // Create new VPC
      const createVpcParams: CreateVpcParams = {
        CidrBlock: props.cidrBlock,
        InstanceTenancy: props.instanceTenancy || "default",
      };

      // Add tags if specified
      if (props.tags) {
        createVpcParams.TagSpecifications = [
          {
            ResourceType: "vpc",
            Tags: Object.entries(props.tags).map(([key, value]) => ({
              Key: key,
              Value: value,
            })),
          },
        ];
      }

      const createParams = convertVpcParamsToAwsFormat(createVpcParams);

      const response = await callEC2Api<CreateVpcResponse>(
        client,
        "CreateVpc",
        parseVpcXmlResponse,
        createParams,
      );

      if (!response.Vpc) {
        throw new Error(
          `Failed to create VPC - Response: ${JSON.stringify(response)}`,
        );
      }

      vpc = response.Vpc;

      // Wait for VPC to be available
      await waitForVpcAvailable(client, vpc.VpcId!, timeoutConfig);

      // Set DNS attributes if specified
      if (props.enableDnsSupport !== undefined) {
        const modifyParams: ModifyVpcAttributeParams = {
          VpcId: vpc.VpcId,
          EnableDnsSupport: {
            Value: props.enableDnsSupport,
          },
        };
        await callEC2Api(
          client,
          "ModifyVpcAttribute",
          parseVpcXmlResponse,
          convertModifyVpcAttributeParamsToAwsFormat(modifyParams),
        );
      }

      if (props.enableDnsHostnames !== undefined) {
        const modifyParams: ModifyVpcAttributeParams = {
          VpcId: vpc.VpcId,
          EnableDnsHostnames: {
            Value: props.enableDnsHostnames,
          },
        };
        await callEC2Api(
          client,
          "ModifyVpcAttribute",
          parseVpcXmlResponse,
          convertModifyVpcAttributeParamsToAwsFormat(modifyParams),
        );
      }
    }

    return this({
      vpcId: vpc.VpcId!,
      state: vpc.State as "pending" | "available",
      isDefault: vpc.IsDefault || false,
      dhcpOptionsId: vpc.DhcpOptionsId!,
      ...props,
    });
  },
);
