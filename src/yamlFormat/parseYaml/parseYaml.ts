import fs from 'fs';
import yaml from 'js-yaml';

export function parseYaml(fileName: string) {
  try {
    const doc = yaml.load(fs.readFileSync(fileName).toString());
    return doc;
  } catch (e) {
    console.error('Error parsing YAML file:', fileName);
    return e;
  }
}
