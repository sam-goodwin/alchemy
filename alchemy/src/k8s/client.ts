import * as k8s from "@kubernetes/client-node";

/**
 * Configuration options for the Kubernetes client
 */
export interface KubernetesClientOptions {
  /**
   * Path to kubeconfig file. Defaults to ~/.kube/config
   */
  kubeconfig?: string;
  
  /**
   * Kubernetes context to use from kubeconfig
   */
  context?: string;
  
  /**
   * Cluster configuration for direct connection
   */
  cluster?: {
    /**
     * Server URL (e.g., https://kubernetes.example.com:6443)
     */
    server: string;
    
    /**
     * Certificate authority data (base64 encoded)
     */
    certificateAuthorityData?: string;
    
    /**
     * Skip TLS verification (not recommended for production)
     */
    skipTlsVerify?: boolean;
  };
  
  /**
   * User credentials for authentication
   */
  user?: {
    /**
     * Client certificate data (base64 encoded)
     */
    clientCertificateData?: string;
    
    /**
     * Client key data (base64 encoded)
     */
    clientKeyData?: string;
    
    /**
     * Bearer token for service account authentication
     */
    token?: string;
    
    /**
     * Username for basic authentication
     */
    username?: string;
    
    /**
     * Password for basic authentication
     */
    password?: string;
  };
  
  /**
   * Default namespace for operations (defaults to 'default')
   */
  defaultNamespace?: string;
}

/**
 * Kubernetes API client wrapper that provides a unified interface
 * for interacting with Kubernetes resources
 */
export class KubernetesClient {
  public readonly kc: k8s.KubeConfig;
  public readonly coreV1Api: k8s.CoreV1Api;
  public readonly appsV1Api: k8s.AppsV1Api;
  public readonly networkingV1Api: k8s.NetworkingV1Api;
  public readonly rbacV1Api: k8s.RbacAuthorizationV1Api;
  public readonly defaultNamespace: string;

  constructor(options: KubernetesClientOptions = {}) {
    this.kc = new k8s.KubeConfig();
    this.defaultNamespace = options.defaultNamespace || "default";

    // Configure the Kubernetes client based on options
    if (options.cluster && options.user) {
      // Direct configuration
      this.kc.loadFromOptions({
        clusters: [{
          name: "default-cluster",
          server: options.cluster.server,
          caData: options.cluster.certificateAuthorityData,
          skipTLSVerify: options.cluster.skipTlsVerify,
        }],
        users: [{
          name: "default-user",
          certData: options.user.clientCertificateData,
          keyData: options.user.clientKeyData,
          token: options.user.token,
          username: options.user.username,
          password: options.user.password,
        }],
        contexts: [{
          name: "default-context",
          cluster: "default-cluster",
          user: "default-user",
          namespace: this.defaultNamespace,
        }],
        currentContext: "default-context",
      });
    } else if (options.kubeconfig) {
      // Load from specific kubeconfig file
      this.kc.loadFromFile(options.kubeconfig);
    } else {
      // Try to load from default locations
      try {
        this.kc.loadFromDefault();
      } catch (error) {
        // If no default config is found, try in-cluster config
        try {
          this.kc.loadFromCluster();
        } catch (clusterError) {
          throw new Error(
            `Failed to load Kubernetes configuration. Tried default kubeconfig and in-cluster config. Original errors: ${error}, ${clusterError}`
          );
        }
      }
    }

    // Set context if specified
    if (options.context) {
      this.kc.setCurrentContext(options.context);
    }

    // Initialize API clients
    this.coreV1Api = this.kc.makeApiClient(k8s.CoreV1Api);
    this.appsV1Api = this.kc.makeApiClient(k8s.AppsV1Api);
    this.networkingV1Api = this.kc.makeApiClient(k8s.NetworkingV1Api);
    this.rbacV1Api = this.kc.makeApiClient(k8s.RbacAuthorizationV1Api);
  }

  /**
   * Get the current namespace from context, or fall back to default
   */
  getCurrentNamespace(): string {
    const currentContext = this.kc.getCurrentContext();
    if (currentContext) {
      const context = this.kc.getContextObject(currentContext);
      return context?.namespace || this.defaultNamespace;
    }
    return this.defaultNamespace;
  }

  /**
   * Check if the client can connect to the Kubernetes API
   */
  async healthCheck(): Promise<boolean> {
    try {
      await this.coreV1Api.getAPIVersions();
      return true;
    } catch (error) {
      console.error("Kubernetes health check failed:", error);
      return false;
    }
  }
}

/**
 * Create a Kubernetes client with the provided options
 */
export function createKubernetesClient(
  options: KubernetesClientOptions = {}
): KubernetesClient {
  return new KubernetesClient(options);
}

/**
 * Get a default Kubernetes client that uses standard kubeconfig resolution
 */
let defaultClient: KubernetesClient | undefined;

export function getDefaultKubernetesClient(): KubernetesClient {
  if (!defaultClient) {
    defaultClient = createKubernetesClient();
  }
  return defaultClient;
}

/**
 * Handle common Kubernetes API errors and provide helpful error messages
 */
export function handleKubernetesError(error: any, operation: string, resourceType: string, resourceName: string): never {
  if (error.response) {
    const { status, statusText, body } = error.response;
    let message = `Failed to ${operation} ${resourceType} '${resourceName}': ${status} ${statusText}`;
    
    if (body && body.message) {
      message += ` - ${body.message}`;
    }
    
    // Add specific guidance for common errors
    if (status === 401) {
      message += ". Check your Kubernetes authentication credentials.";
    } else if (status === 403) {
      message += ". Check your Kubernetes RBAC permissions.";
    } else if (status === 404) {
      message += ". The resource may not exist or the namespace may be incorrect.";
    } else if (status === 409) {
      message += ". A resource with this name already exists.";
    }
    
    throw new Error(message);
  } else if (error.message) {
    throw new Error(`Failed to ${operation} ${resourceType} '${resourceName}': ${error.message}`);
  } else {
    throw new Error(`Failed to ${operation} ${resourceType} '${resourceName}': Unknown error`);
  }
}