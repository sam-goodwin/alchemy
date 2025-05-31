/**
 * Finds an open TCP port on localhost.
 */
export async function findOpenPort() {
  // Use Node's net module to find an open port by binding to port 0
  const net = await import("node:net");
  return new Promise<number>((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (typeof address === "object" && address && "port" in address) {
        const port = address.port;
        server.close(() => resolve(port));
      } else {
        server.close();
        reject(new Error("Could not determine open port"));
      }
    });
  });
}

/**
 * Finds an open TCP port on localhost starting from a specific port number.
 * If no port is provided, defaults to 3000.
 *
 * @param startPort - The port number to start searching from (defaults to 3000)
 * @returns Promise that resolves to the first available port number
 */
export async function findOpenPortStartingFrom(
  startPort?: number,
): Promise<number> {
  const net = await import("node:net");
  const port = startPort ?? 9000;
  const maxPort = 65535;

  async function isPortAvailable(portToCheck: number): Promise<boolean> {
    return new Promise((resolve) => {
      const server = net.createServer();
      server.unref();

      server.on("error", () => {
        // Port is in use
        resolve(false);
      });

      server.listen(portToCheck, "127.0.0.1", () => {
        // Port is available
        server.close(() => resolve(true));
      });
    });
  }

  // Start checking from the given port
  for (let currentPort = port; currentPort <= maxPort; currentPort++) {
    if (await isPortAvailable(currentPort)) {
      return currentPort;
    }
  }

  throw new Error(`No available ports found between ${port} and ${maxPort}`);
}
