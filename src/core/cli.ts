// CLI implementation
import { CLIOptions } from "../types";
import { ConfigManager } from "./config";
import { FileDiscovery } from "./file-discovery";
import { MigrationEngine } from "./migration-engine";
import { PluginRegistry } from "../plugins";
import { ConsoleLogger } from "../utils/logger";
import { CLIOutput } from "../utils/cli-output";
import { fileExists } from "../utils/file-utils";

export class MigratorCLI {
  private configManager: ConfigManager;
  private fileDiscovery: FileDiscovery;
  private pluginRegistry: PluginRegistry;
  private logger: ConsoleLogger;
  private cliOutput: CLIOutput;

  constructor() {
    this.configManager = new ConfigManager();
    this.fileDiscovery = new FileDiscovery();
    this.pluginRegistry = new PluginRegistry();
    this.logger = new ConsoleLogger();
    this.cliOutput = new CLIOutput();
  }

  init = async (options: CLIOptions): Promise<void> => {
    const configPath = options.config || "migrator.config.js";

    if (fileExists(configPath)) {
      throw new Error(`Configuration file already exists: ${configPath}`);
    }

    const config = this.configManager.createDefaultConfig();
    const configContent = `module.exports = ${JSON.stringify(
      config,
      null,
      2
    )};`;

    const fs = require("fs");
    fs.writeFileSync(configPath, configContent);
    this.logger.info(`Created configuration file: ${configPath}`);
  };

  migrate = async (options: CLIOptions): Promise<void> => {
    const configPath = options.config || "migrator.config.js";

    // Set verbose mode
    this.logger = new ConsoleLogger(options.verbose || false);

    // Load configuration
    this.cliOutput.displayConfigInfo(configPath);
    const configResult = await this.configManager.loadConfig(configPath);

    if (!configResult.success) {
      this.cliOutput.error(
        `Failed to load configuration: ${configResult.error.message}`
      );
      process.exit(1);
    }

    const config = configResult.data;

    // Discover files
    this.cliOutput.startSpinner({ text: "Discovering files..." });
    const fileResult = await this.fileDiscovery.discoverFiles(config);

    if (!fileResult.success) {
      this.cliOutput.stopSpinnerError(
        `Failed to discover files: ${fileResult.error.message}`
      );
      process.exit(1);
    }

    let filePaths = fileResult.data;
    this.cliOutput.stopSpinnerSuccess(
      `Found ${filePaths.length} files to process`
    );

    if (filePaths.length === 0) {
      this.cliOutput.warning("No files found matching the specified patterns");
      return;
    }

    // Apply batch processing if specified
    if (options.batch) {
      const batchResult = this.parseBatchRange(options.batch, filePaths.length);
      if (!batchResult.success) {
        this.cliOutput.error(`Invalid batch range: ${batchResult.error}`);
        process.exit(1);
      }

      const { startIndex, endIndex } = batchResult.data;
      filePaths = filePaths.slice(startIndex, endIndex);

      this.cliOutput.info(
        `Batch processing: files ${startIndex + 1}-${endIndex} of ${
          fileResult.data.length
        } (${filePaths.length} files)`
      );
    }

    // Process files
    // Commander.js converts --no-interactive to interactive: false
    const noInteractive =
      options.noInteractive || (options as any).interactive === false;
    const migrationEngine = new MigrationEngine(
      this.pluginRegistry,
      this.logger,
      options.dryRun || false,
      noInteractive
    );

    this.cliOutput.info(`Processing ${filePaths.length} files...`);
    const results = await migrationEngine.processFiles(filePaths, config);

    // Calculate summary
    const successful = results.filter((r) => r.success).length;
    const failed = results.filter((r) => !r.success).length;
    const totalChanges = results.reduce((sum, r) => sum + r.changes.length, 0);

    this.cliOutput.success("Processing completed!");

    // Display file results
    const fileResults = results.map((r) => ({
      filePath: r.filePath,
      success: r.success,
      changes: r.changes.length,
      error: r.error || undefined,
    }));
    this.cliOutput.displayFileResults(fileResults);

    // Display summary
    this.cliOutput.displaySummary(filePaths.length, successful, totalChanges);

    if (failed > 0) {
      process.exit(1);
    }

    this.cliOutput.displayCompletion();
  };

  help = async (): Promise<void> => {
    this.cliOutput.displayHelp();
  };

  private parseBatchRange = (
    batchRange: string,
    totalFiles: number
  ):
    | { success: true; data: { startIndex: number; endIndex: number } }
    | { success: false; error: string } => {
    // Parse batch range format: "50-1" or "50-2"
    const match = batchRange.match(/^(\d+)-(\d+)$/);
    if (!match) {
      return {
        success: false,
        error:
          "Invalid batch format. Use format: batchSize-batchNumber (e.g., 50-1)",
      };
    }

    const batchSize = parseInt(match[1]!);
    const batchNumber = parseInt(match[2]!);

    if (batchSize <= 0 || batchNumber <= 0) {
      return {
        success: false,
        error: "Batch size and batch number must be positive integers",
      };
    }

    const startIndex = (batchNumber - 1) * batchSize;
    const endIndex = Math.min(startIndex + batchSize, totalFiles);

    if (startIndex >= totalFiles) {
      return {
        success: false,
        error: `Batch ${batchNumber} is out of range. Total files: ${totalFiles}`,
      };
    }

    return { success: true, data: { startIndex, endIndex } };
  };
}
