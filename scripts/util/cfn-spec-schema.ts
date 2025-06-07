import { z } from 'zod';

// Schema for primitive types used in CloudFormation
const PrimitiveType = z.enum([
  'String',
  'Boolean',
  'Integer',
  'Double',
  'Long',
  'Json',
  'Timestamp'
]);

// Schema for update types
const UpdateType = z.enum([
  'Mutable',
  'Immutable',
  'Conditional'
]);

// Base property schema with common fields
const BasePropertySchema = z.object({
  Documentation: z.string(),
  Required: z.boolean(),
  UpdateType: UpdateType
});

// Property schema for primitive types
const PrimitivePropertySchema = BasePropertySchema.extend({
  PrimitiveType: PrimitiveType
});

// Property schema for complex types
const TypePropertySchema = BasePropertySchema.extend({
  Type: z.string()
});

// Property schema for lists with primitive item types
const ListPrimitivePropertySchema = BasePropertySchema.extend({
  Type: z.literal('List'),
  PrimitiveItemType: PrimitiveType,
  DuplicatesAllowed: z.boolean().optional()
});

// Property schema for lists with complex item types
const ListTypePropertySchema = BasePropertySchema.extend({
  Type: z.literal('List'),
  ItemType: z.string(),
  DuplicatesAllowed: z.boolean().optional()
});

// Property schema for maps
const MapPropertySchema = BasePropertySchema.extend({
  Type: z.literal('Map'),
  PrimitiveItemType: PrimitiveType.optional(),
  ItemType: z.string().optional(),
  DuplicatesAllowed: z.boolean().optional()
});

// Union of all property types
// Note: Order matters for union discrimination - more specific schemas should come first
const PropertySchema = z.union([
  // List with primitive items
  ListPrimitivePropertySchema,
  // List with complex items
  ListTypePropertySchema,
  // Map properties
  MapPropertySchema,
  // Primitive properties (no Type field)
  PrimitivePropertySchema,
  // Complex type properties (most generic, should be last)
  TypePropertySchema
]);

// Schema for resource attributes
const AttributeSchema = z.object({
  PrimitiveType: PrimitiveType.optional(),
  Type: z.string().optional(),
  ItemType: z.string().optional(),
  PrimitiveItemType: PrimitiveType.optional()
});

// Schema for resource types
const ResourceTypeSchema = z.object({
  Documentation: z.string(),
  Properties: z.record(z.string(), PropertySchema),
  Attributes: z.record(z.string(), AttributeSchema).optional()
});

// Schema for property types (used in complex properties)
// Property types can either have a Properties field (container) or be property definitions themselves
const PropertyTypeWithPropertiesSchema = z.object({
  Documentation: z.string(),
  Properties: z.record(z.string(), PropertySchema)
});

const PropertyTypeDirectSchema = BasePropertySchema.extend({
  Type: z.string().optional(),
  PrimitiveType: PrimitiveType.optional(),
  ItemType: z.string().optional(),
  PrimitiveItemType: PrimitiveType.optional(),
  DuplicatesAllowed: z.boolean().optional()
});

const PropertyTypeSchema = z.union([
  PropertyTypeWithPropertiesSchema,
  PropertyTypeDirectSchema
]);

// Main CloudFormation Resource Specification schema
export const CloudFormationResourceSpecificationSchema = z.object({
  ResourceSpecificationVersion: z.string(),
  ResourceTypes: z.record(z.string(), ResourceTypeSchema),
  PropertyTypes: z.record(z.string(), PropertyTypeSchema)
});

// Export types for TypeScript usage
export type CloudFormationResourceSpecification = z.infer<typeof CloudFormationResourceSpecificationSchema>;
export type ResourceType = z.infer<typeof ResourceTypeSchema>;
export type PropertyType = z.infer<typeof PropertyTypeSchema>;
export type Property = z.infer<typeof PropertySchema>;
export type Attribute = z.infer<typeof AttributeSchema>;

// Validation function
export function validateCloudFormationSpec(data: unknown): CloudFormationResourceSpecification {
  return CloudFormationResourceSpecificationSchema.parse(data);
}

// Safe validation function that returns success/error
export function safeValidateCloudFormationSpec(data: unknown) {
  return CloudFormationResourceSpecificationSchema.safeParse(data);
}