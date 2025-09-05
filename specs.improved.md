# Migrator CLI Tool - Technical Specifications

## Overview

The Migrator is a modular, plugin-based CLI tool designed to perform automated code migrations across large codebases. It focuses on design system migrations, token updates, and component transformations with interactive user guidance.

## Core Architecture

### 1. CLI Interface

```bash
migrator [command] [options]

Commands:
  migrate <config>     Run migrations from configuration file
  init                 Initialize a new migration configuration
  help                 Show help information

Options:
  --config, -c <path>  Path to configuration file (default: migrator.config.js)
```

### 2. Configuration Schema

```typescript
interface MigratorConfig {
  // Global file patterns
  include: string[]; // Glob patterns for files to process
  exclude: string[]; // Glob patterns for files to ignore

  // Migration pipeline
  migrations: MigrationStep[];
}

interface MigrationStep {
  // Step identification
  name: string; // Human-readable step name
  description?: string; // Step description

  // File filtering
  include?: string[]; // filter out current file path does not match
  exclude?: string[]; // filter out current file path does match

  // Plugin configuration
  plugin: PluginFunction; // Plugin name or function
  config: any; // Plugin-specific configuration

  // Execution control
  enabled?: boolean; // Enable/disable this step
}
```

### 3. Plugin System

#### Plugin Interface

```typescript
interface PluginContext {
  fileData: string; // Current file content
  filePath: string; // Absolute file path
  config: any; // Plugin configuration
  migratorUtils: MigratorUtils;
}

interface PluginFunction {
  (context: PluginContext): Promise<string | PluginResult>;
}

interface PluginResult {
  data: string; // Modified file content
  changes: Change[]; // List of changes made
  metadata?: any; // Additional plugin metadata
}

interface Change {
  type: "replace" | "insert" | "delete";
  original: string;
  replacement: string;
  line: number;
  column: number;
  description: string;
}
```

#### Built-in Plugins

1. **cssValues**: Replace CSS values based on property context
2. **classnames**: Replace CSS class names in HTML-like files
3. **componentProps**: Update component properties and attributes
4. **imports**: Update import statements and references
5. **components**: Replace component names and structures

### 4. Utility System

```typescript
interface MigratorUtils {
  // Pattern matching
  getFileMatch(data: string, pattern: RegExp): Match[];
  getMatchesInContext(
    data: string,
    pattern: RegExp,
    contextLines?: number
  ): MatchWithContext[];

  // User interaction
  askUserForChoice(options: ChoiceOptions): Promise<string | null>;
  askUserForConfirmation(message: string): Promise<boolean>;
  askUserForInput(prompt: string, defaultValue?: string): Promise<string>;

  // File modification
  replaceInFile(
    data: string,
    search: string | RegExp,
    replacement: string
  ): string;
  insertInFile(data: string, position: number, content: string): string;
  deleteInFile(data: string, search: string | RegExp): string;

  // Language parsing
  parseHTML(data: string): HTMLAST;
  parseJSX(data: string): JSXAST;
  parseImports(data: string): ImportStatement[];
  parseCSS(data: string): CSSAST;

  // Logging
  log(message: string, level?: "info" | "warn" | "error" | "debug"): void;
  logChange(change: Change): void;
}

interface ChoiceOptions {
  question: string;
  options: ChoiceOption[];
  allowSkip?: boolean;
}

interface ChoiceOption {
  value: string;
  label: string;
  description?: string;
}
```

## Migration Types

### 1. simple replace

The simple replace plugin will replace strings without any parsing and does not require user input in any case. It replace all occurences found in file.

config exemple :

```javascript
{
  plugin: 'simple-replace',
  config: {
    mappings: {
      '--ds-core-color-grey-50': '--ds-semantic-color-grey-50',
      '--ds-core-spacing-xs': '--ds-semantic-spacing-xs',
    }
  }
}
```

### 2. CSS VALUES migrations

```javascript
{
  plugin: 'css-values',
  config: {
    mappings: {
      '--ds-core-color-grey-50': '--ds-semantic-color-grey-50', // SIMPLE REPLACE
      '--ds-core-spacing-xs': '--ds-semantic-spacing-xs',
      '--ds-core-color-grey-80': { // REPLACE VALUE DEPENDING ON CSS PROPS
        options: [
          {
            ifProp: ['border-color', 'border'],
            replace: '--ds-semantic-border-color-grey-50'
          },
          {
            ifProp: ['background-color', 'background'],
            replace: '--ds-semantic-surface-color-grey-50'
          },
          {
            ifProp: ['color', 'fill'],
            replace: [ // MULTIPLE POSSIBLE CHOICES, ASK FOR USER INPUT
              '--ds-semantic-content-color-grey-50',
              '--ds-semantic-content-color-disabled-50'
            ]
          }
        ]
      },
      '#000000': {
        options: [
          {
            ifProp: ['color', 'fill'],
            replace: 'var(--ds-semantic-content-color-black)'
          },
          {
            ifProp: ['background-color', 'background'],
            replace: 'var(--ds-semantic-surface-color-black)'
          }
        ]
      }
    }
  }
}
```

### 3. Component Migrations

#### Class Name Migration

```javascript
{
  plugin: 'classnames',
  config: {
    'mon-heading': 'ds-heading-1',
    'mon-text': 'ds-text-base',
    'mon-button': 'ds-button-solid',
    'mon-input': 'ds-input-default'
  }
}
```

#### Component Property Migration

```javascript
{
  plugin: 'componentProps',
  config: {
    'Button': {
      'variant': {
        'primary': 'solid',
        'secondary': 'outline',
        'tertiary': 'ghost'
      },
      'size': {
        'small': 'sm',
        'medium': 'md',
        'large': 'lg'
      }
    }
  }
}
```

#### Component Replacement

```javascript
{
  plugin: 'components',
  config: {
    'OldButton': {
      name: 'Button',
      props: {
        'variant': 'type',
        'onClick': 'onPress'
      },
      removeProps: ['deprecatedProp']
    }
  }
}
```

### 3. Import Migrations

```javascript
{
  plugin: 'imports',
  config: {
    'old-package': {
      path: 'new-package',
      namedImports: {
        'OldComponent': 'NewComponent',
        'oldFunction': 'newFunction'
      },
      defaultImport: 'NewDefaultExport'
    }
  }
}
```

## Execution Flow

### 1. Initialization Phase

1. Load and validate configuration file
2. Parse include/exclude patterns
3. Discover target files
4. Initialize plugins and utilities

### 2. Processing Phase

For each file:

1. Read file content
2. Apply migration steps in order:
   - Filter file by step include/exclude patterns
   - Execute plugin with file data
   - Handle user interaction if needed
   - Collect changes and metadata
3. Write modified content to file
4. Log results
5. If Error, log error and skip file save

### 3. Completion Phase

1. Generate migration report
2. Show summary statistics

## Error Handling

### 1. File Processing Errors

- Skip problematic files with warning
- Continue processing remaining files
- Log detailed error information

### 2. Plugin Errors

- Graceful plugin failure handling
- Fallback to manual processing
- Plugin-specific error recovery

### 3. User Interaction Errors

- Validate user input
- Provide clear error messages
- Allow retry or skip options

## Performance Considerations

### 1. File Processing

- Process files one after the other

### 2. Pattern Matching

- Optimized regex compilation
- Caching of compiled patterns
- Early termination for non-matching files

## Testing Strategy

### 1. Unit Tests

- Individual plugin functionality

## Extensibility

### 2. Configuration Extensions

- Custom configuration schemas
- Plugin-specific options
- Environment-specific configs
