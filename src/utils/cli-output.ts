import chalk from "chalk";

export interface SpinnerOptions {
  text: string;
  color?:
    | "black"
    | "red"
    | "green"
    | "yellow"
    | "blue"
    | "magenta"
    | "cyan"
    | "white"
    | "gray";
}

export interface BoxOptions {
  title?: string;
  padding?: number;
  margin?: number;
  borderStyle?:
    | "single"
    | "double"
    | "round"
    | "bold"
    | "singleDouble"
    | "doubleSingle"
    | "classic";
  borderColor?:
    | "black"
    | "red"
    | "green"
    | "yellow"
    | "blue"
    | "magenta"
    | "cyan"
    | "white"
    | "gray";
  backgroundColor?:
    | "black"
    | "red"
    | "green"
    | "yellow"
    | "blue"
    | "magenta"
    | "cyan"
    | "white"
    | "gray";
  dimBorder?: boolean;
}

export class CLIOutput {
  private spinner: { text: string; interval?: NodeJS.Timeout } | null = null;

  // Success messages
  success = (message: string): void => {
    console.log(chalk.green("✅"), message);
  };

  // Error messages
  error = (message: string): void => {
    console.log(chalk.red("❌"), message);
  };

  // Warning messages
  warning = (message: string): void => {
    console.log(chalk.yellow("⚠️"), message);
  };

  // Info messages
  info = (message: string): void => {
    console.log(chalk.blue("ℹ️"), message);
  };

  // Debug messages
  debug = (message: string): void => {
    console.log(chalk.gray("🐛"), message);
  };

  // Start a spinner
  startSpinner = (options: SpinnerOptions): void => {
    this.stopSpinner();
    const spinnerChars = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
    let index = 0;

    const interval = setInterval(() => {
      process.stdout.write(
        `\r${chalk.blue(spinnerChars[index])} ${options.text}`
      );
      index = (index + 1) % spinnerChars.length;
    }, 100);

    this.spinner = { text: options.text, interval };
  };

  // Update spinner text
  updateSpinner = (text: string): void => {
    if (this.spinner) {
      this.spinner.text = text;
    }
  };

  // Stop spinner with success
  stopSpinnerSuccess = (text?: string): void => {
    if (this.spinner) {
      if (this.spinner.interval) {
        clearInterval(this.spinner.interval);
      }
      process.stdout.write(
        `\r${chalk.green("✅")} ${text || this.spinner.text}\n`
      );
      this.spinner = null;
    }
  };

  // Stop spinner with error
  stopSpinnerError = (text?: string): void => {
    if (this.spinner) {
      if (this.spinner.interval) {
        clearInterval(this.spinner.interval);
      }
      process.stdout.write(
        `\r${chalk.red("❌")} ${text || this.spinner.text}\n`
      );
      this.spinner = null;
    }
  };

  // Stop spinner
  stopSpinner = (): void => {
    if (this.spinner) {
      if (this.spinner.interval) {
        clearInterval(this.spinner.interval);
      }
      process.stdout.write("\r");
      this.spinner = null;
    }
  };

  // Create a beautiful box
  box = (content: string, options: BoxOptions = {}): void => {
    const padding = options.padding || 1;
    const margin = options.margin || 1;
    const lines = content.split("\n");
    const maxWidth = Math.max(...lines.map((line) => line.length));
    const boxWidth = maxWidth + padding * 2;

    const topBorder = "┌" + "─".repeat(boxWidth) + "┐";
    const bottomBorder = "└" + "─".repeat(boxWidth) + "┘";

    console.log();
    console.log(" ".repeat(margin) + topBorder);

    if (options.title) {
      const titleLine = `│ ${options.title.padEnd(boxWidth - 1)}│`;
      console.log(" ".repeat(margin) + titleLine);
      console.log(" ".repeat(margin) + "├" + "─".repeat(boxWidth) + "┤");
    }

    lines.forEach((line) => {
      const paddedLine = line.padEnd(maxWidth);
      console.log(" ".repeat(margin) + `│ ${paddedLine} │`);
    });

    console.log(" ".repeat(margin) + bottomBorder);
    console.log();
  };

  // Create a header
  header = (title: string): void => {
    console.log();
    this.box(chalk.bold.blue(title), {
      title: "🚀 Migrator",
      borderColor: "blue",
      borderStyle: "double",
    });
    console.log();
  };

  // Create a section divider
  divider = (text?: string): void => {
    const line = "─".repeat(50);
    if (text) {
      console.log(chalk.gray(`\n${line} ${text} ${line}\n`));
    } else {
      console.log(chalk.gray(`\n${line}\n`));
    }
  };

  // Display file processing results
  displayFileResults = (
    results: Array<{
      filePath: string;
      success: boolean;
      changes: number;
      error?: string | undefined;
    }>
  ): void => {
    console.log();
    this.divider("File Processing Results");

    results.forEach((result) => {
      const status = result.success ? chalk.green("✓") : chalk.red("✗");
      const changes =
        result.changes > 0
          ? chalk.cyan(`(${result.changes} changes)`)
          : chalk.gray("(no changes)");
      const error = result.error ? chalk.red(` - ${result.error}`) : "";

      console.log(
        `${status} ${chalk.bold(result.filePath)} ${changes}${error}`
      );
    });

    console.log();
  };

  // Display migration summary
  displaySummary = (
    totalFiles: number,
    successfulFiles: number,
    totalChanges: number
  ): void => {
    const successRate =
      totalFiles > 0 ? Math.round((successfulFiles / totalFiles) * 100) : 0;

    this.box(
      [
        chalk.bold("Migration Summary"),
        "",
        `${chalk.green("Files processed:")} ${totalFiles}`,
        `${chalk.green("Successful:")} ${successfulFiles}`,
        `${chalk.red("Failed:")} ${totalFiles - successfulFiles}`,
        `${chalk.blue("Total changes:")} ${totalChanges}`,
        `${chalk.yellow("Success rate:")} ${successRate}%`,
      ].join("\n"),
      {
        borderColor:
          successRate === 100 ? "green" : successRate >= 80 ? "yellow" : "red",
        borderStyle: "round",
      }
    );
  };

  // Display help with beautiful formatting
  displayHelp = (): void => {
    this.header("Migrator CLI Tool");

    console.log(chalk.bold("Commands:"));
    console.log();

    const commands = [
      { name: "init", description: "Initialize a new migration configuration" },
      {
        name: "migrate [options]",
        description: "Run migrations from configuration file",
      },
      { name: "help", description: "Show this help information" },
    ];

    commands.forEach((cmd) => {
      console.log(`  ${chalk.cyan(cmd.name.padEnd(20))} ${cmd.description}`);
    });

    console.log();
    console.log(chalk.bold("Options:"));
    console.log();

    const options = [
      {
        name: "--config, -c <path>",
        description: "Path to configuration file (default: migrator.config.js)",
      },
      { name: "--verbose, -v", description: "Enable verbose logging" },
      {
        name: "--dry-run",
        description: "Preview changes without applying them",
      },
    ];

    options.forEach((opt) => {
      console.log(`  ${chalk.yellow(opt.name.padEnd(30))} ${opt.description}`);
    });

    console.log();
    console.log(chalk.bold("Examples:"));
    console.log();

    const examples = [
      "migrator init",
      "migrator migrate",
      "migrator migrate --config my-config.js --verbose",
      "migrator migrate --dry-run",
    ];

    examples.forEach((example) => {
      console.log(`  ${chalk.gray("$")} ${chalk.green(example)}`);
    });

    console.log();
  };

  // Display configuration info
  displayConfigInfo = (configPath: string): void => {
    this.info(`Loading configuration from ${chalk.bold(configPath)}`);
  };

  // Display file discovery info
  displayFileDiscovery = (fileCount: number): void => {
    this.info(`Found ${chalk.bold(fileCount)} files to process`);
  };

  // Display processing start
  displayProcessingStart = (): void => {
    this.info("Processing files...");
  };

  // Display processing complete
  displayProcessingComplete = (
    successfulFiles: number,
    failedFiles: number
  ): void => {
    if (failedFiles === 0) {
      this.success(`Processed ${successfulFiles} files successfully`);
    } else {
      this.warning(
        `Processed ${successfulFiles} files successfully, ${failedFiles} failed`
      );
    }
  };

  // Display total changes
  displayTotalChanges = (totalChanges: number): void => {
    this.info(`Total changes made: ${chalk.bold(totalChanges)}`);
  };

  // Display completion message
  displayCompletion = (): void => {
    console.log();
    this.success("Migration completed successfully!");
    console.log();
  };

  // Colorization helpers for user interaction
  colorizeNumber = (num: number): string => {
    return chalk.cyan.bold(num.toString());
  };

  colorizeDescription = (text: string): string => {
    return chalk.gray(text);
  };

  colorizeSkip = (text: string): string => {
    return chalk.yellow(text);
  };

  colorizePrompt = (text: string): string => {
    return chalk.blue.bold(text);
  };

  // Display code preview with context and highlighting
  displayCodePreview = (preview: {
    filePath: string;
    lineNumber: number;
    beforeLines: string[];
    changeLine: string;
    afterLines: string[];
    highlightStart: number;
    highlightEnd: number;
  }): void => {
    console.log();
    this.divider("Code Preview");

    // File path and line number
    console.log(
      `${chalk.gray("File:")} ${chalk.bold(preview.filePath)} ${chalk.gray(
        "(line " + preview.lineNumber + ")"
      )}`
    );
    console.log();

    // Display context lines
    const contextLines = [
      ...preview.beforeLines,
      preview.changeLine,
      ...preview.afterLines,
    ];
    const startLineNumber = preview.lineNumber - preview.beforeLines.length;

    contextLines.forEach((line, index) => {
      const currentLineNumber = startLineNumber + index;
      const isChangeLine = index === preview.beforeLines.length;

      // Line number
      const lineNumStr = currentLineNumber.toString().padStart(3, " ");
      const lineNumColor = isChangeLine ? chalk.yellow.bold : chalk.gray;

      if (isChangeLine) {
        // Highlight the specific part that needs to change
        const beforeHighlight = line.substring(0, preview.highlightStart);
        const highlightPart = line.substring(
          preview.highlightStart,
          preview.highlightEnd
        );
        const afterHighlight = line.substring(preview.highlightEnd);

        console.log(
          `${lineNumColor(lineNumStr)} │ ${beforeHighlight}${chalk.red.bold(
            `[${highlightPart}]`
          )}${afterHighlight}`
        );
      } else {
        console.log(`${lineNumColor(lineNumStr)} │ ${chalk.gray(line)}`);
      }
    });

    console.log();
  };
}
