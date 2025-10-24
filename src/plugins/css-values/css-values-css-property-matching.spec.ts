import { describe, it, expect, beforeEach, vi } from "vitest";
import { CSSValuesPlugin } from "./css-values";
import { CSSValuesConfig } from "../../types";
import { readFileSync } from "fs";
import { join } from "path";

describe("CSSValuesPlugin - CSS Property Matching Issues", () => {
  let plugin: CSSValuesPlugin;
  let mockMigratorUtils: any;

  beforeEach(() => {
    plugin = new CSSValuesPlugin();
    mockMigratorUtils = {
      parseCSS: vi.fn().mockImplementation((content) => {
        const { parseCSS } = require("../../../dist/utils/css-parser");
        return parseCSS(content);
      }),
      findProperties: vi.fn(),
      replacePropertyValue: vi.fn(),
      parseCSSInJS: vi.fn(),
      findCSSInJSProperties: vi.fn(),
      replaceCSSInJSPropertyValue: vi.fn(),
      log: vi.fn(),
    };
  });

  describe("CSS Property Matching Precision", () => {
    it("should NOT match 'color' property with background-color", async () => {
      const content = readFileSync(
        join(__dirname, "../../../tests/css-property-matching-issue.css"),
        "utf-8"
      );

      const config: CSSValuesConfig = {
        mappings: {
          "--ds-core-color-background": {
            options: [
              {
                ifProp: ["color"], // This should NOT match background-color
                replace: "--ds-semantic-color-text",
              },
            ],
          },
        },
      };

      const context = {
        fileData: content,
        filePath: "css-property-matching-issue.css",
        config,
        migratorUtils: mockMigratorUtils,
        isInteractive: false,
      };

      const result = await plugin.process(context);

      // Should NOT find any changes because 'color' should not match 'background-color'
      expect(result.changes).toHaveLength(0);
    });

    it("should NOT match 'color' property with border-color", async () => {
      const content = readFileSync(
        join(__dirname, "../../../tests/css-property-matching-issue.css"),
        "utf-8"
      );

      const config: CSSValuesConfig = {
        mappings: {
          "--ds-core-color-border": {
            options: [
              {
                ifProp: ["color"], // This should NOT match border-color
                replace: "--ds-semantic-color-text",
              },
            ],
          },
        },
      };

      const context = {
        fileData: content,
        filePath: "css-property-matching-issue.css",
        config,
        migratorUtils: mockMigratorUtils,
        isInteractive: false,
      };

      const result = await plugin.process(context);

      // Should NOT find any changes because 'color' should not match 'border-color'
      expect(result.changes).toHaveLength(0);
    });

    it("should NOT match 'background' property with background-color", async () => {
      const content = readFileSync(
        join(
          __dirname,
          "../../../tests/css-property-matching-negative-only.css"
        ),
        "utf-8"
      );

      const config: CSSValuesConfig = {
        mappings: {
          "--ds-core-color-background": {
            options: [
              {
                ifProp: ["background"], // This should NOT match background-color
                replace: "--ds-semantic-color-background",
              },
            ],
          },
        },
      };

      const context = {
        fileData: content,
        filePath: "css-property-matching-issue.css",
        config,
        migratorUtils: mockMigratorUtils,
        isInteractive: false,
      };

      const result = await plugin.process(context);

      // Should NOT find any changes because 'background' should not match 'background-color'
      expect(result.changes).toHaveLength(0);
    });

    it("should NOT match 'border' property with border-color", async () => {
      const content = readFileSync(
        join(
          __dirname,
          "../../../tests/css-property-matching-negative-only.css"
        ),
        "utf-8"
      );

      const config: CSSValuesConfig = {
        mappings: {
          "--ds-core-color-border": {
            options: [
              {
                ifProp: ["border"], // This should NOT match border-color
                replace: "--ds-semantic-color-border",
              },
            ],
          },
        },
      };

      const context = {
        fileData: content,
        filePath: "css-property-matching-issue.css",
        config,
        migratorUtils: mockMigratorUtils,
        isInteractive: false,
      };

      const result = await plugin.process(context);

      // Should NOT find any changes because 'border' should not match 'border-color'
      expect(result.changes).toHaveLength(0);
    });

    it("should correctly match exact property names", async () => {
      const content = readFileSync(
        join(__dirname, "../../../tests/css-property-matching-issue.css"),
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
        filePath: "css-property-matching-issue.css",
        config,
        migratorUtils: mockMigratorUtils,
        isInteractive: false,
      };

      // Debug: test the CSS parser directly
      const rules = mockMigratorUtils.parseCSS(content);
      console.log("CSS parser result:", rules.length, "rules");
      rules.forEach((rule, index) => {
        console.log(
          `Rule ${index} (${rule.selector}):`,
          rule.properties.length,
          "properties"
        );
        rule.properties.forEach((prop, propIndex) => {
          console.log(`  ${propIndex}: ${prop.property} = ${prop.value}`);
        });
      });

      const result = await plugin.process(context);

      // Debug: log the result
      console.log("Result changes:", result.changes);
      console.log(
        "File type detected:",
        plugin.detectFileType("css-property-matching-issue.css", content)
      );

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

    it("should correctly match kebab-case properties", async () => {
      const content = readFileSync(
        join(__dirname, "../../../tests/css-property-matching-issue.css"),
        "utf-8"
      );

      const config: CSSValuesConfig = {
        mappings: {
          "--ds-core-color-background": {
            options: [
              {
                ifProp: ["background-color"], // This should match 'background-color' property
                replace: "--ds-semantic-color-background",
              },
            ],
          },
          "--ds-core-color-border": {
            options: [
              {
                ifProp: ["border-color"], // This should match 'border-color' property
                replace: "--ds-semantic-color-border",
              },
            ],
          },
        },
      };

      const context = {
        fileData: content,
        filePath: "css-property-matching-issue.css",
        config,
        migratorUtils: mockMigratorUtils,
        isInteractive: false,
      };

      const result = await plugin.process(context);

      // Should find changes for kebab-case matches
      expect(result.changes.length).toBeGreaterThan(0);

      // Should have changes for both 'background-color' and 'border-color' properties
      const backgroundColorChanges = result.changes.filter(
        (change) => change.replacement === "--ds-semantic-color-background"
      );
      const borderColorChanges = result.changes.filter(
        (change) => change.replacement === "--ds-semantic-color-border"
      );

      expect(backgroundColorChanges.length).toBeGreaterThan(0);
      expect(borderColorChanges.length).toBeGreaterThan(0);
    });
  });
});
