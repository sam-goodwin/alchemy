import { alchemy } from "./alchemy.js";
import { context } from "./context.js";
import {
  PROVIDERS,
  ResourceFQN,
  ResourceID,
  ResourceKind,
  ResourceScope,
  ResourceSeq,
  type Provider,
  type Resource,
} from "./resource.js";
import { Scope } from "./scope.js";

export class DestroyedSignal extends Error {}

export interface DestroyOptions {
  quiet?: boolean;
  strategy?: "sequential" | "parallel";
}

function isScopeArgs(a: any): a is [scope: Scope, options?: DestroyOptions] {
  return a[0] instanceof Scope;
}

/**
 * Prune all resources from an Output and "down", i.e. that branches from it.
 */
export async function destroy<Type extends string>(
  ...args:
    | [scope: Scope, options?: DestroyOptions]
    | [resource: Resource<Type> | undefined | null, options?: DestroyOptions]
): Promise<void> {
  if (isScopeArgs(args)) {
    const [scope] = args;
    const options = {
      strategy: "sequential",
      ...(args[1] ?? {}),
    } satisfies DestroyOptions;

    // destroy all active resources
    await destroyAll(Array.from(scope.resources.values()), options);

    // then detect orphans and destroy them
    const orphans = await scope.state.all();
    await destroyAll(
      Object.values(orphans).map((orphan) => ({
        ...orphan.output,
        Scope: scope,
      })),
      options,
    );
    // finally, destroy the scope container
    await scope.deinit();
    return;
  }

  const [instance, options] = args;

  if (!instance) {
    return;
  }

  if (instance[ResourceKind] === Scope.KIND) {
    const scope = new Scope({
      parent: instance[ResourceScope],
      scopeName: instance[ResourceID],
    });
    console.log("Destroying scope", scope.chain.join("/"));
    return await destroy(scope, options);
  }

  const Provider: Provider<Type> | undefined = PROVIDERS.get(
    instance[ResourceKind],
  );
  if (!Provider) {
    throw new Error(
      `Cannot destroy resource "${instance[ResourceFQN]}" type ${instance[ResourceKind]} - no provider found. You may need to import the provider in your alchemy.config.ts.`,
    );
  }

  const scope = instance[ResourceScope];
  if (!scope) {
    console.warn(`Resource "${instance[ResourceFQN]}" has no scope`);
  }
  const quiet = options?.quiet ?? scope.quiet;

  try {
    if (!quiet) {
      console.log(`Delete:  "${instance[ResourceFQN]}"`);
    }

    const state = await scope.state.get(instance[ResourceID]);

    if (state === undefined) {
      return;
    }

    const ctx = context({
      scope,
      phase: "delete",
      kind: instance[ResourceKind],
      id: instance[ResourceID],
      fqn: instance[ResourceFQN],
      seq: instance[ResourceSeq],
      props: state.props,
      state,
      replace: () => {
        throw new Error("Cannot replace a resource that is being deleted");
      },
    });

    let nestedScope: Scope | undefined;
    try {
      // BUG: this does not restore persisted scope
      await alchemy.run(
        instance[ResourceID],
        {
          // TODO(sam): this is an awful hack to differentiate between naked scopes and resources
          isResource: instance[ResourceKind] !== "alchemy::Scope",
          parent: scope,
        },
        async (scope) => {
          nestedScope = scope;
          return await Provider.handler.bind(ctx)(
            instance[ResourceID],
            state.props,
          );
        },
      );
    } catch (err) {
      if (err instanceof DestroyedSignal) {
        // TODO: should we fail if the DestroyedSignal is not thrown?
      } else {
        throw err;
      }
    }

    if (nestedScope) {
      await destroy(nestedScope, options);
    }

    await scope.delete(instance[ResourceID]);

    if (!quiet) {
      console.log(`Deleted: "${instance[ResourceFQN]}"`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function destroyAll(
  resources: Resource[],
  options?: DestroyOptions,
) {
  if (options?.strategy !== "parallel") {
    const sorted = resources.sort((a, b) => b[ResourceSeq] - a[ResourceSeq]);
    for (const resource of sorted) {
      await destroy(resource, options);
    }
  } else {
    await Promise.all(resources.map((resource) => destroy(resource, options)));
  }
}
