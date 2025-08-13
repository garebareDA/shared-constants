#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program
  .name('shared-constants')
  .description('Shared constants CLI')
  .version('1.0.0');

program
  .command('generate <name>')
  .description('Generate shared constants')
  .action((name: string) => {
    console.log(`Generating shared constants for ${name}...`);
  });

program.parse(process.argv);
