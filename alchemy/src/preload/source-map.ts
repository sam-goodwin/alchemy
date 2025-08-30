const MAP_INLINE_RX =
  /\/\/[#@]\s*sourceMappingURL=data:application\/json[^,]*,([A-Za-z0-9+/=._-]+)\s*$/m;
const MAP_EXT_RX = /\/\/[#@]\s*sourceMappingURL=(?!data:)([^\s]+)\s*$/m;

export const countLines = (s: string) => (s.match(/\n/g) || []).length;

export function stripAnyMapDirective(src: string): {
  kind: "inline" | "external" | null;
  payload: string | null;
  body: string;
} {
  let kind: "inline" | "external" | null = null;
  let payload: string | null = null;
  let body = src;
  const inl = src.match(MAP_INLINE_RX);
  if (inl) {
    kind = "inline";
    payload = inl[1];
    body = src.replace(MAP_INLINE_RX, "").trimEnd();
  } else {
    const ext = src.match(MAP_EXT_RX);
    if (ext) {
      kind = "external";
      payload = ext[1];
      body = src.replace(MAP_EXT_RX, "").trimEnd();
    }
  }
  return { kind, payload, body };
}

export function parseInlineMapBase64(b64: string) {
  try {
    return JSON.parse(Buffer.from(b64, "base64").toString("utf8"));
  } catch {
    return null;
  }
}

export function offsetMapLines(map: any, preLines: number, postLines: number) {
  return {
    ...map,
    mappings: `${";".repeat(preLines)}${map.mappings}${";".repeat(postLines)}`,
  };
}

export function attachInlineMap(body: string, mapObj: any) {
  const b64 = Buffer.from(JSON.stringify(mapObj), "utf8").toString("base64");
  return (
    body +
    `\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,${b64}`
  );
}
