#!/usr/bin/env node

import { Command } from 'commander';

import { parseYaml } from '../src/yamlFormat/parseYaml';
import { checkFormat } from '../src/yamlFormat/formatChecker';
import * as typescript from '../src/generators/typescript';
import * as ruby from '../src/generators/ruby';
import { outputToFile } from '../src/fileOutput';

const program = new Command();

program
  .name('shared-constants')
  .description('Shared constants CLI')
  .version('1.0.0');

program
  .command('generate <name>')
  .description('Generate shared constants')
  .action((name: string) => {
    try {
      const yaml = parseYaml(name);
      const checkedFormat = checkFormat(yaml);

      checkedFormat.target.forEach((target) => {
        if (target.language === 'typescript') {
          const typescriptCode = typescript.generate(checkedFormat);
          outputToFile(target.output, typescriptCode);
        }

        if (target.language === 'ruby') {
          const rubyCode = ruby.generate(checkedFormat);
          outputToFile(target.output, rubyCode);
        }
      });
    } catch (error) {
      console.error(error);
    }
  });

program.parse(process.argv);
