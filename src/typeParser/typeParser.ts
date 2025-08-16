export function typeParser(types: string) {
  return types.split('|').map((type) => type.trim());
}

export function firstIntersectionType(
  inputTypes: ReadonlyArray<string>,
  supportedTypes: ReadonlyArray<string>
): string | null {
  const set = new Set(supportedTypes);
  for (const value of inputTypes) {
    if (set.has(value)) {
      return value;
    }
  }

  throw new Error(`Not Supported Type ${inputTypes.join(', ')}`);
}
