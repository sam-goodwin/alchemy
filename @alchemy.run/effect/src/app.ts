import * as Context from "effect/Context";
import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";

export class App extends Context.Tag("App")<
  App,
  {
    name: string;
    stage: string;
  }
>() {}

export class FailedToParseArg extends Data.TaggedError("FailedToParseArg")<{
  message: string;
  arg: string;
}> {}

const parseArg = Effect.fn(function* (arg: string, defaultValue?: string) {
  const i = process.argv.indexOf(arg);
  return i !== -1 && i + 1 < process.argv.length
    ? process.argv[i + 1]
    : (defaultValue ??
        (yield* Effect.fail(
          new FailedToParseArg({
            message: `Argument ${arg} not found`,
            arg: arg,
          }),
        )));
});

export const fromArgs = Layer.effect(
  App,
  Effect.gen(function* () {
    return App.of({
      name: yield* parseArg("--app"),
      stage: yield* parseArg("--stage"),
    });
  }),
);

export const app = (input: { name: string; stage: string }) =>
  Layer.succeed(App, App.of(input));
