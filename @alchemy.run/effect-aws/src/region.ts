import * as Context from "effect/Context";
import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";

export class Region extends Context.Tag("AWS::Region")<Region, string>() {}

export const of = (region: string) => Layer.succeed(Region, region);

export const fromEnvOrElse = (region: string) =>
  Layer.succeed(Region, process.env.AWS_REGION ?? region);

export class EnvironmentVariableNotSet extends Data.TaggedError(
  "EnvironmentVariableNotSet",
)<{
  message: string;
  variable: string;
}> {}

export const fromEnv = Layer.effect(
  Region,
  Effect.gen(function* () {
    const region = process.env.AWS_REGION;
    if (!region) {
      return yield* Effect.fail(
        new EnvironmentVariableNotSet({
          message: "AWS_REGION is not set",
          variable: "AWS_REGION",
        }),
      );
    }
    return region;
  }),
);
