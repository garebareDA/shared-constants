import { describe, it, expect } from 'vitest';
import { checkFormat } from '../../../src/yamlFormat/formatChecker';

describe('Format Checker', () => {
  it('should validate correct format', () => {
    const validData = {
      format: 'shared-constants',
      constants: {
        values: [
          { key: 'exampleKey', value: 'exampleValue', type: 'string' },
          { key: 'exampleKey2', value: 'exampleValue2', type: 'string' },
        ],
      },
      nameSpace: 'myNamespace',
      typeMode: 'strict',
    };
    expect(() => checkFormat(validData)).not.toThrow();
  });

  it('should throw error for invalid format', () => {
    const invalidData = {};
    expect(() => checkFormat(invalidData)).toThrowError();
  });

  it('should ignore unknown properties', () => {
    const unknownFormatData = {
      format: 'shared-constants',
      constants: {
        values: [
          { key: 'exampleKey', value: 'exampleValue', type: 'string' },
          { key: 'exampleKey2', value: 'exampleValue2', type: 'string' },
        ],
      },
      nameSpace: 'myNamespace',
      typeMode: 'strict',
      comment: 'This is a comment',
    };
    expect(() => checkFormat(unknownFormatData)).not.toThrowError();
  });
});
