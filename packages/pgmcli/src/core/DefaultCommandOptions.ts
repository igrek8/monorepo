export interface DefaultCommandOptions {
  readonly host?: string;
  readonly port?: number;
  readonly user?: string;
  readonly password?: string;
  readonly db?: string;
  readonly dir: string;
  readonly table: string;
}
