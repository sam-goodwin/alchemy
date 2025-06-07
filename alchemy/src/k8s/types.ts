/**
 * Common Kubernetes resource metadata
 */
export interface KubernetesMetadata {
  /**
   * Name of the resource. Must be unique within the namespace.
   */
  name?: string;
  
  /**
   * Namespace of the resource. Defaults to 'default' if not specified.
   */
  namespace?: string;
  
  /**
   * Labels are key-value pairs used for grouping and selecting resources
   */
  labels?: Record<string, string>;
  
  /**
   * Annotations are arbitrary metadata that can be attached to resources
   */
  annotations?: Record<string, string>;
}

/**
 * Common properties for all Kubernetes resources
 */
export interface KubernetesResourceProps {
  /**
   * Standard Kubernetes metadata
   */
  metadata?: KubernetesMetadata;
  
  /**
   * Kubernetes client configuration options
   */
  kubeconfig?: string;
  context?: string;
}

/**
 * Label selector for matching resources
 */
export interface LabelSelector {
  /**
   * Direct label matching (key: value)
   */
  matchLabels?: Record<string, string>;
  
  /**
   * Expression-based label matching
   */
  matchExpressions?: Array<{
    key: string;
    operator: "In" | "NotIn" | "Exists" | "DoesNotExist";
    values?: string[];
  }>;
}

/**
 * Resource requirements for containers
 */
export interface ResourceRequirements {
  /**
   * Resource limits (maximum allowed)
   */
  limits?: {
    cpu?: string;
    memory?: string;
    [key: string]: string | undefined;
  };
  
  /**
   * Resource requests (minimum required)
   */
  requests?: {
    cpu?: string;
    memory?: string;
    [key: string]: string | undefined;
  };
}

/**
 * Container port configuration
 */
export interface ContainerPort {
  /**
   * Port number
   */
  containerPort: number;
  
  /**
   * Protocol (TCP, UDP, or SCTP)
   */
  protocol?: "TCP" | "UDP" | "SCTP";
  
  /**
   * Name for the port (optional)
   */
  name?: string;
  
  /**
   * Host port to bind to (optional)
   */
  hostPort?: number;
  
  /**
   * Host IP to bind to (optional)
   */
  hostIP?: string;
}

/**
 * Environment variable for containers
 */
export interface EnvVar {
  /**
   * Environment variable name
   */
  name: string;
  
  /**
   * Environment variable value (direct value)
   */
  value?: string;
  
  /**
   * Source for the environment variable value
   */
  valueFrom?: {
    /**
     * Reference to a ConfigMap key
     */
    configMapKeyRef?: {
      name: string;
      key: string;
      optional?: boolean;
    };
    
    /**
     * Reference to a Secret key
     */
    secretKeyRef?: {
      name: string;
      key: string;
      optional?: boolean;
    };
    
    /**
     * Reference to a field in the resource
     */
    fieldRef?: {
      fieldPath: string;
      apiVersion?: string;
    };
    
    /**
     * Reference to a resource field
     */
    resourceFieldRef?: {
      resource: string;
      containerName?: string;
      divisor?: string;
    };
  };
}

/**
 * Volume mount for containers
 */
export interface VolumeMount {
  /**
   * Name of the volume to mount
   */
  name: string;
  
  /**
   * Path where the volume should be mounted in the container
   */
  mountPath: string;
  
  /**
   * Path within the volume from which the container's volume should be mounted
   */
  subPath?: string;
  
  /**
   * Whether the volume should be mounted read-only
   */
  readOnly?: boolean;
  
  /**
   * Mount propagation setting
   */
  mountPropagation?: string;
  
  /**
   * Expanded path within the volume from which the container's volume should be mounted
   */
  subPathExpr?: string;
}

/**
 * Volume definition for pods
 */
export interface Volume {
  /**
   * Name of the volume
   */
  name: string;
  
  /**
   * EmptyDir volume (temporary directory)
   */
  emptyDir?: {
    medium?: string;
    sizeLimit?: string;
  };
  
  /**
   * HostPath volume (mount from host filesystem)
   */
  hostPath?: {
    path: string;
    type?: string;
  };
  
  /**
   * ConfigMap volume
   */
  configMap?: {
    name: string;
    optional?: boolean;
    defaultMode?: number;
    items?: Array<{
      key: string;
      path: string;
      mode?: number;
    }>;
  };
  
  /**
   * Secret volume
   */
  secret?: {
    secretName: string;
    optional?: boolean;
    defaultMode?: number;
    items?: Array<{
      key: string;
      path: string;
      mode?: number;
    }>;
  };
  
  /**
   * PersistentVolumeClaim volume
   */
  persistentVolumeClaim?: {
    claimName: string;
    readOnly?: boolean;
  };
}

/**
 * Container specification
 */
export interface Container {
  /**
   * Name of the container
   */
  name: string;
  
  /**
   * Container image
   */
  image: string;
  
  /**
   * Image pull policy
   */
  imagePullPolicy?: "Always" | "Never" | "IfNotPresent";
  
  /**
   * Command to run in the container
   */
  command?: string[];
  
  /**
   * Arguments to the command
   */
  args?: string[];
  
  /**
   * Environment variables
   */
  env?: EnvVar[];
  
  /**
   * Ports to expose from the container
   */
  ports?: ContainerPort[];
  
  /**
   * Volume mounts
   */
  volumeMounts?: VolumeMount[];
  
  /**
   * Resource requirements
   */
  resources?: ResourceRequirements;
  
  /**
   * Working directory for the container
   */
  workingDir?: string;
  
  /**
   * Liveness probe
   */
  livenessProbe?: Probe;
  
  /**
   * Readiness probe
   */
  readinessProbe?: Probe;
  
  /**
   * Startup probe
   */
  startupProbe?: Probe;
  
  /**
   * Security context for the container
   */
  securityContext?: SecurityContext;
}

/**
 * Probe definition for health checks
 */
export interface Probe {
  /**
   * HTTP GET probe
   */
  httpGet?: {
    path?: string;
    port: number | string;
    host?: string;
    scheme?: "HTTP" | "HTTPS";
    httpHeaders?: Array<{
      name: string;
      value: string;
    }>;
  };
  
  /**
   * TCP socket probe
   */
  tcpSocket?: {
    port: number | string;
    host?: string;
  };
  
  /**
   * Exec probe
   */
  exec?: {
    command?: string[];
  };
  
  /**
   * Initial delay before probe starts
   */
  initialDelaySeconds?: number;
  
  /**
   * Period between probes
   */
  periodSeconds?: number;
  
  /**
   * Timeout for probe
   */
  timeoutSeconds?: number;
  
  /**
   * Number of failures before considering unhealthy
   */
  failureThreshold?: number;
  
  /**
   * Number of successes before considering healthy
   */
  successThreshold?: number;
}

/**
 * Security context for containers and pods
 */
export interface SecurityContext {
  /**
   * Run as user ID
   */
  runAsUser?: number;
  
  /**
   * Run as group ID
   */
  runAsGroup?: number;
  
  /**
   * Run as non-root user
   */
  runAsNonRoot?: boolean;
  
  /**
   * Whether container runs in privileged mode
   */
  privileged?: boolean;
  
  /**
   * Whether to allow privilege escalation
   */
  allowPrivilegeEscalation?: boolean;
  
  /**
   * Read-only root filesystem
   */
  readOnlyRootFilesystem?: boolean;
  
  /**
   * Capabilities to add/drop
   */
  capabilities?: {
    add?: string[];
    drop?: string[];
  };
  
  /**
   * SELinux options
   */
  seLinuxOptions?: {
    level?: string;
    role?: string;
    type?: string;
    user?: string;
  };
}

/**
 * Pod template specification
 */
export interface PodTemplateSpec {
  /**
   * Metadata for the pod template
   */
  metadata?: KubernetesMetadata;
  
  /**
   * Pod specification
   */
  spec?: PodSpec;
}

/**
 * Pod specification
 */
export interface PodSpec {
  /**
   * List of containers in the pod
   */
  containers: Container[];
  
  /**
   * List of init containers
   */
  initContainers?: Container[];
  
  /**
   * Restart policy for containers
   */
  restartPolicy?: "Always" | "OnFailure" | "Never";
  
  /**
   * Node selector for pod placement
   */
  nodeSelector?: Record<string, string>;
  
  /**
   * Service account name
   */
  serviceAccountName?: string;
  
  /**
   * Service account (deprecated, use serviceAccountName)
   */
  serviceAccount?: string;
  
  /**
   * Security context for the pod
   */
  securityContext?: SecurityContext;
  
  /**
   * Volumes available to the pod
   */
  volumes?: Volume[];
  
  /**
   * DNS policy for the pod
   */
  dnsPolicy?: "ClusterFirst" | "ClusterFirstWithHostNet" | "Default" | "None";
  
  /**
   * Host network setting
   */
  hostNetwork?: boolean;
  
  /**
   * Host PID setting
   */
  hostPID?: boolean;
  
  /**
   * Host IPC setting
   */
  hostIPC?: boolean;
  
  /**
   * Termination grace period in seconds
   */
  terminationGracePeriodSeconds?: number;
  
  /**
   * Image pull secrets
   */
  imagePullSecrets?: Array<{
    name: string;
  }>;
  
  /**
   * Node affinity rules
   */
  affinity?: {
    nodeAffinity?: any;
    podAffinity?: any;
    podAntiAffinity?: any;
  };
  
  /**
   * Tolerations for node taints
   */
  tolerations?: Array<{
    key?: string;
    operator?: "Exists" | "Equal";
    value?: string;
    effect?: "NoSchedule" | "PreferNoSchedule" | "NoExecute";
    tolerationSeconds?: number;
  }>;
}

/**
 * Service port specification
 */
export interface ServicePort {
  /**
   * Name of the port
   */
  name?: string;
  
  /**
   * Protocol (TCP, UDP, or SCTP)
   */
  protocol?: "TCP" | "UDP" | "SCTP";
  
  /**
   * Port number
   */
  port: number;
  
  /**
   * Target port on the pod
   */
  targetPort?: number | string;
  
  /**
   * Node port for NodePort/LoadBalancer services
   */
  nodePort?: number;
}

/**
 * Common status fields for Kubernetes resources
 */
export interface KubernetesStatus {
  /**
   * Current phase or state of the resource
   */
  phase?: string;
  
  /**
   * Conditions represent the latest available observations of the resource's state
   */
  conditions?: Array<{
    type: string;
    status: "True" | "False" | "Unknown";
    lastTransitionTime?: string;
    reason?: string;
    message?: string;
  }>;
  
  /**
   * Observed generation of the resource
   */
  observedGeneration?: number;
}