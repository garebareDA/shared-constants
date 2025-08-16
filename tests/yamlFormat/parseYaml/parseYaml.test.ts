import { describe, it, expect } from 'vitest';
import { parseYaml } from '../../../src/yamlFormat';

describe('Parse YAML', () => {
  it('should found YAML', () => {
    const foundYamlPath = './tests/fixtures/valid.yaml';
    const result = parseYaml(foundYamlPath);
    expect(result).toEqual({ valid: 'yaml' });
  });

  it('should throw error for not found YAML', () => {
    const notFoundYamlPath = './tests/fixtures/not-found.yaml';
    expect(() => parseYaml(notFoundYamlPath)).toThrowError();
  });
});
