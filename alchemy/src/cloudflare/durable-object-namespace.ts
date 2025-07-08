import type { Binding } from "./bindings.ts";

/**
 * Properties for creating a Durable Object Namespace
 */
export interface DurableObjectNamespaceProps {
  className: string;
  scriptName?: string | undefined;
  environment?: string | undefined;
  sqlite?: boolean | undefined;
  namespaceId?: string | undefined;
}

export type DurableObjectNamespace<T = any> = {
  type: "durable_object_namespace";
  id: string;
  className: string;
  scriptName?: string;
  environment?: string;
  sqlite?: boolean;
  namespaceId?: string;
  // @ts-ignore - phantom type
  __service__: T;
};

export function isDurableObjectNamespace(
  binding: Binding,
): binding is DurableObjectNamespace {
  return (
    typeof binding === "object" && binding.type === "durable_object_namespace"
  );
}

/**
 * Creates a Durable Object namespace binding.
 *
 * @example
 * ```ts
 * // Create a basic Durable Object namespace for stateful chat rooms
 * const rooms = DurableObjectNamespace("chat-rooms", {
 *   className: "ChatRoom"
 * });
 * ```
 *
 * @example
 * ```ts
 * // Create a Durable Object with SQLite storage for user data
 * const users = DurableObjectNamespace("user-store", {
 *   className: "User",
 *   sqlite: true
 * });
 * ```
 *
 * @example
 * ```ts
 * // Create a Durable Object in production for game state management
 * const game = DurableObjectNamespace("game-state", {
 *   className: "GameState",
 *   scriptName: "game-worker",
 *   environment: "production"
 * });
 * ```
 */
export function DurableObjectNamespace<T = any>(
  id: string,
  props: DurableObjectNamespaceProps,
): DurableObjectNamespace<T> {
  return {
    type: "durable_object_namespace",
    id,
    className: props.className,
    scriptName: props.scriptName,
    environment: props.environment,
    sqlite: props.sqlite,
    namespaceId: props.namespaceId,
    __service__: undefined!,
  };
}
