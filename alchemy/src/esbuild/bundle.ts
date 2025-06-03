import type esbuild from "esbuild";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import type { Context } from "../context.ts";
import { Resource } from "../resource.ts";

/**
 * Properties for creating or updating an esbuild bundle
 */
export interface BundleProps extends Partial<esbuild.BuildOptions> {
  /**
   * Entry point for the bundle
   * Path to the source file to bundle (e.g., "src/handler.ts")
   */
  entryPoint: string;

  /**
   * Output directory for the bundle
   * Directory where the bundled file will be written
   */
  outdir?: string;

  /**
   * Output filename for the bundle
   * Full path to the output file, overrides outdir if specified
   */
  outfile?: string;

  /**
   * Bundle format
   * iife: Immediately Invoked Function Expression
   * cjs: CommonJS
   * esm: ECMAScript Modules
   */
  format?: "iife" | "cjs" | "esm";

  /**
   * Target environment
   * Examples: 'node16', 'node18', 'es2020'
   */
  target?: string | string[];

  /**
   * Whether to minify the output
   */
  minify?: boolean;

  /**
   * Whether to generate sourcemaps
   * inline: Include sourcemap in bundle
   * external: Generate separate .map file
   * both: Generate both inline and external
   */
  sourcemap?: boolean | "inline" | "external" | "both";

  /**
   * External packages to exclude from bundle
   * Array of package names to mark as external
   */
  external?: string[];

  /**
   * Platform to target
   * browser: Browser environment
   * node: Node.js environment
   * neutral: Platform-agnostic
   */
  platform?: "browser" | "node" | "neutral";
}

/**
 * Describes the output of the bundling process, including optional source map.
 */
export interface BundleOutput {
  /**
   * Path to the main bundled file (if written to disk)
   * Absolute or relative path to the generated bundle
   */
  path?: string;

  /**
   * SHA-256 hash of the bundle contents
   * Used for cache busting and content verification
   */
  hash: string;

  /**
   * The content of the bundle (the .js or .mjs file)
   */
  content: string;

  /**
   * Details of the generated source map, if any.
   */
  sourceMap?: {
    /**
     * Path to the .map file (if written to disk and `props.write` was true)
     */
    path?: string;
    /**
     * Filename of the .map file (e.g., "index.js.map")
     */
    name: string;
    /**
     * Content of the .map file
     */
    content: string;
  };
}

/**
 * Output returned after bundle creation/update
 */
export interface Bundle<P extends BundleProps = BundleProps>
  extends Resource<"esbuild::Bundle">,
    Omit<P, 'entryPoint' | 'outdir' | 'outfile' | 'format' | 'target' | 'minify' | 'sourcemap' | 'external' | 'platform'>, // Omit esbuild.BuildOptions to avoid conflict
    BundleProps, // Re-include BundleProps for clarity on what the resource itself holds
    BundleOutput {}

/**
 * esbuild Bundle Resource
 *
 * Creates and manages bundled JavaScript/TypeScript files using esbuild.
 * Supports various output formats, sourcemaps, and platform targets.
 *
 * @example
 * // Bundle a TypeScript file for Node.js
 * const bundle = await Bundle("handler", {
 *   entryPoint: "src/handler.ts",
 *   outdir: ".alchemy/.out",
 *   format: "esm",
 *   platform: "node",
 *   target: "node18"
 * });
 */
export const Bundle = Resource(
  "esbuild::Bundle",
  {
    alwaysUpdate: true,
  },
  async function <Props extends BundleProps>(
    this: Context<Bundle<any>>,
    _id: string,
    props: Props,
  ): Promise<Bundle<Props>> {
    if (this.phase === "delete") {
      if (this.output.path) {
        try {
          await fs.rm(this.output.path, { force: true });
        } catch (error) {
          if (error instanceof Error && error.message.includes("ENOENT")) {
            // File doesn't exist, so we can ignore the error
          } else {
            throw error;
          }
        }
      }
      return this.destroy();
    }

    const result = await bundle(props);

    let mainBundlePath: string | undefined;
    let mainBundleContent: string | undefined;
    let mainBundleHash: string | undefined;
    let sourceMapOutput: BundleOutput['sourceMap'] | undefined;

    const esbuildWriteBehavior = !(props.outdir === undefined && props.outfile === undefined);

    if (result.outputFiles && result.outputFiles.length > 0) {
      // esbuild was run with write: false, results are in memory
      for (const outputFile of result.outputFiles) {
        if (outputFile.path.endsWith(".map")) {
          sourceMapOutput = {
            name: path.basename(outputFile.path),
            content: outputFile.text,
            // path will be the full path esbuild assigned, could be useful
            path: outputFile.path,
          };
        } else {
          mainBundlePath = outputFile.path; // This is an in-memory path from esbuild
          mainBundleContent = outputFile.text;
          mainBundleHash = crypto.createHash("sha256").update(mainBundleContent).digest("hex");
        }
      }
      // If path was determined by outfile, use that as the primary path identifier
      // otherwise esbuild generates a path relative to entrypoint in outdir for outputFiles
      if (props.outfile) {
        mainBundlePath = path.resolve(props.outfile);
      } else if (props.outdir && mainBundlePath) {
         // If outdir is specified, the path in outputFiles is often <outdir>/<entrypoint_basename>.js
         // We might want to ensure this path is correctly relative or absolute as expected.
         // For now, let's assume the path from esbuild is what we want to expose.
      }


    } else if (result.metafile && result.metafile.outputs && esbuildWriteBehavior) {
      // esbuild was run with write: true, files are on disk, use metafile
      for (const [outputPath, outputMeta] of Object.entries(result.metafile.outputs)) {
        // The entryPoint in outputMeta is relative to the current working directory if `absWorkingDir` is not set,
        // or relative to `absWorkingDir` if it is.
        // We need to compare it to props.entryPoint, which might be relative or absolute.
        const resolvedOutputEntryPoint = outputMeta.entryPoint ? path.resolve(props.absWorkingDir ?? process.cwd(), outputMeta.entryPoint) : undefined;
        const resolvedPropsEntryPoint = path.resolve(props.absWorkingDir ?? process.cwd(), props.entryPoint);

        if (outputMeta.entryPoint && resolvedOutputEntryPoint === resolvedPropsEntryPoint) {
          if (outputPath.endsWith(".map")) {
            // This is a source map associated with our main entry point
            // but esbuild usually puts the map for the main output, not for the entrypoint itself if it's an input.
            // This logic might need refinement if there are multiple entry points or complex output structures.
            // For a single entry point, the .map file will be sibling to the output JS.
          } else {
            mainBundlePath = path.resolve(outputPath);
            mainBundleContent = await fs.readFile(mainBundlePath, "utf-8");
            mainBundleHash = crypto.createHash("sha256").update(mainBundleContent).digest("hex");
            // Check for an associated source map file
            const potentialMapPath = mainBundlePath + ".map";
            if (result.metafile.outputs[potentialMapPath.substring(path.resolve(props.absWorkingDir ?? process.cwd()).length +1 )] || result.metafile.outputs[potentialMapPath.substring(process.cwd().length +1)]) {
               // Need to check both relative to absWorkingDir and cwd for robustness if metafile paths are inconsistent
              const mapKey = Object.keys(result.metafile.outputs).find(p => path.resolve(props.absWorkingDir ?? process.cwd(), p) === potentialMapPath);
              if (mapKey) {
                sourceMapOutput = {
                  name: path.basename(potentialMapPath),
                  content: await fs.readFile(potentialMapPath, "utf-8"),
                  path: potentialMapPath,
                };
              }
            }
          }
        }
      }
       // Fallback for finding the main output and its map if entryPoint matching is tricky
      if (!mainBundleContent && Object.keys(result.metafile.outputs).length > 0) {
        for (const [outputPath, outputMeta] of Object.entries(result.metafile.outputs)) {
            if (!outputPath.endsWith('.map') && !outputPath.endsWith('.map.json') && outputMeta.entryPoint) { // Assuming main output has an entry point
                mainBundlePath = path.resolve(outputPath);
                mainBundleContent = await fs.readFile(mainBundlePath, "utf-8");
                mainBundleHash = crypto.createHash("sha256").update(mainBundleContent).digest("hex");
                const potentialMapPath = mainBundlePath + ".map";
                const mapKey = Object.keys(result.metafile.outputs).find(p => path.resolve(props.absWorkingDir ?? process.cwd(), p) === potentialMapPath);
                if (mapKey) {
                    sourceMapOutput = {
                        name: path.basename(potentialMapPath),
                        content: await fs.readFile(potentialMapPath, "utf-8"),
                        path: potentialMapPath,
                    };
                }
                break; // Found a candidate for main output
            }
        }
      }
    }


    if (!mainBundleContent) {
      // If content is still not found, try to get it from the first output file if outfile was specified.
      // This is a fallback if metafile parsing was not conclusive for 'write: true'
      if (props.outfile && esbuildWriteBehavior) {
         try {
            mainBundlePath = path.resolve(props.outfile);
            mainBundleContent = await fs.readFile(mainBundlePath, "utf-8");
            mainBundleHash = crypto.createHash("sha256").update(mainBundleContent).digest("hex");
            // Try to find map file by convention
            const potentialMapPath = mainBundlePath + ".map";
            if (await fs.access(potentialMapPath).then(() => true).catch(() => false)) {
                 sourceMapOutput = {
                    name: path.basename(potentialMapPath),
                    content: await fs.readFile(potentialMapPath, "utf-8"),
                    path: potentialMapPath,
                 };
            }
         } catch (e) {
            // Could not read outfile, proceed to throw
         }
      }
      if (!mainBundleContent) {
         throw new Error("Failed to create bundle or extract main bundle content.");
      }
    }
    
    // The `path` property in the output should be the path to the main JS bundle.
    // If `props.outfile` is specified, that's the definitive path.
    // If `props.outdir` is specified, esbuild creates `<outdir>/<entrypoint_basename>.js`.
    // If neither, and `write:false`, `mainBundlePath` from `outputFiles` is an in-memory esbuild path.
    // If neither, and `write:true` (implicit outdir '.out'), `mainBundlePath` is the disk path.

    let finalPathProperty: string | undefined = undefined;
    if (props.outfile) {
        finalPathProperty = path.resolve(props.outfile);
    } else if (props.outdir && mainBundlePath && (esbuildWriteBehavior || result.metafile?.outputs[mainBundlePath.substring(path.resolve(props.absWorkingDir ?? process.cwd()).length+1)] )) {
        // If outdir is set, and we have a mainBundlePath (either from disk or memory that esbuild named based on outdir)
        // ensure it's resolved correctly.
        finalPathProperty = path.resolve(mainBundlePath);
    } else if (mainBundlePath && !esbuildWriteBehavior) {
        // In-memory path from outputFiles, not necessarily a disk path.
        // The concept of 'path' here might be just the name of the main output if not written.
        // Let's use the basename if no outdir/outfile guided its location.
        finalPathProperty = path.basename(mainBundlePath);
    } else if (mainBundlePath && esbuildWriteBehavior) {
        finalPathProperty = path.resolve(mainBundlePath);
    }


    return this({
      ...props,
      path: finalPathProperty as Props extends { outdir: string } | { outfile: string } ? string : undefined,
      hash: mainBundleHash!,
      content: mainBundleContent!,
      sourceMap: sourceMapOutput,
    });
  },
);

export async function bundle(props: BundleProps) {
  const { entryPoint, ...rest } = props;
  const options: esbuild.BuildOptions = {
    ...rest,
    // Determine write behavior: if outdir or outfile is specified, write to disk.
    // Otherwise, esbuild returns outputFiles in memory (if write is false).
    write: !(props.outdir === undefined && props.outfile === undefined),
    entryPoints: [entryPoint],
    outdir: props.outdir,
    outfile: props.outfile,
    bundle: true,
    // format, target, minify, sourcemap, external, platform are passed via ...rest
    // but ensure sourcemap defaults correctly if boolean true means external
    sourcemap: props.sourcemap === true ? 'external' : props.sourcemap,
    metafile: true, // Always true to help locate outputs
  };
  // Clean up options that should not be undefined if not provided by user
  if (!props.outdir && !props.outfile) options.outdir = undefined; // esbuild needs outdir OR outfile, or neither if write=false.
                                                                 // If both undefined and write=true, esbuild defaults to '.out'.
                                                                 // If both undefined and write=false, it's fine.
  if (props.outfile) options.outdir = undefined; // outfile takes precedence over outdir for esbuild

  if (process.env.DEBUG) {
    console.log("esbuild options:", options);
  }
  const esbuild = await import("esbuild");
  return await esbuild.build(options);
}
