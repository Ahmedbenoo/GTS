export function shotSrc(src: string, width: number) {
  if (!src.startsWith("/irrigation-photos/")) return src;
  return `${src}${src.includes("?") ? "&" : "?"}w=${width}`;
}
