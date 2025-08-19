import { describe, it, expect } from 'vitest';
import { generate } from '../../../../src/generators/ruby/generator/generator';
import { YamlFormat } from '../../../../src/yamlFormat';

describe('generate', () => {
  it('should generate Ruby code for shared constants with string types', () => {
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
          language: 'ruby',
          output: './output/',
          nameSpace: 'MyNamespace',
        },
      ],
    };

    const expectedOutput = `module MyNamespace
  EXAMPLE_KEY = 'exampleValue'
  EXAMPLE_KEY2 = 'exampleValue2'
end
`;

    expect(generate(input, 'MyNamespace')).toEqual(expectedOutput);
  });

  it('should generate Ruby code for shared constants with number types', () => {
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
          language: 'ruby',
          output: './output/',
          nameSpace: 'MyNamespace',
        },
      ],
    };

    const expectedOutput = `module MyNamespace
  EXAMPLE_KEY = 42
  EXAMPLE_KEY2 = 3.14
end
`;

    expect(generate(input, 'MyNamespace')).toEqual(expectedOutput);
  });

  it('should generate Ruby code for shared constants with boolean types', () => {
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
          language: 'ruby',
          output: './output/',
          nameSpace: 'MyNamespace',
        },
      ],
    };

    const expectedOutput = `module MyNamespace
  EXAMPLE_KEY = true
  EXAMPLE_KEY2 = false
end
`;

    expect(generate(input, 'MyNamespace')).toEqual(expectedOutput);
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
          language: 'ruby',
          output: './output/',
          nameSpace: 'MyNamespace',
        },
      ],
    };

    const expectedOutput = `module MyNamespace
  SNAKE_CASE_KEY = 'value1'
  KEBAB_CASE_KEY = 'value2'
  CAMEL_CASE_KEY = 'value3'
end
`;

    expect(generate(input, 'MyNamespace')).toEqual(expectedOutput);
  });

  it('should handle different namespace formats', () => {
    const input: YamlFormat = {
      format: 'shared-constants',
      constants: {
        values: [{ key: 'exampleKey', value: 'exampleValue', type: 'string' }],
      },
      target: [
        {
          language: 'ruby',
          output: './output/',
          nameSpace: 'myNamespace',
        },
      ],
    };

    const expectedOutput = `module myNamespace
  EXAMPLE_KEY = 'exampleValue'
end
`;

    expect(generate(input, 'myNamespace')).toEqual(expectedOutput);
  });
});
