import { trpcServer, type TrpcCliMeta } from "trpc-cli";
import { TelemetryClient } from "../src/util/telemetry/client.ts";

export const t = trpcServer.initTRPC.meta<TrpcCliMeta>().create();

export class ExitSignal extends Error {
  constructor(public code: 0 | 1 = 0) {
    super(`Process exit with code ${code}`);
    this.name = "ExitSignal";
  }
}

const loggingMiddleware = t.middleware(async ({ path, next }) => {
  const telemetry = TelemetryClient.create({
    enabled: true,
    quiet: true,
  });
  telemetry.record({
    event: "cli.start",
    command: path,
  });
  let exitCode = 0;

  try {
    const result = await next();
    telemetry.record({
      event: "cli.success",
      command: path,
    });
    return result;
  } catch (error) {
    telemetry.record({
      event:
        error instanceof ExitSignal && error.code === 0
          ? "cli.success"
          : "cli.error",
      command: path,
    });
    if (error instanceof ExitSignal) {
      exitCode = error.code;
    } else {
      throw error;
    }
  } finally {
    await telemetry.finalize();
    //* this is a node issue https://github.com/nodejs/node/issues/56645
    await new Promise((resolve) => setTimeout(resolve, 100));
    process.exit(exitCode);
  }
});

export const loggedProcedure = t.procedure.use(loggingMiddleware);
