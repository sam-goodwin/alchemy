import { alchemy } from "./alchemy.ts";
import { context } from "./context.ts";
import { destroy, DestroyStrategy } from "./destroy.ts";
import {
  PROVIDERS,
  ResourceFQN,
  ResourceID,
  ResourceKind,
  ResourceScope,
  ResourceSeq,
  type PendingResource,
  type Provider,
  type Resource,
  type ResourceProps,
} from "./resource.ts";
import type { PendingDeletions } from "./scope.ts";
import { serialize } from "./serde.ts";
import { formatFQN } from "./util/cli.ts";
import { logger } from "./util/logger.ts";
import type { Telemetry } from "./util/telemetry/index.ts";

export interface ApplyOptions {
  quiet?: boolean;
  alwaysUpdate?: boolean;
}

export function apply<Out extends Resource>(
  resource: PendingResource<Out>,
  props: ResourceProps | undefined,
  options?: ApplyOptions,
): Promise<Awaited<Out>> {
  return _apply(resource, props, options);
}

export class ReplacedSignal extends Error {
  public force: boolean;

  constructor(force?: boolean) {
    super();
    this.force = force ?? false;
  }
}

async function _apply<Out extends Resource>(
  resource: PendingResource<Out>,
  props: ResourceProps | undefined,
  options?: ApplyOptions,
): Promise<Awaited<Out>> {
  const scope = resource[ResourceScope];
  const start = performance.now();
  try {
    const quiet = props?.quiet ?? scope.quiet;
    await scope.init();
    let state = await scope.state.get(resource[ResourceID]);
    const provider: Provider = PROVIDERS.get(resource[ResourceKind]);
    if (provider === undefined) {
      throw new Error(`Provider "${resource[ResourceKind]}" not found`);
    }
    if (scope.phase === "read") {
      if (state === undefined) {
        throw new Error(
          `Resource "${resource[ResourceFQN]}" not found and running in 'read' phase.`,
        );
      }
      scope.telemetryClient.record({
        event: "resource.read",
        resource: resource[ResourceKind],
      });
      return state.output as Awaited<Out>;
    }
    if (state === undefined) {
      state = {
        kind: resource[ResourceKind],
        id: resource[ResourceID],
        fqn: resource[ResourceFQN],
        seq: resource[ResourceSeq],
        status: "creating",
        data: {},
        output: {
          [ResourceID]: resource[ResourceID],
          [ResourceFQN]: resource[ResourceFQN],
          [ResourceKind]: resource[ResourceKind],
          [ResourceScope]: scope,
          [ResourceSeq]: resource[ResourceSeq],
          [DestroyStrategy]: provider.options?.destroyStrategy ?? "sequential",
        },
        // deps: [...deps],
        // there are no "old props" on initialization
        props: {},
      };
      await scope.state.set(resource[ResourceID], state);
    }
    const oldOutput = state.output;

    const alwaysUpdate =
      options?.alwaysUpdate ?? provider.options?.alwaysUpdate ?? false;

    // Skip update if inputs haven't changed and resource is in a stable state
    if (state.status === "created" || state.status === "updated") {
      const oldProps = await serialize(scope, state.props, {
        encrypt: false,
      });
      const newProps = await serialize(scope, props, {
        encrypt: false,
      });
      if (
        JSON.stringify(oldProps) === JSON.stringify(newProps) &&
        alwaysUpdate !== true &&
        !scope.force
      ) {
        if (!quiet) {
          logger.task(resource[ResourceFQN], {
            prefix: "skipped",
            prefixColor: "yellowBright",
            resource: formatFQN(resource[ResourceFQN]),
            message: "Skipped Resource (no changes)",
            status: "success",
          });
        }
        scope.telemetryClient.record({
          event: "resource.skip",
          resource: resource[ResourceKind],
          status: state.status,
        });
        return state.output as Awaited<Out>;
      }
    }

    const phase = state.status === "creating" ? "create" : "update";
    state.status = phase === "create" ? "creating" : "updating";
    state.oldProps = state.props;
    state.props = props;

    if (!quiet) {
      logger.task(resource[ResourceFQN], {
        prefix: phase === "create" ? "creating" : "updating",
        prefixColor: "magenta",
        resource: formatFQN(resource[ResourceFQN]),
        message: `${phase === "create" ? "Creating" : "Updating"} Resource...`,
      });
    }

    scope.telemetryClient.record({
      event: "resource.start",
      resource: resource[ResourceKind],
      status: state.status,
    });

    await scope.state.set(resource[ResourceID], state);

    let isReplaced = false;

    const ctx = context({
      scope,
      phase,
      kind: resource[ResourceKind],
      id: resource[ResourceID],
      fqn: resource[ResourceFQN],
      seq: resource[ResourceSeq],
      props: state.oldProps,
      state,
      isReplacement: false,
      replace: (force?: boolean) => {
        if (phase === "create") {
          throw new Error(
            `Resource ${resource[ResourceKind]} ${resource[ResourceFQN]} cannot be replaced in create phase.`,
          );
        }
        if (isReplaced) {
          logger.warn(
            `Resource ${resource[ResourceKind]} ${resource[ResourceFQN]} is already marked as REPLACE`,
          );
        }

        isReplaced = true;
        throw new ReplacedSignal(force);
      },
    });

    let output: Resource<string>;
    try {
      output = await alchemy.run(
        resource[ResourceID],
        {
          isResource: true,
          parent: scope,
          destroyStrategy: provider.options?.destroyStrategy ?? "sequential",
        },
        async () =>
          await provider.handler.bind(ctx)(resource[ResourceID], props),
      );
    } catch (error) {
      if (error instanceof ReplacedSignal) {
        if (error.force) {
          await destroy(resource, {
            quiet: scope.quiet,
            strategy: resource[DestroyStrategy] ?? "sequential",
            replace: {
              props: state.oldProps,
              output: oldOutput,
            },
          });
        } else {
          if (scope.children.get(resource[ResourceID])?.children.size! > 0) {
            throw new Error(
              `Resource ${resource[ResourceFQN]} has children and cannot be replaced.`,
            );
          }
          const pendingDeletions =
            (await scope.get<PendingDeletions>("pendingDeletions")) ?? [];
          pendingDeletions.push({
            resource: oldOutput,
            oldProps: state.oldProps,
          });
          await scope.set("pendingDeletions", pendingDeletions);
        }

        output = await alchemy.run(
          resource[ResourceID],
          { isResource: true, parent: scope },
          async () =>
            provider.handler.bind(
              context({
                scope,
                phase: "create",
                kind: resource[ResourceKind],
                id: resource[ResourceID],
                fqn: resource[ResourceFQN],
                seq: resource[ResourceSeq],
                props: state!.props,
                state: state!,
                isReplacement: true,
                replace: () => {
                  throw new Error(
                    `Resource ${resource[ResourceKind]} ${resource[ResourceFQN]} cannot be replaced in create phase.`,
                  );
                },
              }),
            )(resource[ResourceID], props),
        );
      } else {
        throw error;
      }
    }
    if (!quiet) {
      logger.task(resource[ResourceFQN], {
        prefix:
          phase === "create" ? "created" : isReplaced ? "replaced" : "updated",
        prefixColor: "greenBright",
        resource: formatFQN(resource[ResourceFQN]),
        message: `${phase === "create" ? "Created" : isReplaced ? "Replaced" : "Updated"} Resource`,
        status: "success",
      });
    }

    const status = phase === "create" ? "created" : "updated";
    scope.telemetryClient.record({
      event: "resource.success",
      resource: resource[ResourceKind],
      status,
      elapsed: performance.now() - start,
      replaced: isReplaced,
    });

    state = await scope.state.get(resource[ResourceID]);
    await scope.state.set(resource[ResourceID], {
      kind: resource[ResourceKind],
      id: resource[ResourceID],
      fqn: resource[ResourceFQN],
      seq: resource[ResourceSeq],
      data: state?.data ?? {}, // TODO: this used to be force-unwrapped but that was crashing for me - is this change ok?
      status,
      output,
      props,
    });
    return output as any;
  } catch (error) {
    scope.telemetryClient.record({
      event: "resource.error",
      resource: resource[ResourceKind],
      error: error as Telemetry.ErrorInput,
      elapsed: performance.now() - start,
    });
    scope.fail();
    throw error;
  }
}
