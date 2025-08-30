import type { VercelEnvironment } from "./vercel.types.ts";

export type StorageType = "blob";

export interface StorageProject {
  projectId: string;
  envVarEnvironments: VercelEnvironment[];
  envVarPrefix?: string;
}

export interface StorageProjectMetadata {
  environments: VercelEnvironment[];
  environmentVariables: string[];
  envVarPrefix?: string;
  framework: string;
  id: string;
  name: string;
  projectId: string;
}
