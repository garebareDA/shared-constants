export type YamlFormat = {
  format: string;
  constants: {
    values: Array<{
      key: string;
      value: string;
      type: string;
    }>;
  };
  nameSpace: string;
  target: Array<{
    language: 'typescript' | 'ruby' | 'python';
    output: string;
  }>;
};

export function checkFormat(data: unknown) {
  const isValid = checkRootFormat(data);
  if (!isValid) throw new Error('Invalid YAML format');
  return data as YamlFormat;
}

function checkRootFormat(data: unknown): data is YamlFormat {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof (data as YamlFormat).format === 'string' &&
    (data as YamlFormat).format === 'shared-constants' &&
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
    typeof (data as YamlFormat).nameSpace === 'string' &&
    Array.isArray((data as YamlFormat).target) &&
    (data as YamlFormat).target.length > 0 &&
    (data as YamlFormat).target.every(
      (item) =>
        typeof item === 'object' &&
        item !== null &&
        typeof item.language === 'string' &&
        (item.language === 'typescript' ||
          item.language === 'ruby' ||
          item.language === 'python') &&
        typeof item.output === 'string'
    )
  );
}
