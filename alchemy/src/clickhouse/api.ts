import { alchemy } from "../alchemy.ts";
import type { Secret } from "../secret.ts";

const ROOT_URL = "https://api.clickhouse.cloud/v1";

export type ClickhouseApiOptions = {
  keyId?: string | Secret<string>;
  secret?: string | Secret<string>;
};

export type CloudProvider = "aws" | "gcp" | "azure";
export type Region =
  | "ap-south-1"
  | "ap-southeast-1"
  | "eu-central-1"
  | "eu-west-1"
  | "eu-west-2"
  | "us-east-1"
  | "us-east-2"
  | "us-west-2"
  | "ap-southeast-2"
  | "ap-northeast-1"
  | "me-central-1"
  | "us-east1"
  | "us-central1"
  | "europe-west4"
  | "asia-southeast1"
  | "eastus"
  | "eastus2"
  | "westus3"
  | "germanywestcentral";
export type InfraState =
  | "infra-ready"
  | "infra-provisioning"
  | "infra-terminated";
export type ServiceState =
  | "starting"
  | "stopping"
  | "terminating"
  | "awaking"
  | "partially_running"
  | "provisioning"
  | "running"
  | "stopped"
  | "terminated"
  | "degraded"
  | "failed"
  | "idle";
export type BYOCInfrastructure = {
  id: string;
  state: InfraState;
  accountName: string;
  regionId: Region;
  cloudProvider: CloudProvider;
};
export type PrivateEndpoint = {
  id: string;
  description: string;
  cloudProvider: CloudProvider;
  region: Region;
};
export type Organization = {
  id: string;
  createdAt: string;
  name: string;
  privateEndpoints: Array<PrivateEndpoint>;
  byoConfig: Array<BYOCInfrastructure>;
};
export type IpAccess = {
  source: string;
  description: string;
};
export type MysqlServiceEndpoint = {
  protocol: "mysql";
  host: string;
  port: number;
  username: string;
};
export type HttpsServiceEndpoint = {
  protocol: "https";
  host: string;
  port: number;
};
export type NativesecureServiceEndpoint = {
  protocol: "nativesecure";
  host: string;
  port: number;
};
export type ServiceReplicaSize = 8 | 12 | 16 | 32 | 64 | 120 | 236 | 356;
export type Service = {
  id: string;
  name: string;
  provider: CloudProvider;
  region: Region;
  state: ServiceState;
  clickhouseVersion: string;
  endpoints: Array<
    MysqlServiceEndpoint | HttpsServiceEndpoint | NativesecureServiceEndpoint
  >;
  minReplicaMemoryGb: ServiceReplicaSize;
  maxReplicaMemoryGb: ServiceReplicaSize;
  numReplicas: number;
  idleScaling: boolean;
  idleTimeoutMinutes: number;
  ipAccessList: Array<IpAccess>;
  createdAt: string;
  encryptionKey: string;
  encryptionAssumedRoleIdentifier: string;
  iamRole: string;
  privateEndpointIds: Array<string>;
  availablePrivateEndpointIds: Array<string>;
  dataWarehouseId: string;
  isPrimary: boolean;
  isReadonly: boolean;
  releaseChannel: "slow" | "default" | "fast";
  byocId: string;
  hasTransparentDataEncryption: boolean;
  profile?:
    | "v1-default"
    | "v1-highmem-xs"
    | "v1-highmem-s"
    | "v1-highmem-m"
    | "v1-highmem-l"
    | "v1-highmem-xl"
    | "v1-highcpu-s"
    | "v1-highcpu-m"
    | "v1-highcpu-l"
    | "v1-highcpu-xl";
  transparentDataEncryptionKeyId: string;
  encryptionRoleId: string;
  complianceType?: "hipaa" | "pci";
};
export type ServiceBackup = {
  id: string;
  status: "done" | "error" | "in_progress";
  serviceId: string;
  startedAt: string;
  finishedAt: string;
  sizeInBytes: number;
  durationInSeconds: number;
  type: "full" | "incremental";
  backupName: string;
  bucket:
    | {
        bucketProvider: "AWS";
        bucketPath: string;
        iamRoleArn: string;
        iamRoleSessionName: string;
      }
    | {
        bucketProvider: "GCP";
        bucketPath: string;
        accessKeyId: string;
      }
    | {
        bucketProvider: "AZURE";
        containerName: string;
      };
};
export type ApiKey = {
  id: string;
  name: string;
  state: "enabled" | "disabled";
  roles: Array<"admin" | "developer" | "query_endpoints">;
  keySuffix: string;
  createdAt: string;
  expireAt: string;
  usedAt: string;
  ipAccessList: Array<IpAccess>;
};

async function errorHandler<T>(res: Response) {
  if (res.status !== 200) {
    const errorMessage = await res.json<{ error: string }>();
    throw new Error(`Clickhouse API error: ${errorMessage.error}`);
  }
  const response = await res.json<{ result: T }>();
  return response.result;
}

export function createClickhouseApi(options?: ClickhouseApiOptions) {
  const keyId = options?.keyId ?? alchemy.env.CLICKHOUSE_KEY_ID;
  const secret = options?.secret ?? alchemy.env.CLICKHOUSE_KEY_SECRET;
  const credentials = `Basic ${btoa(`${keyId}:${secret}`)}`;

  return {
    v1: {
      organizations: Object.assign(
        (organizationId: string) => ({
          get: getOrganization(credentials, organizationId),
          patch: patchOrganization(credentials, organizationId),
          byocInfrastructure: Object.assign(
            (byocInfrastructureId: string) => ({
              delete: deleteBYOCInfrastructure(
                credentials,
                organizationId,
                byocInfrastructureId,
              ),
            }),
            {
              post: postBYOCInfrastructure(credentials, organizationId),
            },
          ),
          services: Object.assign(
            (serviceId: string) => ({
              get: getService(credentials, organizationId, serviceId),
              patch: patchService(credentials, organizationId, serviceId),
              delete: deleteService(credentials, organizationId, serviceId),
              privateEndpointConfig: {
                get: getPrivateEndpointConfig(
                  credentials,
                  organizationId,
                  serviceId,
                ),
              },
              serviceQueryEndpoint: {
                get: getServiceQueryEndpoint(
                  credentials,
                  organizationId,
                  serviceId,
                ),
                delete: deleteServiceQueryEndpoint(
                  credentials,
                  organizationId,
                  serviceId,
                ),
                post: postServiceQueryEndpoint(
                  credentials,
                  organizationId,
                  serviceId,
                ),
              },
              state: {
                patch: patchServiceState(
                  credentials,
                  organizationId,
                  serviceId,
                ),
              },
              replicaScaling: {
                patch: patchServiceReplicaScaling(
                  credentials,
                  organizationId,
                  serviceId,
                ),
              },
              password: {
                patch: patchServicePassword(
                  credentials,
                  organizationId,
                  serviceId,
                ),
              },
              privateEndpoint: {
                post: postPrivateEndpoint(
                  credentials,
                  organizationId,
                  serviceId,
                ),
              },
              backups: Object.assign(
                (backupId: string) => ({
                  get: getServiceBackupDetails(
                    credentials,
                    organizationId,
                    serviceId,
                    backupId,
                  ),
                }),
                {
                  get: getListOfServicesBackups(
                    credentials,
                    organizationId,
                    serviceId,
                  ),
                },
              ),
              backupConfiguration: {
                get: getServiceBackupConfiguration(
                  credentials,
                  organizationId,
                  serviceId,
                ),
                patch: patchServiceBackupConfiguration(
                  credentials,
                  organizationId,
                  serviceId,
                ),
              },
            }),
            {
              get: getListOfServices(credentials, organizationId),
              post: postService(credentials, organizationId),
            },
          ),
          keys: Object.assign(
            (keyId: string) => ({
              get: getKey(credentials, organizationId, keyId),
              patch: patchKey(credentials, organizationId, keyId),
              delete: deleteKey(credentials, organizationId, keyId),
            }),
            {
              get: getListOfKeys(credentials, organizationId),
              post: createKey(credentials, organizationId),
            },
          ),
        }),
        {
          get: getListOfOrganizations(credentials),
        },
      ),
    },
  };
}

function getListOfOrganizations(credentials: string) {
  return async () => {
    const response = await fetch(`${ROOT_URL}/organizations`, {
      headers: {
        Authorization: credentials,
      },
    });
    return errorHandler<Array<Organization>>(response);
  };
}

function getOrganization(credentials: string, organizationId: string) {
  return async () => {
    const response = await fetch(
      `${ROOT_URL}/organizations/${organizationId}`,
      {
        headers: {
          Authorization: credentials,
          "Content-Type": "application/json",
        },
      },
    );
    return errorHandler<Organization>(response);
  };
}

function patchOrganization(credentials: string, organizationId: string) {
  return async (options: { name?: string }) => {
    const response = await fetch(
      `${ROOT_URL}/organizations/${organizationId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: credentials,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
      },
    );
    return errorHandler<Organization>(response);
  };
}

function postBYOCInfrastructure(credentials: string, organizationId: string) {
  return async (options: {
    regionId?: Region;
    accountId?: string;
    availabilityZoneSuffixes?: Array<"a" | "b" | "c" | "d" | "e" | "f">;
    vpcCidrRange?: string;
  }) => {
    const response = await fetch(
      `${ROOT_URL}/organizations/${organizationId}/byocInfrastructure`,
      {
        method: "{PST}",
        headers: {
          Authorization: credentials,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
      },
    );
    return errorHandler<BYOCInfrastructure>(response);
  };
}

function deleteBYOCInfrastructure(
  credentials: string,
  organizationId: string,
  byocInfrastructureId: string,
) {
  return async () => {
    const response = await fetch(
      `${ROOT_URL}/organizations/${organizationId}/byocInfrastructure/${byocInfrastructureId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: credentials,
          "Content-Type": "application/json",
        },
      },
    );
    return errorHandler<never>(response);
  };
}

function getListOfServices(credentials: string, organizationId: string) {
  return async (filter: {
    environment?: string;
    department?: string;
    isActive?: boolean;
  }) => {
    const filters = [];
    if (filter.environment) {
      filters.push(`filter=tag:Environment=${filter.environment}`);
    }
    if (filter.department) {
      filters.push(`filter=tag:Department=${filter.department}`);
    }
    if (filter.isActive) {
      filters.push("filter=tag:isActive");
    }
    const response = await fetch(
      `${ROOT_URL}/organizations/${organizationId}/services?${filters.join("&")}`,
      {
        headers: {
          Authorization: credentials,
          "Content-Type": "application/json",
        },
      },
    );
    return errorHandler<Array<Service>>(response);
  };
}

function postService(credentials: string, organizationId: string) {
  return async (options: {
    name: Service["name"];
    provider: Service["provider"];
    region: Service["region"];
    ipAccessList: Service["ipAccessList"];
    minReplicaMemoryGb: Service["minReplicaMemoryGb"];
    maxReplicaMemoryGb: Service["maxReplicaMemoryGb"];
    numReplicas: Service["numReplicas"];
    idleScaling: Service["idleScaling"];
    idleTimeoutMinutes?: Service["idleTimeoutMinutes"];
    isReadonly: Service["isReadonly"];
    dataWarehouseId?: Service["dataWarehouseId"];
    backupId?: string;
    encryptionKey?: Service["encryptionKey"];
    encryptionAssumedRoleIdentifier?: Service["encryptionAssumedRoleIdentifier"];
    privatePreviewTermsChecked: boolean;
    releaseChannel: Service["releaseChannel"];
    byocId?: Service["byocId"];
    hasTransparentDataEncryption: Service["hasTransparentDataEncryption"];
    endpoints: Array<{
      protocol: "mysql";
      enabled: boolean;
    }>;
    profile?: Service["profile"];
    complianceType?: Service["complianceType"];
  }) => {
    const response = await fetch(
      `${ROOT_URL}/organizations/${organizationId}/services`,
      {
        method: "POST",
        headers: {
          Authorization: credentials,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
      },
    );
    return errorHandler<{
      service: Service;
      password: string;
    }>(response);
  };
}

function getService(
  credentials: string,
  organizationId: string,
  serviceId: string,
) {
  return async () => {
    const response = await fetch(
      `${ROOT_URL}/organizations/${organizationId}/services/${serviceId}`,
      {
        headers: {
          Authorization: credentials,
          "Content-Type": "application/json",
        },
      },
    );
    return errorHandler<Service>(response);
  };
}

function patchService(
  credentials: string,
  organizationId: string,
  serviceId: string,
) {
  return async (options: {
    name?: Service["name"];
    ipAccessList?: Service["ipAccessList"];
    privateEndpointIds?: Service["privateEndpointIds"];
    releaseChannel?: Service["releaseChannel"];
    endpoints?: Array<{
      protocol: "mysql";
      enabled: boolean;
    }>;
    transparentDataEncryptionKeyId?: string;
  }) => {
    const response = await fetch(
      `${ROOT_URL}/organizations/${organizationId}/services/${serviceId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: credentials,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
      },
    );
    return errorHandler<Service>(response);
  };
}

function deleteService(
  credentials: string,
  organizationId: string,
  serviceId: string,
) {
  return async () => {
    const response = await fetch(
      `${ROOT_URL}/organizations/${organizationId}/services/${serviceId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: credentials,
          "Content-Type": "application/json",
        },
      },
    );
    return errorHandler<never>(response);
  };
}

function getPrivateEndpointConfig(
  credentials: string,
  organizationId: string,
  serviceId: string,
) {
  return async () => {
    const response = await fetch(
      `${ROOT_URL}/organizations/${organizationId}/services/${serviceId}/privateEndpointConfig`,
      {
        headers: {
          Authorization: credentials,
          "Content-Type": "application/json",
        },
      },
    );
    return errorHandler<{
      endpointServiceId: string;
      privateDnsHostname: string;
    }>(response);
  };
}

function getServiceQueryEndpoint(
  credentials: string,
  organizationId: string,
  serviceId: string,
) {
  return async () => {
    const response = await fetch(
      `${ROOT_URL}/organizations/${organizationId}/services/${serviceId}/serviceQueryEndpoint`,
      {
        headers: {
          Authorization: credentials,
          "Content-Type": "application/json",
        },
      },
    );
    return errorHandler<{
      id: string;
      openApiKeys: Array<string>;
      roles: Array<"sql_console_read_only" | "sql_console_admin">;
      allowedOrigins: string;
    }>(response);
  };
}

function deleteServiceQueryEndpoint(
  credentials: string,
  organizationId: string,
  serviceId: string,
) {
  return async () => {
    const response = await fetch(
      `${ROOT_URL}/organizations/${organizationId}/services/${serviceId}/serviceQueryEndpoint`,
      {
        method: "DELETE",
        headers: {
          Authorization: credentials,
          "Content-Type": "application/json",
        },
      },
    );
    return errorHandler<never>(response);
  };
}

function postServiceQueryEndpoint(
  credentials: string,
  organizationId: string,
  serviceId: string,
) {
  return async (options: {
    roles: Array<"sql_console_read_only" | "sql_console_admin">;
    openApiKeys: Array<string>;
    allowedOrigins: string;
  }) => {
    const response = await fetch(
      `${ROOT_URL}/organizations/${organizationId}/services/${serviceId}/serviceQueryEndpoint`,
      {
        method: "POST",
        headers: {
          Authorization: credentials,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
      },
    );
    return errorHandler<{
      id: string;
      openApiKeys: Array<string>;
      roles: Array<"sql_console_read_only" | "sql_console_admin">;
      allowedOrigins: string;
    }>(response);
  };
}

function patchServiceState(
  credentials: string,
  organizationId: string,
  serviceId: string,
) {
  return async (options: { command: "start" | "stop" }) => {
    const response = await fetch(
      `${ROOT_URL}/organizations/${organizationId}/services/${serviceId}/state`,
      {
        method: "PATCH",
        headers: {
          Authorization: credentials,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
      },
    );
    return errorHandler<Service>(response);
  };
}

function patchServiceReplicaScaling(
  credentials: string,
  organizationId: string,
  serviceId: string,
) {
  return async (options: {
    minReplicaMemoryGb?: Service["minReplicaMemoryGb"];
    maxReplicaMemoryGb?: Service["maxReplicaMemoryGb"];
    numReplicas?: Service["numReplicas"];
    idleScaling?: Service["idleScaling"];
    idleTimeoutMinutes?: Service["idleTimeoutMinutes"];
  }) => {
    const response = await fetch(
      `${ROOT_URL}/organizations/${organizationId}/services/${serviceId}/replicaScaling`,
      {
        method: "PATCH",
        headers: {
          Authorization: credentials,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
      },
    );
    return errorHandler<Service>(response);
  };
}

function patchServicePassword(
  credentials: string,
  organizationId: string,
  serviceId: string,
) {
  return async (options: {
    newPasswordHash?: string;
    newDoubleSha1Hash?: string;
  }) => {
    const response = await fetch(
      `${ROOT_URL}/organizations/${organizationId}/services/${serviceId}/password`,
      {
        method: "PATCH",
        headers: {
          Authorization: credentials,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
      },
    );
    return errorHandler<{
      password: string;
    }>(response);
  };
}

function postPrivateEndpoint(
  credentials: string,
  organizationId: string,
  serviceId: string,
) {
  return async (options: { id: string; description: string }) => {
    const response = await fetch(
      `${ROOT_URL}/organizations/${organizationId}/services/${serviceId}/privateEndpoint`,
      {
        method: "POST",
        headers: {
          Authorization: credentials,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
      },
    );
    return errorHandler<PrivateEndpoint>(response);
  };
}

function getListOfServicesBackups(
  credentials: string,
  organizationId: string,
  serviceId: string,
) {
  return async () => {
    const response = await fetch(
      `${ROOT_URL}/organizations/${organizationId}/services/${serviceId}/backups`,
      {
        headers: {
          Authorization: credentials,
          "Content-Type": "application/json",
        },
      },
    );
    return errorHandler<Array<ServiceBackup>>(response);
  };
}

function getServiceBackupDetails(
  credentials: string,
  organizationId: string,
  serviceId: string,
  backupId: string,
) {
  return async () => {
    const response = await fetch(
      `${ROOT_URL}/organizations/${organizationId}/services/${serviceId}/backups/${backupId}`,
      {
        headers: {
          Authorization: credentials,
          "Content-Type": "application/json",
        },
      },
    );
    return errorHandler<ServiceBackup>(response);
  };
}

function getServiceBackupConfiguration(
  credentials: string,
  organizationId: string,
  serviceId: string,
) {
  return async () => {
    const response = await fetch(
      `${ROOT_URL}/organizations/${organizationId}/services/${serviceId}/backupConfiguration`,
      {
        headers: {
          Authorization: credentials,
          "Content-Type": "application/json",
        },
      },
    );
    return errorHandler<{
      backupPeriodInHours: number;
      backupRetentionPeriodInHours: number;
      backupStartTime: string;
    }>(response);
  };
}

function patchServiceBackupConfiguration(
  credentials: string,
  organizationId: string,
  serviceId: string,
) {
  return async (options: {
    backupPeriodInHours: number;
    backupRetentionPeriodInHours: number;
    backupStartTime: string;
  }) => {
    const response = await fetch(
      `${ROOT_URL}/organizations/${organizationId}/services/${serviceId}/backupConfiguration`,
      {
        method: "PATCH",
        headers: {
          Authorization: credentials,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
      },
    );
    return errorHandler<{
      backupPeriodInHours: number;
      backupRetentionPeriodInHours: number;
      backupStartTime: string;
    }>(response);
  };
}

function getListOfKeys(credentials: string, organizationId: string) {
  return async () => {
    const response = await fetch(
      `${ROOT_URL}/organizations/${organizationId}/keys`,
      {
        headers: {
          Authorization: credentials,
          "Content-Type": "application/json",
        },
      },
    );
    return (await response.json()) as Array<ApiKey>;
  };
}

function createKey(credentials: string, organizationId: string) {
  return async (options: {
    name: ApiKey["name"];
    expireAt: ApiKey["expireAt"];
    state: ApiKey["state"];
    hashData?: {
      keyIdHash: string;
      keyIdSuffix: string;
      keySecretHash: string;
    };
    roles: Array<"admin" | "developer" | "query_endpoints">;
    ipAccessList: ApiKey["ipAccessList"];
  }) => {
    const response = await fetch(
      `${ROOT_URL}/organizations/${organizationId}/keys`,
      {
        method: "POST",
        headers: {
          Authorization: credentials,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
      },
    );
    return errorHandler<{
      key: ApiKey;
      keyId: string;
      keySecret: string;
    }>(response);
  };
}

function getKey(credentials: string, organizationId: string, keyId: string) {
  return async () => {
    const response = await fetch(
      `${ROOT_URL}/organizations/${organizationId}/keys/${keyId}`,
      {
        headers: {
          Authorization: credentials,
          "Content-Type": "application/json",
        },
      },
    );
    return errorHandler<ApiKey>(response);
  };
}

function patchKey(credentials: string, organizationId: string, keyId: string) {
  return async (options: {
    name?: ApiKey["name"];
    roles?: ApiKey["roles"];
    expireAt?: ApiKey["expireAt"];
    state?: ApiKey["state"];
    ipAccessList?: ApiKey["ipAccessList"];
  }) => {
    const response = await fetch(
      `${ROOT_URL}/organizations/${organizationId}/keys/${keyId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: credentials,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
      },
    );
    return errorHandler<ApiKey>(response);
  };
}

function deleteKey(credentials: string, organizationId: string, keyId: string) {
  return async () => {
    const response = await fetch(
      `${ROOT_URL}/organizations/${organizationId}/keys/${keyId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: credentials,
          "Content-Type": "application/json",
        },
      },
    );
    return errorHandler<never>(response);
  };
}

//todo(michael): setup api for clickpipes: https://clickhouse.com/docs/cloud/manage/api/swagger#tag/ClickPipes
