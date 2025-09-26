import type * as Context from "effect/Context";

export type ResourceID = string;

export type ResourceProps = Record<string, any>;

export type Resource<
  Type extends string = string,
  ID extends ResourceID = ResourceID,
  Props extends ResourceProps = ResourceProps,
  Attributes extends Record<string, any> = Record<string, any>,
  Provider extends Context.Tag<any, any> = Context.Tag<any, any>,
> = {
  type: Type;
  id: ID;
  props: Props;
  /** @internal phantom type */
  attributes: Attributes;
  provider: Provider;
};
