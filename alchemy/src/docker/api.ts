import { exec } from "../os/exec.js";

/**
 * Options for Docker API requests
 */
export interface DockerApiOptions {
  /**
   * Custom path to Docker binary
   */
  dockerPath?: string;
}

type VolumeInfo = {
  CreatedAt: string;
  Driver: string;
  Labels: Record<string, string>;
  Mountpoint: string;
  Name: string;
  Options: Record<string, string>;
  Scope: string;
};

/**
 * Docker API client that wraps Docker CLI commands
 */
export class DockerApi {
  /** Path to Docker CLI */
  readonly dockerPath: string;

  /**
   * Create a new Docker API client
   *
   * @param options Docker API options
   */
  constructor(options: DockerApiOptions = {}) {
    this.dockerPath = options.dockerPath || "docker";
  }

  /**
   * Run a Docker CLI command
   *
   * @param args Command arguments to pass to Docker CLI
   * @returns Result of the command
   */
  async exec(args: string[]): Promise<{ stdout: string; stderr: string }> {
    const command = `${this.dockerPath} ${args.join(" ")}`;
    const result = (await exec(command, {
      captureOutput: true,
      shell: true,
      env: process.env,
    })) as { stdout: string; stderr: string };

    return result;
  }

  /**
   * Check if Docker daemon is running
   *
   * @returns True if Docker daemon is running
   */
  async isRunning(): Promise<boolean> {
    try {
      // Use a quick, lightweight command to test if Docker is running
      await this.exec(["version", "--format", "{{.Server.Version}}"]);
      return true;
    } catch (error) {
      console.log(
        `Docker daemon not running: ${error instanceof Error ? error.message : String(error)}`,
      );
      return false;
    }
  }

  /**
   * Pull Docker image
   *
   * @param image Image name and tag
   * @returns Result of the pull command
   */
  async pullImage(image: string): Promise<{ stdout: string; stderr: string }> {
    return this.exec(["pull", image]);
  }

  /**
   * Build Docker image
   *
   * @param path Path to Dockerfile directory
   * @param tag Tag for the image
   * @param buildArgs Build arguments
   * @returns Result of the build command
   */
  async buildImage(
    path: string,
    tag: string,
    buildArgs: Record<string, string> = {},
  ): Promise<{ stdout: string; stderr: string }> {
    const args = ["build", "-t", tag, path];

    for (const [key, value] of Object.entries(buildArgs)) {
      args.push("--build-arg", `${key}=${value}`);
    }

    return this.exec(args);
  }

  /**
   * List Docker images
   *
   * @returns JSON string containing image list
   */
  async listImages(): Promise<string> {
    const { stdout } = await this.exec(["images", "--format", "{{json .}}"]);
    return stdout;
  }

  /**
   * Create Docker container
   *
   * @param image Image name
   * @param name Container name
   * @param options Container options
   * @returns Container ID
   */
  async createContainer(
    image: string,
    name: string,
    options: {
      ports?: Record<string, string>;
      env?: Record<string, string>;
      volumes?: Record<string, string>;
      cmd?: string[];
    } = {},
  ): Promise<string> {
    const args = ["create", "--name", name];

    // Add port mappings
    if (options.ports) {
      for (const [hostPort, containerPort] of Object.entries(options.ports)) {
        args.push("-p", `${hostPort}:${containerPort}`);
      }
    }

    // Add environment variables
    if (options.env) {
      for (const [key, value] of Object.entries(options.env)) {
        args.push("-e", `${key}=${value}`);
      }
    }

    // Add volume mappings
    if (options.volumes) {
      for (const [hostPath, containerPath] of Object.entries(options.volumes)) {
        args.push("-v", `${hostPath}:${containerPath}`);
      }
    }

    args.push(image);

    // Add command if specified
    if (options.cmd && options.cmd.length > 0) {
      args.push(...options.cmd);
    }

    const { stdout } = await this.exec(args);
    return stdout.trim();
  }

  /**
   * Start Docker container
   *
   * @param containerId Container ID or name
   */
  async startContainer(containerId: string): Promise<void> {
    await this.exec(["start", containerId]);
  }

  /**
   * Stop Docker container
   *
   * @param containerId Container ID or name
   */
  async stopContainer(containerId: string): Promise<void> {
    await this.exec(["stop", containerId]);
  }

  /**
   * Remove Docker container
   *
   * @param containerId Container ID or name
   * @param force Force removal
   */
  async removeContainer(containerId: string, force = false): Promise<void> {
    const args = ["rm"];
    if (force) {
      args.push("-f");
    }
    args.push(containerId);
    await this.exec(args);
  }

  /**
   * Get container logs
   *
   * @param containerId Container ID or name
   * @returns Container logs
   */
  async getContainerLogs(containerId: string): Promise<string> {
    const { stdout } = await this.exec(["logs", containerId]);
    return stdout;
  }

  /**
   * Check if a container exists
   *
   * @param containerId Container ID or name
   * @returns True if container exists
   */
  async containerExists(containerId: string): Promise<boolean> {
    try {
      await this.exec(["inspect", containerId]);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Create Docker network
   *
   * @param name Network name
   * @param driver Network driver
   * @returns Network ID
   */
  async createNetwork(name: string, driver = "bridge"): Promise<string> {
    const { stdout } = await this.exec([
      "network",
      "create",
      "--driver",
      driver,
      name,
    ]);
    return stdout.trim();
  }

  /**
   * Remove Docker network
   *
   * @param networkId Network ID or name
   */
  async removeNetwork(networkId: string): Promise<void> {
    await this.exec(["network", "rm", networkId]);
  }

  /**
   * Connect container to network
   *
   * @param containerId Container ID or name
   * @param networkId Network ID or name
   */
  async connectNetwork(
    containerId: string,
    networkId: string,
    options: {
      aliases?: string[];
    } = {},
  ): Promise<void> {
    const args = ["network", "connect"];
    if (options.aliases) {
      for (const alias of options.aliases) {
        args.push("--alias", alias);
      }
    }
    args.push(networkId, containerId);
    await this.exec(args);
  }

  /**
   * Disconnect container from network
   *
   * @param containerId Container ID or name
   * @param networkId Network ID or name
   */
  async disconnectNetwork(
    containerId: string,
    networkId: string,
  ): Promise<void> {
    await this.exec(["network", "disconnect", networkId, containerId]);
  }

  /**
   * Create Docker volume
   *
   * @param name Volume name
   * @param driver Volume driver
   * @param driverOpts Driver options
   * @param labels Volume labels
   * @returns Volume name
   */
  async createVolume(
    name: string,
    driver = "local",
    driverOpts: Record<string, string> = {},
    labels: Record<string, string> = {},
  ): Promise<string> {
    const args = ["volume", "create", "--name", name, "--driver", driver];

    // Add driver options
    for (const [key, value] of Object.entries(driverOpts)) {
      args.push("--opt", `${key}=${value}`);
    }

    // Add labels
    for (const [key, value] of Object.entries(labels)) {
      args.push("--label", `${key}=${value}`);
    }

    const { stdout } = await this.exec(args);
    return stdout.trim();
  }

  /**
   * Remove Docker volume
   *
   * @param volumeName Volume name
   * @param force Force removal of the volume
   */
  async removeVolume(volumeName: string, force = false): Promise<void> {
    const args = ["volume", "rm"];
    if (force) {
      args.push("--force");
    }
    args.push(volumeName);
    await this.exec(args);
  }

  /**
   * Get Docker volume information
   *
   * @param volumeName Volume name
   * @returns Volume details in JSON format
   */
  async inspectVolume(volumeName: string): Promise<VolumeInfo[]> {
    const { stdout } = await this.exec(["volume", "inspect", volumeName]);
    try {
      return JSON.parse(stdout.trim()) as VolumeInfo[];
    } catch (error) {
      return [];
    }
  }

  /**
   * Check if a volume exists
   *
   * @param volumeName Volume name
   * @returns True if volume exists
   */
  async volumeExists(volumeName: string): Promise<boolean> {
    try {
      await this.inspectVolume(volumeName);
      return true;
    } catch (error) {
      return false;
    }
  }
}
