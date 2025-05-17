import { exec } from "../os/exec";
import { spawn as nodeSpawn } from "node:child_process";

/**
 * Options for Docker API requests
 */
export interface DockerApiOptions {
  /**
   * Custom path to Docker binary
   */
  dockerPath?: string;
}

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
    const fullCommand = [this.dockerPath, ...args].join(' ');
    
    try {
      // We'll use Node.js spawn to capture stdout and stderr
      return new Promise((resolve, reject) => {
        const process = nodeSpawn(this.dockerPath, args, {
          shell: true,
          stdio: 'pipe'
        });
        
        let stdout = '';
        let stderr = '';
        
        process.stdout?.on('data', (data) => {
          stdout += data.toString();
        });
        
        process.stderr?.on('data', (data) => {
          stderr += data.toString();
        });
        
        process.on('close', (code) => {
          if (code === 0 || code === null) {
            resolve({ stdout, stderr });
          } else {
            reject(new Error(`Docker command failed with exit code ${code}: ${stderr || stdout}`));
          }
        });
        
        process.on('error', (err) => {
          reject(new Error(`Failed to execute Docker command: ${err.message}`));
        });
      });
    } catch (error) {
      throw new Error(`Failed to execute Docker command: ${error instanceof Error ? error.message : String(error)}`);
    }
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
      console.log(`Docker daemon not running: ${error instanceof Error ? error.message : String(error)}`);
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
  async buildImage(path: string, tag: string, buildArgs: Record<string, string> = {}): Promise<{ stdout: string; stderr: string }> {
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
    } = {}
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
    const { stdout } = await this.exec(["network", "create", "--driver", driver, name]);
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
  async connectNetwork(containerId: string, networkId: string): Promise<void> {
    await this.exec(["network", "connect", networkId, containerId]);
  }

  /**
   * Disconnect container from network
   * 
   * @param containerId Container ID or name
   * @param networkId Network ID or name
   */
  async disconnectNetwork(containerId: string, networkId: string): Promise<void> {
    await this.exec(["network", "disconnect", networkId, containerId]);
  }
}
