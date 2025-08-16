#!/usr/bin/env node

import { Command } from 'commander';

import { parseYaml } from '../src/yamlFormat/parseYaml';
import { checkFormat } from '../src/yamlFormat/formatChecker';
import * as typescript from '../src/generators/typescript';

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
      const result = parseYaml(name);
      const checkedFormat = checkFormat(result);

      console.log(typescript.generate(checkedFormat));
    } catch (error) {
      console.error(error);
    }
  });

program.parse(process.argv);
