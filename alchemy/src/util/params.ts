/**
 * Flatten nested parameters for API calls
 */
export function flattenParams(
  params: Record<string, any>,
  prefix = "",
): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(params)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (value === null || value === undefined) {
      continue;
    }

    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (typeof item === "object") {
          Object.assign(result, flattenParams(item, `${fullKey}.${index + 1}`));
        } else {
          result[`${fullKey}.${index + 1}`] = String(item);
        }
      });
    } else if (typeof value === "object") {
      Object.assign(result, flattenParams(value, fullKey));
    } else {
      result[fullKey] = String(value);
    }
  }

  return result;
}
