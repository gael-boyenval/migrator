import { Change } from "../types";
import { CLIOutput } from "./cli-output";

export interface Logger {
  info(message: string): void;
  warn(message: string): void;
  error(message: string): void;
  debug(message: string): void;
  verbose(message: string): void;
  logChange(change: Change, filePath: string): void;
}

export class ConsoleLogger implements Logger {
  private verboseMode = false;
  private cliOutput: CLIOutput;

  constructor(verboseMode = false) {
    this.verboseMode = verboseMode;
    this.cliOutput = new CLIOutput();
  }

  info = (message: string): void => {
    this.cliOutput.info(message);
  };

  warn = (message: string): void => {
    this.cliOutput.warning(message);
  };

  error = (message: string): void => {
    this.cliOutput.error(message);
  };

  debug = (message: string): void => {
    if (this.verboseMode) {
      this.cliOutput.debug(message);
    }
  };

  verbose = (message: string): void => {
    if (this.verboseMode) {
      this.cliOutput.debug(message);
    }
  };

  logChange = (change: Change, filePath: string): void => {
    if (this.verboseMode) {
      const message = `Replaced ${change.count} occurrence(s) of '${change.original}' with '${change.replacement}' in ${filePath}`;
      this.debug(message);
    }
  };
}
