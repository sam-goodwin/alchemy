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
import { Scope } from "./scope.ts";
import { serialize } from "./serde.ts";
import type { State } from "./state.ts";

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
        version: provider.options?.version,
      };
      await scope.state.set(resource[ResourceID], state);
    }

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
      const currentVersion = provider.options?.version;
      const storedVersion = state.version;
      if (
        JSON.stringify(oldProps) === JSON.stringify(newProps) &&
        currentVersion === storedVersion &&
        alwaysUpdate !== true
      ) {
        if (!quiet) {
          // console.log(`Skip:    "${resource.FQN}" (no changes)`);
        }
        options?.resolveInnerScope?.(
          new Scope({
            parent: scope,
            scopeName: resource[ResourceID],
          }),
        );
        return state.output as Awaited<Out>;
      }
    }

    const phase = state.status === "creating" ? "create" : "update";
    state.status = phase === "create" ? "creating" : "updating";
    state.oldProps = state.props;
    state.props = props;

    if (!quiet) {
      console.log(
        `${phase === "create" ? "Create" : "Update"}:  "${resource[ResourceFQN]}"`,
      );
    }

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
          console.warn(
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
      },
      async (scope) => {
        options?.resolveInnerScope?.(scope);
        return provider.handler.bind(ctx)(resource[ResourceID], props);
      },
    );
    if (!quiet) {
      console.log(
        `${phase === "create" ? "Created" : "Updated"}: "${resource[ResourceFQN]}"`,
      );
    }

    await scope.state.set(resource[ResourceID], {
      kind: resource[ResourceKind],
      id: resource[ResourceID],
      fqn: resource[ResourceFQN],
      seq: resource[ResourceSeq],
      data: state.data,
      status: phase === "create" ? "created" : "updated",
      output,
      props,
      version: provider.options?.version,
      // deps: [...deps],
    });
    // if (output !== undefined) {
    //   resource[Provide](output as Out);
    // }
    return output as any;
  } catch (error) {
    scope.fail();
    throw error;
  }
}
