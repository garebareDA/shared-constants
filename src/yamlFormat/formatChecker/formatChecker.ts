type YamlFormat = {
  format: string;
  constants: {
    values: Array<{
      key: string;
      value: string;
      type: string;
    }>;
  };
  namespace: string;
  typeMode: string;
};

export function checkFormat(data: unknown) {
  if (!checkRootFormat(data)) throw new Error('Invalid YAML format');
}

function checkRootFormat(data: unknown): data is YamlFormat {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof (data as YamlFormat).format === 'string' &&
    typeof (data as YamlFormat).constants === 'object' &&
    (data as YamlFormat).constants !== null &&
    Array.isArray((data as YamlFormat).constants.values) &&
    (data as YamlFormat).constants.values.length > 0 &&
    (data as YamlFormat).constants.values.every(
      (item) =>
        typeof item === 'object' &&
        item !== null &&
        typeof item.key === 'string' &&
        typeof item.value === 'string' &&
        typeof item.type === 'string'
    ) &&
    typeof (data as YamlFormat).namespace === 'string' &&
    typeof (data as YamlFormat).typeMode === 'string'
  );
}
