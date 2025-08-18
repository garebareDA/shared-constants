import { describe, it, expect } from 'vitest';
import {
  supportedTypes,
  SupportedType,
} from '../../../../src/generators/typescript/type/type';

describe('TypeScript Type Definitions', () => {
  it('should export SupportedType union type', () => {
    // TypeScriptの型チェックを確認
    const validTypes: SupportedType[] = [
      'string',
      'number',
      'boolean',
      'bigint',
    ];

    expect(validTypes).toEqual(supportedTypes);
  });

  it('should have all expected TypeScript types', () => {
    const expectedTypes = ['string', 'number', 'boolean', 'bigint'];

    expect(supportedTypes).toEqual(expectedTypes);
    expect(supportedTypes).toHaveLength(4);
  });

  it('should include string type', () => {
    expect(supportedTypes).toContain('string');
  });

  it('should include number type', () => {
    expect(supportedTypes).toContain('number');
  });

  it('should include boolean type', () => {
    expect(supportedTypes).toContain('boolean');
  });

  it('should include bigint type', () => {
    expect(supportedTypes).toContain('bigint');
  });

  it('should not include unexpected types', () => {
    expect(supportedTypes).not.toContain('any');
    expect(supportedTypes).not.toContain('unknown');
    expect(supportedTypes).not.toContain('object');
    expect(supportedTypes).not.toContain('array');
  });
});
