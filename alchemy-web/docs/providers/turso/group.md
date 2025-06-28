# Group

A Group in Turso defines the replication and placement configuration for databases. All databases within a group share the same set of locations and replication settings.

## Properties

### Input Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `locations` | `string[]` | Yes | Array of location codes where databases will be replicated. See [available locations](https://docs.turso.tech/api-reference/locations). |
| `primary` | `string` | No | Primary location for the group. Must be one of the locations in the locations array. Defaults to the first location. |
| `delete_protection` | `boolean` | No | Prevents accidental deletion of the group. Defaults to `false`. |

### Output Properties

| Property | Type | Description |
|----------|------|-------------|
| `groupName` | `string` | The name of the group (same as the resource ID). |
| `uuid` | `string` | Unique identifier for the group. |
| `version` | `string` | LibSQL version used by the group. |
| `locations` | `string[]` | Array of location codes where databases are replicated. |
| `primary` | `string` | Primary location for the group. |
| `archived` | `boolean` | Whether the group is archived. |

## Examples

### Single Region Group

Create a group with databases in a single region:

```ts
import { Group } from "@alchemy/turso";

const group = await Group("us-east", {
  locations: ["iad"],
});
```

### Multi-Region Group

Create a group with databases replicated across multiple regions:

```ts
import { Group } from "@alchemy/turso";

const globalGroup = await Group("global", {
  locations: ["iad", "lhr", "syd", "nrt"],
  primary: "iad",
  delete_protection: true,
});
```

### European Group

Create a group focused on European regions:

```ts
import { Group } from "@alchemy/turso";

const euGroup = await Group("europe", {
  locations: ["lhr", "fra", "ams"],
  primary: "fra",
});
```

### Update Group Locations

Add or remove locations from an existing group:

```ts
import { Group } from "@alchemy/turso";

// Initially create with one location
const group = await Group("expandable", {
  locations: ["iad"],
});

// Later expand to multiple regions
const expandedGroup = await Group("expandable", {
  locations: ["iad", "lhr", "syd"],
  primary: "iad",
});
```

## Available Locations

Common location codes include:
- `iad` - Washington, D.C., USA
- `lhr` - London, UK
- `fra` - Frankfurt, Germany
- `ams` - Amsterdam, Netherlands
- `syd` - Sydney, Australia
- `nrt` - Tokyo, Japan
- `sin` - Singapore
- `gru` - São Paulo, Brazil

For a complete list of available locations, see the [Turso Locations API](https://docs.turso.tech/api-reference/locations).

## Important Notes

1. **Group Name**: The group name is immutable after creation and must be unique within your organization.

2. **Multi-Group Limitation**: Free tier accounts are limited to 1 group. Multiple groups require a paid plan.

3. **Location Validation**: The primary location must be included in the locations array.

4. **Database Inheritance**: All databases created within a group will be replicated to all of the group's locations.

5. **Performance**: Choose locations close to your users for optimal performance. The primary location should be where most writes occur.

## Related Resources

- [Database](./database.md) - Databases belong to groups and inherit their replication settings