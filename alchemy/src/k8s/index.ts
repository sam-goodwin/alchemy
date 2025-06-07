/**
 * Alchemy Kubernetes Provider
 *
 * This module provides Alchemy resources for managing Kubernetes infrastructure.
 * It includes support for core Kubernetes resources like Namespaces, Deployments,
 * Services, ConfigMaps, and Secrets.
 */

// Export client and shared types
export * from "./client.ts";
export * from "./types.ts";

// Export Phase 1 core resources
export * from "./namespace.ts";
export * from "./deployment.ts";
export * from "./service.ts";
export * from "./config-map.ts";
export * from "./secret.ts";