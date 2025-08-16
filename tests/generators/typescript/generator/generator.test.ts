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
    };

    const expectedOutput = `
const myNamespace = {
  exampleKey: 'exampleValue' as const,
  exampleKey2: 'exampleValue2' as const
} as const`;

    expect(generate(input)).toEqual(expectedOutput);
  });
});
