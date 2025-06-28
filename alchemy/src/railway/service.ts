import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";
import { logger } from "../util/logger.ts";
import { sleep } from "../util/sleep.ts";
import {
  RailwayApiError,
  createRailwayApi,
  fragments,
  isResourceNotFoundError,
  type RailwayApiOptions,
} from "./api.ts";
import type { Environment } from "./environment.ts";
import type { Project } from "./project.ts";

/**
 * Railway service source configuration
 */
export interface ServiceSource {
  /**
   * Git repository URL
   */
  repo?: string;

  /**
   * Git branch to deploy from
   * @default main
   */
  branch?: string;

  /**
   * Docker image to deploy
   */
  image?: string;

  /**
   * Build command to run
   */
  buildCommand?: string;

  /**
   * Start command to run the service
   */
  startCommand?: string;

  /**
   * Root directory of the service in the repository
   * @default /
   */
  rootDirectory?: string;
}

/**
 * Properties for creating or updating a Railway service
 */
export interface ServiceProps extends RailwayApiOptions {
  /**
   * Name of the service
   */
  name: string;

  /**
   * Project this service belongs to
   */
  project: string | Project;

  /**
   * Environment this service belongs to
   */
  environment: string | Environment;

  /**
   * Source configuration for the service
   */
  source?: ServiceSource;

  /**
   * Environment variables for the service
   */
  variables?: Record<string, string>;

  /**
   * Whether the service should be deployed immediately
   * @default true
   */
  autoDeploy?: boolean;

  /**
   * Memory limit in MB
   * @default 512
   */
  memoryMB?: number;

  /**
   * CPU cores allocation
   * @default 1
   */
  cpuCores?: number;
}

/**
 * A Railway service
 */
export interface Service extends Resource<"railway::service"> {
  /**
   * Service ID
   */
  serviceId: string;

  /**
   * Service name
   */
  name: string;

  /**
   * Project ID this service belongs to
   */
  projectId: string;

  /**
   * Environment ID this service belongs to
   */
  environmentId: string;

  /**
   * Service URL (if deployed)
   */
  url?: string;

  /**
   * Current deployment status
   */
  status:
    | "BUILDING"
    | "DEPLOYING"
    | "SUCCESS"
    | "FAILED"
    | "CRASHED"
    | "SLEEPING";

  /**
   * Source configuration
   */
  source?: ServiceSource;

  /**
   * Time at which the service was created
   */
  createdAt: string;

  /**
   * Time at which the service was updated
   */
  updatedAt: string;
}

/**
 * Railway service from API response
 */
interface RailwayServiceResponse {
  id: string;
  name: string;
  projectId: string;
  environmentId: string;
  url?: string;
  status: string;
  source?: {
    repo?: string;
    branch?: string;
    image?: string;
    buildCommand?: string;
    startCommand?: string;
    rootDirectory?: string;
  };
  createdAt: string;
  updatedAt: string;
}

/**
 * Create or update a Railway service
 *
 * @example
 * ## Git Repository Service
 *
 * Deploy a service from a Git repository.
 *
 * ```ts
 * const project = await Project("my-app", { name: "My App" });
 * const environment = await Environment("production", {
 *   name: "production",
 *   project: project
 * });
 *
 * const service = await Service("api", {
 *   name: "api",
 *   project: project,
 *   environment: environment,
 *   source: {
 *     repo: "https://github.com/user/app.git",
 *     branch: "main",
 *     buildCommand: "npm run build",
 *     startCommand: "npm start"
 *   }
 * });
 * ```
 *
 * @example
 * ## Docker Image Service
 *
 * Deploy a service from a Docker image.
 *
 * ```ts
 * const service = await Service("database", {
 *   name: "postgres",
 *   project: "project-id",
 *   environment: "environment-id",
 *   source: {
 *     image: "postgres:15",
 *     startCommand: "postgres"
 *   },
 *   variables: {
 *     POSTGRES_PASSWORD: "secret123",
 *     POSTGRES_DB: "myapp"
 *   }
 * });
 * ```
 */
export const Service = Resource(
  "railway::service",
  async function (
    this: Context<Service>,
    id: string,
    props: ServiceProps,
  ): Promise<Service> {
    const api = createRailwayApi(props);
    const projectId =
      typeof props.project === "string"
        ? props.project
        : props.project.projectId;
    const environmentId =
      typeof props.environment === "string"
        ? props.environment
        : props.environment.environmentId;

    // Handle delete phase
    if (this.phase === "delete") {
      if (this.output?.serviceId) {
        await deleteService(api, this.output.serviceId);
      }
      return this.destroy();
    }

    // Handle update phase
    if (this.phase === "update") {
      logger.log(`Updating existing Railway service: ${props.name}`);
      const service = await updateService(api, this.output.serviceId, props);

      // Trigger deployment if autoDeploy is enabled
      if (props.autoDeploy !== false) {
        await deployService(api, service.serviceId);
        return waitForDeployment(api, service.serviceId, service);
      }

      return service;
    }

    // Handle create phase
    if (this.phase === "create") {
      logger.log(`Creating new Railway service: ${props.name}`);
      const service = await createService(api, projectId, environmentId, props);

      // Trigger deployment if autoDeploy is enabled
      if (props.autoDeploy !== false) {
        await deployService(api, service.serviceId);
        return waitForDeployment(api, service.serviceId, service);
      }

      return service;
    }

    // Initial creation - check if service already exists
    const existingService = await findExistingService(
      api,
      projectId,
      environmentId,
      props.name,
    );

    if (existingService) {
      logger.log(`Found existing Railway service: ${props.name}`);
      const service = await updateService(api, existingService.id, props);

      // Trigger deployment if autoDeploy is enabled
      if (props.autoDeploy !== false) {
        await deployService(api, service.serviceId);
        return waitForDeployment(api, service.serviceId, service);
      }

      return service;
    } else {
      logger.log(`Creating new Railway service: ${props.name}`);
      const service = await createService(api, projectId, environmentId, props);

      // Trigger deployment if autoDeploy is enabled
      if (props.autoDeploy !== false) {
        await deployService(api, service.serviceId);
        return waitForDeployment(api, service.serviceId, service);
      }

      return service;
    }
  },
);

/**
 * Find an existing service by name within a project environment
 */
async function findExistingService(
  api: ReturnType<typeof createRailwayApi>,
  projectId: string,
  environmentId: string,
  name: string,
): Promise<RailwayServiceResponse | null> {
  try {
    const query = `
      ${fragments.service}
      
      query findService($projectId: String!, $environmentId: String!) {
        project(id: $projectId) {
          environment(id: $environmentId) {
            services {
              edges {
                node {
                  ...ServiceFields
                }
              }
            }
          }
        }
      }
    `;

    const response = await api.query<{
      project: {
        environment: {
          services: {
            edges: Array<{
              node: RailwayServiceResponse;
            }>;
          };
        };
      };
    }>(query, { projectId, environmentId });

    const service = response.project.environment.services.edges.find(
      (edge) => edge.node.name === name,
    );

    return service?.node || null;
  } catch (error) {
    if (error instanceof RailwayApiError) {
      logger.warn(`Failed to find existing service: ${error.message}`);
      return null;
    }
    throw error;
  }
}

/**
 * Create a new service
 */
async function createService(
  api: ReturnType<typeof createRailwayApi>,
  projectId: string,
  environmentId: string,
  props: ServiceProps,
): Promise<Service> {
  const mutation = `
    ${fragments.service}
    
    mutation createService($input: ServiceCreateInput!) {
      serviceCreate(input: $input) {
        ...ServiceFields
      }
    }
  `;

  const variables = {
    input: {
      name: props.name,
      projectId,
      environmentId,
      source: props.source,
      variables: props.variables,
      memoryMB: props.memoryMB ?? 512,
      cpuCores: props.cpuCores ?? 1,
    },
  };

  const response = await api.mutate<{
    serviceCreate: RailwayServiceResponse;
  }>(mutation, variables);

  return mapToService(response.serviceCreate);
}

/**
 * Update an existing service
 */
async function updateService(
  api: ReturnType<typeof createRailwayApi>,
  serviceId: string,
  props: ServiceProps,
): Promise<Service> {
  const mutation = `
    ${fragments.service}
    
    mutation updateService($id: String!, $input: ServiceUpdateInput!) {
      serviceUpdate(id: $id, input: $input) {
        ...ServiceFields
      }
    }
  `;

  const variables = {
    id: serviceId,
    input: {
      name: props.name,
      source: props.source,
      variables: props.variables,
      memoryMB: props.memoryMB ?? 512,
      cpuCores: props.cpuCores ?? 1,
    },
  };

  const response = await api.mutate<{
    serviceUpdate: RailwayServiceResponse;
  }>(mutation, variables);

  return mapToService(response.serviceUpdate);
}

/**
 * Deploy a service
 */
async function deployService(
  api: ReturnType<typeof createRailwayApi>,
  serviceId: string,
): Promise<void> {
  const mutation = `
    mutation deployService($serviceId: String!) {
      serviceDeploy(serviceId: $serviceId) {
        id
      }
    }
  `;

  await api.mutate(mutation, { serviceId });
  logger.log(`Triggered deployment for service: ${serviceId}`);
}

/**
 * Wait for deployment to complete
 */
async function waitForDeployment(
  api: ReturnType<typeof createRailwayApi>,
  serviceId: string,
  service: Service,
  maxAttempts = 60,
): Promise<Service> {
  logger.log(`Waiting for deployment to complete for service: ${serviceId}`);

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const currentService = await getServiceStatus(api, serviceId);

    if (currentService.status === "SUCCESS") {
      logger.log(`Service deployment completed successfully: ${serviceId}`);
      return { ...service, ...currentService };
    }

    if (
      currentService.status === "FAILED" ||
      currentService.status === "CRASHED"
    ) {
      throw new Error(
        `Service deployment failed with status: ${currentService.status}`,
      );
    }

    logger.log(
      `Service deployment in progress (${currentService.status}), waiting...`,
    );
    await sleep(5000); // Wait 5 seconds between checks
  }

  throw new Error(
    `Service deployment timed out after ${maxAttempts * 5} seconds`,
  );
}

/**
 * Get current service status
 */
async function getServiceStatus(
  api: ReturnType<typeof createRailwayApi>,
  serviceId: string,
): Promise<Pick<Service, "status" | "url">> {
  const query = `
    query getServiceStatus($serviceId: String!) {
      service(id: $serviceId) {
        status
        url
      }
    }
  `;

  const response = await api.query<{
    service: {
      status: string;
      url?: string;
    };
  }>(query, { serviceId });

  return {
    status: response.service.status as Service["status"],
    url: response.service.url,
  };
}

/**
 * Map Railway API response to Service resource
 */
function mapToService(service: RailwayServiceResponse): Service {
  return {
    serviceId: service.id,
    name: service.name,
    projectId: service.projectId,
    environmentId: service.environmentId,
    url: service.url,
    status: service.status as Service["status"],
    source: service.source,
    createdAt: service.createdAt,
    updatedAt: service.updatedAt,
  } as Service;
}

/**
 * Delete a Railway service
 */
export async function deleteService(
  api: ReturnType<typeof createRailwayApi>,
  serviceId: string,
): Promise<void> {
  const mutation = `
    mutation deleteService($id: String!) {
      serviceDelete(id: $id)
    }
  `;

  try {
    logger.log(`Attempting to delete Railway service: ${serviceId}`);
    const result = await api.mutate(mutation, { id: serviceId });
    logger.log("Delete mutation result:", result);
    logger.log(`Successfully deleted Railway service: ${serviceId}`);
  } catch (error) {
    // Check if it's a "not found" error - these are safe to ignore during deletion
    if (isResourceNotFoundError(error)) {
      logger.log(
        `Railway service ${serviceId} was already deleted or doesn't exist`,
      );
      return; // No-op for not found errors
    }

    // Re-throw all other errors
    logger.error(`Failed to delete Railway service ${serviceId}:`, error);
    throw error;
  }
}
