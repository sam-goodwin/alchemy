import type { Secret } from "../secret.ts";
import { createClickhouseApi } from "./api.ts";

/**
 * Get an organization by name.
 *
 * @example
 * const organization = await getOrganizationByName("Alchemy's Organization");
 *
 * @param name The name of the organization to get.
 * @param options The api credentials to use.
 * @returns The organization.
 */
export async function getOrganizationByName(
  name: string,
  options?: {
    keyId?: string | Secret<string>;
    secret?: string | Secret<string>;
  },
) {
  const api = createClickhouseApi(options);

  const organizations = await api.v1.organizations.get();
  const organization = organizations.find(
    (organization) => organization.name === name,
  );
  if (!organization) {
    throw new Error(`Organization ${name} not found`);
  }
  return organization;
}
