import { alchemy } from "./alchemy";
import { context } from "./context";
import {
  PROVIDERS,
  type PendingResource,
  type Provider,
  type Resource,
  type ResourceProps,
} from "./resource";
import type { State } from "./state";
import { serialize } from "./util/serde";

export interface ApplyOptions {
  quiet?: boolean;
  alwaysUpdate?: boolean;
}

export async function apply<Out extends Resource>(
  resource: PendingResource<Out>,
  props: ResourceProps | undefined,
  options?: ApplyOptions,
): Promise<Awaited<Out>> {
  const scope = resource.Scope;
  try {
    const quiet = props?.quiet ?? scope.quiet;
    await scope.init();
    let state: State | undefined = (await scope.state.get(resource.ID))!;
    const provider: Provider = PROVIDERS.get(resource.Kind);
    if (provider === undefined) {
      throw new Error(`Provider "${resource.Kind}" not found`);
    }
    if (state === undefined) {
      state = {
        kind: resource.Kind,
        id: resource.ID,
        fqn: resource.FQN,
        seq: resource.Seq,
        status: "creating",
        data: {},
        output: {
          ID: resource.ID,
          FQN: resource.FQN,
          Kind: resource.Kind,
          Scope: scope,
          Seq: resource.Seq,
        },
        // deps: [...deps],
        props,
      };
      await scope.state.set(resource.ID, state);
    }

    const alwaysUpdate =
      options?.alwaysUpdate ?? provider.options?.alwaysUpdate ?? false;

    // Skip update if inputs haven't changed and resource is in a stable state
    if (state.status === "created" || state.status === "updated") {
      if (
        JSON.stringify(state.props) ===
          JSON.stringify(await serialize(scope, props)) &&
        alwaysUpdate !== true
      ) {
        if (!quiet) {
          console.log(`Skip:    "${resource.FQN}" (no changes)`);
        }
        // if (resourceState.output !== undefined) {
        //   resource[Provide](resourceState.output);
        // }
        return state.output as Awaited<Out>;
      }
    }

    const phase = state.status === "creating" ? "create" : "update";
    state.status = phase === "create" ? "creating" : "updating";
    state.oldProps = state.props;
    state.props = props;

    if (!quiet) {
      console.log(
        `${phase === "create" ? "Create" : "Update"}:  "${resource.FQN}"`,
      );
    }

    await scope.state.set(resource.ID, state);

    let isReplaced = false;

    const ctx = context({
      scope,
      phase,
      kind: resource.Kind,
      id: resource.ID,
      fqn: resource.FQN,
      seq: resource.Seq,
      props: state.oldProps,
      state,
      replace: () => {
        if (isReplaced) {
          console.warn(
            `Resource ${resource.Kind} ${resource.FQN} is already marked as REPLACE`,
          );
          return;
        }
        isReplaced = true;
      },
    });

    const output = await alchemy.run(resource.ID, async () =>
      provider.handler.bind(ctx)(resource.ID, props),
    );

    if (!quiet) {
      console.log(
        `${phase === "create" ? "Created" : "Updated"}: "${resource.FQN}"`,
      );
    }

    await scope.state.set(resource.ID, {
      kind: resource.Kind,
      id: resource.ID,
      fqn: resource.FQN,
      seq: resource.Seq,
      data: state.data,
      status: phase === "create" ? "created" : "updated",
      output,
      props,
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
