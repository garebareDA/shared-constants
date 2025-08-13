import { defineConfig } from 'vite';

export default defineConfig(({ command }) => {
  if (command === 'build') {
    return {
      build: {
        target: 'node18',
        outDir: './',
        lib: {
          entry: './bin/command.ts',
          name: 'shared-constants',
          fileName: 'command',
          formats: ['cjs'],
        },
        rollupOptions: {
          external: ['commander'],
          output: {
            entryFileNames: 'command.js',
            banner: '#!/usr/bin/env node',
          },
        },
      },
    };
  }

  return {
    test: {
      globals: true,
      environment: 'node',
    },
  };
});
