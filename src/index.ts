#!/usr/bin/env node

import { Command } from "commander";
import { MigratorCLI } from "./core/cli";
import { CLIOptions } from "./types";
import { CLIOutput } from "./utils/cli-output";

const program = new Command();
const cli = new MigratorCLI();
const cliOutput = new CLIOutput();

program
  .name("migrator")
  .description("A TypeScript CLI tool for code migrations")
  .version("1.0.0");

program
  .command("init")
  .description("Initialize a new migration configuration")
  .option(
    "-c, --config <path>",
    "Path to configuration file",
    "migrator.config.js"
  )
  .action(async (options: CLIOptions) => {
    try {
      await cli.init(options);
      cliOutput.success("Configuration initialized successfully!");
    } catch (error) {
      cliOutput.error(`Error: ${(error as Error).message}`);
      process.exit(1);
    }
  });

program
  .command("migrate")
  .description("Run migrations from configuration file")
  .option(
    "-c, --config <path>",
    "Path to configuration file",
    "migrator.config.js"
  )
  .option("-v, --verbose", "Enable verbose logging")
  .option("--dry-run", "Preview changes without applying them")
  .option("--no-interactive", "Skip all user input and use default values")
  .option(
    "--batch <range>",
    "Process files in batches (e.g., 50-1 for first 50 files, 50-2 for files 51-100)"
  )
  .action(async (options: CLIOptions) => {
    try {
      await cli.migrate(options);
    } catch (error) {
      cliOutput.error(`Error: ${(error as Error).message}`);
      process.exit(1);
    }
  });

program
  .command("help")
  .description("Show help information")
  .action(async () => {
    await cli.help();
  });

program.parse();
