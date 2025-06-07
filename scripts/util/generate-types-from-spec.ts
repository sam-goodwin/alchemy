#!/usr/bin/env bun
import { readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import prettier from "prettier";
import { validateCloudFormationSpec, type CloudFormationResourceSpecification, type ResourceType, type PropertyType, type Property } from "./cfn-spec-schema.js";
import { getPropertyDocumentation, getCacheInfo, type PropertyInfo } from "./doc-parser.js";

// Parse CLI arguments
const args = process.argv.slice(2);
if (args.length !== 2) {
  console.error("Usage: generate-types-from-spec.ts <ServiceName> <output-file>");
  console.error("Examples:");
  console.error("  generate-types-from-spec.ts AWS::XRay ./src/aws/xray-types.ts");
  console.error("  generate-types-from-spec.ts Alexa::ASK ./src/alexa/ask-types.ts");
  process.exit(1);
}

const [serviceName, outputFile] = args;
const SPEC_FILE = "spec.json";

interface ParsedServiceInfo {
  prefix: string;
  servicePart: string;
}

function parseServiceName(serviceName: string): ParsedServiceInfo {
  const parts = serviceName.split("::");
  if (parts.length < 2) {
    throw new Error(`Invalid service name format: ${serviceName}. Expected format: "Prefix::Service" (e.g., "AWS::XRay")`);
  }
  
  return {
    prefix: parts[0],
    servicePart: parts.slice(1).join("::") // Handle nested services like AWS::ServiceA::ServiceB
  };
}

function convertPropertyToTypeScript(prop: Property, propertyInfo?: PropertyInfo): string {
  // Handle primitive types
  if ("PrimitiveType" in prop && prop.PrimitiveType) {
    let type = prop.PrimitiveType.toLowerCase();
    if (type === "integer" || type === "double" || type === "long") {
      type = "number";
    } else if (type === "json") {
      type = "any";
    } else if (type === "timestamp") {
      type = "string"; // timestamps are represented as ISO strings
    }
    
    // If this is a string type and we have allowed values, create a union type
    if (type === "string" && propertyInfo?.allowedValues && propertyInfo.allowedValues.length > 0) {
      return propertyInfo.allowedValues.map(value => `"${value.replace(/"/g, '\\"')}"`).join(" | ");
    }
    
    return type;
  }
  
  // Handle array/list types
  if ("Type" in prop && prop.Type === "List") {
    if ("PrimitiveItemType" in prop && prop.PrimitiveItemType) {
      let itemType = prop.PrimitiveItemType.toLowerCase();
      if (itemType === "integer" || itemType === "double" || itemType === "long") {
        itemType = "number";
      } else if (itemType === "json") {
        itemType = "any";
      } else if (itemType === "timestamp") {
        itemType = "string";
      }
      
      // If this is a string array and we have allowed values, create a union type for the items
      if (itemType === "string" && propertyInfo?.allowedValues && propertyInfo.allowedValues.length > 0) {
        const unionType = propertyInfo.allowedValues.map(value => `"${value.replace(/"/g, '\\"')}"`).join(" | ");
        return `(${unionType})[]`;
      }
      
      return `${itemType}[]`;
    } else if ("ItemType" in prop && prop.ItemType) {
      return `${sanitizeTypeName(prop.ItemType)}[]`;
    } else {
      return "any[]";
    }
  }
  
  // Handle map types
  if ("Type" in prop && prop.Type === "Map") {
    return "Record<string, any>";
  }
  
  // Handle references to other types
  if ("Type" in prop && prop.Type && prop.Type !== "List" && prop.Type !== "Map") {
    const sanitizedTypeName = sanitizeTypeName(prop.Type);
    if (!sanitizedTypeName || sanitizedTypeName === "any") {
      return "any";
    }
    return sanitizedTypeName;
  }

  return "any";
}

function sanitizeTypeName(typeName: string | undefined): string {
  if (!typeName || typeof typeName !== "string") {
    return "any";
  }

  // Replace dots with underscores and other invalid characters
  return typeName
    .replace(/\./g, "_")
    .replace(/[^a-zA-Z0-9_]/g, "_")
    .replace(/^(\d)/, "_$1"); // Ensure it doesn't start with a number
}

/**
 * Enhanced function to get documentation for a property
 * Falls back to original documentation if AI parsing fails
 */
async function getEnhancedDocumentation(
  prop: Property,
  propertyName: string,
  allPropertyNames: string[]
): Promise<PropertyInfo> {
  // If there's no original documentation, return just the URL
  if (!prop.Documentation) {
    return { docstring: "" };
  }

  // Try to get enhanced documentation from AI parsing
  try {
    const enhancedDoc = await getPropertyDocumentation(
      prop.Documentation,
      propertyName,
      allPropertyNames
    );
    
    if (enhancedDoc) {
      return enhancedDoc;
    }
  } catch (error) {
    console.warn(`Failed to get enhanced documentation for ${propertyName}:`, error);
  }

  // Fall back to original documentation (which is just a URL)
  return { docstring: prop.Documentation };
}

async function generatePropsInterface(
  resourceType: ResourceType,
  resourceName: string,
): Promise<string> {
  const lines: string[] = [];

  // Add interface documentation if available
  if (resourceType.Documentation) {
    lines.push(`/** ${resourceType.Documentation} */`);
  }

  lines.push(`export interface ${resourceName}Props {`);

  // Get all property names for validation
  const allPropertyNames = Object.keys(resourceType.Properties);

  // Add properties with enhanced documentation
  for (const [propName, prop] of Object.entries(resourceType.Properties)) {
    // Get enhanced documentation
    const propertyInfo = await getEnhancedDocumentation(prop, propName, allPropertyNames);
    
    // Add documentation comment if available
    if (propertyInfo.docstring) {
      let docComment = propertyInfo.docstring;
      
      // Add pattern information if available
      if (propertyInfo.pattern) {
        docComment += ` @pattern "${propertyInfo.pattern}"`;
      }
      
      lines.push(`  /** ${docComment} */`);
    }

    const propType = convertPropertyToTypeScript(prop, propertyInfo);
    const required = prop.Required ? "" : "?";
    lines.push(`  ${propName}${required}: ${propType};`);
  }

  lines.push("}");
  return lines.join("\n");
}

async function generatePropertyTypeInterface(
  properties: Record<string, Property>,
  typeName: string,
): Promise<string> {
  const lines: string[] = [];
  const sanitizedTypeName = sanitizeTypeName(typeName);

  lines.push(`export interface ${sanitizedTypeName} {`);

  // Get all property names for validation
  const allPropertyNames = Object.keys(properties);

  // Add properties with enhanced documentation
  for (const [propName, prop] of Object.entries(properties)) {
    // Get enhanced documentation
    const propertyInfo = await getEnhancedDocumentation(prop, propName, allPropertyNames);
    
    // Add documentation comment if available
    if (propertyInfo.docstring) {
      let docComment = propertyInfo.docstring;
      
      // Add pattern information if available
      if (propertyInfo.pattern) {
        docComment += ` @pattern "${propertyInfo.pattern}"`;
      }
      
      lines.push(`  /** ${docComment} */`);
    }

    const propType = convertPropertyToTypeScript(prop, propertyInfo);
    const required = prop.Required ? "" : "?";
    lines.push(`  ${propName}${required}: ${propType};`);
  }

  lines.push("}");
  return lines.join("\n");
}

function generateTypeAlias(
  propertyType: PropertyType,
  typeName: string,
): string {
  const sanitizedTypeName = sanitizeTypeName(typeName);
  let aliasType: string;

  if ("PrimitiveType" in propertyType && propertyType.PrimitiveType) {
    aliasType = convertPropertyToTypeScript(propertyType as Property);
  } else if ("Type" in propertyType && (propertyType.Type === "List" || propertyType.Type === "Array")) {
    if ("PrimitiveItemType" in propertyType && propertyType.PrimitiveItemType) {
      let itemType = propertyType.PrimitiveItemType.toLowerCase();
      if (itemType === "integer" || itemType === "double" || itemType === "long") {
        itemType = "number";
      } else if (itemType === "json") {
        itemType = "any";
      } else if (itemType === "timestamp") {
        itemType = "string";
      }
      aliasType = `${itemType}[]`;
    } else if ("ItemType" in propertyType && propertyType.ItemType) {
      aliasType = `${sanitizeTypeName(propertyType.ItemType)}[]`;
    } else {
      aliasType = "any[]";
    }
  } else if ("Type" in propertyType && propertyType.Type === "Map") {
    aliasType = "Record<string, any>";
  } else if ("Type" in propertyType && propertyType.Type) {
    aliasType = sanitizeTypeName(propertyType.Type);
  } else {
    aliasType = "any";
  }

  return `export type ${sanitizedTypeName} = ${aliasType};`;
}

async function loadSpec(): Promise<CloudFormationResourceSpecification> {
  console.log(`Loading CloudFormation specification from ${SPEC_FILE}...`);
  const specData = await readFile(SPEC_FILE, "utf-8");
  const parsedSpec = JSON.parse(specData);
  
  // Validate the spec using the schema
  const validatedSpec = validateCloudFormationSpec(parsedSpec);
  console.log("Successfully loaded and validated specification");
  
  return validatedSpec;
}

async function generateTypesForService(
  spec: CloudFormationResourceSpecification,
  serviceName: string,
  outputFile: string,
): Promise<void> {
  console.log(`Generating types for service: ${serviceName}`);
  
  const serviceInfo = parseServiceName(serviceName);
  const declarations: string[] = [];
  
  declarations.push(`// Generated by scripts/util/generate-types-from-spec.ts
// DO NOT EDIT THIS FILE DIRECTLY
// Service: ${serviceName}
`);

  // Find all property types for this service
  const servicePropertyTypes: Record<string, PropertyType> = {};
  
  // Add global property types (like Tag)
  for (const [fullTypeName, propertyType] of Object.entries(spec.PropertyTypes)) {
    if (!fullTypeName.includes("::")) {
      // This is a global type like "Tag"
      servicePropertyTypes[fullTypeName] = propertyType;
    }
  }
  
  // Add service-specific property types
  for (const [fullTypeName, propertyType] of Object.entries(spec.PropertyTypes)) {
    if (fullTypeName.startsWith(`${serviceName}::`)) {
      // Extract the type name after the last dot
      // e.g., "AWS::XRay::Group.InsightsConfiguration" -> "InsightsConfiguration"
      const dotIndex = fullTypeName.lastIndexOf(".");
      if (dotIndex !== -1) {
        const typeName = fullTypeName.substring(dotIndex + 1);
        servicePropertyTypes[typeName] = propertyType;
      }
    }
  }

  // Find all resource types for this service
  const serviceResourceTypes: Record<string, ResourceType> = {};
  for (const [fullTypeName, resourceType] of Object.entries(spec.ResourceTypes)) {
    if (fullTypeName.startsWith(`${serviceName}::`)) {
      const resourceName = fullTypeName.replace(`${serviceName}::`, "");
      serviceResourceTypes[resourceName] = resourceType;
    }
  }

  if (Object.keys(servicePropertyTypes).length === 0 && Object.keys(serviceResourceTypes).length === 0) {
    throw new Error(`No types found for service: ${serviceName}`);
  }

  // Generate property type interfaces and aliases
  for (const [typeName, propertyType] of Object.entries(servicePropertyTypes)) {
    if ("Properties" in propertyType && propertyType.Properties) {
      // Complex type with properties
      const propertyInterface = await generatePropertyTypeInterface(
        propertyType.Properties,
        typeName,
      );
      declarations.push(propertyInterface);
    } else {
      // Simple type alias
      const typeAlias = generateTypeAlias(propertyType, typeName);
      declarations.push(typeAlias);
    }
  }

  // Generate resource props interfaces
  for (const [resourceName, resourceType] of Object.entries(serviceResourceTypes)) {
    const propsInterface = await generatePropsInterface(resourceType, resourceName);
    declarations.push(propsInterface);
  }

  // Format the generated code with Prettier
  const unformattedCode = declarations.join("\n\n");
  const formattedCode = await prettier.format(unformattedCode, {
    parser: "typescript",
    semi: true,
    singleQuote: false,
    trailingComma: "es5",
    printWidth: 100,
    tabWidth: 2,
    useTabs: false,
  });

  console.log(`Writing types to ${outputFile}...`);
  await writeFile(outputFile, formattedCode);
  
  // Show cache statistics
  const cacheInfo = getCacheInfo();
  
  console.log(`Successfully generated types for ${serviceName}:`);
  console.log(`  - Property types: ${Object.keys(servicePropertyTypes).length}`);
  console.log(`  - Resource types: ${Object.keys(serviceResourceTypes).length}`);
  console.log(`  - Output file: ${outputFile}`);
  console.log(`  - Documentation cache: ${cacheInfo.urls} URLs, ${cacheInfo.totalProperties} properties`);
}

try {
  const spec = await loadSpec();
  await generateTypesForService(spec, serviceName, outputFile);
} catch (error) {
  console.error("Error generating types:", error);
  process.exit(1);
}