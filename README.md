# @gael-boyenval/migrator - TypeScript Code Migration Tool

A powerful, extensible TypeScript CLI tool for automated code migrations with support for interactive user choices, batch processing, and plugin-based architecture.

## 🚀 Features

- **Plugin-based Architecture**: Extensible system with built-in plugins
- **Interactive Mode**: User-friendly prompts for migration choices
- **Batch Processing**: Process large codebases in manageable chunks
- **Dry Run Mode**: Preview changes before applying them
- **CSS/SCSS Support**: Advanced CSS value replacement with context awareness
- **Comprehensive Logging**: Verbose output with progress tracking
- **ES6 Module Support**: Native support for modern JavaScript modules
- **TypeScript First**: Built with TypeScript for type safety

## 📦 Installation

```bash
# Install globally
npm install -g @gael-boyenval/migrator

# Or use with npx
npx @gael-boyenval/migrator --help

# Or install locally in your project
npm install --save-dev @gael-boyenval/migrator
```

## 🛠️ Quick Start

### 1. Initialize Configuration

```bash
# Create a basic configuration file
migrator init

# Or specify a custom config file
migrator init --config my-migration.config.js
```

### 2. Run Migrations

```bash
# Run migrations with default config
migrator migrate

# Run with custom config
migrator migrate --config my-migration.config.js

# Preview changes without applying them
migrator migrate --dry-run

# Skip interactive prompts (use defaults)
migrator migrate --no-interactive

# Process files in batches
migrator migrate --batch 50-1  # First 50 files
migrator migrate --batch 50-2  # Files 51-100
```

## 📋 Commands

### `migrator init`

Initialize a new migration configuration file.

**Options:**

- `-c, --config <path>` - Path to configuration file (default: `migrator.config.js`)

**Examples:**

```bash
migrator init
migrator init --config custom.config.js
```

### `migrator migrate`

Run migrations from configuration file.

**Options:**

- `-c, --config <path>` - Path to configuration file (default: `migrator.config.js`)
- `-v, --verbose` - Enable verbose logging
- `--dry-run` - Preview changes without applying them
- `--no-interactive` - Skip all user input and use default values
- `--batch <range>` - Process files in batches (e.g., `50-1` for first 50 files)

**Examples:**

```bash
# Basic migration
migrator migrate

# Verbose output with dry run
migrator migrate --verbose --dry-run

# Non-interactive mode
migrator migrate --no-interactive

# Batch processing
migrator migrate --batch 100-1  # First 100 files
migrator migrate --batch 100-2  # Files 101-200
```

### `migrator help`

Show help information and available commands.

## ⚙️ Configuration

### Configuration File Format

The migrator supports multiple configuration formats:

- **JavaScript** (`.js`) - ES6 modules or CommonJS
- **TypeScript** (`.ts`) - With type checking
- **JSON** (`.json`) - Simple key-value configuration

### Basic Configuration Structure

```javascript
// migrator.config.js
export default {
  include: ["src/**/*.{ts,tsx,js,jsx,scss,css}"],
  exclude: ["**/node_modules/**", "**/dist/**"],
  migrations: [
    {
      name: "Replace deprecated tokens",
      plugin: "simple-replace",
      config: {
        mappings: {
          "old-token": "new-token",
          "deprecated-function": "modern-function",
        },
      },
    },
  ],
};
```

### Configuration Options

| Field        | Type              | Required | Description                        |
| ------------ | ----------------- | -------- | ---------------------------------- |
| `include`    | `string[]`        | ✅       | Glob patterns for files to process |
| `exclude`    | `string[]`        | ❌       | Glob patterns for files to ignore  |
| `migrations` | `MigrationStep[]` | ✅       | Array of migration steps           |

### Migration Step Options

| Field     | Type       | Required | Description                                |
| --------- | ---------- | -------- | ------------------------------------------ |
| `name`    | `string`   | ✅       | Human-readable step name                   |
| `plugin`  | `string`   | ✅       | Plugin identifier                          |
| `config`  | `object`   | ✅       | Plugin-specific configuration              |
| `include` | `string[]` | ❌       | Override global include patterns           |
| `exclude` | `string[]` | ❌       | Override global exclude patterns           |
| `enabled` | `boolean`  | ❌       | Enable/disable this step (default: `true`) |

## 🔌 Built-in Plugins

### 1. Simple Replace Plugin

Performs simple string replacements across files.

**Plugin ID:** `simple-replace`

**Configuration:**

```javascript
{
  name: "Replace deprecated tokens",
  plugin: "simple-replace",
  config: {
    mappings: {
      "old-token": "new-token",
      "deprecated-function": "modern-function",
      "legacy-class": "new-class"
    }
  }
}
```

**Example:**

```javascript
// Before
const oldToken = "deprecated-value";
function deprecatedFunction() {}

// After
const oldToken = "modern-value";
function modernFunction() {}
```

### 2. CSS Values Plugin

Advanced CSS value replacement with context awareness and user interaction.

**Plugin ID:** `css-values`

**Configuration:**

```javascript
{
  name: "Update CSS design tokens",
  plugin: "css-values",
  config: {
    mappings: {
      // Simple replacement
      "--old-color": "--new-color",

      // Context-aware replacement with multiple choices
      "--ds-core-color-gray-200": {
        options: [
          {
            ifProp: ["background-color", "background"],
            replace: "--ds-semantic-color-neutral-surface-medium"
          },
          {
            ifProp: ["border-color", "border"],
            replace: "--ds-semantic-color-neutral-border-medium"
          },
          {
            ifProp: ["color"],
            replace: "--ds-semantic-color-neutral-content-medium"
          }
        ]
      },

      // Multiple choice replacement
      "--ds-brand-color-blue-500": {
        options: [
          {
            ifProp: ["background-color"],
            replace: [
              "--ds-semantic-color-action-surface-subtlest",
              "--ds-semantic-color-layout-surface-medium-selected"
            ]
          }
        ]
      }
    }
  }
}
```

**Features:**

- **Context Awareness**: Different replacements based on CSS property
- **User Interaction**: Multiple choice prompts for ambiguous cases
- **SCSS Support**: Handles nested selectors and `&` syntax
- **Precise Matching**: Avoids partial matches (e.g., `--ds-stuff-5` won't match `--ds-stuff-500`)

## 📝 Configuration Examples

### ES6 Module Configuration

```javascript
// migrator.config.js
import { simpleReplaces, cssValues } from "./tokens/migration-config.js";

const config = {
  include: ["src/**/*.{ts,tsx,scss,css}"],
  exclude: ["**/node_modules/**", "**/dist/**"],
  migrations: [
    {
      name: "Replace compatibility tokens",
      plugin: "simple-replace",
      config: {
        mappings: simpleReplaces,
      },
    },
    {
      name: "Replace core and brand tokens",
      plugin: "css-values",
      config: {
        mappings: cssValues,
      },
    },
  ],
};

export default config;
```

### TypeScript Configuration

```typescript
// migrator.config.ts
import type { MigratorConfig } from "@gael-boyenval/migrator";

const config: MigratorConfig = {
  include: ["src/**/*.{ts,tsx,js,jsx}"],
  exclude: ["**/node_modules/**", "**/dist/**", "**/*.test.*"],
  migrations: [
    {
      name: "Update imports",
      plugin: "simple-replace",
      config: {
        mappings: {
          "old-package": "new-package",
          "legacy-import": "modern-import",
        },
      },
    },
  ],
};

export default config;
```

### JSON Configuration

```json
{
  "include": ["src/**/*.{ts,tsx,scss,css}"],
  "exclude": ["**/node_modules/**", "**/dist/**"],
  "migrations": [
    {
      "name": "Update design tokens",
      "plugin": "css-values",
      "config": {
        "mappings": {
          "--old-primary": "--new-primary",
          "--old-secondary": "--new-secondary"
        }
      }
    }
  ]
}
```

### Complex Multi-Step Configuration

```javascript
// migrator.config.js
export default {
  include: [
    "src/**/*.{ts,tsx,js,jsx}",
    "styles/**/*.{css,scss,sass}",
    "components/**/*.{vue,jsx}",
  ],
  exclude: [
    "**/node_modules/**",
    "**/dist/**",
    "**/build/**",
    "**/*.test.*",
    "**/*.spec.*",
  ],
  migrations: [
    {
      name: "Update JavaScript/TypeScript code",
      plugin: "simple-replace",
      include: ["src/**/*.{ts,tsx,js,jsx}"],
      config: {
        mappings: {
          "old-api": "new-api",
          "deprecated-method": "modern-method",
          "legacy-constant": "updated-constant",
        },
      },
    },
    {
      name: "Update CSS design tokens",
      plugin: "css-values",
      include: ["styles/**/*.{css,scss,sass}"],
      config: {
        mappings: {
          "--old-primary": "--new-primary",
          "--old-secondary": "--new-secondary",
        },
      },
    },
    {
      name: "Update component styles",
      plugin: "css-values",
      include: ["components/**/*.{vue,jsx}"],
      config: {
        mappings: {
          "--component-old": "--component-new",
        },
      },
    },
  ],
};
```

## 🎯 Use Cases

### 1. Design System Migration

Migrate from old design tokens to new ones with context-aware replacements:

```javascript
{
  name: "Migrate to new design system",
  plugin: "css-values",
  config: {
    mappings: {
      "--ds-core-color-gray-200": {
        options: [
          {
            ifProp: ["background-color"],
            replace: "--ds-semantic-color-neutral-surface-medium"
          },
          {
            ifProp: ["border-color"],
            replace: "--ds-semantic-color-neutral-border-medium"
          }
        ]
      }
    }
  }
}
```

### 2. API Migration

Update deprecated API calls across your codebase:

```javascript
{
  name: "Update API calls",
  plugin: "simple-replace",
  config: {
    mappings: {
      "oldApi.getData()": "newApi.fetchData()",
      "legacyMethod()": "modernMethod()",
      "deprecated-constant": "updated-constant"
    }
  }
}
```

### 3. Package Migration

Migrate from one package to another:

```javascript
{
  name: "Migrate to new package",
  plugin: "simple-replace",
  config: {
    mappings: {
      "import { old } from 'old-package'": "import { new } from 'new-package'",
      "old-package": "new-package"
    }
  }
}
```

## 🔧 Advanced Usage

### Batch Processing

For large codebases, process files in batches to avoid memory issues:

```bash
# Process first 100 files
migrator migrate --batch 100-1

# Process next 100 files
migrator migrate --batch 100-2

# Process files 201-300
migrator migrate --batch 100-3
```

### Dry Run Mode

Preview changes before applying them:

```bash
migrator migrate --dry-run --verbose
```

### Non-Interactive Mode

Skip user prompts and use default values:

```bash
migrator migrate --no-interactive
```

### Verbose Logging

Get detailed information about the migration process:

```bash
migrator migrate --verbose
```

## 🏗️ Creating Custom Plugins

### Plugin Interface

```typescript
export interface Plugin {
  name: string;
  process(context: PluginContext): Promise<PluginResult | null>;
}

export interface PluginContext {
  fileData: string;
  filePath: string;
  config: any;
  migratorUtils: MigratorUtils;
  isInteractive: boolean;
}

export interface PluginResult {
  data: string;
  changes: Change[];
}
```

### Example Custom Plugin

```typescript
// custom-plugin.ts
import { Plugin, PluginContext, PluginResult } from "migrator";

export class CustomPlugin implements Plugin {
  name = "custom-plugin";

  async process(context: PluginContext): Promise<PluginResult | null> {
    const { fileData, filePath, config } = context;

    // Your custom logic here
    let newData = fileData;
    const changes: Change[] = [];

    // Example: Replace custom patterns
    for (const [pattern, replacement] of Object.entries(config.mappings)) {
      const regex = new RegExp(pattern, "g");
      const matches = newData.match(regex);

      if (matches) {
        newData = newData.replace(regex, replacement);
        changes.push({
          type: "replace",
          original: pattern,
          replacement: replacement,
          count: matches.length,
        });
      }
    }

    return {
      data: newData,
      changes,
    };
  }
}
```

## 🐛 Troubleshooting

### Common Issues

1. **Configuration not found**

   ```bash
   Error: Configuration file not found: migrator.config.js
   ```

   **Solution:** Run `migrator init` to create a configuration file.

2. **Plugin not found**

   ```bash
   Error: Plugin not found: unknown-plugin
   ```

   **Solution:** Check that the plugin name matches exactly with available plugins.

3. **File permission errors**

   ```bash
   Error: EACCES: permission denied, open 'file.js'
   ```

   **Solution:** Ensure you have write permissions for the files being modified.

4. **Pattern matching issues**
   ```bash
   Warning: No changes found in file
   ```
   **Solution:** Verify your glob patterns and replacement mappings are correct.

### Debug Mode

Enable verbose logging to debug issues:

```bash
migrator migrate --verbose --dry-run
```

## 📊 Performance

### Large Codebases

For codebases with thousands of files:

1. Use batch processing to avoid memory issues
2. Use specific include/exclude patterns to limit scope
3. Run migrations during off-peak hours
4. Test with `--dry-run` first

### Memory Usage

- Each file is processed individually
- Memory usage scales with file size, not file count
- Batch processing helps with very large file counts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/your-org/migrator/issues)
- **Documentation**: [GitHub Wiki](https://github.com/your-org/migrator/wiki)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/migrator/discussions)

---

**Made with ❤️ for the TypeScript community**
