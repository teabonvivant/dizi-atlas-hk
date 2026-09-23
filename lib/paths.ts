export const basePath = "/dizi-atlas-hk";
export function withBasePath(value: string): string {
  return value.startsWith("/") && !value.startsWith("//") && value !== basePath && !value.startsWith(basePath + "/") ? basePath + value : value;
}
export function formPath(value: string): string {
  const at = value.search(/[?#]/), pathname = at < 0 ? value : value.slice(0, at), suffix = at < 0 ? "" : value.slice(at);
  return withBasePath(pathname.endsWith("/") ? pathname : pathname + "/") + suffix;
}
