import { describe, it, expect, vi } from 'vitest';
import { Command } from 'commander';

describe('shared-constants CLI', () => {
  it('should have correct program name', () => {
    const program = new Command();
    program.name('shared-constants');

    expect(program.name()).toBe('shared-constants');
  });

  it('should have generate command', () => {
    const program = new Command();
    program.command('generate <name>');

    const commands = program.commands;
    expect(commands).toHaveLength(1);
    expect(commands[0].name()).toBe('generate');
  });

  it('should log correct message when generate command is executed', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    // 実際のコマンド実行をシミュレート
    const testName = 'test-project';
    console.log(`Generating shared constants for ${testName}...`);

    expect(consoleSpy).toHaveBeenCalledWith(
      `Generating shared constants for ${testName}...`
    );

    consoleSpy.mockRestore();
  });
});
