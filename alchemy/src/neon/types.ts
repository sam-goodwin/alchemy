/**
 * A Neon region where projects can be provisioned
 */
export type NeonRegion =
  | "aws-us-east-1"
  | "aws-us-east-2"
  | "aws-us-west-2"
  | "aws-eu-central-1"
  | "aws-eu-west-2"
  | "aws-ap-southeast-1"
  | "aws-ap-southeast-2"
  | "aws-sa-east-1"
  | "azure-eastus2"
  | "azure-westus3"
  | "azure-gwc";

/**
 * PostgreSQL version supported by Neon
 */
export type NeonPgVersion = 14 | 15 | 16 | 17;

/**
 * State of a branch during lifecycle operations
 */
export type BranchState = "init" | "ready";

/**
 * Type of compute endpoint
 */
export type EndpointType = "read_write" | "read_only";

/**
 * State of an endpoint during lifecycle operations
 */
export type EndpointState = "init" | "active" | "idle";

/**
 * Connection pooler mode
 */
export type PoolerMode = "transaction" | "session";

/**
 * Compute provisioner type
 */
export type ComputeProvisioner = "k8s-pod" | "k8s-neonvm";

/**
 * Operation status for async operations
 */
export type OperationStatus = "running" | "finished" | "failed" | "scheduling";

/**
 * Operation details for async Neon operations
 */
export interface NeonOperation {
  /**
   * Operation ID
   */
  id: string;

  /**
   * ID of the project this operation belongs to
   */
  projectId: string;

  /**
   * ID of the branch this operation affects, if applicable
   */
  branchId?: string;

  /**
   * ID of the endpoint this operation affects, if applicable
   */
  endpointId?: string;

  /**
   * Action being performed
   */
  action: string;

  /**
   * Current status of the operation
   */
  status: OperationStatus;

  /**
   * Error message if operation failed
   */
  error?: string;

  /**
   * Number of failures encountered
   */
  failuresCount: number;

  /**
   * Time at which the operation was created
   */
  createdAt: string;

  /**
   * Time at which the operation was last updated
   */
  updatedAt: string;
}