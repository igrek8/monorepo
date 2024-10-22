export var LogLevel;
(function (LogLevel) {
    LogLevel["DEBUG"] = "DEBUG";
    LogLevel["LOG"] = "LOG";
    LogLevel["INFO"] = "INFO";
    LogLevel["NOTICE"] = "NOTICE";
    LogLevel["WARNING"] = "WARNING";
    LogLevel["ERROR"] = "ERROR";
})(LogLevel || (LogLevel = {}));
export var ServerSeverity;
(function (ServerSeverity) {
    ServerSeverity["DEBUG"] = "DEBUG";
    ServerSeverity["LOG"] = "LOG";
    ServerSeverity["INFO"] = "INFO";
    ServerSeverity["NOTICE"] = "NOTICE";
    ServerSeverity["WARNING"] = "WARNING";
    ServerSeverity["EXCEPTION"] = "EXCEPTION";
})(ServerSeverity || (ServerSeverity = {}));
export function getConsoleLevel(severity) {
    switch (severity) {
        case ServerSeverity.EXCEPTION:
            return 'error';
        case ServerSeverity.WARNING:
            return 'warn';
        case ServerSeverity.INFO:
            return 'info';
        case ServerSeverity.DEBUG:
            return 'debug';
        default:
            return 'log';
    }
}
export function toServerSeverity(logLevel) {
    switch (logLevel) {
        case LogLevel.DEBUG:
            return ServerSeverity.DEBUG;
        case LogLevel.LOG:
            return ServerSeverity.LOG;
        case LogLevel.INFO:
            return ServerSeverity.INFO;
        case LogLevel.NOTICE:
            return ServerSeverity.NOTICE;
        case LogLevel.WARNING:
            return ServerSeverity.WARNING;
        case LogLevel.ERROR:
            return ServerSeverity.EXCEPTION;
        default:
            return ServerSeverity.LOG;
    }
}
//# sourceMappingURL=logging.js.map