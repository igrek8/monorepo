export function getConfigPath(argv: string[]): string | undefined {
  for (let i = 0; i < argv.length; ++i) {
    const arg = argv[i];
    if (arg === '--config') {
      return argv.at(i + 1);
    }
  }
  return undefined;
}
