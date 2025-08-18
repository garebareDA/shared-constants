import { describe, it, expect } from 'vitest';
import { generate } from '../../../../src/generators/typescript/generator/generator';
import { YamlFormat } from '../../../../src/yamlFormat';

describe('generate', () => {
  it('should generate TypeScript code for shared constants with string types', () => {
    const input: YamlFormat = {
      format: 'shared-constants',
      constants: {
        values: [
          { key: 'exampleKey', value: 'exampleValue', type: 'string' },
          { key: 'exampleKey2', value: 'exampleValue2', type: 'string' },
        ],
      },
      target: [
        {
          language: 'typescript',
          output: './output/',
          nameSpace: 'myNamespace',
        },
      ],
    };

    const expectedOutput = `export const myNamespace = {
  EXAMPLE_KEY: 'exampleValue' as string,
  EXAMPLE_KEY2: 'exampleValue2' as string,
} as const;
`;

    expect(generate(input, 'myNamespace')).toEqual(expectedOutput);
  });

  it('should generate TypeScript code for shared constants with number types', () => {
    const input: YamlFormat = {
      format: 'shared-constants',
      constants: {
        values: [
          { key: 'exampleKey', value: '42', type: 'number' },
          { key: 'exampleKey2', value: '3.14', type: 'number' },
        ],
      },
      target: [
        {
          language: 'typescript',
          output: './output/',
          nameSpace: 'myNamespace',
        },
      ],
    };

    const expectedOutput = `export const myNamespace = {
  EXAMPLE_KEY: 42 as number,
  EXAMPLE_KEY2: 3.14 as number,
} as const;
`;

    expect(generate(input, 'myNamespace')).toEqual(expectedOutput);
  });

  it('should generate TypeScript code for shared constants with boolean types', () => {
    const input: YamlFormat = {
      format: 'shared-constants',
      constants: {
        values: [
          { key: 'exampleKey', value: 'true', type: 'boolean' },
          { key: 'exampleKey2', value: 'false', type: 'boolean' },
        ],
      },
      target: [
        {
          language: 'typescript',
          output: './output/',
          nameSpace: 'myNamespace',
        },
      ],
    };

    const expectedOutput = `export const myNamespace = {
  EXAMPLE_KEY: true as boolean,
  EXAMPLE_KEY2: false as boolean,
} as const;
`;

    expect(generate(input, 'myNamespace')).toEqual(expectedOutput);
  });

  it('should generate TypeScript code for shared constants with bigint types', () => {
    const input: YamlFormat = {
      format: 'shared-constants',
      constants: {
        values: [
          { key: 'exampleKey', value: '123', type: 'bigint' },
          { key: 'exampleKey2', value: '456', type: 'bigint' },
        ],
      },
      target: [
        {
          language: 'typescript',
          output: './output/',
          nameSpace: 'myNamespace',
        },
      ],
    };

    const expectedOutput = `export const myNamespace = {
  EXAMPLE_KEY: 123 as bigint,
  EXAMPLE_KEY2: 456 as bigint,
} as const;
`;

    expect(generate(input, 'myNamespace')).toEqual(expectedOutput);
  });

  it('should handle different key naming conventions', () => {
    const input: YamlFormat = {
      format: 'shared-constants',
      constants: {
        values: [
          { key: 'snake_case_key', value: 'value1', type: 'string' },
          { key: 'kebab-case-key', value: 'value2', type: 'string' },
          { key: 'camelCaseKey', value: 'value3', type: 'string' },
        ],
      },
      target: [
        {
          language: 'typescript',
          output: './output/',
          nameSpace: 'myNamespace',
        },
      ],
    };

    const expectedOutput = `export const myNamespace = {
  SNAKE_CASE_KEY: 'value1' as string,
  KEBAB_CASE_KEY: 'value2' as string,
  CAMEL_CASE_KEY: 'value3' as string,
} as const;
`;

    expect(generate(input, 'myNamespace')).toEqual(expectedOutput);
  });

  it('should handle mixed types correctly', () => {
    const input: YamlFormat = {
      format: 'shared-constants',
      constants: {
        values: [
          { key: 'stringKey', value: 'stringValue', type: 'string' },
          { key: 'numberKey', value: '42', type: 'number' },
          { key: 'booleanKey', value: 'true', type: 'boolean' },
          { key: 'bigintKey', value: '123', type: 'bigint' },
        ],
      },
      target: [
        {
          language: 'typescript',
          output: './output/',
          nameSpace: 'myNamespace',
        },
      ],
    };

    const expectedOutput = `export const myNamespace = {
  STRING_KEY: 'stringValue' as string,
  NUMBER_KEY: 42 as number,
  BOOLEAN_KEY: true as boolean,
  BIGINT_KEY: 123 as bigint,
} as const;
`;

    expect(generate(input, 'myNamespace')).toEqual(expectedOutput);
  });
});
