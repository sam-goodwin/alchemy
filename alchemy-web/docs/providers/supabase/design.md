# Supabase Provider Design

## Overview
This document outlines the design for the Supabase Management API provider for Alchemy, focusing on Infrastructure as Code (IaC) patterns.

## Resource Hierarchy
```
Organization
├── Project
│   ├── Auth (SSO Providers, Config)
│   ├── Database (Config, Backups, Read Replicas)
│   ├── Edge Functions
│   ├── Storage (Buckets, Config)
│   ├── Secrets
│   ├── Domains (Custom Hostnames, Vanity Subdomains)
│   └── Environments (Branches)
```

## Core Resources

### Organization
- **Purpose**: Top-level container for projects and billing
- **Key Properties**: name, plan, billing settings
- **Operations**: create, get, list members
- **Dependencies**: None (root resource)

### Project
- **Purpose**: Main workspace containing all Supabase services
- **Key Properties**: name, organization_id, region, database password
- **Operations**: create, delete, get, list, pause, restore, upgrade
- **Dependencies**: Organization

### Function (Edge Functions)
- **Purpose**: Serverless compute functions at the edge
- **Key Properties**: name, body, import_map, verify_jwt
- **Operations**: create, deploy, update, delete, get
- **Dependencies**: Project

### Bucket (Storage)
- **Purpose**: File storage containers with access controls
- **Key Properties**: name, public, file_size_limit, allowed_mime_types
- **Operations**: create, update, delete, list
- **Dependencies**: Project

### Secret
- **Purpose**: Environment variables and sensitive configuration
- **Key Properties**: name, value, encrypted
- **Operations**: bulk create, bulk delete, list
- **Dependencies**: Project

### SSO Provider
- **Purpose**: External authentication provider configuration
- **Key Properties**: type, metadata, domains
- **Operations**: create, update, delete, list
- **Dependencies**: Project

### Domain
- **Purpose**: Custom domain and vanity subdomain management
- **Key Properties**: custom_hostname, vanity_subdomain
- **Operations**: create, update, delete, verify
- **Dependencies**: Project

## Authentication
- **Method**: Bearer token authentication
- **Token Types**: Personal Access Token (PAT) or OAuth2
- **Rate Limiting**: 60 requests per minute per user
- **Base URL**: https://api.supabase.com/v1
- **Error Handling**: HTTP 429 for rate limiting, exponential backoff required

## IaC Considerations

### Resource Adoption
All resources support `adopt?: boolean` parameter to handle existing resources:
- When `adopt: true` and resource creation fails with "already exists" error
- Automatically find and adopt the existing resource
- Prevents conflicts during infrastructure import scenarios

### Error Handling and Retries
- **Rate Limiting**: HTTP 429 responses trigger exponential backoff
- **Server Errors**: 5xx responses are retried with exponential backoff
- **Transient Errors**: Network failures and temporary API issues are retried
- **Max Attempts**: 5 attempts with 1-second initial delay, capped at 10 seconds

### Resource Dependencies
- Organizations are independent root resources
- Projects depend on Organizations
- All other resources depend on Projects
- Proper dependency ordering ensures correct creation/deletion sequence

### Lifecycle Management
- **Creation**: Resources are created with proper validation and error handling
- **Updates**: Resources support in-place updates where API allows
- **Deletion**: Resources can be deleted with cascade considerations
- **State Management**: Resource state is tracked through Alchemy's context system

## API Client Design

### SupabaseApi Class
- Follows CloudflareApi pattern from existing Alchemy providers
- Handles authentication headers automatically
- Implements exponential backoff for retryable errors
- Provides HTTP method helpers (get, post, patch, delete)

### Error Handling
- Custom SupabaseApiError class with status codes and error details
- Structured error messages with context (action, resource type, resource name)
- Proper error propagation for debugging and monitoring

## Resource Implementation Pattern

Each resource follows the established Alchemy pseudo-class pattern:
1. **Props Interface**: Defines input parameters including SupabaseApiOptions
2. **Resource Interface**: Defines the resource structure with ResourceKind
3. **Type Guard**: Function to check if a resource is of specific type
4. **Resource Function**: Main implementation using Resource() wrapper
5. **Helper Functions**: API operations (create, get, update, delete)

## Testing Strategy

### Unit Tests
- Each resource has comprehensive test coverage
- Tests cover creation, updates, deletion, and adoption scenarios
- Mock API responses for consistent testing
- Error handling and retry logic validation

### Integration Considerations
- Tests can be run against real Supabase API with proper credentials
- Rate limiting behavior is tested with appropriate delays
- Resource dependencies are validated in integration scenarios

## Security Considerations

### Token Management
- Access tokens are handled as Alchemy Secret objects
- Tokens are not logged or exposed in error messages
- Environment variable fallbacks for configuration

### API Security
- All requests use HTTPS
- Bearer token authentication for all API calls
- Proper error handling to avoid information leakage

## Future Extensibility

### Additional Resources
The design supports easy addition of new resources:
- Database configuration and backups
- Auth configuration and external providers
- Network restrictions and security settings
- Monitoring and logging configuration

### API Evolution
- Version-agnostic design allows for API updates
- Resource interfaces can be extended without breaking changes
- Error handling patterns support new error types

## Implementation Notes

### File Organization
```
alchemy/src/supabase/
├── design.md (this file)
├── index.ts (exports)
├── api.ts (API client)
├── api-error.ts (error handling)
├── organization.ts
├── project.ts
├── function.ts
├── bucket.ts
├── secret.ts
├── sso-provider.ts
└── domain.ts
```

### Testing Organization
```
alchemy/test/supabase/
├── organization.test.ts
├── project.test.ts
├── function.test.ts
├── bucket.test.ts
├── secret.test.ts
├── sso-provider.test.ts
└── domain.test.ts
```

This design ensures a comprehensive, maintainable, and extensible Supabase provider that follows Alchemy's established patterns while providing robust Infrastructure as Code capabilities.
