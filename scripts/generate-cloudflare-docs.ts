import * as fs from 'fs/promises';
import * as path from 'path';
import * as ts from 'typescript';

// --- Data Types ---

interface Example {
  caption?: string;
  code: string;
}

interface ResourceInfo {
  name: string;
  description: string;
  examples: Example[];
  see?: string;
  // Track function-specific defaults
  functionDefaults?: Map<string, string>;
}

// --- TypeScript Parser Helpers ---

/**
 * Create a TypeScript program for a single file
 */
function createProgram(filePath: string) {
  return ts.createProgram([filePath], {});
}

/**
 * Get JSDoc description from a symbol
 */
function getJSDocDescription(symbol: ts.Symbol, typeChecker: ts.TypeChecker): string {
  return symbol.getDocumentationComment(typeChecker).map(part => part.text).join('\n');
}

/**
 * Extract examples from JSDoc tags with captions
 */
function getJSDocExamples(symbol: ts.Symbol): Example[] {
  const examples: Example[] = [];
  const jsDocTags = symbol.getJsDocTags();
  
  jsDocTags.forEach(tag => {
    if (tag.name === 'example') {
      if (tag.text) {
        const exampleText = tag.text.map(part => part.text).join('\n');
        const caption = extractExampleCaption(exampleText);
        examples.push({
          caption,
          code: exampleText.trim()
        });
      }
    }
  });
  
  return examples;
}

/**
 * Extract a meaningful caption from example code by looking at comments
 */
function extractExampleCaption(exampleText: string): string | undefined {
  const lines = exampleText.trim().split('\n');
  const firstLine = lines[0]?.trim();
  
  // Look for a comment line that describes the example
  if (firstLine?.startsWith('//')) {
    let caption = firstLine.replace(/^\/\/\s*/, '');
    
    // Clean up the caption
    caption = caption.replace(/^(Deploy|Create|Set up|Configure)\s+/, '');
    caption = caption.charAt(0).toUpperCase() + caption.slice(1);
    
    // If the caption doesn't end with proper punctuation, don't add a period
    // if it's already a complete phrase
    if (!caption.match(/[.!?]$/)) {
      caption = caption;
    }
    
    return caption;
  }
  
  return undefined;
}

/**
 * Get JSDoc @see tag from a symbol
 */
function getJSDocSee(symbol: ts.Symbol): string | undefined {
  const jsDocTags = symbol.getJsDocTags();
  
  for (const tag of jsDocTags) {
    if (tag.name === 'see' && tag.text) {
      return tag.text.map(part => part.text).join('').trim();
    }
  }
  
  return undefined;
}

/**
 * Get default value from JSDoc @default tag
 */
function getJSDocDefault(symbol: ts.Symbol): string | undefined {
  const jsDocTags = symbol.getJsDocTags();
  
  for (const tag of jsDocTags) {
    if (tag.name === 'default' && tag.text) {
      return tag.text.map(part => part.text).join('').trim();
    }
  }
  
  return undefined;
}

// --- Parsing Functions ---

/**
 * Extract JSDoc from file content using TypeScript parser
 */
function extractResourceJSDoc(filePath: string): { 
  description: string; 
  examples: Example[]; 
  see?: string; 
  resourceName: string 
} | null {
  const program = createProgram(filePath);
  const sourceFile = program.getSourceFile(filePath);
  const typeChecker = program.getTypeChecker();
  
  if (!sourceFile) {
    return null;
  }
  
  let result: { 
    description: string; 
    examples: Example[]; 
    see?: string; 
    resourceName: string 
  } | null = null;
  
  function visit(node: ts.Node) {
    // Check for exported const (Resource definitions)
    if (ts.isVariableStatement(node) && 
        node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
      const declaration = node.declarationList.declarations[0];
      
      if (declaration && ts.isIdentifier(declaration.name)) {
        const name = declaration.name.text;
        const symbol = typeChecker.getSymbolAtLocation(declaration.name);
        
        if (symbol) {
          const description = getJSDocDescription(symbol, typeChecker);
          const examples = getJSDocExamples(symbol);
          const see = getJSDocSee(symbol);
          
          // Check if it has examples (indicating it's a resource)
          if (examples.length > 0) {
            result = {
              description,
              examples,
              see,
              resourceName: name
            };
          }
        }
      }
    }
    
    // Check for exported functions (function-based resources)
    if (ts.isFunctionDeclaration(node) && 
        node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword) &&
        node.name) {
      const name = node.name.text;
      const symbol = typeChecker.getSymbolAtLocation(node.name);
      
      if (symbol) {
        const examples = getJSDocExamples(symbol);
        
        // Check if it has examples (indicating it's a resource)
        if (examples.length > 0) {
          result = {
            description: getJSDocDescription(symbol, typeChecker),
            examples,
            see: getJSDocSee(symbol),
            resourceName: name
          };
        }
      }
    }
    
    ts.forEachChild(node, visit);
  }
  
  visit(sourceFile);
  
  return result;
}

/**
 * Extract import statements using TypeScript parser
 */
function extractImports(filePath: string): Map<string, string[]> {
  const importMap = new Map<string, string[]>();
  const program = createProgram(filePath);
  const sourceFile = program.getSourceFile(filePath);
  
  if (!sourceFile) {
    return importMap;
  }
  
  function visit(node: ts.Node) {
    if (ts.isImportDeclaration(node)) {
      const moduleSpecifier = node.moduleSpecifier;
      
      if (ts.isStringLiteral(moduleSpecifier)) {
        const importPath = moduleSpecifier.text;
        const importedItems: string[] = [];
        
        if (node.importClause) {
          // Handle named imports
          if (node.importClause.namedBindings && ts.isNamedImports(node.importClause.namedBindings)) {
            for (const element of node.importClause.namedBindings.elements) {
              const name = element.name.text;
              importedItems.push(name);
            }
          }
          
          // Handle default imports
          if (node.importClause.name) {
            importedItems.push(node.importClause.name.text);
          }
          
          // Handle namespace imports
          if (node.importClause.namedBindings && ts.isNamespaceImport(node.importClause.namedBindings)) {
            importedItems.push(node.importClause.namedBindings.name.text);
          }
        }
        
        importMap.set(importPath, importedItems);
      }
    }
    
    ts.forEachChild(node, visit);
  }
  
  visit(sourceFile);
  
  return importMap;
}

/**
 * Extract default values from wrapper function implementations
 */
function extractFunctionDefaults(filePath: string, functionName: string): Map<string, string> {
  const defaults = new Map<string, string>();
  const program = createProgram(filePath);
  const sourceFile = program.getSourceFile(filePath);
  
  if (!sourceFile) {
    return defaults;
  }
  
  function visit(node: ts.Node) {
    // Find the specific function
    if (ts.isFunctionDeclaration(node) && 
        node.name?.text === functionName) {
      
      // Look for object literals with default assignments
      function visitFunctionBody(bodyNode: ts.Node) {
        // Look for object literal expressions (like the props object passed to Website)
        if (ts.isObjectLiteralExpression(bodyNode)) {
          bodyNode.properties.forEach(prop => {
            if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
              const propName = prop.name.text;
              
              // Handle different types of default value expressions
              if (ts.isBinaryExpression(prop.initializer) && 
                  prop.initializer.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken) {
                // Handle nullish coalescing: props?.command ?? "default"
                const rightSide = prop.initializer.right;
                if (ts.isStringLiteral(rightSide)) {
                  defaults.set(propName, rightSide.text);
                } else if (ts.isNumericLiteral(rightSide)) {
                  defaults.set(propName, rightSide.text);
                } else if (rightSide.kind === ts.SyntaxKind.TrueKeyword) {
                  defaults.set(propName, 'true');
                } else if (rightSide.kind === ts.SyntaxKind.FalseKeyword) {
                  defaults.set(propName, 'false');
                } else {
                  // For complex expressions, get the text representation
                  const defaultText = sourceFile!.text.substring(rightSide.pos, rightSide.end).trim();
                  defaults.set(propName, defaultText);
                }
              } else if (ts.isStringLiteral(prop.initializer)) {
                // Handle direct string assignments
                defaults.set(propName, prop.initializer.text);
              } else if (ts.isArrayLiteralExpression(prop.initializer)) {
                // Handle arrays (like compatibilityFlags)
                const elements = prop.initializer.elements.map(el => {
                  if (ts.isStringLiteral(el)) {
                    return `"${el.text}"`;
                  } else if (ts.isSpreadElement(el)) {
                    return '...';
                  }
                  return sourceFile!.text.substring(el.pos, el.end).trim();
                });
                defaults.set(propName, `[${elements.join(', ')}]`);
              }
            }
          });
        }
        
        ts.forEachChild(bodyNode, visitFunctionBody);
      }
      
      if (node.body) {
        visitFunctionBody(node.body);
      }
    }
    
    ts.forEachChild(node, visit);
  }
  
  visit(sourceFile);
  
  return defaults;
}

/**
 * Parse a resource file to extract all relevant information
 */
async function parseResourceFile(filePath: string): Promise<ResourceInfo | null> {
  try {
    const jsDocData = extractResourceJSDoc(filePath);
    
    if (!jsDocData) {
      console.warn(`No resource JSDoc found in ${filePath}`);
      return null;
    }
    
    const { description, examples, see, resourceName: name } = jsDocData;
    
    // Examples are already in the correct format from getJSDocExamples
    const formattedExamples: Example[] = examples;
    
    // Extract function-specific defaults if this is a wrapper function
    const functionDefaults = extractFunctionDefaults(filePath, name);
        
    return {
      name,
      description,
      examples: formattedExamples,
      see,
      functionDefaults
    };
  }
  catch (error) {
    console.error(`Error parsing file ${filePath}:`, error);
    return null;
  }
}

// --- Markdown Generation ---

/**
 * Generate SEO frontmatter for a resource
 */
function generateFrontmatter(resource: ResourceInfo): string {
  // Extract a clean title from the resource name and description
  let title = `Deploying ${resource.name}`;
  
  // Try to extract more context from the description
  if (resource.description) {
    const descMatch = resource.description.match(/^([^.]+)/);
    if (descMatch) {
      const firstSentence = descMatch[1].trim();
      // If the first sentence mentions what the resource is, use that for better context
      const resourceTypeMatch = firstSentence.match(/^A\s+([A-Za-z\s]+)\s+is\s+(.+)/);
      if (resourceTypeMatch) {
        const resourceType = resourceTypeMatch[1];
        const purpose = resourceTypeMatch[2];
        title = `${resourceType} with Alchemy`;
      } else {
        title = `${resource.name} with Alchemy`;
      }
    }
  }
  
  // Generate description from the resource description, cleaning it up for SEO
  let description = resource.description;
  if (description) {
    // Take the first sentence or two, clean up for meta description
    const sentences = description.match(/[^.!?]+[.!?]+/g);
    if (sentences) {
      description = sentences.slice(0, 2).join(' ').trim();
      // Remove JSDoc formatting and clean up
      description = description.replace(/\n/g, ' ').replace(/\s+/g, ' ');
      // Ensure it doesn't exceed typical meta description length
      
    }
  } else {
    description = `Learn how to deploy and configure ${resource.name} resources with Alchemy for Cloudflare.`;
  }
  
  return `---
title: ${title}
description: ${description}
---

`;
}

/**
 * Generate Markdown documentation for a resource
 */
function generateMarkdown(resource: ResourceInfo): string {
  let markdown = generateFrontmatter(resource);
  
  markdown += `# ${resource.name}\n\n`;
  
  // Add description with embedded link if available
  if (resource.description) {
    if (resource.see) {
      // Extract the resource type from the name for better linking
      const resourceTypeMatch = resource.description.match(/^A\s+([A-Za-z\s]+)\s+is/);
      let resourceType = resource.name;
      
      if (resourceTypeMatch && resourceTypeMatch[1]) {
        resourceType = resourceTypeMatch[1];
      }
      
      // Replace the initial part of the description with a linked version
      const linkedDescription = resource.description.replace(
        /^A\s+([A-Za-z\s]+)\s+is/, 
        `A [${resourceType}](${resource.see}) is`
      );
      markdown += `${linkedDescription}\n\n`;
    } else {
      markdown += `${resource.description}\n\n`;
    }
  }
  
  // Add examples WITH the "Examples" heading (just for TOC)
  if (resource.examples && resource.examples.length > 0) {
    markdown += `## Examples\n\n`;
    resource.examples.forEach((example, index) => {
      if (example.caption) {
        markdown += `### ${example.caption}\n\n`;
      } else {
        markdown += `### Example ${index + 1}\n\n`;
      }
      markdown += '```typescript\n';
      if (index === 0) {
        markdown += `import { ${resource.name} } from "alchemy/cloudflare";\n\n`;
      }
      markdown += example.code + '\n';
      markdown += '```\n\n';
      if (index < resource.examples.length - 1) {
        markdown += '---\n\n';
      }
    });
  }
  
  return markdown;
}

// --- Main Execution ---

async function main() {
  // Check if a specific file was requested
  const targetFile = process.argv[2];
  
  // Get all Cloudflare resource files if no specific file was provided
  const cloudflareDir = path.join(process.cwd(), 'alchemy/src/cloudflare');
  
  try {
    let filesToProcess: string[] = [];
    
    if (targetFile) {
      // Process a single file if specified
      const singleFilePath = path.join(cloudflareDir, targetFile);
      // Basic check if the file exists before adding
      try {
        await fs.access(singleFilePath);
        filesToProcess.push(singleFilePath);
      } catch (e) {
        console.error(`Error: Target file ${targetFile} not found in ${cloudflareDir}`);
        process.exit(1);
      }
    } else {
      // Process all TypeScript files in the cloudflare directory
      const dirEntries = await fs.readdir(cloudflareDir, { withFileTypes: true });
      filesToProcess = dirEntries
        .filter(entry => entry.isFile() && entry.name.endsWith('.ts'))
        .map(entry => path.join(cloudflareDir, entry.name));
    }
    
    if (filesToProcess.length === 0) {
      console.log("No files to process.");
      return;
    }

    for (const file of filesToProcess) {
      try {
        // Check if this is a resource file using TypeScript parser
        const resourceInfo = extractResourceJSDoc(file);
        const isResourceFile = resourceInfo !== null;
        
        if (!isResourceFile) {
          console.log(`Skipping ${path.basename(file)}: Not a resource file`);
          continue;
        }
                
        const fullResourceInfo = await parseResourceFile(file);
        
        if (!fullResourceInfo) {
          console.log(`Skipping ${path.basename(file)}: Failed to parse resource`);
          continue;
        }
        
        // Skip files without examples (requirement)
        if (!fullResourceInfo.examples || fullResourceInfo.examples.length === 0) {
          console.log(`Skipping ${fullResourceInfo.name}: No examples found`);
          continue;
        }
        
        const markdown = generateMarkdown(fullResourceInfo);
        
        // Generate the output filename based on the source file name (kebab-case)
        const sourceFileName = path.basename(file, '.ts');
        
        // Update output path to alchemy-web/docs/providers/cloudflare
        const outputPath = path.join(process.cwd(), '../alchemy-web/docs/providers/cloudflare', `${sourceFileName}.md`);
        
        // Create the directory if it doesn't exist
        await fs.mkdir(path.dirname(outputPath), { recursive: true });
        
        // Write the markdown file
        await fs.writeFile(outputPath, markdown, 'utf-8');
        
        console.log(`Generated documentation for ${fullResourceInfo.name} at ${outputPath}`);
        
        // Show the markdown in the console if we're only processing one file (the targetFile case)
        if (targetFile && filesToProcess.length === 1) {
          console.log('\n--- Generated Markdown ---\n');
          console.log(markdown);
        }
      } catch (error) {
        console.error(`Error processing ${path.basename(file)}:`, error);
      }
    }
  } catch (error) {
    console.error('Error generating documentation:', error);
    process.exit(1);
  }
}

// --- Run the script ---
main(); 