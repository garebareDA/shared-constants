export function typeParser(types: string) {
  return types.split('|').map((type) => type.trim());
}

export function isIncludedType(
  array: ReadonlyArray<string>,
  type: ReadonlyArray<string>
): boolean {
  return array.some((value) => type.includes(value));
}
