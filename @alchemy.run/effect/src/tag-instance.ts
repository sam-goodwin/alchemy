export type TagInstance<T> = T extends new (_: never) => infer R ? R : never;
