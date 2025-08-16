import { describe, it, expect } from 'vitest';
import { typeParser, firstIntersectionType } from '../../src/typeParser';

describe('Type Parser', () => {
  it('should parse types correctly', () => {
    const result = typeParser('string|number|boolean');
    expect(result).toEqual(['string', 'number', 'boolean']);
  });

  it('should check if a type is included', () => {
    const result = firstIntersectionType(['string', 'number'], ['string']);
    expect(result).toBe('string');
  });
});
