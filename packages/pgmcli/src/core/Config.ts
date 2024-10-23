import type { ClientConfig } from 'pg';
import type { LogLevel } from './logging';

export interface Config {
  $schema?: string;
  host?: string;
  port?: number;
  user?: string;
  password?: string;
  logLevel?: LogLevel;
  db?: string;
  dir?: string;
  table?: string;
  tag?: string;
  client?: ClientConfig;
}
