export function typeParser(types: string) {
  return types.split('|').map((type) => type.trim());
}

export function isIncludedType(
  array: ReadonlyArray<string>,
  type: string
): boolean {
  return array.includes(type);
}
