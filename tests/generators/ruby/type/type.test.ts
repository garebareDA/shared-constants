import { describe, it, expect } from 'vitest';
import {
  supportedTypes,
  SupportedType,
} from '../../../../src/generators/ruby/type/type';

describe('Ruby Type Definitions', () => {
  it('should export SupportedType union type', () => {
    // TypeScriptの型チェックを確認
    const validTypes: SupportedType[] = ['string', 'number', 'boolean'];

    expect(validTypes).toEqual(supportedTypes);
  });

  it('should have all expected Ruby types', () => {
    const expectedTypes = ['string', 'number', 'boolean'];

    expect(supportedTypes).toEqual(expectedTypes);
    expect(supportedTypes).toHaveLength(3);
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

  it('should not include unexpected types', () => {
    expect(supportedTypes).not.toContain('Integer');
    expect(supportedTypes).not.toContain('Float');
    expect(supportedTypes).not.toContain('Array');
    expect(supportedTypes).not.toContain('Hash');
  });
});
