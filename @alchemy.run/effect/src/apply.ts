import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Option from "effect/Option";
import type { Simplify } from "effect/Types";
import { type PlanRejected, PlanReviewer } from "./approve.ts";
import type { ApplyEvent, ApplyStatus } from "./event.ts";
import type { AnyPlan, BindingAction, Delete } from "./plan.ts";
import type { SerializedStatement, Statement } from "./policy.ts";
import type { Resource } from "./resource.ts";
import { State } from "./state.ts";

export interface PlanStatusSession {
  emit: (event: ApplyEvent) => Effect.Effect<void>;
  done: () => Effect.Effect<void>;
}

export class PlanStatusReporter extends Context.Tag("PlanStatusReporter")<
  PlanStatusReporter,
  {
    start(plan: AnyPlan): Effect.Effect<PlanStatusSession, never>;
  }
>() {}

export const apply = <const P extends AnyPlan, Err, Req>(
  plan: Effect.Effect<P, Err, Req>,
) =>
  plan.pipe(
    Effect.flatMap((plan) =>
      Effect.gen(function* () {
        const state = yield* State;
        const outputs = {} as Record<string, Effect.Effect<any, any>>;
        const reviewer = yield* Effect.serviceOption(PlanReviewer);

        if (Option.isSome(reviewer)) {
          yield* reviewer.value.approve(plan);
        }

        const events = yield* Effect.serviceOption(PlanStatusReporter);

        const { emit, done } = Option.isSome(events)
          ? yield* events.value.start(plan)
          : ({
              emit: () => Effect.void,
              done: () => Effect.void,
            } satisfies PlanStatusSession);

        const apply = Effect.fn(function* (
          node:
            | (BindingAction<Statement> | SerializedStatement<Statement>)[]
            | Exclude<P[keyof P], undefined>,
        ) {
          if (Array.isArray(node)) {
            return yield* Effect.all(
              node.map((binding) => {
                const resourceId =
                  "stmt" in binding
                    ? binding.stmt.resource.id
                    : binding.resource.id;
                const resource = plan[resourceId];
                return !resource
                  ? Effect.dieMessage(`Resource ${resourceId} not found`)
                  : apply(resource as P[keyof P]);
              }),
            );
          }

          const checkpoint = <Out, Err>(
            effect: Effect.Effect<Out, Err, never>,
          ) =>
            effect.pipe(
              Effect.flatMap((output) =>
                state
                  .set(node.resource.id, {
                    id: node.resource.id,
                    type: node.resource.type,
                    status: node.action === "create" ? "created" : "updated",
                    props: node.resource.props,
                    output,
                    bindings: node.bindings.map((binding) => ({
                      ...binding.stmt,
                      resource: {
                        type: binding.stmt.resource.type,
                        id: binding.stmt.resource.id,
                      },
                    })),
                  })
                  .pipe(Effect.map(() => output)),
              ),
            );

          const hydrate = <A extends BindingAction<Statement>>(
            bindings: Statement[],
          ) =>
            node.bindings.map(
              (binding, i) =>
                Object.assign(binding, {
                  attributes: bindings[i],
                }) as A & {
                  attributes: any;
                },
            );

          const id = node.resource.id;

          return yield* (outputs[id] ??= yield* Effect.cached(
            Effect.gen(function* () {
              const report = (status: ApplyStatus) =>
                emit({
                  id,
                  type: node.resource.type,
                  status,
                });

              if (node.action === "noop") {
                // emit({
                //   id,
                //   type: node.resource.type,
                //   status: "noop",
                // });
                return (yield* state.get(id))?.output;
              } else if (node.action === "create") {
                const bindings = yield* apply(node.bindings);
                yield* report("creating");
                return yield* node.provider
                  .create({
                    id,
                    news: node.news,
                    bindings: hydrate(bindings),
                  })
                  .pipe(
                    checkpoint,
                    Effect.tap(() => report("created")),
                  );
              } else if (node.action === "update") {
                const bindings = yield* apply(node.bindings);
                yield* emit({
                  id,
                  type: node.resource.type,
                  status: "updating",
                });
                return yield* node.provider
                  .update({
                    id,
                    news: node.news,
                    olds: node.olds,
                    output: node.output,
                    bindings: hydrate(bindings),
                  })
                  .pipe(
                    checkpoint,
                    Effect.tap(() => report("updated")),
                  );
              } else if (node.action === "delete") {
                yield* Effect.all(
                  node.downstream.map((dep) =>
                    dep in plan ? apply(plan[dep] as P[keyof P]) : Effect.void,
                  ),
                );
                yield* report("deleting");

                return yield* node.provider
                  .delete({
                    id,
                    olds: node.olds,
                    output: node.output,
                  })
                  .pipe(
                    Effect.flatMap(() => state.delete(id)),
                    Effect.tap(() => report("deleted")),
                  );
              } else if (node.action === "replace") {
                const destroy = Effect.gen(function* () {
                  yield* report("deleting");
                  return yield* node.provider.delete({
                    id,
                    olds: node.olds,
                    output: node.output,
                  });
                });
                const create = Effect.gen(function* () {
                  yield* report("creating");
                  return yield* node.provider
                    .create({
                      id,
                      news: node.news,
                      // TODO(sam): these need to only include attach actions
                      bindings: hydrate(yield* apply(node.bindings)),
                    })
                    // TODO(sam): delete and create will conflict here, we need to extend the state store for replace
                    .pipe(
                      checkpoint,
                      Effect.tap(() => report("created")),
                    );
                });
                if (!node.deleteFirst) {
                  const outputs = yield* create;
                  yield* destroy;
                  return outputs;
                } else {
                  yield* destroy;
                  return yield* create;
                }
              }
            }),
          ));
        }) as (
          node: P[keyof P] | BindingAction<Statement>[],
        ) => Effect.Effect<any, never, never>;

        const resources: any = Object.fromEntries(
          yield* Effect.all(
            Object.entries(plan).map(
              Effect.fn(function* ([id, node]) {
                return [id, yield* apply(node as P[keyof P])];
              }),
            ),
          ),
        );
        yield* done();
        if (
          Object.values(plan).every((resource) => resource.action === "delete")
        ) {
          return undefined;
        }
        return resources;
      }),
    ),
  ) as Effect.Effect<
    {
      [id in keyof P]: P[id] extends
        | Delete<Resource, Statement>
        | undefined
        | never
        ? never
        : Simplify<P[id]["resource"]["attributes"]>;
    } extends infer O
      ? O extends {
          [key: string]: never;
        }
        ? undefined
        : O
      : never,
    Err | PlanRejected,
    Req
  >;
