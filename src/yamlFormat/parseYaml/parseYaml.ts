import fs from 'fs';
import yaml from 'js-yaml';

export function parseYaml(fileName: string) {
  try {
    const doc = yaml.load(fs.readFileSync(fileName).toString());
    return doc;
  } catch (e: unknown) {
    throw new Error(
      `Failed to parse YAML file: ${fileName}. \n Error: ${e instanceof Error ? e.message : String(e)}`
    );
  }
}
