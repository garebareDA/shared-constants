#!/usr/bin/env node

import { Command } from 'commander';

import { parseYaml } from '../src/yamlFormat/parseYaml';
import { checkRootFormat } from '../src/yamlFormat/formatChecker';

const program = new Command();

program
  .name('shared-constants')
  .description('Shared constants CLI')
  .version('1.0.0');

program
  .command('generate <name>')
  .description('Generate shared constants')
  .action((name: string) => {
    const result = parseYaml(name);
    if (!result) return;
    if (!checkRootFormat(result)) return;
    console.log(`Generated shared constants for ${name}:`, result);
  });

program.parse(process.argv);
