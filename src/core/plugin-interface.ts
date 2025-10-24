import { Change } from "../types";
import { CSSRule, CSSProperty } from "../utils/css-parser";
import { CSSInJSRule, CSSInJSProperty } from "../utils/css-in-js-parser";
import { ChoiceOptions } from "../utils/user-interaction";

export interface MigratorUtils {
  // CSS parsing utilities
  parseCSS: (content: string) => CSSRule[];
  findProperties: (rules: CSSRule[], propertyNames: string[]) => CSSProperty[];
  replacePropertyValue: (
    content: string,
    property: CSSProperty,
    newValue: string
  ) => string;

  // CSS-in-JS parsing utilities
  parseCSSInJS: (content: string) => CSSInJSRule[];
  findCSSInJSProperties: (
    rules: CSSInJSRule[],
    propertyNames: string[]
  ) => CSSInJSProperty[];
  replaceCSSInJSPropertyValue: (
    content: string,
    property: CSSInJSProperty,
    newValue: string | number
  ) => string;

  // User interaction utilities
  askUserForChoice: (options: ChoiceOptions) => Promise<string | null>;
  askUserForConfirmation: (message: string) => Promise<boolean>;
  askUserForInput: (prompt: string, defaultValue?: string) => Promise<string>;

  // Logging utilities
  log: (message: string, level?: "info" | "warn" | "error" | "debug") => void;

  // Progress utilities
  getProgressInfo?: () => {
    currentFile: number;
    totalFiles: number;
    currentFileName: string;
  };
}

export interface PluginContext {
  fileData: string; // Current file content
  filePath: string; // Absolute file path
  config: any; // Plugin-specific configuration
  migratorUtils: MigratorUtils; // Utility functions
  isInteractive: boolean; // Indicates if user interaction is available
}

export interface PluginResult {
  data: string; // Modified file content
  changes: Change[]; // List of changes made
}

export interface Plugin {
  name: string;
  process(context: PluginContext): Promise<PluginResult>;
}
