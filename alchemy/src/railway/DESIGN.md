# Railway Provider Design

## Overview

Railway is a modern platform-as-a-service (PaaS) that provides infrastructure hosting with a focus on developer experience. This provider enables declarative management of Railway resources through Alchemy's Infrastructure-as-Code framework.

## API Structure

Railway uses a GraphQL API that powers their dashboard and supports full schema introspection:

- **Endpoint**: `https://backboard.railway.com/graphql/v2`
- **Authentication**: Bearer tokens (Account, Team, or Project-scoped)
- **Rate Limits**: 1000 requests/hour with speed limits based on plan tier
- **Client Strategy**: Direct GraphQL client (no official TypeScript SDK available)

## Resource Hierarchy & Dependencies (DAG)

Based on Railway's API structure, the resources form the following directed acyclic graph:

```
User/Team (Authentication Root)
│
├── Project
│   ├── Environment
│   │   ├── Service
│   │   │   ├── Deployment
│   │   │   ├── Variable (Service-scoped)
│   │   │   └── Domain (Custom)
│   │   ├── Variable (Environment-scoped/shared)
│   │   └── Plugin (Database/External Services)
│   │       ├── Variable (Plugin-scoped)
│   │       └── Database (PostgreSQL, MySQL, Redis, etc.)
│   └── Webhook
│
├── Custom Domain (Account-level)
└── Team (if using team tokens)
```

### Resource Dependencies

1. **Project** - Root resource, no dependencies
2. **Environment** - Depends on Project
3. **Service** - Depends on Project + Environment
4. **Plugin** - Depends on Project + Environment
5. **Variable** - Depends on Project + Environment + (optionally Service/Plugin)
6. **Deployment** - Depends on Service (created automatically or manually triggered)
7. **Domain** - Depends on Service or can be project-level
8. **Webhook** - Depends on Project

## Core Resources

### 1. Project
- **Purpose**: Top-level container for all resources
- **Properties**: name, description, team ownership
- **Operations**: create, update, delete, list
- **Compute**: Minimal (metadata only)

### 2. Environment
- **Purpose**: Isolated contexts within a project (production, staging, etc.)
- **Properties**: name, project reference
- **Operations**: create, update, delete, list
- **Compute**: Minimal (configuration only)

### 3. Service
- **Purpose**: Deployable application or service
- **Properties**: name, source (Git repo, Docker image), build/deploy config
- **Operations**: create, update, delete, deploy, restart
- **Compute**: HIGH - Source building, container deployment, scaling

### 4. Plugin
- **Purpose**: Managed databases and external services
- **Properties**: type (PostgreSQL, MySQL, Redis, etc.), configuration
- **Operations**: create, update, delete, backup, restore
- **Compute**: MEDIUM - Database provisioning, backup/restore operations

### 5. Variable
- **Purpose**: Environment variables for services and plugins
- **Properties**: name, value, scope (environment/service/plugin)
- **Operations**: create, update, delete, bulk operations
- **Compute**: Minimal (metadata only)

### 6. Deployment
- **Purpose**: Specific deployable version of a service
- **Properties**: service reference, build logs, status, URL
- **Operations**: create (deploy), restart, rollback, list
- **Compute**: HIGH - Build process, artifact generation, deployment orchestration

### 7. Domain
- **Purpose**: Custom domain mapping to services
- **Properties**: domain name, service reference, SSL configuration
- **Operations**: create, update, delete, verify
- **Compute**: MEDIUM - DNS configuration, SSL certificate management

### 8. Webhook
- **Purpose**: HTTP callbacks for project events
- **Properties**: URL, events to monitor, project reference
- **Operations**: create, update, delete, test
- **Compute**: Minimal (configuration only)

## Compute-Intensive Resources

### High Compute Requirements

1. **Service** - Source code building, containerization, deployment
2. **Deployment** - Build pipeline execution, artifact creation, deployment orchestration

### Medium Compute Requirements

1. **Plugin** - Database provisioning, configuration, backup/restore operations
2. **Domain** - DNS propagation, SSL certificate generation/renewal

### Low Compute Requirements

1. **Project** - Metadata management
2. **Environment** - Configuration management  
3. **Variable** - Simple CRUD operations
4. **Webhook** - Configuration management

## Implementation Strategy

### Authentication & Client

- Use `graphql-request` or similar lightweight GraphQL client
- Implement token-based authentication with support for all three token types
- Handle rate limiting with exponential backoff
- Support for GraphQL introspection for type safety

### Resource Implementation Order

1. **Project** (foundational)
2. **Environment** (depends on Project)
3. **Variable** (depends on Project + Environment)
4. **Plugin** (depends on Project + Environment)
5. **Service** (depends on Project + Environment)
6. **Deployment** (depends on Service)
7. **Domain** (depends on Service)
8. **Webhook** (depends on Project)

### State Management

- Use Railway's unique IDs as primary identifiers
- Implement proper resource lifecycle (create, read, update, delete)
- Handle async operations for compute-intensive resources (Services, Deployments)
- Implement polling for deployment status tracking

### Error Handling

- Map Railway GraphQL errors to appropriate Alchemy exceptions
- Handle rate limiting gracefully
- Provide clear error messages for common issues (missing permissions, resource conflicts)

### Integration Patterns

- **Service + Git Repository**: Connect services to GitHub repos for automatic deployments
- **Service + Environment Variables**: Manage configuration across environments
- **Service + Custom Domain**: Route traffic through custom domains
- **Plugin + Service**: Connect databases to applications via environment variables
- **Environment Promotion**: Copy variables and configurations across environments

## Resource Relationships

Railway resources support these key relationship patterns:

1. **Project -> Environment**: One-to-many containment
2. **Environment -> Service**: One-to-many containment
3. **Environment -> Plugin**: One-to-many containment
4. **Service -> Deployment**: One-to-many versioning
5. **Service -> Domain**: One-to-many routing
6. **Service -> Variable**: One-to-many configuration (scoped)
7. **Plugin -> Variable**: One-to-many configuration (scoped)
8. **Environment -> Variable**: One-to-many configuration (shared)

## Migration & Deployment Patterns

### Blue-Green Deployments
- Create new deployment while keeping previous version running
- Route traffic to new version after health checks
- Rollback capability to previous deployment

### Environment Promotion
- Copy variable configurations from staging to production
- Deploy same service configuration across environments
- Maintain environment-specific overrides

### Database Migrations
- Use Railway's plugin system for managed databases
- Connect migration scripts through service deployments
- Handle schema evolution with backward compatibility

## Testing Strategy

- Mock Railway GraphQL API for unit tests
- Use Railway's staging environments for integration tests
- Test resource lifecycle: create -> update -> delete
- Verify compute-intensive operations complete successfully
- Test error scenarios and rollback procedures

## Future Considerations

- **Multi-region Support**: Railway may expand to multiple regions
- **Advanced Networking**: Private networking between services
- **Observability**: Integration with Railway's monitoring and logging
- **Autoscaling**: Dynamic scaling based on metrics
- **Cost Management**: Resource usage tracking and optimization