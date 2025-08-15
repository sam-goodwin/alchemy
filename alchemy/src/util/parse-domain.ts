type Domain<U extends string | URL | undefined> = U extends undefined
  ? undefined
  : U extends string
    ? string
    : U extends URL
      ? string
      : never;

export function parseDomain<U extends string | URL | undefined>(
  url: U,
): Domain<U> {
  if (url === undefined) {
    return undefined!;
  } else if (url instanceof URL) {
    return url.hostname! as Domain<U>;
  } else {
    return new URL(url).hostname as Domain<U>;
  }
}
