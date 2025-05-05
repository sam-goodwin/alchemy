import { context } from "./context.js";
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
} from "./resource.js";
import { Scope } from "./scope.js";
import { serialize } from "./serde.js";
import type { State } from "./state.js";

export interface ApplyOptions {
  quiet?: boolean;
  alwaysUpdate?: boolean;
}

export async function apply<Out extends Resource>(
  resource: PendingResource<Out>,
  props: ResourceProps | undefined,
  options?: ApplyOptions,
): Promise<Awaited<Out>> {
  const scope = resource[ResourceScope];
  const id = resource[ResourceID];
  const kind = resource[ResourceKind];
  const fqn = resource[ResourceFQN];
  const seq = resource[ResourceSeq];
  try {
    const quiet = props?.quiet ?? scope.quiet;
    await scope.init();
    let state: State | undefined = (await scope.state.get(id))!;
    const provider: Provider = PROVIDERS.get(kind);
    if (provider === undefined) {
      throw new Error(`Provider "${kind}" not found`);
    }
    if (scope.phase === "read") {
      if (state === undefined) {
        throw new Error(
          `Resource "${fqn}" not found and running in 'read' phase.`,
        );
      } else if (state.status === "creating" && state.output === undefined) {
        throw new Error(
          `Resource "${fqn}" did not finish creating, you must run in 'up' phase successfully before running in 'read' phase.`,
        );
      }
      return state.output as Awaited<Out>;
    }
    if (state === undefined) {
      state = {
        kind,
        id,
        fqn,
        seq,
        status: "creating",
        data: {},
        output: {
          [ResourceID]: id,
          [ResourceFQN]: fqn,
          [ResourceKind]: kind,
          [ResourceSeq]: seq,
          [ResourceScope]: scope,
        },
        // deps: [...deps],
        props,
      };
      await scope.state.set(id, state);
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
      if (
        JSON.stringify(oldProps) === JSON.stringify(newProps) &&
        alwaysUpdate !== true
      ) {
        if (!quiet) {
          // console.log(`Skip:    "${resource.FQN}" (no changes)`);
        }
        return state.output as Awaited<Out>;
      }
    }

    const phase = state.status === "creating" ? "create" : "update";
    state.status = phase === "create" ? "creating" : "updating";
    const oldProps = state.props;
    const oldOutput = state.output;
    state.oldProps = oldProps;
    state.props = props;

    if (!quiet) {
      console.log(`${phase === "create" ? "Create" : "Update"}:  "${fqn}"`);
    }

    await scope.state.set(id, state);

    let isReplaced = false;

    const resourceScope = await Scope.create({
      parent: scope,
      scopeName: id,
      seq,
    });

    const output = await resourceScope.run(async (scope) => {
      const children = await scope.state.list();
      return provider.handler.bind(
        context({
          scope,
          phase,
          kind,
          id,
          fqn,
          seq,
          props: state.oldProps,
          state,
          replace: () => {
            if (children.length > 0) {
              // TODO(sam): we need to determine how to make it possible to replace resources with children
              // e.g. we can move the children resources and delete them later
              // ... but, this seems like it could lead to tricky bugs where the replacement resource creates children
              // ... that then conflict with the replaced resource's children and are either deleted or brick the stack
              // For now, we just disallow it.
              throw new Error(
                `Resource "${fqn}" has children and cannot be replaced.`,
              );
            }
            if (state.replace !== undefined) {
              // error if if this resource has a pending replacement that hasn't been cleaned up
              // this is to guarnatee that we do not lose track of the replaced resource and always delete it up
              // TODO(sam): we could open up `replace` to be an array
              throw new Error(
                `Resource "${fqn}" has pending replaced resource that must be deleted first.`,
              );
            }

            isReplaced = true;
          },
        }),
      )(id, props);
    });
    if (!quiet) {
      console.log(`${phase === "create" ? "Created" : "Updated"}: "${fqn}"`);
    }

    await scope.state.set(id, {
      kind,
      id,
      fqn,
      seq,
      data: state.data,
      status: phase === "create" ? "created" : "updated",
      output,
      props,
      // TOOD(sam): what happens if we fail to set the state here?
      // next pass, we've lost track of the replacement resource
      replace: isReplaced
        ? {
            output: oldOutput,
            props: oldProps,
          }
        : undefined,
    });
    return output as Awaited<Out>;
  } catch (error) {
    scope.fail(error);
    throw error;
  }
}
