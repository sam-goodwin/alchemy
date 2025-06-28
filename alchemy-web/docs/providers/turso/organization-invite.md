# OrganizationInvite

OrganizationInvite manages invitations to join a Turso organization. Use this resource to invite users by email address, whether or not they already have a Turso account.

## Properties

### Input Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `email` | `string` | Yes | The email address to send the invitation to. |
| `role` | `"admin" \| "member"` | No | The role to assign when the invitation is accepted. Defaults to `"member"`. |

### Output Properties

| Property | Type | Description |
|----------|------|-------------|
| `email` | `string` | The email address the invitation was sent to. |
| `role` | `"admin" \| "member"` | The role that will be assigned when accepted. |
| `expires_at` | `string` | When the invitation expires (ISO 8601 timestamp). |

## Examples

### Basic Invitation

Invite a new member with default permissions:

```ts
import { OrganizationInvite } from "@alchemy/turso";

const invite = await OrganizationInvite("john-invite", {
  email: "john@example.com",
});
```

### Admin Invitation

Invite someone as an admin:

```ts
import { OrganizationInvite } from "@alchemy/turso";

const adminInvite = await OrganizationInvite("admin-invite", {
  email: "admin@example.com",
  role: "admin",
});
```

### Batch Invitations

Send invitations to multiple team members:

```ts
import { OrganizationInvite } from "@alchemy/turso";

const invites = await Promise.all([
  OrganizationInvite("dev1-invite", {
    email: "developer1@example.com",
    role: "member",
  }),
  OrganizationInvite("dev2-invite", {
    email: "developer2@example.com",
    role: "member",
  }),
  OrganizationInvite("lead-invite", {
    email: "teamlead@example.com",
    role: "admin",
  }),
]);

console.log(`Sent ${invites.length} invitations`);
```

### Update Invitation Role

Change the role for a pending invitation by re-applying with a different role:

```ts
import { OrganizationInvite } from "@alchemy/turso";

// Initial invitation as member
const invite = await OrganizationInvite("contractor", {
  email: "contractor@example.com",
  role: "member",
});

// Update to admin role (deletes and recreates the invitation)
const updatedInvite = await OrganizationInvite("contractor", {
  email: "contractor@example.com",
  role: "admin",
});
```

### Onboarding Workflow

Set up invitations as part of an onboarding process:

```ts
import { OrganizationInvite, Group, Database } from "@alchemy/turso";

// Set up infrastructure
const devGroup = await Group("development", {
  locations: ["iad"],
});

const devDb = await Database("dev-db", {
  group: devGroup,
});

// Invite the development team
const frontendDev = await OrganizationInvite("frontend-dev", {
  email: "frontend@example.com",
  role: "member",
});

const backendDev = await OrganizationInvite("backend-dev", {
  email: "backend@example.com",
  role: "member",
});

const devOps = await OrganizationInvite("devops", {
  email: "devops@example.com",
  role: "admin",
});

console.log("Infrastructure ready and team invitations sent!");
```

## Important Notes

1. **Email Validation**: The email address must be valid. Invalid addresses will result in an error.

2. **Expiration**: Invitations expire after a certain period (typically 7 days). The exact expiration time is shown in the `expires_at` field.

3. **Existing Members**: You cannot invite someone who is already a member of the organization. The API will return an error.

4. **Update Behavior**: Invitations cannot be directly updated. To change the role, the resource will automatically delete the existing invitation and create a new one.

5. **Idempotency**: Creating an invitation with the same email address will reuse the existing invitation if the role matches, or recreate it if the role differs.

6. **No Resend**: The API doesn't provide a way to resend invitation emails. Users can request a new invitation link from the Turso dashboard.

## Invitation Flow

1. **Send Invitation**: Use this resource to send an invitation
2. **Email Delivery**: Turso sends an email to the specified address
3. **User Action**: The recipient clicks the link in the email
4. **Account Creation**: If they don't have a Turso account, they create one
5. **Join Organization**: They automatically join your organization with the specified role
6. **Cleanup**: The invitation is automatically removed once accepted

## Related Resources

- [OrganizationMember](./organization-member.md) - Add existing Turso users directly to your organization