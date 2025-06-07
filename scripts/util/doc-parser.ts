#!/usr/bin/env bun
import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

// Schema for the structured output from the AI model
const DocumentationSchema = z.object({
  properties: z.array(z.object({
    propertyName: z.string(),
    docstring: z.string(),
    allowedValues: z.array(z.string()).nullable().optional(),
    pattern: z.string().nullable().optional()
  }))
});

// Enhanced property info interface
export interface PropertyInfo {
  docstring: string;
  allowedValues?: string[] | null;
  pattern?: string | null;
}

// Cache for parsed documentation
const documentationCache = new Map<string, Map<string, PropertyInfo>>();

/**
 * Extracts the base URL from a CloudFormation documentation link
 */
function extractBaseUrl(documentationUrl: string): string {
  try {
    const url = new URL(documentationUrl);
    // Remove the hash fragment to get the base page URL
    return `${url.protocol}//${url.host}${url.pathname}${url.search}`;
  } catch (error) {
    throw new Error(`Invalid documentation URL: ${documentationUrl}`);
  }
}

/**
 * Fetches and parses CloudFormation documentation page using AI
 */
async function parseDocumentationPage(baseUrl: string): Promise<Map<string, PropertyInfo>> {
  console.log(`Fetching and parsing documentation from: ${baseUrl}`);
  
  // Check if OpenAI API key is available
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY environment variable is required for enhanced documentation parsing. Set it to use AI-powered documentation extraction.");
  }
  
  try {
    // Fetch the HTML content
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${baseUrl}: ${response.status} ${response.statusText}`);
    }
    
    const html = await response.text();
    
    // Use AI to parse the HTML and extract property documentation
    const result = await generateObject({
      model: openai("gpt-4o-mini"), // Fast, cost-effective model
      prompt: `You are parsing a CloudFormation resource documentation page. Extract ALL property names, their descriptions, and any allowed values from this HTML content.

Important instructions:
- Look for sections that describe properties, parameters, or attributes
- Each property should have a name and a description
- Property names are typically in code formatting or bold
- Descriptions explain what the property does, its purpose, or constraints
- Include ALL properties you can find, even if some descriptions are brief
- Be thorough - missing properties will cause validation failures
- Keep descriptions concise but informative (1-3 sentences)
- Remove any HTML formatting from descriptions

ALLOWED VALUES EXTRACTION:
- Look for "Allowed values:", "Valid values:", "Possible values:", or similar phrases
- Extract the exact string values that are allowed for each property
- Only include literal string values, not patterns or ranges
- Common patterns include: "ENABLED | DISABLED", "true | false", "ACTIVE | INACTIVE"
- If a property has allowed values, include them in the allowedValues array
- If no allowed values are specified, set allowedValues to null or omit the field entirely
- DO NOT include regex patterns or format specifications in allowedValues

PATTERN EXTRACTION:
- Look for "Pattern:", "Format:", "Regex:", "Regular expression:", or similar phrases
- Extract regex patterns that define valid formats for string values
- Common patterns include format specifications like "^[a-zA-Z0-9\-_]+$" or date formats
- Only include actual regex patterns, not literal string values
- If a property has a pattern constraint, include it in the pattern field
- If no pattern is specified, set pattern to null or omit the field entirely

HTML Content:
${html}`,
      schema: DocumentationSchema,
      maxRetries: 5,
      experimental_repairText: async (input) => {
        const json = JSON.parse(input.text);
        
        // Map over properties and remove null values from allowedValues arrays
        if (json.properties && Array.isArray(json.properties)) {
          json.properties = json.properties.map((property: any) => {
            if (property.allowedValues && Array.isArray(property.allowedValues)) {
              property.allowedValues = property.allowedValues.filter((value: any) => value !== null);
            }
            return property;
          });
        }
        
        return JSON.stringify(json, null, 2);
      }
    });
    
    // Convert to a Map for easy lookup
    const propertyMap = new Map<string, PropertyInfo>();
    for (const prop of result.object.properties) {
      propertyMap.set(prop.propertyName, {
        docstring: prop.docstring,
        allowedValues: prop.allowedValues || undefined, // Convert null to undefined for consistency
        pattern: prop.pattern || undefined // Convert null to undefined for consistency
      });
    }
    
    console.log(`Parsed ${propertyMap.size} properties from ${baseUrl}`);
    return propertyMap;
    
  } catch (error) {
    console.error(`Error parsing documentation from ${baseUrl}:`, error);
    throw error;
  }
}

/**
 * Gets documentation for a specific property from a CloudFormation documentation URL
 */
export async function getPropertyDocumentation(
  documentationUrl: string,
  propertyName: string,
  requiredProperties: string[]
): Promise<PropertyInfo | null> {
  const baseUrl = extractBaseUrl(documentationUrl);
  
  // Check cache first
  let propertyMap = documentationCache.get(baseUrl);
  
  if (!propertyMap) {
    // Parse the documentation page
    try {
      propertyMap = await parseDocumentationPage(baseUrl);
      documentationCache.set(baseUrl, propertyMap);
    } catch (error) {
      throw error;
    }
  }
  
  // Validate that all required properties have documentation
  const missingProperties = requiredProperties.filter(prop => !propertyMap?.has(prop));
  
  if (missingProperties.length > 0) {
    console.warn(`Missing documentation for properties: ${missingProperties.join(', ')} in ${baseUrl}`);
    console.log(`Available properties: ${Array.from(propertyMap.keys()).join(', ')}`);
    
    // Invalidate cache and retry once
    documentationCache.delete(baseUrl);
    try {
      console.log(`Retrying documentation parsing for ${baseUrl}...`);
      propertyMap = await parseDocumentationPage(baseUrl);
      documentationCache.set(baseUrl, propertyMap);
      
      // Check again for missing properties
      const stillMissingProperties = requiredProperties.filter(prop => !propertyMap?.has(prop));
      if (stillMissingProperties.length > 0) {
        console.warn(`Still missing documentation after retry: ${stillMissingProperties.join(', ')}`);
      }
    } catch (retryError) {
      console.error(`Retry failed for ${baseUrl}:`, retryError);
      return null;
    }
  }
  
  return propertyMap.get(propertyName) || null;
}

/**
 * Clears the documentation cache (useful for testing or forced refresh)
 */
export function clearDocumentationCache(): void {
  documentationCache.clear();
}

/**
 * Gets the current cache size (useful for debugging)
 */
export function getCacheInfo(): { urls: number, totalProperties: number } {
  let totalProperties = 0;
  for (const propertyMap of documentationCache.values()) {
    totalProperties += propertyMap.size;
  }
  
  return {
    urls: documentationCache.size,
    totalProperties
  };
}