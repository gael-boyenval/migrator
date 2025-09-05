# Code Standards

## Functional Programming Style

### Core Principles

1. **Pure Functions**: Functions should not have side effects and should return the same output for the same input
2. **Immutability**: Avoid mutating data structures, prefer creating new ones
3. **Composition**: Build complex functionality by combining simple functions
4. **Single Responsibility**: Each function should do one thing well
5. **Testability**: Functions should be easy to test in isolation

### Function Guidelines

#### Function Size

- **Maximum 40 lines** per function
- **Maximum 4 parameters** per function
- If a function exceeds these limits, break it down into smaller functions

#### Function Naming

- Use **verb-noun** pattern: `validateConfig`, `processFile`, `discoverFiles`
- Be descriptive and specific: `replaceTokens` not `replace`
- Use consistent terminology across the codebase

#### Function Style

- **Prefer arrow functions** over function declarations
- Use **implicit returns** for simple expressions
- Use **shorthand object properties** when possible
- Keep function bodies concise and focused

#### Function Structure

```typescript
// Good: Pure arrow function with clear input/output
const validateConfig = (config: unknown): MigratorConfig => {
  // validation logic
  return validatedConfig;
};

// Good: Composed from smaller functions
const processFile = async (
  filePath: string,
  config: MigratorConfig
): Promise<MigrationResult> => {
  const fileData = await readFile(filePath);
  const changes = await applyMigrations(fileData, config);
  return writeFile(filePath, changes);
};

// Avoid: Large function with multiple responsibilities
const processFileAndLogAndValidateAndSave = (
  filePath: string,
  config: any
): void => {
  // 50+ lines of mixed concerns
};
```

### Data Flow

#### Input Validation

- Validate all inputs at function boundaries
- Use TypeScript types for compile-time safety
- Create validation functions for runtime checks

```typescript
// Good: Input validation
const processConfig = (rawConfig: unknown): MigratorConfig => {
  if (!isValidConfig(rawConfig)) {
    throw new Error("Invalid configuration");
  }
  return rawConfig as MigratorConfig;
};

const isValidConfig = (config: unknown): config is MigratorConfig =>
  typeof config === "object" &&
  config !== null &&
  "include" in config &&
  "migrations" in config;
```

#### Error Handling

- Use Result types for operations that can fail
- Avoid throwing exceptions for expected errors
- Handle errors at the appropriate level

```typescript
// Good: Result type for error handling
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

const readFile = (path: string): Result<string> => {
  try {
    const content = fs.readFileSync(path, "utf8");
    return { success: true, data: content };
  } catch (error) {
    return { success: false, error: error as Error };
  }
};
```

### Composition Patterns

#### Function Composition

```typescript
// Good: Compose simple functions
const processFile = pipe(readFile, validateContent, applyMigrations, writeFile);

// Good: Use higher-order functions
const withErrorHandling = <T>(fn: () => T): Result<T> => {
  try {
    return { success: true, data: fn() };
  } catch (error) {
    return { success: false, error: error as Error };
  }
};
```

#### Data Transformation

```typescript
// Good: Transform data through pipeline
const transformFileData = (data: string, steps: MigrationStep[]): string =>
  steps.reduce((currentData, step) => applyStep(currentData, step), data);

// Good: Use map/filter/reduce for data operations
const getEnabledSteps = (steps: MigrationStep[]): MigrationStep[] =>
  steps.filter((step) => step.enabled !== false);
```

## Directory Structure

### Core Directory (`src/core/`)

Contains the main business logic, orchestration, and plugin system:

```
src/core/
├── cli.ts                 # CLI command handling
├── cli.spec.ts           # CLI tests
├── config.ts             # Configuration management
├── config.spec.ts        # Configuration tests
├── file-discovery.ts     # File pattern matching
├── file-discovery.spec.ts # File discovery tests
├── migration-engine.ts   # Core migration processing
├── migration-engine.spec.ts # Migration engine tests
├── plugin-interface.ts   # Plugin contract and types
├── plugin-interface.spec.ts # Interface tests
├── registry.ts           # Plugin registry
└── registry.spec.ts      # Registry tests
```

**Responsibilities:**

- Command-line interface
- Configuration loading and validation
- File discovery and filtering
- Migration orchestration
- Plugin system interfaces and registry
- High-level business logic

### Utils Directory (`src/utils/`)

Contains reusable utility functions:

```
src/utils/
├── logger.ts             # Logging utilities
├── logger.spec.ts        # Logger tests
├── glob-utils.ts         # Glob pattern utilities
├── glob-utils.spec.ts    # Glob utils tests
├── file-utils.ts         # File system utilities
├── file-utils.spec.ts    # File utils tests
├── validation.ts         # Input validation helpers
├── validation.spec.ts    # Validation tests
└── error-handling.ts     # Error handling utilities
└── error-handling.spec.ts # Error handling tests
```

**Responsibilities:**

- Pure utility functions
- Input validation
- Error handling
- Logging
- File system operations
- String manipulation

### Plugins Directory (`src/plugins/`)

Contains plugin implementations organized in individual directories:

```
src/plugins/
├── index.ts              # Plugin exports
├── simple-replace/       # Simple replace plugin
│   ├── simple-replace.ts # Plugin implementation
│   └── simple-replace.spec.ts # Plugin tests
├── css-values/           # CSS values plugin (future)
│   ├── css-values.ts     # Plugin implementation
│   └── css-values.spec.ts # Plugin tests
└── [plugin-name]/        # Each plugin in its own directory
    ├── [plugin-name].ts  # Plugin implementation
    └── [plugin-name].spec.ts # Plugin tests
```

**Plugin Directory Structure:**

Each plugin must be organized in its own directory with the following structure:

- `[plugin-name].ts` - Main plugin implementation
- `[plugin-name].spec.ts` - Plugin tests
- Optional: Additional utility files specific to the plugin

**Responsibilities:**

- Plugin implementations only
- Plugin-specific logic and utilities
- Individual plugin testing
- Plugin exports through index.ts

### Plugin Organization Guidelines

#### Plugin Directory Naming

- Use kebab-case for plugin directory names: `css-values`, `simple-replace`
- Directory name should match the plugin name exactly
- Plugin class name should use PascalCase: `CSSValuesPlugin`, `SimpleReplacePlugin`

#### Plugin File Structure

```typescript
// src/plugins/[plugin-name]/[plugin-name].ts
export class [PluginName]Plugin implements Plugin {
  name = "[plugin-name]";

  process = async (context: PluginContext): Promise<PluginResult> => {
    // Plugin implementation
  };
}
```

#### Plugin Registration

- All plugins must be registered in `src/core/registry.ts`
- Plugin imports should use the full path: `../plugins/[plugin-name]/[plugin-name]`
- Export plugins through `src/plugins/index.ts` for external consumption

#### Plugin Dependencies

- Plugins should be self-contained within their directory
- Shared utilities should be placed in `src/utils/`
- Plugin-specific utilities can be co-located with the plugin
- Avoid cross-plugin dependencies

## Testing Standards

### Test File Naming

- Every `.ts` file must have a corresponding `.spec.ts` file
- Test files should be in the same directory as the source file
- Use descriptive test names that explain the behavior
- Use Vitest as the testing framework

### Test Structure

```typescript
// Good: Test structure with Vitest imports
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

describe("validateConfig", () => {
  describe("when config is valid", () => {
    it("should return the validated config", () => {
      // test implementation
    });
  });

  describe("when config is invalid", () => {
    it("should throw an error for missing include field", () => {
      // test implementation
    });

    it("should throw an error for invalid migrations array", () => {
      // test implementation
    });
  });
});
```

### Testing Principles

#### Test Boundaries, Not Implementation

```typescript
// Good: Test the behavior, not the implementation
describe("processFile", () => {
  it("should return success when file is processed without errors", () => {
    const result = processFile("test.txt", validConfig);
    expect(result.success).toBe(true);
    expect(result.changes).toHaveLength(2);
  });

  it("should return error when file does not exist", () => {
    const result = processFile("nonexistent.txt", validConfig);
    expect(result.success).toBe(false);
    expect(result.error).toContain("not found");
  });
});

// Avoid: Testing implementation details
describe("processFile", () => {
  it("should call readFile with correct path", () => {
    const readFileSpy = vi.spyOn(fs, "readFileSync");
    processFile("test.txt", validConfig);
    expect(readFileSpy).toHaveBeenCalledWith("test.txt", "utf8");
  });
});
```

#### Test Edge Cases and Boundaries

```typescript
// Good: Test boundaries and edge cases
describe("validateConfig", () => {
  it("should handle empty migrations array", () => {
    const config = { include: ["**/*.ts"], exclude: [], migrations: [] };
    expect(() => validateConfig(config)).not.toThrow();
  });

  it("should handle null config", () => {
    expect(() => validateConfig(null)).toThrow("Invalid configuration");
  });

  it("should handle undefined config", () => {
    expect(() => validateConfig(undefined)).toThrow("Invalid configuration");
  });

  it("should handle config with extra properties", () => {
    const config = {
      include: ["**/*.ts"],
      exclude: [],
      migrations: [],
      extraProperty: "should be ignored",
    };
    expect(() => validateConfig(config)).not.toThrow();
  });
});
```

#### Use Descriptive Test Data

```typescript
// Good: Descriptive test data with shorthand properties
const validConfig: MigratorConfig = {
  include: ["**/*.{ts,tsx}"],
  exclude: ["**/*.spec.ts"],
  migrations: [
    {
      name: "Replace deprecated tokens",
      plugin: "simple-replace",
      config: {
        mappings: {
          "--old-token": "--new-token",
        },
      },
    },
  ],
};

// Good: Arrow function for test setup
const createTestConfig = (): MigratorConfig => ({
  include: ["**/*.ts"],
  exclude: [],
  migrations: [],
});

// Avoid: Generic or unclear test data
const config = { include: ["*"], exclude: [], migrations: [] };
```

### Test Organization

- Group related tests using `describe` blocks
- Use `beforeEach` and `afterEach` for setup and cleanup
- Keep tests independent and isolated
- Use meaningful assertions with clear error messages
- Import Vitest functions explicitly: `import { describe, it, expect, vi } from 'vitest'`
- Use `vi` for mocking instead of `jest`
- Use `vi.mocked()` for type-safe mocking
- Use `vi.clearAllMocks()` instead of `jest.clearAllMocks()`

### Vitest Configuration

- Use `vitest.config.ts` for configuration
- Enable globals for cleaner test syntax
- Use Node environment for CLI testing
- Configure coverage with v8 provider
- Include only `.spec.ts` files in test runs

## Code Quality

### TypeScript Usage

- Use strict TypeScript configuration
- Prefer interfaces over types for object shapes
- Use union types for error handling
- Avoid `any` type, use `unknown` when necessary
- Use **shorthand object properties** and **destructuring**
- Prefer **arrow functions** with type annotations

### Documentation

- Use JSDoc for public functions
- Include parameter descriptions and return types
- Document complex business logic
- Keep comments up to date with code changes

### Performance

- Avoid unnecessary object creation in loops
- Use efficient data structures
- Consider memory usage for large file processing
- Profile performance-critical code paths

This code standard ensures maintainable, testable, and reliable code while following functional programming principles.
