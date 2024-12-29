export class Logger {
  private log(level: string, message: string, error?: unknown) {
    const timestamp = new Date().toISOString();
    const formattedMessage = `[${timestamp}] ${level.toUpperCase()}: ${message}${error ? ` - ${error}` : ''}`;
    
    switch (level) {
      case 'error':
        console.error(formattedMessage);
        break;
      case 'warn':
        console.warn(formattedMessage);
        break;
      default:
        console.log(formattedMessage);
    }
  }

  info(message: string) {
    this.log('info', message);
  }

  warn(message: string) {
    this.log('warn', message);
  }

  error(message: string, error?: unknown) {
    this.log('error', message, error);
  }
}

export const logger = new Logger();