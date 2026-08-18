import { Client } from 'pg';

export enum LogLevel {
  DEBUG = 'DEBUG',
  LOG = 'LOG',
  INFO = 'INFO',
  NOTICE = 'NOTICE',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
}

export type QueryExecutor = (connection: Client) => void | Promise<void>;
