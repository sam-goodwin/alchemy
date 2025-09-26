import * as Context from "effect/Context";

export class Assets extends Context.Tag("AWS::Assets")<
  Assets,
  {
    bucketName: string;
  }
>() {}
