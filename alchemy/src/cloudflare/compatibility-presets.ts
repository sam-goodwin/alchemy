/**
 * Compatibility presets for Cloudflare Workers
 * 
 * These presets provide common sets of compatibility flags to avoid
 * users having to remember which flags they need for common use cases.
 */

/**
 * Mapping of compatibility presets to their respective compatibility flags
 */
export const COMPATIBILITY_PRESETS = {
  /**
   * Node.js compatibility preset
   * Enables Node.js APIs and runtime compatibility
   */
  node: ["nodejs_compat"],
} as const;

export type CompatibilityPreset = keyof typeof COMPATIBILITY_PRESETS;

/**
 * Union preset compatibility flags with user-provided flags
 */
export function unionCompatibilityFlags(
  preset: CompatibilityPreset | undefined,
  userFlags: string[] = []
): string[] {
  if (!preset) {
    return userFlags;
  }
  
  const presetFlags = COMPATIBILITY_PRESETS[preset];
  return Array.from(new Set([...presetFlags, ...userFlags]));
}