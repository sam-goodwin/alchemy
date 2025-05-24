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
  properties?: Property[];
  // Track dependencies
  dependencies?: Map<string, DependencyInfo>;
  // Track function-specific defaults
  functionDefaults?: Map<string, string>;
}

interface Property {
  name: string;
  type: string;
  description: string;
  isRequired: boolean;
  defaultValue?: string;
}

// New interface for tracking dependent types
interface DependencyInfo {
  path: string;
  typeName: string;
  properties?: Property[];
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
 * Extract all interfaces and their properties using TypeScript parser
 */
function extractAllTypeDefinitions(filePath: string): Map<string, Property[]> {
  const typeDefinitions = new Map<string, Property[]>();
  const program = createProgram(filePath);
  const sourceFile = program.getSourceFile(filePath);
  const typeChecker = program.getTypeChecker();
  
  if (!sourceFile) {
    return typeDefinitions;
  }
  
  function visit(node: ts.Node) {
    if (ts.isInterfaceDeclaration(node)) {
      const interfaceName = node.name.text;
      const properties: Property[] = [];
      
      // Process each property in the interface
      node.members.forEach(member => {
        if (ts.isPropertySignature(member) && member.name && ts.isIdentifier(member.name)) {
          const propName = member.name.text;
          const propSymbol = typeChecker.getSymbolAtLocation(member.name);
          
          if (propSymbol) {
            const description = getJSDocDescription(propSymbol, typeChecker);
            const defaultValue = getJSDocDefault(propSymbol);
            
            // Get type text from the type node
            let typeText = 'any';
            if (member.type && sourceFile) {
              typeText = sourceFile.text.substring(member.type.pos, member.type.end).trim();
            }
            
            properties.push({
              name: propName,
              isRequired: !member.questionToken, // If there's a '?', it's optional
              type: typeText,
              description,
              defaultValue
            });
          }
        }
      });
      
      if (properties.length > 0) {
        typeDefinitions.set(interfaceName, properties);
      }
    }
    
    ts.forEachChild(node, visit);
  }
  
  visit(sourceFile);
  
  return typeDefinitions;
}

/**
 * Find and parse dependent types based on imports using TypeScript parser
 */
async function resolveDependentTypes(
  baseDir: string,
  filePath: string,
  importedTypes: string[]
): Promise<Map<string, DependencyInfo>> {
  const dependencies = new Map<string, DependencyInfo>();
  
  try {
    const importMap = extractImports(filePath);
    
    for (const [importPath, importedItems] of importMap.entries()) {
      // Skip non-relative/internal imports and node modules
      if (!importPath.startsWith('./') && !importPath.startsWith('../') && !importPath.startsWith('alchemy/')) {
        continue;
      }
      
      // Resolve the absolute path of the imported file
      let resolvedPath = importPath;
      if (importPath.startsWith('.')) {
        resolvedPath = path.resolve(path.dirname(filePath), importPath);
      } else if (importPath.startsWith('alchemy/')) {
        // Handle project imports
        resolvedPath = path.resolve(baseDir, '../', importPath.replace('alchemy/', 'alchemy/src/'));
      }
      
      // Normalize path and ensure .ts extension
      if (!resolvedPath.endsWith('.ts') && !resolvedPath.endsWith('.js')) {
        resolvedPath += '.ts';
      } else if (resolvedPath.endsWith('.js')) {
        resolvedPath = resolvedPath.replace(/\.js$/, '.ts');
      }
      
      // Only process the types requested by user
      const relevantTypes = importedItems.filter(item => 
        importedTypes.includes(item) || 
        importedTypes.length === 0 // If no specific types are requested, get all
      );
      
      if (relevantTypes.length > 0) {
        try {
          const typeDefinitions = extractAllTypeDefinitions(resolvedPath);
          
          for (const typeName of relevantTypes) {
            const properties = typeDefinitions.get(typeName);
            if (properties) {
              dependencies.set(typeName, {
                path: resolvedPath,
                typeName,
                properties
              });
            }
          }
        } catch (error) {
          console.warn(`Error reading dependent file ${resolvedPath}:`, error);
        }
      }
    }
  } catch (error) {
    console.warn(`Error resolving dependencies for ${filePath}:`, error);
  }
  
  return dependencies;
}

/**
 * Extract interface properties with their JSDoc comments using TypeScript parser
 */
function extractProperties(filePath: string): Property[] {
  const properties: Property[] = [];
  const program = createProgram(filePath);
  const sourceFile = program.getSourceFile(filePath);
  const typeChecker = program.getTypeChecker();
  
  if (!sourceFile) {
    return properties;
  }
  
  function visit(node: ts.Node) {
    // Look for interfaces ending with 'Props'
    if (ts.isInterfaceDeclaration(node) && node.name.text.endsWith('Props')) {
      // Process each property in the interface
      node.members.forEach(member => {
        if (ts.isPropertySignature(member) && member.name && ts.isIdentifier(member.name)) {
          const propName = member.name.text;
          const propSymbol = typeChecker.getSymbolAtLocation(member.name);
          
          if (propSymbol) {
            const description = getJSDocDescription(propSymbol, typeChecker);
            const defaultValue = getJSDocDefault(propSymbol);
            
            // Get type text from the type node
            let typeText = 'any';
            if (member.type && sourceFile) {
              typeText = sourceFile.text.substring(member.type.pos, member.type.end).trim();
            }
            
            properties.push({
              name: propName,
              isRequired: !member.questionToken, // If there's a '?', it's optional
              type: typeText,
              description,
              defaultValue
            });
          }
        }
      });
    }
    
    ts.forEachChild(node, visit);
  }
  
  visit(sourceFile);
  
  return properties;
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
    
    const properties = extractProperties(filePath);
    
    // Extract function-specific defaults if this is a wrapper function
    const functionDefaults = extractFunctionDefaults(filePath, name);
    
    // Apply function defaults to properties
    if (functionDefaults.size > 0) {
      properties.forEach(prop => {
        if (functionDefaults.has(prop.name)) {
          prop.defaultValue = functionDefaults.get(prop.name);
        }
      });
    }
    
    // Extract type imports for dependency resolution using TypeScript parser
    const importMap = extractImports(filePath);
    const typeDependencies = new Set<string>();
    
    // Parse the source file to find type references
    const program = createProgram(filePath);
    const sourceFile = program.getSourceFile(filePath);
    
    if (sourceFile) {
      function visit(node: ts.Node) {
        // Look for type references in heritage clauses (extends)
        if (ts.isHeritageClause(node)) {
          node.types.forEach(typeNode => {
            if (ts.isExpressionWithTypeArguments(typeNode) && ts.isIdentifier(typeNode.expression)) {
              typeDependencies.add(typeNode.expression.text);
            }
          });
        }
        
        // Look for type references in type nodes
        if (ts.isTypeReferenceNode(node) && ts.isIdentifier(node.typeName)) {
          typeDependencies.add(node.typeName.text);
        }
        
        ts.forEachChild(node, visit);
      }
      
      visit(sourceFile);
    }
    
    // Resolve dependencies for the discovered types
    const cloudflareDir = path.dirname(filePath);
    const dependencies = await resolveDependentTypes(
      path.resolve(cloudflareDir, '../../'), 
      filePath,
      Array.from(typeDependencies)
    );
    
    return {
      name,
      description,
      examples: formattedExamples,
      see,
      properties,
      dependencies,
      functionDefaults
    };
  }
  catch (error) {
    console.error(`Error parsing file ${filePath}:`, error);
    return null;
  }
}

/**
 * Merge properties from multiple sources, removing duplicates
 */
function mergeProperties(
  baseProps: Property[] = [], 
  dependencies: Map<string, DependencyInfo> = new Map(),
  functionDefaults: Map<string, string> = new Map()
): Property[] {
  const mergedProps = [...baseProps];
  const existingPropNames = new Set(mergedProps.map(p => p.name));
  
  // Add properties from dependencies if they don't already exist
  for (const [typeName, dependency] of dependencies.entries()) {
    if (dependency.properties) {
      for (const prop of dependency.properties) {
        if (!existingPropNames.has(prop.name)) {
          mergedProps.push({
            ...prop,
            // Enhance the description to show it comes from a dependency
            description: `${prop.description} (From ${typeName})`
          });
          existingPropNames.add(prop.name);
        }
      }
    }
  }
  
  // Apply function defaults to all properties
  mergedProps.forEach(prop => {
    if (functionDefaults.has(prop.name)) {
      prop.defaultValue = functionDefaults.get(prop.name);
    }
  });
  
  // Sort: required first, then alphabetically
  return mergedProps.sort((a, b) => {
    if (a.isRequired !== b.isRequired) {
      return a.isRequired ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  });
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
function generateMarkdown(resource: ResourceInfo, typeDefinitions: Map<string, Property[]>): string {
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
  
  // Utility function to format property for table display
  const formatPropForTable = (prop: Property): string => {
    let description = prop.description || '';
    description = description.replace(/\n/g, ' ');
    description = description.replace(/\.\s+/g, '. ');
    
    // Clean up the type string
    let typeFormatted = prop.type;
    // Replace newlines with spaces
    typeFormatted = typeFormatted.replace(/\n/g, ' ');
    // Replace multiple spaces with single space
    typeFormatted = typeFormatted.replace(/\s+/g, ' ');
    // Trim whitespace
    typeFormatted = typeFormatted.trim();
    // Escape pipe characters for markdown table
    typeFormatted = typeFormatted.replace(/\|/g, '\\|');
    
    return `| \`${prop.name}\` | \`${typeFormatted}\` | ${prop.isRequired ? 'Yes' : 'No'} | ${description} | ${prop.defaultValue || ''} |\n`;
  };
  
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
  
  // Add all types as tables
  if (typeDefinitions.size > 0 || (resource.dependencies && resource.dependencies.size > 0)) {
    markdown += '\n## Properties\n\n';
    
    const resourceName = resource.name;
    const propsInterfaceName = `${resourceName}Props`;
    
    // Get the main resource properties (e.g., Hyperdrive, KVNamespace)
    const mainResourceType = typeDefinitions.get(resourceName) || [];
    
    // Get the Props interface properties (e.g., HyperdriveProps, KVNamespaceProps)
    const propsInterfaceType = typeDefinitions.get(propsInterfaceName);
    
    // Combine with properties from dependencies
    let combinedProps = [...mainResourceType];
    
    // First add properties from the Props interface
    if (propsInterfaceType) {
      const existingPropNames = new Set(combinedProps.map(p => p.name));
      // Add properties from the Props interface that don't already exist in the main resource type
      for (const prop of propsInterfaceType) {
        if (!existingPropNames.has(prop.name)) {
          combinedProps.push(prop);
          existingPropNames.add(prop.name);
        }
      }
    }
    
    // Now merge with properties from dependencies
    if (resource.dependencies) {
      combinedProps = mergeProperties(combinedProps, resource.dependencies, resource.functionDefaults || new Map());
    }
    
    // Sort combined properties: required first, then alphabetically
    combinedProps.sort((a, b) => {
      if (a.isRequired !== b.isRequired) {
        return a.isRequired ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    });
    
    // Display the main resource with its (potentially merged) properties
    markdown += `### ${resourceName}\n\n`;
    if (propsInterfaceType) {
      markdown += `*Note: This includes all properties from ${propsInterfaceName}.*\n\n`;
    }
    if (resource.dependencies && resource.dependencies.size > 0) {
      markdown += `*Note: This includes properties from dependent resources: ${Array.from(resource.dependencies.keys()).join(', ')}.*\n\n`;
    }
    markdown += `| Name | Type | Required | Description | Default |\n`;
    markdown += `|------|------|----------|-------------|---------|\n`;
    combinedProps.forEach(prop => {
      markdown += formatPropForTable(prop);
    });
    markdown += '\n';
    
    // Add a section for dependent types
    if (resource.dependencies && resource.dependencies.size > 0) {
      markdown += '\n## Dependent Types\n\n';
      markdown += '*These types are used by this resource and may provide additional configuration options:*\n\n';
      
      for (const [typeName, dependency] of resource.dependencies.entries()) {
        if (dependency.properties && dependency.properties.length > 0) {
          markdown += `### ${typeName}\n\n`;
          markdown += `| Name | Type | Required | Description | Default |\n`;
          markdown += `|------|------|----------|-------------|---------|\n`;
          dependency.properties.forEach(prop => {
            markdown += formatPropForTable(prop);
          });
          markdown += '\n';
        }
      }
    }
    
    // List all other supporting types, excluding the main resource, its Props interface, and dependencies
    const processedTypes = new Set([
      resourceName, 
      propsInterfaceName,
      ...(resource.dependencies ? Array.from(resource.dependencies.keys()) : [])
    ]);
    
    const supportingTypes = Array.from(typeDefinitions.keys())
      .filter(name => !processedTypes.has(name))
      .sort();
      
    if (supportingTypes.length > 0) {
        markdown += '\n## Supporting Types\n\n';
        for (const name of supportingTypes) {
          const properties = typeDefinitions.get(name);
          if (!properties || properties.length === 0) continue;
          
          markdown += `### ${name}\n\n`;
          markdown += `| Name | Type | Required | Description | Default |\n`;
          markdown += `|------|------|----------|-------------|---------|\n`;
          properties.forEach(prop => {
            markdown += formatPropForTable(prop);
          });
          markdown += '\n';
        }
    }
  }
  
  return markdown;
}

// --- Main Execution ---

async function main() {
  // Check if a specific file was requested
  const targetFile = process.argv[2];
  
  // Get all Cloudflare resource files if no specific file was provided
  const cloudflareDir = path.join(process.cwd(), '../alchemy/src/cloudflare');
  
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
        
        // Read the full file to extract interfaces
        const typeDefinitions = extractAllTypeDefinitions(file);
        
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
        
        const markdown = generateMarkdown(fullResourceInfo, typeDefinitions);
        
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