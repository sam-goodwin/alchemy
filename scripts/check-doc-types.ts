#!/usr/bin/env bun

/**
 * TypeScript Documentation Type Checker
 *
 * This script extracts TypeScript code blocks from markdown documentation files
 * and performs type checking using the TypeScript compiler API with @typescript/vfs.
 *
 * Features:
 * - Extracts TypeScript code blocks (```ts, ```typescript, ```tsx)
 * - Moves import statements to the top level of the virtual file
 * - Wraps code blocks in async functions to support await expressions
 * - Uses FS-backed virtual file system to resolve local modules (like alchemy)
 * - Provides detailed error reporting with line/column numbers
 * - Prevents variable redeclaration conflicts between code blocks
 *
 * Usage:
 *   bun ./scripts/check-doc-types.ts <markdown-file>
 *
 * Examples:
 *   bun ./scripts/check-doc-types.ts ./README.md
 *   bun ./scripts/check-doc-types.ts ./docs/guide.md
 *
 * Exit codes:
 *   0 - All TypeScript code blocks passed type checking
 *   1 - Type errors found or other issues
 */

import * as tsvfs from "@typescript/vfs";
import * as fs from "node:fs";
import * as path from "node:path";
import * as ts from "typescript";

/**
 * Extract TypeScript code blocks from markdown content
 */
export function extractTypeScriptCodeBlocks(markdown: string): string[] {
  const codeBlocks: string[] = [];

  // Match TypeScript code blocks with various language identifiers
  const tsCodeBlockRegex = /```(?:typescript|ts|tsx)\n([\s\S]*?)```/g;

  let match;
  while ((match = tsCodeBlockRegex.exec(markdown)) !== null) {
    const code = match[1].trim();
    if (code) {
      codeBlocks.push(code);
    }
  }

  return codeBlocks;
}

/**
 * Create a virtual TypeScript file from code blocks
 */
export function createVirtualFile(codeBlocks: string[]): string {
  const imports = new Set<string>();
  const processedBlocks: string[] = [];

  // Process each code block to extract imports and wrap remaining code
  codeBlocks.forEach((block, index) => {
    const lines = block.split("\n");
    const blockImports: string[] = [];
    const blockCode: string[] = [];

    // Separate imports from other code
    lines.forEach((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("import ") || trimmed.startsWith("export ")) {
        imports.add(line);
        blockImports.push(`// ${line} (moved to top)`);
      } else {
        blockCode.push(line);
      }
    });

    // Create wrapped block
    const wrappedCode = `// --- Code block ${index + 1} ---
(async () => {
${blockImports.join("\n")}
${blockCode.map((line) => `  ${line}`).join("\n")}
})();`;

    processedBlocks.push(wrappedCode);
  });

  // Combine everything
  const header = `// Virtual file created from markdown code blocks
// This file is used for type checking only

`;

  const importSection = `${Array.from(imports).join("\n")}\n\n`;
  const bodySection = processedBlocks.join("\n\n");

  return `${header}${importSection}${bodySection}`;
}

/**
 * Type-check TypeScript code blocks from markdown content
 */
export function typeCheckMarkdown(markdownContent: string): {
  success: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  try {
    // Extract TypeScript code blocks from markdown
    const codeBlocks = extractTypeScriptCodeBlocks(markdownContent);

    if (codeBlocks.length === 0) {
      return { success: true, errors: [] };
    }

    // Create virtual file content
    const virtualFileContent = createVirtualFile(codeBlocks);
    const virtualFileName = "virtual-doc.ts";

    // Create compiler options based on the project's tsconfig
    const compilerOptions: ts.CompilerOptions = {
      target: ts.ScriptTarget.ESNext,
      module: ts.ModuleKind.Preserve,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
      allowJs: true,
      noEmit: true,
      jsx: ts.JsxEmit.ReactJSX,
    };

    // Create file system map with TypeScript lib files
    const fsMap = tsvfs.createDefaultMapFromNodeModules(compilerOptions);

    // Add our virtual file
    fsMap.set(virtualFileName, virtualFileContent);

    // Create FS-backed system that can resolve modules from the real file system
    const projectRoot = process.cwd();
    const system = tsvfs.createFSBackedSystem(fsMap, projectRoot, ts);

    // Create virtual TypeScript environment
    const env = tsvfs.createVirtualTypeScriptEnvironment(
      system,
      [virtualFileName],
      ts,
      compilerOptions,
    );

    // Get diagnostics (type errors)
    const syntacticDiagnostics =
      env.languageService.getSyntacticDiagnostics(virtualFileName);
    const semanticDiagnostics =
      env.languageService.getSemanticDiagnostics(virtualFileName);

    const allDiagnostics = [...syntacticDiagnostics, ...semanticDiagnostics];

    // Create format host for diagnostic formatting
    const formatHost: ts.FormatDiagnosticsHost = {
      getCurrentDirectory: () => process.cwd(),
      getCanonicalFileName: (fileName: string) => fileName,
      getNewLine: () => ts.sys.newLine,
    };

    // Format diagnostics using TypeScript's built-in formatter
    if (allDiagnostics.length > 0) {
      const formattedDiagnostics = ts.formatDiagnostics(
        allDiagnostics,
        formatHost,
      );
      errors.push(formattedDiagnostics.trim());
    }

    return {
      success: errors.length === 0,
      errors,
    };
  } catch (error) {
    return {
      success: false,
      errors: [`Type checking failed: ${error}`],
    };
  }
}

/**
 * Main function to check types in a markdown file
 */
async function checkDocTypes(markdownPath: string): Promise<void> {
  console.log(`Checking types in: ${markdownPath}`);

  // Verify file exists
  if (!fs.existsSync(markdownPath)) {
    console.error(`❌ File not found: ${markdownPath}`);
    process.exit(1);
  }

  // Read markdown file
  const markdownContent = fs.readFileSync(markdownPath, "utf-8");

  // Extract TypeScript code blocks
  const codeBlocks = extractTypeScriptCodeBlocks(markdownContent);

  if (codeBlocks.length === 0) {
    console.log("✅ No TypeScript code blocks found in the markdown file.");
    return;
  }

  console.log(`📄 Found ${codeBlocks.length} TypeScript code block(s)`);

  // Create virtual file content
  const virtualFileContent = createVirtualFile(codeBlocks);
  const virtualFileName = "virtual-doc.ts";

  // Create compiler options based on the project's tsconfig
  const compilerOptions: ts.CompilerOptions = {
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.Preserve,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    // Let TypeScript use default lib files based on target
    strict: true,
    esModuleInterop: true,
    skipLibCheck: true,
    allowJs: true,
    noEmit: true,
    jsx: ts.JsxEmit.ReactJSX,
  };

  try {
    // Create file system map with TypeScript lib files
    console.log("📦 Loading TypeScript library files...");
    const fsMap = tsvfs.createDefaultMapFromNodeModules(compilerOptions);

    // Add our virtual file
    fsMap.set(virtualFileName, virtualFileContent);

    // Create FS-backed system that can resolve modules from the real file system
    // This allows it to find @types/node, alchemy package, and other dependencies
    // while still using the virtual file system for our documentation code
    const projectRoot = process.cwd();
    const system = tsvfs.createFSBackedSystem(fsMap, projectRoot, ts);

    // Create virtual TypeScript environment
    const env = tsvfs.createVirtualTypeScriptEnvironment(
      system,
      [virtualFileName],
      ts,
      compilerOptions,
    );

    // Get diagnostics (type errors)
    const syntacticDiagnostics =
      env.languageService.getSyntacticDiagnostics(virtualFileName);
    const semanticDiagnostics =
      env.languageService.getSemanticDiagnostics(virtualFileName);

    const allDiagnostics = [...syntacticDiagnostics, ...semanticDiagnostics];

    if (allDiagnostics.length === 0) {
      console.log("✅ All TypeScript code blocks passed type checking!");
      return;
    }

    // Create format host for diagnostic formatting
    const formatHost: ts.FormatDiagnosticsHost = {
      getCurrentDirectory: () => process.cwd(),
      getCanonicalFileName: (fileName: string) => fileName,
      getNewLine: () => ts.sys.newLine,
    };

    // Report errors using TypeScript's built-in formatter
    console.log(`❌ Found ${allDiagnostics.length} type error(s):\n`);

    const formattedDiagnostics = ts.formatDiagnostics(
      allDiagnostics,
      formatHost,
    );
    console.log(formattedDiagnostics);

    process.exit(1);
  } catch (error) {
    console.error("❌ Error during type checking:", error);
    process.exit(1);
  }
}

/**
 * CLI entry point
 */
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error("Usage: bun ./scripts/check-doc-types.ts <markdown-file>");
    console.error("Example: bun ./scripts/check-doc-types.ts ./README.md");
    process.exit(1);
  }

  const markdownPath = path.resolve(args[0]);
  checkDocTypes(markdownPath).catch((error) => {
    console.error("❌ Unexpected error:", error);
    process.exit(1);
  });
}

// Run if this script is executed directly
if (import.meta.main) {
  main();
}
