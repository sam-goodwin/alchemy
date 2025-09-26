import * as Context from "effect/Context";

export class Reporter extends Context.Tag("Reporter")<
  Reporter,
  {
    report: (event: Event) => void;
  }
>() {}
