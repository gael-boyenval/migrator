import { MigratorConfig, MigrationResult, Change } from "../types";
import { PluginRegistry } from "./registry";
import { readFile, writeFile } from "../utils/file-utils";
import { Logger } from "../utils/logger";
import {
  parseCSS,
  findProperties,
  replacePropertyValue,
} from "../utils/css-parser";
import {
  askUserForChoice,
  askUserForConfirmation,
  askUserForInput,
  isInteractive,
} from "../utils/user-interaction";
import { MigratorUtils } from "./plugin-interface";

export class MigrationEngine {
  private pluginRegistry: PluginRegistry;
  private logger: Logger;
  private dryRun: boolean;
  private noInteractive: boolean;
  private migratorUtils: MigratorUtils;

  constructor(
    pluginRegistry: PluginRegistry,
    logger: Logger,
    dryRun = false,
    noInteractive = false
  ) {
    this.pluginRegistry = pluginRegistry;
    this.logger = logger;
    this.dryRun = dryRun;
    this.noInteractive = noInteractive;

    // Initialize migrator utilities
    this.migratorUtils = {
      parseCSS,
      findProperties,
      replacePropertyValue,
      askUserForChoice,
      askUserForConfirmation,
      askUserForInput,
      log: (message: string, level?: "info" | "warn" | "error" | "debug") => {
        switch (level) {
          case "warn":
            this.logger.warn(message);
            break;
          case "error":
            this.logger.error(message);
            break;
          case "debug":
            this.logger.debug(message);
            break;
          default:
            this.logger.info(message);
        }
      },
    };
  }

  processFile = async (
    filePath: string,
    config: MigratorConfig
  ): Promise<MigrationResult> => {
    try {
      this.logger.verbose(`Processing file: ${filePath}`);

      // Read file content
      const readResult = readFile(filePath);
      if (!readResult.success) {
        return {
          filePath,
          success: false,
          changes: [],
          error: readResult.error.message,
        };
      }

      let currentData = readResult.data;
      const allChanges: Change[] = [];

      // Apply migration steps
      for (const step of config.migrations) {
        if (step.enabled === false) {
          this.logger.verbose(`Skipping disabled step: ${step.name}`);
          continue;
        }

        // Check if file matches step patterns
        if (step.include && !this.matchesPattern(filePath, step.include)) {
          this.logger.verbose(
            `File ${filePath} does not match step include patterns`
          );
          continue;
        }

        if (step.exclude && this.isExcluded(filePath, step.exclude)) {
          this.logger.verbose(`File ${filePath} matches step exclude patterns`);
          continue;
        }

        // Get plugin
        const plugin = this.pluginRegistry.get(step.plugin);
        if (!plugin) {
          return {
            filePath,
            success: false,
            changes: [],
            error: `Plugin not found: ${step.plugin}`,
          };
        }

        this.logger.debug(`Applying migration: ${step.name}`);

        // Process with plugin
        const result = await plugin.process({
          fileData: currentData,
          filePath,
          config: step.config,
          migratorUtils: this.migratorUtils,
          isInteractive: !this.noInteractive && isInteractive(),
        });

        currentData = result.data;
        allChanges.push(...result.changes);

        // Log changes
        result.changes.forEach((change) => {
          this.logger.logChange(change, filePath);
        });
      }

      // Write file if changes were made and not in dry-run mode
      if (allChanges.length > 0 && !this.dryRun) {
        const writeResult = writeFile(filePath, currentData);
        if (!writeResult.success) {
          return {
            filePath,
            success: false,
            changes: allChanges,
            error: writeResult.error.message,
          };
        }
      }

      return {
        filePath,
        success: true,
        changes: allChanges,
      };
    } catch (error) {
      return {
        filePath,
        success: false,
        changes: [],
        error: (error as Error).message,
      };
    }
  };

  processFiles = async (
    filePaths: string[],
    config: MigratorConfig
  ): Promise<MigrationResult[]> => {
    const results: MigrationResult[] = [];
    const totalFiles = filePaths.length;

    for (let i = 0; i < filePaths.length; i++) {
      const filePath = filePaths[i];
      const currentFile = i + 1;

      // Update migrator utils with progress info
      this.migratorUtils.getProgressInfo = () => ({
        currentFile,
        totalFiles,
        currentFileName: filePath
          ? filePath.split("/").pop() || filePath
          : "unknown",
      });

      if (filePath) {
        const result = await this.processFile(filePath, config);
        results.push(result);
      }
    }

    return results;
  };

  private matchesPattern = (filePath: string, patterns: string[]): boolean => {
    return patterns.some((pattern) => {
      // Simple pattern matching
      const regex = this.patternToRegex(pattern);
      return regex.test(filePath);
    });
  };

  private isExcluded = (filePath: string, patterns: string[]): boolean => {
    return this.matchesPattern(filePath, patterns);
  };

  private patternToRegex = (pattern: string): RegExp => {
    const escaped = pattern
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      .replace(/\\\*/g, ".*")
      .replace(/\\\?/g, ".");

    return new RegExp(`^${escaped}$`);
  };
}
