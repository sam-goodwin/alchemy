# OrganizationMember

OrganizationMember manages membership and roles within a Turso organization. Use this resource to add existing Turso users to your organization and manage their permissions.

## Properties

### Input Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `username` | `string` | Yes | The username of the member to add. This must be an existing Turso user. |
| `role` | `"admin" \| "member"` | No | The role to assign to the member. Defaults to `"member"`. |

### Output Properties

| Property | Type | Description |
|----------|------|-------------|
| `username` | `string` | The username of the member. |
| `role` | `"admin" \| "member" \| "owner"` | The member's role in the organization. |
| `email` | `string` | The member's email address. |

## Roles

- **member**: Can create and manage databases within the organization
- **admin**: Can manage databases and invite/remove other members
- **owner**: Has full control over the organization (cannot be modified via API)

## Examples

### Add a Member

Add a new member with default permissions:

```ts
import { OrganizationMember } from "@alchemy/turso";

const member = await OrganizationMember("john-doe", {
  username: "johndoe",
});
```

### Add an Admin

Add a member with admin privileges:

```ts
import { OrganizationMember } from "@alchemy/turso";

const admin = await OrganizationMember("jane-admin", {
  username: "janesmith",
  role: "admin",
});
```

### Update Member Role

Change a member's role by re-applying the resource with new properties:

```ts
import { OrganizationMember } from "@alchemy/turso";

// Initially add as member
const member = await OrganizationMember("developer", {
  username: "devuser",
  role: "member",
});

// Later promote to admin
const admin = await OrganizationMember("developer", {
  username: "devuser",
  role: "admin",
});
```

### Team Setup

Set up a complete team structure:

```ts
import { OrganizationMember } from "@alchemy/turso";

// Add team lead as admin
const lead = await OrganizationMember("team-lead", {
  username: "alice",
  role: "admin",
});

// Add developers as members
const dev1 = await OrganizationMember("dev-1", {
  username: "bob",
  role: "member",
});

const dev2 = await OrganizationMember("dev-2", {
  username: "charlie",
  role: "member",
});

// Add DevOps engineer as admin
const devops = await OrganizationMember("devops", {
  username: "diana",
  role: "admin",
});
```

## Important Notes

1. **Existing Users Only**: The username must belong to an existing Turso user. You cannot create new Turso accounts through this resource.

2. **Owner Role**: The organization owner's role cannot be changed through the API.

3. **Username Immutability**: The username is used as the identifier and cannot be changed after the member is added.

4. **Removal**: When the resource is destroyed, the member is removed from the organization but their Turso account remains active.

5. **Idempotency**: Adding the same user multiple times is idempotent - it will update their role if different.

## Error Handling

Common errors you might encounter:

- **User not found**: The specified username doesn't exist in Turso
- **Already a member**: The user is already in the organization (this is handled gracefully by updating their role)
- **Cannot modify owner**: Attempting to change the role of the organization owner

## Related Resources

- [OrganizationInvite](./organization-invite.md) - Invite users who don't yet have Turso accounts