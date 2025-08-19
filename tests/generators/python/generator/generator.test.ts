import { describe, it, expect } from 'vitest';
import { generate } from '../../../../src/generators/python/generator/generator';
import { YamlFormat } from '../../../../src/yamlFormat';

describe('generate', () => {
  it('should generate Python code for shared constants with string types', () => {
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
          language: 'python',
          output: './output/',
          nameSpace: 'myNamespace',
        },
      ],
    };

    const expectedOutput = `EXAMPLE_KEY = "exampleValue"
EXAMPLE_KEY2 = "exampleValue2"
__all__ = ["EXAMPLE_KEY", "EXAMPLE_KEY2"]`;

    expect(generate(input)).toEqual(expectedOutput);
  });

  it('should generate Python code for shared constants with boolean types', () => {
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
          language: 'python',
          output: './output/',
          nameSpace: 'myNamespace',
        },
      ],
    };

    const expectedOutput = `EXAMPLE_KEY = True
EXAMPLE_KEY2 = False
__all__ = ["EXAMPLE_KEY", "EXAMPLE_KEY2"]`;

    expect(generate(input)).toEqual(expectedOutput);
  });

  it('should generate Python code for shared constants with number types', () => {
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
          language: 'python',
          output: './output/',
          nameSpace: 'myNamespace',
        },
      ],
    };

    const expectedOutput = `EXAMPLE_KEY = 42
EXAMPLE_KEY2 = 3.14
__all__ = ["EXAMPLE_KEY", "EXAMPLE_KEY2"]`;

    expect(generate(input)).toEqual(expectedOutput);
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
          language: 'python',
          output: './output/',
          nameSpace: 'myNamespace',
        },
      ],
    };

    const expectedOutput = `SNAKE_CASE_KEY = "value1"
KEBAB_CASE_KEY = "value2"
CAMEL_CASE_KEY = "value3"
__all__ = ["SNAKE_CASE_KEY", "KEBAB_CASE_KEY", "CAMEL_CASE_KEY"]`;

    expect(generate(input)).toEqual(expectedOutput);
  });

  it('should generate correct __all__ list', () => {
    const input: YamlFormat = {
      format: 'shared-constants',
      constants: {
        values: [
          { key: 'key1', value: 'value1', type: 'string' },
          { key: 'key2', value: 'value2', type: 'string' },
          { key: 'key3', value: 'value3', type: 'string' },
        ],
      },
      target: [
        {
          language: 'python',
          output: './output/',
          nameSpace: 'myNamespace',
        },
      ],
    };

    const expectedOutput = `KEY1 = "value1"
KEY2 = "value2"
KEY3 = "value3"
__all__ = ["KEY1", "KEY2", "KEY3"]`;

    expect(generate(input)).toEqual(expectedOutput);
  });
});
