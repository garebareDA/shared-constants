#!/usr/bin/env node

import { Command } from 'commander';

import { parseYaml } from './src/yamlFormat/parseYaml';
import { checkFormat } from './src/yamlFormat/formatChecker';
import * as typescript from './src/generators/typescript';
import * as ruby from './src/generators/ruby';
import * as python from './src/generators/python';
import * as go from './src/generators/go';
import { outputToFile } from './src/fileOutput';

const program = new Command();

program
  .name('shared-constants')
  .description('Shared constants CLI')
  .version('1.0.0-alpha.1');

program
  .command('generate <name>')
  .description('Generate shared constants')
  .action((name: string) => {
    console.log('Generating shared constants...');
    try {
      const yaml = parseYaml(name);
      const checkedFormat = checkFormat(yaml);

      checkedFormat.target.forEach((target) => {
        if (target.language === 'typescript') {
          const typescriptCode = typescript.generate(
            checkedFormat,
            target.nameSpace
          );
          outputToFile(target.output, typescriptCode);
        }

        if (target.language === 'ruby') {
          const rubyCode = ruby.generate(checkedFormat, target.nameSpace);
          outputToFile(target.output, rubyCode);
        }

        if (target.language === 'python') {
          const pythonCode = python.generate(checkedFormat);
          outputToFile(target.output, pythonCode);
        }

        if (target.language === 'go') {
          const goCode = go.generate(checkedFormat, target.nameSpace);
          outputToFile(target.output, goCode);
        }
      });
    } catch (error) {
      console.error(error);
      return;
    }

    console.log('Shared constants generated successfully');
  });

program.parse(process.argv);
