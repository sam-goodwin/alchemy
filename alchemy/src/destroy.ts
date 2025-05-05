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
  type ResourceProps,
} from "./resource.js";
import { Scope } from "./scope.js";

export class DestroyedSignal extends Error {}

export interface DestroyOptions {
  quiet?: boolean;
  strategy?: "sequential" | "parallel";
  /**
   * This destroy operation is for a replaced resource
   *
   * The state of the resource should not be unpersisted.
   */
  replace?: {
    props: ResourceProps | undefined;
  };
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
    return await destroyScope(scope, options);
  } else {
    const [instance, options] = args;
    if (!instance) {
      return;
    }
    return await destroyResource(instance, options);
  }
}

export async function destroyScope(
  scope: Scope,
  options: DestroyOptions | undefined,
) {
  await destroy.all(
    [
      ...Array.from(scope.resources.values()),
      ...Object.values(await scope.state.all()).map((orphan) => ({
        ...orphan.output,
        [ResourceScope]: scope,
      })),
    ],
    options,
  );
  // finally, destroy the scope container
  await scope.deinit();
}

export async function destroyResource(
  instance: Resource,
  options: DestroyOptions | undefined,
) {
  if (!instance) {
    return;
  }

  const id = instance[ResourceID];
  const kind = instance[ResourceKind];
  const fqn = instance[ResourceFQN];
  const seq = instance[ResourceSeq];

  if (kind === "alchemy::Scope") {
    return await destroyScope(
      new Scope({
        parent: instance[ResourceScope],
        scopeName: id,
      }),
      options,
    );
  }

  const Provider: Provider | undefined = PROVIDERS.get(kind);
  if (!Provider) {
    // console.log(instance);
    throw new Error(
      `Cannot destroy resource "${fqn}" type "${kind}" - no provider found. You may need to import the provider in your alchemy.config.ts.`,
    );
  }

  // the scope containing this resource
  const scope = instance[ResourceScope];
  if (!scope) {
    console.warn(`Resource "${fqn}" has no scope`);
  }
  const quiet = options?.quiet ?? scope.quiet;

  if (!quiet) {
    console.log(`Delete:  "${fqn}"`);
  }

  const state = await scope.state.get(id);

  if (state === undefined) {
    return;
  }

  // if we're not already deleting a replaced resource
  // and this resource contains a record of an un-deleted replaced resource
  // then, we should delete the replaced resource first
  // TODO(sam): could we delete in parallel?
  if (options?.replace === undefined && state.replace !== undefined) {
    // we're destroying a resource that also has a pending replace
    await destroy(state.replace.output, {
      replace: state.replace,
    });
  }

  const ctx = context({
    scope,
    phase: "delete",
    kind,
    id,
    fqn,
    seq,
    props: state.props,
    state,
    replace: () => {
      throw new Error("Cannot replace a resource that is being deleted");
    },
  });

  // the scope of this resource instance
  const resourceScope = new Scope({
    parent: scope,
    scopeName: id,
    seq,
  });
  try {
    // TODO(sam): i forgot what this bug refers to
    // BUG: this does not restore persisted scope
    await resourceScope.run(async () => {
      return Provider.handler.bind(ctx)(
        id,
        // if replace is undefined, then this is a replace
        // replace.props could still be undefined
        options?.replace ? options.replace.props : state.props,
      );
    });
  } catch (err) {
    if (err instanceof DestroyedSignal) {
      // TODO: should we fail if the DestroyedSignal is not thrown?
    } else {
      throw err;
    }
  }

  // if this is not the delete of a replaced resource, then destroy the resource scope
  if (options?.replace === undefined) {
    // destroy it
    await destroy(resourceScope, options);
    // delete it from the scope state
    await scope.delete(id);
  } else {
    await scope.state.set(state.id, {
      ...state,
      replace: undefined,
    });
  }

  if (!quiet) {
    console.log(`Deleted: "${fqn}"`);
  }
}

export namespace destroy {
  export async function all(resources: Resource[], options?: DestroyOptions) {
    if (options?.strategy !== "parallel") {
      const sorted = resources.sort((a, b) => b[ResourceSeq] - a[ResourceSeq]);
      for (const resource of sorted) {
        await destroy(resource, options);
      }
    } else {
      await Promise.all(
        resources.map((resource) => destroy(resource, options)),
      );
    }
  }

  export async function sequentially(
    ...resources: (Resource<string> | undefined | null)[]
  ) {
    for (const resource of resources) {
      if (resource) {
        await destroy(resource);
      }
    }
  }
}
