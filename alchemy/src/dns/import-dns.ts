import type { Context } from "../context.js";
import { Resource } from "../resource.js";
import { DEFAULT_RECORD_TYPES, type DnsRecordType } from "./record.js";

/**
 * DNS record response structure from Cloudflare DNS API
 * with both data (original) and content (for compatibility)
 */
export interface DnsApiRecord {
  name: string;
  type: DnsRecordType;
  TTL: number;
  data: string;
  content: string; // Added for compatibility with DnsRecords
  ttl: number; // Normalized ttl (lowercase)
  priority?: number; // Priority for MX and SRV records
}

/**
 * Cloudflare DNS-over-HTTPS API response structure
 */
interface CloudflareDNSResponse {
  Status: number;
  TC: boolean;
  RD: boolean;
  RA: boolean;
  AD: boolean;
  CD: boolean;
  Question: Array<{
    name: string;
    type: number;
  }>;
  Answer?: {
    name: string;
    type: number;
    TTL: number;
    data: string;
  }[];
}

/**
 * Properties for importing DNS records
 */
export interface ImportDnsRecordsProps {
  /**
   * The domain to fetch DNS records for
   */
  domain: string;

  /**
   * Specific record types to fetch. If not provided, defaults to all supported types.
   */
  recordTypes?: DnsRecordType[];

  /**
   * Bump the resource to force a new import
   */
  bump?: number;
}

/**
 * Output returned after DNS records import
 */
export interface ImportDnsRecords
  extends Resource<"dns::ImportDnsRecords">,
    ImportDnsRecordsProps {
  /**
   * The DNS records as a flat array, directly compatible with DnsRecords function
   */
  records: DnsApiRecord[];

  /**
   * Time at which the records were imported
   */
  importedAt: number;
}

/**
 * Map numeric DNS record type to string type
 */
function mapDnsRecordType(type: number): DnsRecordType {
  const typeMap: Record<number, DnsRecordType> = {
    1: "A",
    2: "NS",
    5: "CNAME",
    6: "SOA",
    15: "MX",
    16: "TXT",
    28: "AAAA",
    33: "SRV",
    12: "PTR",
  };

  return typeMap[type] || "A";
}

/**
 * Import DNS records for a domain using Cloudflare's DNS-over-HTTPS API.
 * This resource allows you to fetch DNS records for a domain and store them
 * in a structured format.
 *
 * @example
 * // Import all default record types
 * const allRecords = await ImportDnsRecords("example.com", {
 *   domain: "example.com"
 * });
 *
 * @example
 * // Import only specific record types
 * const specificRecords = await ImportDnsRecords("example.com", {
 *   domain: "example.com",
 *   recordTypes: ["A", "MX"]
 * });
 *
 * @example
 * // Import DNS records and transfer them to a Cloudflare zone
 * const dnsRecords = await ImportDnsRecords("dns-records", {
 *   domain: "example.com",
 * });
 *
 * const zone = await Zone("example.com", {
 *   name: "example.com",
 *   type: "full",
 * });
 *
 * // Records are directly compatible with DnsRecords function
 * await DnsRecords("transfer-dns-records", {
 *   zoneId: zone.id,
 *   records: dnsRecords.records,
 * });
 */
export const ImportDnsRecords = Resource(
  "dns::ImportDnsRecords",
  async function (
    this: Context<ImportDnsRecords>,
    _id: string,
    props: ImportDnsRecordsProps,
  ): Promise<ImportDnsRecords> {
    // For delete phase, just return destroyed state since this is a read-only resource
    if (this.phase === "delete") {
      return this.destroy();
    }

    const recordTypes = props.recordTypes || DEFAULT_RECORD_TYPES;
    const allRecords: DnsApiRecord[] = [];

    for (const type of recordTypes) {
      try {
        const res = await fetch(
          `https://cloudflare-dns.com/dns-query?name=${props.domain}&type=${type}`,
          {
            headers: {
              accept: "application/dns-json",
            },
          },
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch ${type} records: ${res.statusText}`);
        }

        const data = (await res.json()) as CloudflareDNSResponse;

        if (data.Answer) {
          // Transform records to be compatible with DnsRecords function
          const compatRecords = data.Answer.map((record) => {
            const recordType = mapDnsRecordType(record.type);
            const result: DnsApiRecord = {
              name: record.name,
              type: recordType,
              TTL: record.TTL,
              data: record.data,
              content: record.data, // Default mapping
              ttl: record.TTL, // Normalized lowercase ttl
            };

            // Special handling for MX records to split priority and content
            if (recordType === "MX") {
              const parts = record.data.split(" ");
              if (parts.length >= 2) {
                const priority = Number.parseInt(parts[0], 10);
                // Join the rest as hostname in case there are spaces
                const hostname = parts.slice(1).join(" ");

                if (!Number.isNaN(priority)) {
                  result.priority = priority;
                  result.content = hostname;
                }
              }
            }

            return result;
          });

          allRecords.push(...compatRecords);
        }
      } catch (error) {
        console.warn(
          `Failed to fetch ${type} records for ${props.domain}:`,
          error,
        );
      }
    }

    // Return the resource with fetched records as a flat array
    return this({
      domain: props.domain,
      recordTypes: [...recordTypes],
      records: allRecords,
      importedAt: Date.now(),
    });
  },
);
