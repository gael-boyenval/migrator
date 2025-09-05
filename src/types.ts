// Core types and interfaces for the migrator tool

export interface MigratorConfig {
  include: string[]; // Glob patterns for files to process
  exclude: string[]; // Glob patterns for files to ignore
  migrations: MigrationStep[]; // Array of migration steps
}

export interface MigrationStep {
  name: string; // Human-readable step name
  plugin: string; // Plugin identifier
  config: any; // Plugin-specific configuration
  include?: string[]; // Override global include patterns
  exclude?: string[]; // Override global exclude patterns
  enabled?: boolean; // Enable/disable this step (default: true)
}

export interface SimpleReplaceConfig {
  mappings: Record<string, string>; // Key-value pairs for replacements
}

export interface CSSValuesConfig {
  mappings: {
    [key: string]: string | CSSValueMapping;
  };
}

export interface CSSValueMapping {
  options: CSSValueOption[];
}

export interface CSSValueOption {
  ifProp: string[]; // CSS properties to match
  replace: string | string[]; // Single replacement or multiple choices
}

export interface Change {
  type: "replace";
  original: string;
  replacement: string;
  count: number; // Number of occurrences replaced
}

export interface MigrationResult {
  filePath: string;
  success: boolean;
  changes: Change[];
  error?: string;
}

export interface CLIOptions {
  config?: string;
  verbose?: boolean;
  dryRun?: boolean;
  file?: string;
  template?: string;
  noInteractive?: boolean;
  batch?: string;
}

export type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };
