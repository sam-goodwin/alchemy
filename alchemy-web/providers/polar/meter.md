# Polar Meter

The Polar Meter resource allows you to create and manage usage meters for tracking events in your Polar organization.

## Usage

```typescript
import { Meter } from "alchemy/polar";

// Create a meter for API calls
const meter = await Meter("api-usage-meter", {
  name: "API Usage Meter",
  filter: {
    conjunction: "and",
    clauses: [
      {
        property: "event_type",
        operator: "eq",
        value: "api_call"
      }
    ]
  },
  aggregation: {
    type: "count"
  },
  metadata: {
    category: "usage",
    service: "api"
  }
});

// Create a meter for data usage
const dataMeter = await Meter("data-usage-meter", {
  name: "Data Usage Meter",
  aggregation: {
    type: "sum",
    property: "bytes_transferred"
  }
});
```

## Properties

### Required

- `name` (string): The meter name

### Optional

- `filter` (object): Filter configuration for events
  - `conjunction` ("and" | "or"): How to combine filter clauses
  - `clauses` (array): Array of filter conditions
    - `property` (string): Event property to filter on
    - `operator` ("eq" | "ne" | "gt" | "gte" | "lt" | "lte"): Comparison operator
    - `value` (string): Value to compare against
- `aggregation` (object): How to aggregate the filtered events
  - `type` ("count" | "sum" | "avg" | "max" | "min"): Aggregation method
  - `property` (string): Property to aggregate (required for non-count aggregations)
- `metadata` (Record<string, string>): Key-value pairs for storing additional information
- `apiKey` (Secret): Polar API key (overrides environment variable)
- `adopt` (boolean): If true, adopt existing resource if creation fails due to conflict

## Output

The Meter resource returns all input properties plus:

- `id` (string): Unique identifier for the meter
- `createdAt` (string): ISO timestamp when the meter was created
- `modifiedAt` (string): ISO timestamp when the meter was last modified

## API Reference

- [Get Meter](https://docs.polar.sh/api-reference/meters/get)
- [Create Meter](https://docs.polar.sh/api-reference/meters/create)
- [Update Meter](https://docs.polar.sh/api-reference/meters/update)
- [List Meters](https://docs.polar.sh/api-reference/meters/list)
