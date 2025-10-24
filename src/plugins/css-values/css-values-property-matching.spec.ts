import { describe, it, expect, beforeEach, vi } from "vitest";
import { CSSValuesPlugin } from "./css-values";
import { CSSValuesConfig } from "../../types";
import { readFileSync } from "fs";
import { join } from "path";

describe("CSSValuesPlugin - Property Matching Issues", () => {
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

  describe("Property Matching Precision", () => {
    it("should NOT match 'color' property with backgroundColor", async () => {
      const content = readFileSync(
        join(__dirname, "../../../tests/property-matching-issue-test.js"),
        "utf-8"
      );

      const config: CSSValuesConfig = {
        mappings: {
          "--ds-core-color-background": {
            options: [
              {
                ifProp: ["color"], // This should NOT match backgroundColor
                replace: "--ds-semantic-color-text",
              },
            ],
          },
        },
      };

      const context = {
        fileData: content,
        filePath: "property-matching-issue-test.js",
        config,
        migratorUtils: mockMigratorUtils,
        isInteractive: false,
      };

      const result = await plugin.process(context);

      // Should NOT find any changes because 'color' should not match 'backgroundColor'
      expect(result.changes).toHaveLength(0);
    });

    it("should NOT match 'color' property with borderColor", async () => {
      const content = readFileSync(
        join(__dirname, "../../../tests/property-matching-issue-test.js"),
        "utf-8"
      );

      const config: CSSValuesConfig = {
        mappings: {
          "--ds-core-color-border": {
            options: [
              {
                ifProp: ["color"], // This should NOT match borderColor
                replace: "--ds-semantic-color-text",
              },
            ],
          },
        },
      };

      const context = {
        fileData: content,
        filePath: "property-matching-issue-test.js",
        config,
        migratorUtils: mockMigratorUtils,
        isInteractive: false,
      };

      const result = await plugin.process(context);

      // Should NOT find any changes because 'color' should not match 'borderColor'
      expect(result.changes).toHaveLength(0);
    });

    it("should NOT match 'background' property with backgroundColor", async () => {
      const content = readFileSync(
        join(__dirname, "../../../tests/property-matching-negative-test.js"),
        "utf-8"
      );

      const config: CSSValuesConfig = {
        mappings: {
          "--ds-core-color-background": {
            options: [
              {
                ifProp: ["background"], // This should NOT match backgroundColor
                replace: "--ds-semantic-color-background",
              },
            ],
          },
        },
      };

      const context = {
        fileData: content,
        filePath: "property-matching-issue-test.js",
        config,
        migratorUtils: mockMigratorUtils,
        isInteractive: false,
      };

      const result = await plugin.process(context);

      // Should NOT find any changes because 'background' should not match 'backgroundColor'
      expect(result.changes).toHaveLength(0);
    });

    it("should NOT match 'border' property with borderColor", async () => {
      const content = readFileSync(
        join(__dirname, "../../../tests/property-matching-negative-test.js"),
        "utf-8"
      );

      const config: CSSValuesConfig = {
        mappings: {
          "--ds-core-color-border": {
            options: [
              {
                ifProp: ["border"], // This should NOT match borderColor
                replace: "--ds-semantic-color-border",
              },
            ],
          },
        },
      };

      const context = {
        fileData: content,
        filePath: "property-matching-issue-test.js",
        config,
        migratorUtils: mockMigratorUtils,
        isInteractive: false,
      };

      const result = await plugin.process(context);

      // Should NOT find any changes because 'border' should not match 'borderColor'
      expect(result.changes).toHaveLength(0);
    });

    it("should correctly match exact property names", async () => {
      const content = readFileSync(
        join(__dirname, "../../../tests/property-matching-issue-test.js"),
        "utf-8"
      );

      const config: CSSValuesConfig = {
        mappings: {
          "--ds-core-color-text": {
            options: [
              {
                ifProp: ["color"], // This should match 'color' property
                replace: "--ds-semantic-color-text",
              },
            ],
          },
          "--ds-core-color-background": {
            options: [
              {
                ifProp: ["background"], // This should match 'background' property
                replace: "--ds-semantic-color-background",
              },
            ],
          },
        },
      };

      const context = {
        fileData: content,
        filePath: "property-matching-issue-test.js",
        config,
        migratorUtils: mockMigratorUtils,
        isInteractive: false,
      };

      const result = await plugin.process(context);

      // Should find changes for exact matches
      expect(result.changes.length).toBeGreaterThan(0);

      // Should have changes for both 'color' and 'background' properties
      const colorChanges = result.changes.filter(
        (change) => change.replacement === "--ds-semantic-color-text"
      );
      const backgroundChanges = result.changes.filter(
        (change) => change.replacement === "--ds-semantic-color-background"
      );

      expect(colorChanges.length).toBeGreaterThan(0);
      expect(backgroundChanges.length).toBeGreaterThan(0);
    });

    it("should correctly match camelCase and kebab-case variants", async () => {
      const content = readFileSync(
        join(__dirname, "../../../tests/property-matching-issue-test.js"),
        "utf-8"
      );

      const config: CSSValuesConfig = {
        mappings: {
          "--ds-core-color-text": {
            options: [
              {
                ifProp: ["color"], // This should match both 'color' and 'color' (kebab-case)
                replace: "--ds-semantic-color-text",
              },
            ],
          },
        },
      };

      const context = {
        fileData: content,
        filePath: "property-matching-issue-test.js",
        config,
        migratorUtils: mockMigratorUtils,
        isInteractive: false,
      };

      const result = await plugin.process(context);

      // Should find changes for both camelCase and kebab-case 'color' properties
      expect(result.changes.length).toBeGreaterThan(0);

      const colorChanges = result.changes.filter(
        (change) => change.replacement === "--ds-semantic-color-text"
      );
      expect(colorChanges.length).toBeGreaterThan(0);
    });
  });
});
