import type { Statement } from "./policy.ts";
import type { Resource } from "./resource.ts";

export type Binding<
  From extends Resource = Resource,
  To extends Statement = Statement,
> = {
  type: "bound";
  resource: From;
  bindings: To[];
  props: Exclude<From["provider"]["Service"]["props"], undefined>;
  // /**
  //  * The main file to use for the function.
  //  */
  // main: string;
  // /**
  //  * The handler to use for the function.
  //  * @default "default"
  //  */
  // handler?: string;
};

export const isBinding = (value: any): value is Binding =>
  value && typeof value === "object" && value.type === "bound";
