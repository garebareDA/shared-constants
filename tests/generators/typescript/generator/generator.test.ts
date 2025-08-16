import { describe, it, expect } from 'vitest';
import { generate } from '../../../../src/generators/typescript/generator/generator';
import { YamlFormat } from '../../../../src/yamlFormat';

describe('generate', () => {
  it('should generate TypeScript code for shared constants', () => {
    const input: YamlFormat = {
      format: 'shared-constants',
      nameSpace: 'myNamespace',
      constants: {
        values: [
          { key: 'exampleKey', value: 'exampleValue', type: 'string' },
          { key: 'exampleKey2', value: 'exampleValue2', type: 'string' },
        ],
      },
      typeMode: 'strict',
      target: [
        {
          language: 'typescript',
          output: './output/',
        },
      ],
    };

    const expectedOutput = `export const myNamespace = {
  exampleKey: 'exampleValue' as string,
  exampleKey2: 'exampleValue2' as string,
} as const;
`;

    expect(generate(input)).toEqual(expectedOutput);
  });
});
