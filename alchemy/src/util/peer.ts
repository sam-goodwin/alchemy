import {
  detectPackageManager,
  type PackageManager,
} from "./detect-package-manager.ts";

export class PeerDependencyError extends Error {
  public missing: string[];
  public packageManager: PackageManager = "npm";
  public feature?: string;

  constructor(input: {
    feature?: string;
    missing: string[];
    packageManager?: PackageManager;
  }) {
    super(
      [
        `Missing peer ${input.missing.length} ${input.missing.length === 1 ? "dependency" : "dependencies"}${input.feature ? ` for ${input.feature}` : ""}:`,
        ...input.missing.map((dep) => `- "${dep}"`),
        "",
        "Please install with:",
        `  ${input.packageManager ?? "npm"} install ${input.missing.join(" ")}`,
      ].join("\n"),
    );
    this.missing = input.missing;
    this.packageManager = input.packageManager ?? "npm";
    this.feature = input.feature;
  }
}

export async function importPeer<T>(
  name: string,
  promise: Promise<T>,
  feature?: string,
) {
  try {
    return await promise;
  } catch {
    throw new PeerDependencyError({
      feature,
      missing: [name],
      packageManager: await detectPackageManager(),
    });
  }
}
