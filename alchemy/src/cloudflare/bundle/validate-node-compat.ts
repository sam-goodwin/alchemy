import { logger } from "../../util/logger.ts";

interface ValidateNodeCompatProps {
  compatibilityDate: string;
  compatibilityFlags: string[];
  noBundle: boolean;
}

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
export function validateNodeCompat({
  compatibilityDate,
  compatibilityFlags,
  noBundle,
}: ValidateNodeCompatProps) {
  const {
    hasNodejsAlsFlag,
    hasNodejsCompatFlag,
    hasNodejsCompatV2Flag,
    hasNoNodejsCompatV2Flag,
    hasExperimentalNodejsCompatV2Flag,
  } = parseNodeCompatibilityFlags(compatibilityFlags);
  const nodeCompatSwitchOverDate = "2024-09-23";
  let mode: "v1" | "v2" | "als" | null = null;
  if (
    hasNodejsCompatV2Flag ||
    (hasNodejsCompatFlag &&
      compatibilityDate >= nodeCompatSwitchOverDate &&
      !hasNoNodejsCompatV2Flag)
  ) {
    mode = "v2";
  } else if (hasNodejsCompatFlag) {
    mode = "v1";
  } else if (hasNodejsAlsFlag) {
    mode = "als";
  }
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

  if (noBundle && hasNodejsCompatV2Flag) {
    logger.warn(
      "`nodejs_compat_v2` compatibility flag and `--no-bundle` can't be used together. If you want to polyfill Node.js built-ins and disable Wrangler's bundling, please polyfill as part of your own bundling process.",
    );
  }

  if (mode === "v1") {
    throw new Error(
      "You must set your compatibilty date >= 2024-09-23 when using 'nodejs_compat' compatibility flag",
    );
  }

  return mode;
}

function parseNodeCompatibilityFlags(compatibilityFlags: string[]) {
  return {
    hasNodejsAlsFlag: compatibilityFlags.includes("nodejs_als"),
    hasNodejsCompatFlag: compatibilityFlags.includes("nodejs_compat"),
    hasNodejsCompatV2Flag: compatibilityFlags.includes("nodejs_compat_v2"),
    hasNoNodejsCompatV2Flag: compatibilityFlags.includes("no_nodejs_compat_v2"),
    hasExperimentalNodejsCompatV2Flag: compatibilityFlags.includes(
      "experimental:nodejs_compat_v2",
    ),
  };
}
