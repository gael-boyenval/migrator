import { describe, it, expect, beforeEach, vi } from "vitest";
import { CSSValuesPlugin } from "./css-values";
import { CSSValuesConfig } from "../../types";
import { readFileSync } from "fs";
import { join } from "path";

describe("CSSValuesPlugin - Complex Real-World Tests", () => {
  let plugin: CSSValuesPlugin;
  let mockMigratorUtils: any;

  beforeEach(() => {
    plugin = new CSSValuesPlugin();
    mockMigratorUtils = {
      parseCSS: vi.fn(),
      findProperties: vi.fn(),
      replacePropertyValue: vi.fn(),
      parseCSSInJS: vi.fn().mockImplementation((content) => {
        const { parseCSSInJS } = require("../../utils/css-in-js-parser");
        return parseCSSInJS(content);
      }),
      findCSSInJSProperties: vi.fn(),
      replaceCSSInJSPropertyValue: vi.fn(),
      log: vi.fn(),
    };
  });

  describe("React Component (TSX)", () => {
    it("should handle complex React component with multiple style objects", async () => {
      const content = readFileSync(
        join(__dirname, "../../../tests/complex-css-in-js/ReactComponent.tsx"),
        "utf-8"
      );

      const config: CSSValuesConfig = {
        mappings: {
          "--ds-core-spacing-sm": "--ds-semantic-spacing-small",
          "--ds-core-spacing-md": "--ds-semantic-spacing-medium",
          "--ds-core-spacing-lg": "--ds-semantic-spacing-large",
          "--ds-core-color-white": "--ds-semantic-color-surface-white",
          "--ds-core-color-grey-50": "--ds-semantic-color-neutral-50",
          "--ds-core-color-grey-900": "--ds-semantic-color-neutral-900",
          "--ds-core-color-primary-500": "--ds-semantic-color-primary-500",
          "--ds-core-color-primary-600": "--ds-semantic-color-primary-600",
          "--ds-core-color-primary-100": "--ds-semantic-color-primary-100",
          "--ds-core-color-primary-200": "--ds-semantic-color-primary-200",
          "--ds-core-color-grey-300": "--ds-semantic-color-neutral-300",
          "--ds-core-color-grey-600": "--ds-semantic-color-neutral-600",
          "--ds-core-color-grey-700": "--ds-semantic-color-neutral-700",
          "--ds-core-color-grey-100": "--ds-semantic-color-neutral-100",
          "--ds-core-color-red-500": "--ds-semantic-color-danger-500",
          "--ds-core-shadow-sm": "--ds-semantic-shadow-small",
          "--ds-core-shadow-md": "--ds-semantic-shadow-medium",
          "--ds-core-shadow-lg": "--ds-semantic-shadow-large",
          "--ds-core-border-radius-md": "--ds-semantic-border-radius-medium",
          "--ds-core-font-family-sans": "--ds-semantic-font-family-sans",
        },
      };

      const context = {
        fileData: content,
        filePath: "ReactComponent.tsx",
        config,
        migratorUtils: mockMigratorUtils,
        isInteractive: false,
      };

      const result = await plugin.process(context);

      // Should find and replace multiple CSS variables
      expect(result.changes.length).toBeGreaterThan(0);

      // Check that spacing variables were replaced
      const spacingChanges = result.changes.filter((change) =>
        change.original.includes("--ds-core-spacing")
      );
      expect(spacingChanges.length).toBeGreaterThan(0);

      // Check that color variables were replaced
      const colorChanges = result.changes.filter((change) =>
        change.original.includes("--ds-core-color")
      );
      expect(colorChanges.length).toBeGreaterThan(0);
    });

    it("should handle conditional replacements in React component", async () => {
      const content = readFileSync(
        join(__dirname, "../../../tests/complex-css-in-js/ReactComponent.tsx"),
        "utf-8"
      );

      const config: CSSValuesConfig = {
        mappings: {
          "--ds-core-color-primary-500": {
            options: [
              {
                ifProp: ["backgroundColor"],
                replace: "--ds-semantic-color-primary-surface",
              },
              {
                ifProp: ["borderColor"],
                replace: "--ds-semantic-color-primary-border",
              },
            ],
          },
        },
      };

      const context = {
        fileData: content,
        filePath: "ReactComponent.tsx",
        config,
        migratorUtils: mockMigratorUtils,
        isInteractive: false,
      };

      const result = await plugin.process(context);

      expect(result.changes.length).toBeGreaterThan(0);

      // Should have different replacements based on property
      const backgroundColorChanges = result.changes.filter(
        (change) => change.replacement === "--ds-semantic-color-primary-surface"
      );
      const borderColorChanges = result.changes.filter(
        (change) => change.replacement === "--ds-semantic-color-primary-border"
      );

      expect(backgroundColorChanges.length).toBeGreaterThan(0);
      expect(borderColorChanges.length).toBeGreaterThan(0);
    });
  });

  describe("TypeScript Styles", () => {
    it("should handle complex TypeScript file with theme objects", async () => {
      const content = readFileSync(
        join(__dirname, "../../../tests/complex-css-in-js/TypeScriptStyles.ts"),
        "utf-8"
      );

      const config: CSSValuesConfig = {
        mappings: {
          "--ds-core-color-primary-500": "--ds-semantic-color-primary-500",
          "--ds-core-color-secondary-500": "--ds-semantic-color-secondary-500",
          "--ds-core-color-background": "--ds-semantic-color-background",
          "--ds-core-color-surface": "--ds-semantic-color-surface",
          "--ds-core-color-text": "--ds-semantic-color-text",
          "--ds-core-color-border": "--ds-semantic-color-border",
          "--ds-core-color-white": "--ds-semantic-color-white",
          "--ds-core-color-grey-100": "--ds-semantic-color-neutral-100",
          "--ds-core-color-grey-300": "--ds-semantic-color-neutral-300",
          "--ds-core-color-grey-600": "--ds-semantic-color-neutral-600",
          "--ds-core-color-grey-700": "--ds-semantic-color-neutral-700",
          "--ds-core-color-grey-900": "--ds-semantic-color-neutral-900",
          "--ds-core-color-grey-50": "--ds-semantic-color-neutral-50",
          "--ds-core-spacing-xs": "--ds-semantic-spacing-xs",
          "--ds-core-spacing-sm": "--ds-semantic-spacing-sm",
          "--ds-core-spacing-md": "--ds-semantic-spacing-md",
          "--ds-core-spacing-lg": "--ds-semantic-spacing-lg",
          "--ds-core-spacing-xl": "--ds-semantic-spacing-xl",
          "--ds-core-shadow-sm": "--ds-semantic-shadow-sm",
          "--ds-core-shadow-md": "--ds-semantic-shadow-md",
          "--ds-core-shadow-lg": "--ds-semantic-shadow-lg",
          "--ds-core-font-family-heading": "--ds-semantic-font-family-heading",
          "--ds-core-font-family-body": "--ds-semantic-font-family-body",
        },
      };

      const context = {
        fileData: content,
        filePath: "TypeScriptStyles.ts",
        config,
        migratorUtils: mockMigratorUtils,
        isInteractive: false,
      };

      const result = await plugin.process(context);

      expect(result.changes.length).toBeGreaterThan(0);

      // Should find theme color replacements
      const themeColorChanges = result.changes.filter((change) =>
        change.original.includes("--ds-core-color-")
      );
      expect(themeColorChanges.length).toBeGreaterThan(0);

      // Should find spacing replacements
      const spacingChanges = result.changes.filter((change) =>
        change.original.includes("--ds-core-spacing-")
      );
      expect(spacingChanges.length).toBeGreaterThan(0);
    });

    it("should handle nested objects with CSS properties", async () => {
      const content = readFileSync(
        join(__dirname, "../../../tests/complex-css-in-js/TypeScriptStyles.ts"),
        "utf-8"
      );

      const config: CSSValuesConfig = {
        mappings: {
          "--ds-core-color-grey-100": {
            options: [
              {
                ifProp: ["backgroundColor"],
                replace: "--ds-semantic-color-neutral-100",
              },
            ],
          },
        },
      };

      const context = {
        fileData: content,
        filePath: "TypeScriptStyles.ts",
        config,
        migratorUtils: mockMigratorUtils,
        isInteractive: false,
      };

      const result = await plugin.process(context);

      expect(result.changes.length).toBeGreaterThan(0);
    });
  });

  describe("JavaScript Styles", () => {
    it("should handle complex JavaScript file with mixed content", async () => {
      const content = readFileSync(
        join(__dirname, "../../../tests/complex-css-in-js/JavaScriptStyles.js"),
        "utf-8"
      );

      const config: CSSValuesConfig = {
        mappings: {
          "--ds-core-color-primary-500": "--ds-semantic-color-primary-500",
          "--ds-core-color-primary-600": "--ds-semantic-color-primary-600",
          "--ds-core-color-primary-700": "--ds-semantic-color-primary-700",
          "--ds-core-color-white": "--ds-semantic-color-white",
          "--ds-core-color-grey-100": "--ds-semantic-color-neutral-100",
          "--ds-core-color-grey-200": "--ds-semantic-color-neutral-200",
          "--ds-core-color-grey-300": "--ds-semantic-color-neutral-300",
          "--ds-core-color-grey-600": "--ds-semantic-color-neutral-600",
          "--ds-core-color-grey-700": "--ds-semantic-color-neutral-700",
          "--ds-core-color-grey-900": "--ds-semantic-color-neutral-900",
          "--ds-core-color-red-500": "--ds-semantic-color-danger-500",
          "--ds-core-spacing-xs": "--ds-semantic-spacing-xs",
          "--ds-core-spacing-sm": "--ds-semantic-spacing-sm",
          "--ds-core-spacing-md": "--ds-semantic-spacing-md",
          "--ds-core-spacing-lg": "--ds-semantic-spacing-lg",
          "--ds-core-spacing-xl": "--ds-semantic-spacing-xl",
          "--ds-core-shadow-sm": "--ds-semantic-shadow-sm",
          "--ds-core-shadow-md": "--ds-semantic-shadow-md",
          "--ds-core-shadow-lg": "--ds-semantic-shadow-lg",
          "--ds-core-font-family-sans": "--ds-semantic-font-family-sans",
        },
      };

      const context = {
        fileData: content,
        filePath: "JavaScriptStyles.js",
        config,
        migratorUtils: mockMigratorUtils,
        isInteractive: false,
      };

      const result = await plugin.process(context);

      expect(result.changes.length).toBeGreaterThan(0);
    });

    it("should handle function-generated styles", async () => {
      const content = readFileSync(
        join(__dirname, "../../../tests/complex-css-in-js/JavaScriptStyles.js"),
        "utf-8"
      );

      const config: CSSValuesConfig = {
        mappings: {
          "--ds-core-color-primary-500": {
            options: [
              {
                ifProp: ["backgroundColor"],
                replace: "--ds-semantic-color-primary-background",
              },
            ],
          },
        },
      };

      const context = {
        fileData: content,
        filePath: "JavaScriptStyles.js",
        config,
        migratorUtils: mockMigratorUtils,
        isInteractive: false,
      };

      const result = await plugin.process(context);

      expect(result.changes.length).toBeGreaterThan(0);
    });
  });

  describe("Edge Cases", () => {
    it("should handle files with comments and mixed content", async () => {
      const content = readFileSync(
        join(__dirname, "../../../tests/complex-css-in-js/EdgeCases.js"),
        "utf-8"
      );

      const config: CSSValuesConfig = {
        mappings: {
          "--ds-core-spacing-sm": "--ds-semantic-spacing-small",
          "--ds-core-spacing-md": "--ds-semantic-spacing-medium",
          "--ds-core-spacing-lg": "--ds-semantic-spacing-large",
          "--ds-core-color-background": "--ds-semantic-color-background",
          "--ds-core-color-primary-500": "--ds-semantic-color-primary-500",
          "--ds-core-color-primary-600": "--ds-semantic-color-primary-600",
          "--ds-core-color-primary-700": "--ds-semantic-color-primary-700",
          "--ds-core-color-white": "--ds-semantic-color-white",
          "--ds-core-color-grey-100": "--ds-semantic-color-neutral-100",
          "--ds-core-color-grey-300": "--ds-semantic-color-neutral-300",
          "--ds-core-color-grey-700": "--ds-semantic-color-neutral-700",
          "--ds-core-color-text": "--ds-semantic-color-text",
          "--ds-core-color-border": "--ds-semantic-color-border",
          "--ds-core-color-hover": "--ds-semantic-color-hover",
          "--ds-core-color-active": "--ds-semantic-color-active",
          "--ds-core-color-disabled": "--ds-semantic-color-disabled",
          "--ds-core-shadow-sm": "--ds-semantic-shadow-small",
          "--ds-core-shadow-md": "--ds-semantic-shadow-medium",
          "--ds-core-shadow-lg": "--ds-semantic-shadow-large",
          "--ds-core-font-family-sans": "--ds-semantic-font-family-sans",
        },
      };

      const context = {
        fileData: content,
        filePath: "EdgeCases.js",
        config,
        migratorUtils: mockMigratorUtils,
        isInteractive: false,
      };

      const result = await plugin.process(context);

      expect(result.changes.length).toBeGreaterThan(0);
    });

    it("should handle deeply nested objects", async () => {
      const content = readFileSync(
        join(__dirname, "../../../tests/complex-css-in-js/EdgeCases.js"),
        "utf-8"
      );

      const config: CSSValuesConfig = {
        mappings: {
          "--ds-core-spacing-lg": "--ds-semantic-spacing-large",
          "--ds-core-spacing-md": "--ds-semantic-spacing-medium",
          "--ds-core-spacing-sm": "--ds-semantic-spacing-small",
          "--ds-core-color-background": "--ds-semantic-color-background",
          "--ds-core-color-text": "--ds-semantic-color-text",
        },
      };

      const context = {
        fileData: content,
        filePath: "EdgeCases.js",
        config,
        migratorUtils: mockMigratorUtils,
        isInteractive: false,
      };

      const result = await plugin.process(context);

      expect(result.changes.length).toBeGreaterThan(0);
    });

    it("should handle quoted property names (kebab-case)", async () => {
      const content = readFileSync(
        join(__dirname, "../../../tests/complex-css-in-js/EdgeCases.js"),
        "utf-8"
      );

      const config: CSSValuesConfig = {
        mappings: {
          "--ds-core-color-background": "--ds-semantic-color-background",
          "--ds-core-shadow-sm": "--ds-semantic-shadow-small",
        },
      };

      const context = {
        fileData: content,
        filePath: "EdgeCases.js",
        config,
        migratorUtils: mockMigratorUtils,
        isInteractive: false,
      };

      const result = await plugin.process(context);

      expect(result.changes.length).toBeGreaterThan(0);
    });

    it("should handle mixed value types (strings and numbers)", async () => {
      const content = readFileSync(
        join(__dirname, "../../../tests/complex-css-in-js/EdgeCases.js"),
        "utf-8"
      );

      const config: CSSValuesConfig = {
        mappings: {
          "16": "18",
          "14": "16",
          "500": "600",
          "400": "500",
        },
      };

      const context = {
        fileData: content,
        filePath: "EdgeCases.js",
        config,
        migratorUtils: mockMigratorUtils,
        isInteractive: false,
      };

      const result = await plugin.process(context);

      expect(result.changes.length).toBeGreaterThan(0);
    });

    it("should handle various property name formats", async () => {
      const content = readFileSync(
        join(__dirname, "../../../tests/complex-css-in-js/EdgeCases.js"),
        "utf-8"
      );

      const config: CSSValuesConfig = {
        mappings: {
          "--ds-core-color-background": {
            options: [
              {
                ifProp: ["backgroundColor"],
                replace: "--ds-semantic-color-background",
              },
            ],
          },
        },
      };

      const context = {
        fileData: content,
        filePath: "EdgeCases.js",
        config,
        migratorUtils: mockMigratorUtils,
        isInteractive: false,
      };

      const result = await plugin.process(context);

      expect(result.changes.length).toBeGreaterThan(0);
    });
  });

  describe("Performance and Edge Cases", () => {
    it("should handle large files efficiently", async () => {
      // Create a large file with many CSS properties
      const largeContent = `
        const styles = {
          ${Array.from(
            { length: 100 },
            (_, i) => `
          property${i}: 'var(--ds-core-color-grey-${i % 10})',
          fontSize${i}: ${16 + i},
          fontWeight${i}: ${400 + i},
          `
          ).join(",")}
        };
      `;

      const config: CSSValuesConfig = {
        mappings: {
          "--ds-core-color-grey-0": "--ds-semantic-color-neutral-0",
          "--ds-core-color-grey-1": "--ds-semantic-color-neutral-1",
          "--ds-core-color-grey-2": "--ds-semantic-color-neutral-2",
          "--ds-core-color-grey-3": "--ds-semantic-color-neutral-3",
          "--ds-core-color-grey-4": "--ds-semantic-color-neutral-4",
          "--ds-core-color-grey-5": "--ds-semantic-color-neutral-5",
          "--ds-core-color-grey-6": "--ds-semantic-color-neutral-6",
          "--ds-core-color-grey-7": "--ds-semantic-color-neutral-7",
          "--ds-core-color-grey-8": "--ds-semantic-color-neutral-8",
          "--ds-core-color-grey-9": "--ds-semantic-color-neutral-9",
        },
      };

      const context = {
        fileData: largeContent,
        filePath: "LargeFile.js",
        config,
        migratorUtils: mockMigratorUtils,
        isInteractive: false,
      };

      const startTime = Date.now();
      const result = await plugin.process(context);
      const endTime = Date.now();

      expect(result.changes.length).toBeGreaterThan(0);
      expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
    });

    it("should handle files with no CSS properties gracefully", async () => {
      const content = `
        const config = {
          apiUrl: 'https://api.example.com',
          version: '1.0.0',
          timeout: 5000,
          retries: 3
        };
      `;

      const config: CSSValuesConfig = {
        mappings: {
          "--ds-core-color-primary": "--ds-semantic-color-primary",
        },
      };

      const context = {
        fileData: content,
        filePath: "NoCSS.js",
        config,
        migratorUtils: mockMigratorUtils,
        isInteractive: false,
      };

      const result = await plugin.process(context);

      expect(result.changes).toHaveLength(0);
    });

    it("should handle malformed CSS-in-JS gracefully", async () => {
      const content = `
        const styles = {
          // Missing closing brace
          color: 'var(--ds-core-color-primary)',
          backgroundColor: 'var(--ds-core-color-background)',
        // Missing closing brace
      `;

      const config: CSSValuesConfig = {
        mappings: {
          "--ds-core-color-primary": "--ds-semantic-color-primary",
          "--ds-core-color-background": "--ds-semantic-color-background",
        },
      };

      const context = {
        fileData: content,
        filePath: "Malformed.js",
        config,
        migratorUtils: mockMigratorUtils,
        isInteractive: false,
      };

      // Should not throw an error
      const result = await plugin.process(context);
      expect(result).toBeDefined();
    });
  });
});
