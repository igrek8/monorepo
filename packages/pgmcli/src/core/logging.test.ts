import { describe, expect, it } from 'vitest';
import { getConsoleLevel, LogLevel, ServerSeverity, toServerSeverity } from './logging';

describe('logging', () => {
  describe('getConsoleLevel', () => {
    it('maps severity to console log level', () => {
      expect(getConsoleLevel(ServerSeverity.DEBUG)).toBe('debug');
      expect(getConsoleLevel(ServerSeverity.LOG)).toBe('log');
      expect(getConsoleLevel(ServerSeverity.INFO)).toBe('info');
      expect(getConsoleLevel(ServerSeverity.NOTICE)).toBe('log');
      expect(getConsoleLevel(ServerSeverity.WARNING)).toBe('warn');
      expect(getConsoleLevel(ServerSeverity.EXCEPTION)).toBe('error');
    });
  });

  describe('toServerSeverity', () => {
    it('maps log level to severity', () => {
      expect(toServerSeverity(LogLevel.DEBUG)).toBe(ServerSeverity.DEBUG);
      expect(toServerSeverity(LogLevel.LOG)).toBe(ServerSeverity.LOG);
      expect(toServerSeverity(LogLevel.INFO)).toBe(ServerSeverity.INFO);
      expect(toServerSeverity(LogLevel.NOTICE)).toBe(ServerSeverity.NOTICE);
      expect(toServerSeverity(LogLevel.WARNING)).toBe(ServerSeverity.WARNING);
      expect(toServerSeverity(LogLevel.ERROR)).toBe(ServerSeverity.EXCEPTION);
      expect(toServerSeverity('unknown' as LogLevel)).toBe(ServerSeverity.LOG);
    });
  });
});
