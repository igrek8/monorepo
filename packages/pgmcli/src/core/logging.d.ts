export declare enum LogLevel {
    DEBUG = "DEBUG",
    LOG = "LOG",
    INFO = "INFO",
    NOTICE = "NOTICE",
    WARNING = "WARNING",
    ERROR = "ERROR"
}
export declare enum ServerSeverity {
    DEBUG = "DEBUG",
    LOG = "LOG",
    INFO = "INFO",
    NOTICE = "NOTICE",
    WARNING = "WARNING",
    EXCEPTION = "EXCEPTION"
}
export declare function getConsoleLevel(severity?: string): 'debug' | 'log' | 'info' | 'warn' | 'error';
export declare function toServerSeverity(logLevel: LogLevel): ServerSeverity;
//# sourceMappingURL=logging.d.ts.map