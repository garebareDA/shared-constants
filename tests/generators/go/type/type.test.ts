import { describe, it, expect } from 'vitest';
import {
  supportedTypes,
  SupportedType,
} from '../../../../src/generators/go/type/type';

describe('Go Type Definitions', () => {
  it('should export SupportedType union type', () => {
    // TypeScriptの型チェックを確認
    const validTypes: SupportedType[] = [
      'string',
      'int',
      'int8',
      'int16',
      'int32',
      'int64',
      'uint',
      'uint8',
      'uint16',
      'uint32',
      'uint64',
      'float32',
      'float64',
      'bool',
      'byte',
      'rune',
    ];

    expect(validTypes).toEqual(supportedTypes);
  });

  it('should have all expected Go types', () => {
    const expectedTypes = [
      'string',
      'int',
      'int8',
      'int16',
      'int32',
      'int64',
      'uint',
      'uint8',
      'uint16',
      'uint32',
      'uint64',
      'float32',
      'float64',
      'bool',
      'byte',
      'rune',
    ];

    expect(supportedTypes).toEqual(expectedTypes);
    expect(supportedTypes).toHaveLength(16);
  });

  it('should include string type', () => {
    expect(supportedTypes).toContain('string');
  });

  it('should include integer types', () => {
    expect(supportedTypes).toContain('int');
    expect(supportedTypes).toContain('int8');
    expect(supportedTypes).toContain('int16');
    expect(supportedTypes).toContain('int32');
    expect(supportedTypes).toContain('int64');
  });

  it('should include unsigned integer types', () => {
    expect(supportedTypes).toContain('uint');
    expect(supportedTypes).toContain('uint8');
    expect(supportedTypes).toContain('uint16');
    expect(supportedTypes).toContain('uint32');
    expect(supportedTypes).toContain('uint64');
  });

  it('should include float types', () => {
    expect(supportedTypes).toContain('float32');
    expect(supportedTypes).toContain('float64');
  });

  it('should include boolean type', () => {
    expect(supportedTypes).toContain('bool');
  });

  it('should include byte and rune types', () => {
    expect(supportedTypes).toContain('byte');
    expect(supportedTypes).toContain('rune');
  });
});
