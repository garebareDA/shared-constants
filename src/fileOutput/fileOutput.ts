import * as fs from 'fs';
import { dirname } from 'path';

export function outputToFile(filePath: string, content: string) {
  const dir = dirname(filePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(filePath, content);
}
