enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
}

interface ILoggerOptions {
  level?: LogLevel;
  prefix?: string;
}

interface ILogger {
  error(...args: any[]): void;
  warn(...args: any[]): void;
  info(...args: any[]): void;
  debug(...args: any[]): void;
}

class Logger implements ILogger {
  private level: LogLevel;
  private prefix: string;

  constructor(options: ILoggerOptions = {}) {
    this.level = options.level ?? LogLevel.INFO;
    this.prefix = options.prefix ?? '';
  }

  private log(level: LogLevel, args: any[]): void {
    if (level <= this.level) {
      const now = new Date().toLocaleString();
      const levelString = LogLevel[level];
      console.log(`[${now}] [${this.prefix}] [${levelString}] `, ...args);
    }
  }

  error(...args: any[]): void {
    this.log(LogLevel.ERROR, args);
  }

  warn(...args: any[]): void {
    this.log(LogLevel.WARN, args);
  }

  info(...args: any[]): void {
    this.log(LogLevel.INFO, args);
  }

  debug(...args: any[]): void {
    this.log(LogLevel.DEBUG, args);
  }
}

export default Logger;
