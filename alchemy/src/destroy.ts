import { alchemy } from "./alchemy.ts";
import { context } from "./context.ts";
import {
  resolveDeletionHandler,
  type Resource,
  ResourceFQN,
  ResourceID,
  ResourceKind,
  type ResourceProps,
  ResourceScope,
  ResourceSeq,
} from "./resource.ts";
import { isScope, type PendingDeletions, Scope } from "./scope.ts";
import { formatFQN } from "./util/cli.ts";
import { logger } from "./util/logger.ts";

export class DestroyedSignal extends Error {}

export interface DestroyOptions {
  quiet?: boolean;
  strategy?: "sequential" | "parallel";
  replace?: {
    props?: ResourceProps | undefined;
    output?: Resource<string>;
  };
}

function isScopeArgs(a: any): a is [scope: Scope, options?: DestroyOptions] {
  return isScope(a[0]);
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

    await scope.run(async () => {
      // destroy all active and pending resources
      await scope.destroyPendingDeletions();
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
    });

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
    return await destroy(scope, options);
  }

  const Provider = resolveDeletionHandler(instance[ResourceKind]);
  if (!Provider) {
    throw new Error(
      `Cannot destroy resource "${instance[ResourceFQN]}" type ${instance[ResourceKind]} - no provider found. You may need to import the provider in your alchemy.run.ts.`,
    );
  }

  const scope = instance[ResourceScope];
  if (!scope) {
    logger.warn(`Resource "${instance[ResourceFQN]}" has no scope`);
  }
  const quiet = options?.quiet ?? scope.quiet;

  try {
    if (!quiet) {
      logger.task(instance[ResourceFQN], {
        prefix: options?.replace ? "cleanup" : "deleting",
        prefixColor: options?.replace ? "magenta" : "redBright",
        resource: formatFQN(instance[ResourceFQN]),
        message: options?.replace
          ? "Cleaning Up Old Resource..."
          : "Deleting Resource...",
      });
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
      props: options?.replace?.props ?? state.props,
      state,
      isReplacement: false,
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
          nestedScope = options?.replace?.props == null ? scope : undefined;
          return await Provider.handler.bind(ctx)(
            instance[ResourceID],
            options?.replace?.props ?? state.props!,
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

    if (options?.replace == null) {
      if (nestedScope) {
        await destroy(nestedScope, options);
      }
      await scope.deleteResource(instance[ResourceID]);
    } else {
      let pendingDeletions =
        await state.output[ResourceScope].get<PendingDeletions>(
          "pendingDeletions",
        );
      pendingDeletions = pendingDeletions?.filter(
        (deletion) => deletion.resource[ResourceID] !== instance[ResourceID],
      );
      await scope.set("pendingDeletions", pendingDeletions);
    }

    if (!quiet) {
      logger.task(instance[ResourceFQN], {
        prefix: options?.replace ? "cleaned" : "deleted",
        prefixColor: "greenBright",
        resource: formatFQN(instance[ResourceFQN]),
        message: options?.replace
          ? "Old Resource Cleanup Complete"
          : "Deleted Resource",
        status: "success",
      });
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

export async function destroyAll(
  resources: Resource[],
  options?: DestroyOptions & { force?: boolean },
) {
  if (options?.strategy !== "parallel") {
    const sorted = resources.sort((a, b) => b[ResourceSeq] - a[ResourceSeq]);
    for (const resource of sorted) {
      if (isScope(resource)) {
        await resource.destroyPendingDeletions();
      }
      await destroy(resource, options);
    }
  } else {
    await Promise.all(resources.map((resource) => destroy(resource, options)));
  }
}
