import { describe, it, expect } from 'vitest';
import { typeParser, isIncludedType } from '../../src/typeParser';

describe('Type Parser', () => {
  it('should parse types correctly', () => {
    const result = typeParser('string|number|boolean');
    expect(result).toEqual(['string', 'number', 'boolean']);
  });

  it('should check if a type is included', () => {
    const result = isIncludedType(['string', 'number'], ['string']);
    expect(result).toBe(true);
  });
});
