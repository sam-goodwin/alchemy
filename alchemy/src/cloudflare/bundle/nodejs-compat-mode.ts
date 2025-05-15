import type { NodeJSCompatMode } from "miniflare";

/**
 * Computes and validates the Node.js compatibility mode we are running.
 *
 * NOTES:
 * - The v2 mode is configured via `nodejs_compat_v2` compat flag or via `nodejs_compat` plus a compatibility date of Sept 23rd. 2024 or later.
 * - See `EnvironmentInheritable` for `noBundle`.
 *
 * @param compatibilityDateStr The compatibility date
 * @param compatibilityFlags The compatibility flags
 * @param noBundle Whether to skip internal build steps and directly deploy script
 *
 */
export async function getNodeJSCompatMode(
  compatibilityDateStr: string,
  compatibilityFlags: string[],
  props?: {
    noBundle?: boolean;
  },
): Promise<NodeJSCompatMode> {
  const { getNodeCompat } = await import("miniflare");
  const {
    mode,
    hasNodejsCompatFlag,
    hasNodejsCompatV2Flag,
    hasExperimentalNodejsCompatV2Flag,
  } = getNodeCompat(compatibilityDateStr, compatibilityFlags);

  if (hasExperimentalNodejsCompatV2Flag) {
    throw new Error(
      "The `experimental:` prefix on `nodejs_compat_v2` is no longer valid. Please remove it and try again.",
    );
  }

  if (hasNodejsCompatFlag && hasNodejsCompatV2Flag) {
    throw new Error(
      "The `nodejs_compat` and `nodejs_compat_v2` compatibility flags cannot be used in together. Please select just one.",
    );
  }

  if (props?.noBundle && hasNodejsCompatV2Flag) {
    console.warn(
      "`nodejs_compat_v2` compatibility flag and `--no-bundle` can't be used together. If you want to polyfill Node.js built-ins and disable Wrangler's bundling, please polyfill as part of your own bundling process.",
    );
  }

  return mode;
}
