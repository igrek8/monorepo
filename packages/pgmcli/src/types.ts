import { Client } from 'pg';

export enum LogLevel {
  DEBUG = 'DEBUG',
  LOG = 'LOG',
  INFO = 'INFO',
  NOTICE = 'NOTICE',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
}

export type UpFunction = (connection: Client) => void | Promise<void>;

export type DownFunction = (connection: Client) => void | Promise<void>;
