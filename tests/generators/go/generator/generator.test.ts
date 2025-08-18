import { describe, it, expect } from 'vitest';
import { generate } from '../../../../src/generators/go/generator/generator';
import { YamlFormat } from '../../../../src/yamlFormat';

describe('generate', () => {
  it('should generate Go code for shared constants with string types', () => {
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
          language: 'go',
          output: './output/',
          nameSpace: 'myNamespace',
        },
      ],
    };

    const expectedOutput = `package myNamespace
const (
  ExampleKey string = "exampleValue"
  ExampleKey2 string = "exampleValue2"
)
`;

    expect(generate(input, 'myNamespace')).toEqual(expectedOutput);
  });

  it('should generate Go code for shared constants with rune types', () => {
    const input: YamlFormat = {
      format: 'shared-constants',
      constants: {
        values: [
          { key: 'exampleKey', value: 'a', type: 'rune' },
          { key: 'exampleKey2', value: 'b', type: 'rune' },
        ],
      },
      target: [
        {
          language: 'go',
          output: './output/',
          nameSpace: 'myNamespace',
        },
      ],
    };

    const expectedOutput = `package myNamespace
const (
  ExampleKey rune = 'a'
  ExampleKey2 rune = 'b'
)
`;

    expect(generate(input, 'myNamespace')).toEqual(expectedOutput);
  });

  it('should generate Go code for shared constants with number types', () => {
    const input: YamlFormat = {
      format: 'shared-constants',
      constants: {
        values: [
          { key: 'exampleKey', value: '42', type: 'int' },
          { key: 'exampleKey2', value: '3.14', type: 'float64' },
        ],
      },
      target: [
        {
          language: 'go',
          output: './output/',
          nameSpace: 'myNamespace',
        },
      ],
    };

    const expectedOutput = `package myNamespace
const (
  ExampleKey int = 42
  ExampleKey2 float64 = 3.14
)
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
          language: 'go',
          output: './output/',
          nameSpace: 'myNamespace',
        },
      ],
    };

    const expectedOutput = `package myNamespace
const (
  SnakeCaseKey string = "value1"
  KebabCaseKey string = "value2"
  CamelCaseKey string = "value3"
)
`;

    expect(generate(input, 'myNamespace')).toEqual(expectedOutput);
  });
});
