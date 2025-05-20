import * as fs from 'fs/promises';
import * as path from 'path';

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

// --- Parsing Functions ---

/**
 * Extract JSDoc from file content
 */
function extractResourceJSDoc(content: string): string | null {
  // First try the traditional Resource() format
  const resourceRegex = /export\s+const\s+([A-Za-z_][A-Za-z0-9_]*)\s*=\s*Resource\s*\(/;
  let match = resourceRegex.exec(content);
  
  // If no Resource() match, try function-based resources
  if (!match) {
    const functionRegex = /export\s+(async\s+)?function\s+([A-Za-z_][A-Za-z0-9_]*)/;
    match = functionRegex.exec(content);
  }
  
  if (!match) return null;
  
  // Look for JSDoc block before the resource definition
  const precedingContent = content.substring(0, match.index);
  const jsDocMatch = precedingContent.match(/\/\*\*[\s\S]*?\*\//g);
  
  // Return the last JSDoc comment before the resource definition
  return jsDocMatch && jsDocMatch.length > 0 ? jsDocMatch[jsDocMatch.length - 1] : null;
}

/**
 * Extract import statements to track dependencies
 */
function extractImports(content: string): Map<string, string[]> {
  const importMap = new Map<string, string[]>();
  const importRegex = /import\s+(?:{([^}]+)})?\s*from\s+['"]([^'"]+)['"]/g;
  let match;
  
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[2];
    const importedItems = match[1] ? match[1].split(',').map(item => {
      // Extract type/name, handling 'type' keyword and aliases
      const cleanItem = item.trim().replace(/^type\s+/, '').split(' as ')[0].trim();
      return cleanItem;
    }) : [];
    
    importMap.set(importPath, importedItems);
  }
  
  return importMap;
}

/**
 * Parse JSDoc content to extract description, examples, and other metadata
 */
function parseJSDoc(jsDocContent: string): { 
  description: string, 
  examples: Example[], 
  see?: string 
} {
  // Remove /** and */ from the JSDoc
  jsDocContent = jsDocContent.replace(/^\/\*\*/, '').replace(/\*\/$/, '');
  
  const lines = jsDocContent.split('\n');
  
  const examples: Example[] = [];
  let description = '';
  let see: string | undefined;
  let currentExample: string | null = null;
  let captionLine: string | undefined;
  let inExample = false;
  
  // Track the minimum indentation in the current example
  let minIndent = Infinity;
  let exampleLines: string[] = [];
  
  lines.forEach((line) => {
    // Remove the leading asterisk but preserve whitespace after it
    const processedLine = line.replace(/^\s*\*/, '');
    
    // Detect example blocks
    if (processedLine.trim().startsWith('@example')) {
      if (inExample) {
        // Store previous example before starting a new one
        const cleanedCaption = captionLine ? captionLine.trim() : undefined;
        
        // Remove common indentation from all lines
        const formattedCode = exampleLines
          .map(line => line.length >= minIndent ? line.substring(minIndent) : line)
          .join('\n');
        
        examples.push({
          caption: cleanedCaption,
          code: formattedCode
        });
      }
      
      // Reset for new example
      inExample = true;
      exampleLines = [];
      minIndent = Infinity;
      captionLine = undefined;
      
    } else if (processedLine.trim().startsWith('@see')) {
      inExample = false;
      see = processedLine.trim().substring('@see'.length).trim();
      
    } else if (inExample) {
      // We're inside an example block
      
      // Look for caption as the first comment line in the example
      if (exampleLines.length === 0 && processedLine.trim().startsWith('//')) {
        captionLine = processedLine.trim().replace(/^\/\/\s*/, '');
      } else {
        // Calculate indentation for code lines (only if the line isn't empty)
        const trimmedLine = processedLine.trimRight();
        if (trimmedLine.length > 0) {
          const currentIndent = processedLine.length - processedLine.trimLeft().length;
          minIndent = Math.min(minIndent, currentIndent);
        }
        
        // Add to example lines
        exampleLines.push(processedLine);
      }
      
    } else if (!processedLine.trim().startsWith('@')) {
      // Add to description if not a tag
      description += (description ? '\n' : '') + processedLine.trim();
    }
  });
  
  // Add the last example if there is one
  if (inExample && exampleLines.length > 0) {
    const cleanedCaption = captionLine ? captionLine.trim() : undefined;
    
    // Remove common indentation from all lines
    const formattedCode = exampleLines
      .map(line => line.length >= minIndent ? line.substring(minIndent) : line)
      .join('\n');
    
    examples.push({
      caption: cleanedCaption,
      code: formattedCode
    });
  }
  
  return {
    description: description.trim(),
    examples,
    see
  };
}

/**
 * Extract properties from an interface definition
 */
function extractPropertiesFromInterface(content: string, interfaceName: string): Property[] {
  const properties: Property[] = [];
  
  // Find the interface definition - more robust pattern
  const startPattern = `export\\s+interface\\s+${interfaceName}`;
  const start = content.search(new RegExp(startPattern));
  
  if (start === -1) return properties;
  
  // Find the opening brace
  const openBracePos = content.indexOf('{', start);
  if (openBracePos === -1) return properties;
  
  // Find the matching closing brace by counting
  let braceCount = 1;
  let closeBracePos = openBracePos + 1;
  
  while (braceCount > 0 && closeBracePos < content.length) {
    const char = content[closeBracePos];
    if (char === '{') braceCount++;
    if (char === '}') braceCount--;
    closeBracePos++;
  }
  
  if (braceCount !== 0) return properties; // Malformed interface
  
  // Extract the interface content
  const interfaceContent = content.substring(openBracePos + 1, closeBracePos - 1);
  
  // Split by property definitions (looking for lines ending with semicolons)
  const propLines = interfaceContent.split('\n');
  
  let currentJSDoc: string[] = [];
  let currentLine = '';
  
  for (let i = 0; i < propLines.length; i++) {
    const line = propLines[i].trim();
    
    if (line.startsWith('/**')) {
      // Start of JSDoc comment
      currentJSDoc = [line];
    } 
    else if (line.startsWith('*')) {
      // Continue JSDoc comment
      currentJSDoc.push(line);
    }
    else if (line.match(/^\s*[a-zA-Z_][a-zA-Z0-9_]*\??:/)) {
      // Property definition
      currentLine = line;
      
      // Handle multi-line property definitions
      while (!currentLine.includes(';') && i < propLines.length - 1) {
        i++;
        currentLine += ' ' + propLines[i].trim();
      }
      
      // Extract property details
      const propMatch = currentLine.match(/([a-zA-Z_][a-zA-Z0-9_]*)(\??)\s*:\s*([^;]*);/);
      
      if (propMatch) {
        // Parse JSDoc
        let description = '';
        let defaultValue: string | undefined = undefined;
        
        if (currentJSDoc.length > 0) {
          const jsDocText = currentJSDoc.join('\n');
          
          // Extract description
          const descriptionMatch = jsDocText.match(/\/\*\*\s*([\s\S]*?)(?:\s*\*\s*@|\s*\*\/)/);
          if (descriptionMatch) {
            description = descriptionMatch[1]
              .replace(/^\s*\*\s?/gm, '')
              .trim();
          }
          
          // Extract default value
          const defaultMatch = jsDocText.match(/@default\s+(.*?)(?:\s*\*\s*@|\s*\*\/)/);
          if (defaultMatch) {
            defaultValue = defaultMatch[1].trim();
          }
        }
        
        properties.push({
          name: propMatch[1],
          isRequired: !propMatch[2], // If there's a '?', it's optional
          type: propMatch[3].trim(),
          description,
          defaultValue
        });
      }
      
      // Reset for next property
      currentJSDoc = [];
    }
  }
  
  return properties;
}

/**
 * Extract all interfaces and their properties
 */
function extractAllTypeDefinitions(content: string): Map<string, Property[]> {
  const typeDefinitions = new Map<string, Property[]>();
  
  // Find all interface names
  const interfaceRegex = /export\s+interface\s+([A-Za-z0-9_]+)/g;
  let match;
  
  while ((match = interfaceRegex.exec(content)) !== null) {
    const interfaceName = match[1];
    const properties = extractPropertiesFromInterface(content, interfaceName);
    
    if (properties.length > 0) {
      typeDefinitions.set(interfaceName, properties);
    }
  }
  
  return typeDefinitions;
}

/**
 * Find and parse dependent types based on imports
 */
async function resolveDependentTypes(
  baseDir: string,
  filePath: string,
  importedTypes: string[]
): Promise<Map<string, DependencyInfo>> {
  const dependencies = new Map<string, DependencyInfo>();
  
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const importMap = extractImports(content);
    
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
          const importedContent = await fs.readFile(resolvedPath, 'utf-8');
          const typeDefinitions = extractAllTypeDefinitions(importedContent);
          
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
 * Extract interface properties with their JSDoc comments
 */
function extractProperties(content: string): Property[] {
  // This is a simplified implementation - in a real scenario you'd want more robust TS parsing
  const properties: Property[] = [];
  
  // First try to find specific props interface (e.g., KVNamespaceProps)
  // Look for any interface that ends with 'Props'
  const propsRegex = /export\s+interface\s+([A-Za-z_][A-Za-z0-9_]*Props)[^{]*{([^}]*)}/gs;
  let propsMatch = propsRegex.exec(content);
  
  if (propsMatch) {
    const propsContent = propsMatch[2];
    const propLines = propsContent.split('\n');
    
    let currentDescription = '';
    let defaultValue: string | undefined;
    
    for (let i = 0; i < propLines.length; i++) {
      const line = propLines[i].trim();
      
      // Collect JSDoc comments
      if (line.startsWith('/**')) {
        currentDescription = '';
        defaultValue = undefined;
        
        // Collect all lines until the end of the comment
        while (i < propLines.length && !propLines[i].includes('*/')) {
          const commentLine = propLines[i].replace(/^\s*\*\s?/, '').trim();
          
          if (commentLine.startsWith('@default')) {
            defaultValue = commentLine.substring('@default'.length).trim();
          } else if (!commentLine.startsWith('/') && !commentLine.startsWith('*')) {
            currentDescription += (currentDescription ? '\n' : '') + commentLine;
          }
          
          i++;
        }
      }
      // Look for property definition after a JSDoc block
      else if (line.match(/^\s*[a-zA-Z_][a-zA-Z0-9_]*\??:/)) {
        const propMatch = line.match(/^\s*([a-zA-Z_][a-zA-Z0-9_]*)(\\??):\s*(.+?);/);
        if (propMatch) {
          properties.push({
            name: propMatch[1],
            isRequired: !propMatch[2], // If there's a '?', it's optional
            type: propMatch[3],
            description: currentDescription,
            defaultValue
          });
        }
        currentDescription = '';
        defaultValue = undefined;
      }
    }
  }
  
  return properties;
}

/**
 * Parse a resource file to extract all relevant information
 */
async function parseResourceFile(filePath: string): Promise<ResourceInfo | null> {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const jsDocContent = extractResourceJSDoc(content);
    
    if (!jsDocContent) {
      console.warn(`No resource JSDoc found in ${filePath}`);
      return null;
    }
    
    const { description, examples, see } = parseJSDoc(jsDocContent);
    
    // Extract resource name from the file
    let name = path.basename(filePath, '.ts');
    
    // Try traditional Resource() format first
    const resourceNameMatch = content.match(/export\s+const\s+([A-Za-z_][A-Za-z0-9_]*)\s*=\s*Resource/);
    if (resourceNameMatch) {
      name = resourceNameMatch[1];
    } else {
      // Try function-based resources
      const functionNameMatch = content.match(/export\s+(async\s+)?function\s+([A-Za-z_][A-Za-z0-9_]*)/);
      if (functionNameMatch) {
        name = functionNameMatch[2];
      }
    }
    
    const properties = extractProperties(content);
    
    // Extract type imports for dependency resolution
    const importMap = extractImports(content);
    const typeDependencies = new Set<string>();
    
    // Let's look for types that are extended or referenced in return types
    const typeExtensionRegex = /extends\s+([A-Za-z0-9_]+)(?:<[^>]+>)?/g;
    let extMatch;
    while ((extMatch = typeExtensionRegex.exec(content)) !== null) {
      typeDependencies.add(extMatch[1]);
    }
    
    // Look for generic type params e.g., Worker<B & { ASSETS: Assets }>
    const genericTypeRegex = /\w+<[^>]*?([A-Za-z0-9_]+)[^>]*>/g;
    let genMatch;
    while ((genMatch = genericTypeRegex.exec(content)) !== null) {
      typeDependencies.add(genMatch[1]);
    }
    
    // Add explicit return types
    const returnTypeRegex = /Promise<([A-Za-z0-9_]+)(?:<[^>]+>)?>/g;
    let retMatch;
    while ((retMatch = returnTypeRegex.exec(content)) !== null) {
      typeDependencies.add(retMatch[1]);
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
      examples,
      see,
      properties,
      dependencies
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
  dependencies: Map<string, DependencyInfo> = new Map()
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
 * Generate Markdown documentation for a resource
 */
function generateMarkdown(resource: ResourceInfo, typeDefinitions: Map<string, Property[]>): string {
  let markdown = `# ${resource.name}\n\n`;
  
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
    const typeFormatted = prop.type.replace(/\|/g, '\\|');
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
      combinedProps = mergeProperties(combinedProps, resource.dependencies);
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
        // Read the full file content to extract interfaces
        const fullContent = await fs.readFile(file, 'utf-8');
        
        // Expanded check for resource files:
        // 1. Directly calls Resource()
        // 2. Is an exported function that returns another resource
        const isResourceFile = fullContent.includes('Resource(') || 
                              /export\s+(async\s+)?function\s+\w+/.test(fullContent);
        
        if (!isResourceFile) {
          console.log(`Skipping ${path.basename(file)}: Not a resource file`);
          continue;
        }
        
        const typeDefinitions = extractAllTypeDefinitions(fullContent);
        
        const resourceInfo = await parseResourceFile(file);
        
        if (!resourceInfo) {
          console.log(`Skipping ${path.basename(file)}: Failed to parse resource`);
          continue;
        }
        
        // Skip files without examples (requirement)
        if (!resourceInfo.examples || resourceInfo.examples.length === 0) {
          console.log(`Skipping ${resourceInfo.name}: No examples found`);
          continue;
        }
        
        const markdown = generateMarkdown(resourceInfo, typeDefinitions);
        
        // Generate the output filename based on the source file name (kebab-case)
        const sourceFileName = path.basename(file, '.ts');
        
        // Update output path to alchemy-web/docs/providers/cloudflare
        const outputPath = path.join(process.cwd(), '../alchemy-web/docs/providers/cloudflare', `${sourceFileName}.md`);
        
        // Create the directory if it doesn't exist
        await fs.mkdir(path.dirname(outputPath), { recursive: true });
        
        // Write the markdown file
        await fs.writeFile(outputPath, markdown, 'utf-8');
        
        console.log(`Generated documentation for ${resourceInfo.name} at ${outputPath}`);
        
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