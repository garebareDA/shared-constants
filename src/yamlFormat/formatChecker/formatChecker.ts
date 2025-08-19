export type YamlFormat = {
  format: string;
  constants: {
    values: Array<{
      key: string;
      value: string;
      type: string;
    }>;
  };
  target: Array<{
    language: 'typescript' | 'ruby' | 'python' | 'go';
    output: string;
    nameSpace: string;
  }>;
};

export function checkFormat(data: unknown): YamlFormat {
  try {
    checkRootFormat(data);
    return data as YamlFormat;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Invalid YAML format');
  }
}

function checkRootFormat(data: unknown): asserts data is YamlFormat {
  if (!isObject(data)) {
    throw new Error('Data must be an object');
  }

  checkFormatField(data);
  checkConstants(data);
  checkTarget(data);
}

function isObject(data: unknown): data is Record<string, unknown> {
  return typeof data === 'object' && data !== null;
}

function checkFormatField(data: Record<string, unknown>): void {
  if (typeof data.format !== 'string') {
    throw new Error('Format field must be a string');
  }

  if (data.format !== 'shared-constants') {
    throw new Error(`Format must be 'shared-constants', got: ${data.format}`);
  }
}

function checkConstants(data: Record<string, unknown>): void {
  if (!isObject(data.constants)) {
    throw new Error('Constants field must be an object');
  }

  if (!Array.isArray(data.constants.values)) {
    throw new Error('Constants values must be an array');
  }

  if (data.constants.values.length === 0) {
    throw new Error('Constants values array cannot be empty');
  }

  data.constants.values.forEach((item, index) => {
    checkConstantItem(item, index);
  });
}

function checkConstantItem(item: unknown, index: number): void {
  if (!isObject(item)) {
    throw new Error(`Constant item at index ${index} must be an object`);
  }

  if (typeof item.key !== 'string') {
    throw new Error(`Constant key at index ${index} must be a string`);
  }

  if (
    typeof item.value !== 'string' &&
    typeof item.value !== 'number' &&
    typeof item.value !== 'boolean'
  ) {
    throw new Error(
      `Constant value at index ${index} must be a string, number, or boolean`
    );
  }

  if (typeof item.type !== 'string') {
    throw new Error(`Constant type at index ${index} must be a string`);
  }
}

function checkTarget(data: Record<string, unknown>): void {
  if (!Array.isArray(data.target)) {
    throw new Error('Target field must be an array');
  }

  if (data.target.length === 0) {
    throw new Error('Target array cannot be empty');
  }

  data.target.forEach((item, index) => {
    checkTargetItem(item, index);
  });
}

function checkTargetItem(item: unknown, index: number): void {
  if (!isObject(item)) {
    throw new Error(`Target item at index ${index} must be an object`);
  }

  if (typeof item.language !== 'string') {
    throw new Error(`Target language at index ${index} must be a string`);
  }

  const supportedLanguages = ['typescript', 'ruby', 'python', 'go'] as const;
  if (
    !supportedLanguages.includes(
      item.language as (typeof supportedLanguages)[number]
    )
  ) {
    throw new Error(
      `Target language at index ${index} must be one of: ${supportedLanguages.join(', ')}`
    );
  }

  if (typeof item.output !== 'string') {
    throw new Error(`Target output at index ${index} must be a string`);
  }

  if (typeof item.nameSpace !== 'string') {
    throw new Error(`Target nameSpace at index ${index} must be a string`);
  }
}
