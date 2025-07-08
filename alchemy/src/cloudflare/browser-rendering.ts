export type BrowserRendering = {
  type: "browser";
};

/**
 * Creates a browser rendering binding for running browser tasks in Workers.
 *
 * @example
 * ```ts
 * const browser = BrowserRendering();
 * ```
 */
export function BrowserRendering(): BrowserRendering {
  return {
    type: "browser",
  };
}
