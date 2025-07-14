/**
 * Extract value from XML string
 */
export function extractXmlValue(xml: string, tagName: string): string {
  const match = xml.match(new RegExp(`<${tagName}>(.*?)<\/${tagName}>`));
  return match ? match[1] : "";
}
