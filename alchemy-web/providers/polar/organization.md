# Polar Organization

The Polar Organization resource allows you to manage organization settings in your Polar account.

## Usage

```typescript
import { Organization } from "alchemy/polar";

// Update organization settings
const organization = await Organization("my-org", {
  name: "My Company",
  bio: "We build amazing software products",
  company: "My Company Inc.",
  blog: "https://blog.mycompany.com",
  location: "San Francisco, CA",
  email: "contact@mycompany.com",
  twitterUsername: "mycompany",
  pledgeMinimumAmount: 500,
  pledgeBadgeShowAmount: true,
  profileSettings: {
    featured_projects: ["project1", "project2"]
  },
  metadata: {
    industry: "software",
    size: "startup"
  }
});
```

## Properties

### Optional

- `name` (string): Organization name
- `slug` (string): URL slug for the organization
- `avatarUrl` (string): URL to organization avatar image
- `bio` (string): Organization bio/description
- `company` (string): Company name
- `blog` (string): Blog URL
- `location` (string): Organization location
- `email` (string): Contact email
- `twitterUsername` (string): Twitter username (without @)
- `pledgeMinimumAmount` (number): Minimum pledge amount in cents
- `pledgeBadgeShowAmount` (boolean): Whether to show pledge amounts on badges
- `defaultUpfrontSplitToContributors` (number): Default split percentage to contributors
- `profileSettings` (Record<string, any>): Profile configuration settings
- `featureSettings` (Record<string, any>): Feature configuration settings
- `metadata` (Record<string, string>): Key-value pairs for storing additional information
- `apiKey` (Secret): Polar API key (overrides environment variable)
- `adopt` (boolean): If true, adopt existing resource if creation fails due to conflict

## Output

The Organization resource returns all input properties plus:

- `id` (string): Unique identifier for the organization
- `createdAt` (string): ISO timestamp when the organization was created
- `modifiedAt` (string): ISO timestamp when the organization was last modified

## Notes

Organizations are typically created through the Polar platform rather than programmatically. This resource is primarily used for updating existing organization settings.

## API Reference

- [Get Organization](https://docs.polar.sh/api-reference/organizations/get)
- [Update Organization](https://docs.polar.sh/api-reference/organizations/update)
- [List Organizations](https://docs.polar.sh/api-reference/organizations/list)
