import { alchemy } from "./alchemy.ts";
import { context } from "./context.ts";
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
import { Scope, type PendingDeletions } from "./scope.ts";
import { serialize } from "./serde.ts";
import type { State } from "./state.ts";
import { formatFQN } from "./util/cli.ts";
import { logger } from "./util/logger.ts";
import type { Telemetry } from "./util/telemetry/index.ts";

export interface ApplyOptions {
  quiet?: boolean;
  alwaysUpdate?: boolean;
  resolveInnerScope?: (scope: Scope) => void;
}

export function apply<Out extends Resource>(
  resource: PendingResource<Out>,
  props: ResourceProps | undefined,
  options?: ApplyOptions,
): Promise<Awaited<Out>> {
  return _apply(resource, props, options);
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
    let state: State | undefined = (await scope.state.get(
      resource[ResourceID],
    ))!;
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
      options?.resolveInnerScope?.(
        new Scope({
          parent: scope,
          scopeName: resource[ResourceID],
        }),
      );
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
        },
        // deps: [...deps],
        props,
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
        alwaysUpdate !== true
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
        options?.resolveInnerScope?.(
          new Scope({
            parent: scope,
            scopeName: resource[ResourceID],
          }),
        );
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
      replace: () => {
        if (isReplaced) {
          logger.warn(
            `Resource ${resource[ResourceKind]} ${resource[ResourceFQN]} is already marked as REPLACE`,
          );
          return;
        }
        isReplaced = true;
      },
    });

    const output = await alchemy.run(
      resource[ResourceID],
      {
        isResource: true,
        parent: scope,
      },
      async (scope) => {
        const children = await scope.state.list();
        if (children.length > 0) {
          // TODO(sam): we need to determine how to make it possible to replace resources with children
          // e.g. we can move the children resources and delete them later
          // ... but, this seems like it could lead to tricky bugs where the replacement resource creates children
          // ... that then conflict with the replaced resource's children and are either deleted or brick the stack
          // For now, we just disallow it.
          throw new Error(
            `Resource "${resource[ResourceFQN]}" has children and cannot be replaced.`,
          );
        }
        options?.resolveInnerScope?.(scope);
        return provider.handler.bind(ctx)(resource[ResourceID], props);
      },
    );
    if (!quiet) {
      logger.task(resource[ResourceFQN], {
        prefix: phase === "create" ? "created" : "updated",
        prefixColor: "greenBright",
        resource: formatFQN(resource[ResourceFQN]),
        message: `${phase === "create" ? "Created" : "Updated"} Resource`,
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

    await scope.state.set(resource[ResourceID], {
      kind: resource[ResourceKind],
      id: resource[ResourceID],
      fqn: resource[ResourceFQN],
      seq: resource[ResourceSeq],
      data: state.data,
      status,
      output,
      props,
      // deps: [...deps],
    });
    if (isReplaced) {
      const pendingDeletions =
        (await scope.get<PendingDeletions>("pendingDeletions")) ?? [];
      pendingDeletions.push({
        resource: oldOutput,
        oldProps: state.oldProps,
      });
      await scope.set("pendingDeletions", pendingDeletions);
    }
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
