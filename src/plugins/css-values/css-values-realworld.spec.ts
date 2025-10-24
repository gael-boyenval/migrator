import { describe, it, expect, beforeEach, vi } from "vitest";
import { CSSValuesPlugin } from "./css-values";
import { CSSValuesConfig } from "../../types";
import { readFileSync } from "fs";
import { join } from "path";

describe("CSSValuesPlugin - Real World CSS-in-JS Test", () => {
  let plugin: CSSValuesPlugin;
  let mockMigratorUtils: any;

  beforeEach(() => {
    plugin = new CSSValuesPlugin();
    mockMigratorUtils = {
      parseCSS: vi.fn(),
      findProperties: vi.fn(),
      replacePropertyValue: vi.fn(),
      parseCSSInJS: vi.fn().mockImplementation((content) => {
        const {
          parseCSSInJS,
        } = require("../../../dist/utils/css-in-js-parser");
        return parseCSSInJS(content);
      }),
      findCSSInJSProperties: vi.fn(),
      replaceCSSInJSPropertyValue: vi.fn(),
      log: vi.fn(),
    };
  });

  describe("Real World CSS-in-JS Properties", () => {
    it("should handle fontSize: '14px' property", async () => {
      const content = readFileSync(
        join(
          __dirname,
          "../../../tests/realworldtest/testFiles/css-in-js-test.ts"
        ),
        "utf-8"
      );

      const config: CSSValuesConfig = {
        mappings: {
          "14px": {
            options: [
              {
                ifProp: ["fontSize"],
                replace: "var(--ds-core-typography-font-size-xs)",
              },
            ],
          },
        },
      };

      const context = {
        fileData: content,
        filePath: "css-in-js-test.ts",
        config,
        migratorUtils: mockMigratorUtils,
        isInteractive: false,
      };

      const result = await plugin.process(context);

      // Should find changes for fontSize properties
      expect(result.changes.length).toBeGreaterThan(0);

      const fontSizeChanges = result.changes.filter(
        (change) =>
          change.replacement === "var(--ds-core-typography-font-size-xs)"
      );
      expect(fontSizeChanges.length).toBeGreaterThan(0);

      console.log("FontSize changes found:", fontSizeChanges.length);
      result.changes.forEach((change, index) => {
        console.log(
          `Change ${index}: ${change.original} -> ${change.replacement}`
        );
      });
    });

    it("should handle marginBottom: 'var(--core-space-xl)' property", async () => {
      const content = readFileSync(
        join(
          __dirname,
          "../../../tests/realworldtest/testFiles/css-in-js-test.ts"
        ),
        "utf-8"
      );

      const config: CSSValuesConfig = {
        mappings: {
          "var(--core-space-xl)": {
            options: [
              {
                ifProp: ["marginBottom"],
                replace: "var(--ds-semantic-spacing-large)",
              },
            ],
          },
        },
      };

      const context = {
        fileData: content,
        filePath: "css-in-js-test.ts",
        config,
        migratorUtils: mockMigratorUtils,
        isInteractive: false,
      };

      const result = await plugin.process(context);

      // Should find changes for marginBottom properties
      expect(result.changes.length).toBeGreaterThan(0);

      const marginBottomChanges = result.changes.filter(
        (change) => change.replacement === "var(--ds-semantic-spacing-large)"
      );
      expect(marginBottomChanges.length).toBeGreaterThan(0);

      console.log("MarginBottom changes found:", marginBottomChanges.length);
      result.changes.forEach((change, index) => {
        console.log(
          `Change ${index}: ${change.original} -> ${change.replacement}`
        );
      });
    });

    it("should handle margin: '0 var(--core-space-xl) var(--core-space-xl)' property", async () => {
      const content = readFileSync(
        join(
          __dirname,
          "../../../tests/realworldtest/testFiles/css-in-js-test.ts"
        ),
        "utf-8"
      );

      const config: CSSValuesConfig = {
        mappings: {
          "0 var(--core-space-xl) var(--core-space-xl)": {
            options: [
              {
                ifProp: ["margin"],
                replace:
                  "0 var(--ds-semantic-spacing-large) var(--ds-semantic-spacing-large)",
              },
            ],
          },
        },
      };

      const context = {
        fileData: content,
        filePath: "css-in-js-test.ts",
        config,
        migratorUtils: mockMigratorUtils,
        isInteractive: false,
      };

      const result = await plugin.process(context);

      // Should find changes for margin properties
      expect(result.changes.length).toBeGreaterThan(0);

      const marginChanges = result.changes.filter(
        (change) =>
          change.replacement ===
          "0 var(--ds-semantic-spacing-large) var(--ds-semantic-spacing-large)"
      );
      expect(marginChanges.length).toBeGreaterThan(0);

      console.log("Margin changes found:", marginChanges.length);
      result.changes.forEach((change, index) => {
        console.log(
          `Change ${index}: ${change.original} -> ${change.replacement}`
        );
      });
    });

    it("should handle all three properties together", async () => {
      const content = readFileSync(
        join(
          __dirname,
          "../../../tests/realworldtest/testFiles/css-in-js-test.ts"
        ),
        "utf-8"
      );

      const config: CSSValuesConfig = {
        mappings: {
          "14px": {
            options: [
              {
                ifProp: ["fontSize"],
                replace: "var(--ds-core-typography-font-size-xs)",
              },
            ],
          },
          "var(--core-space-xl)": {
            options: [
              {
                ifProp: ["marginBottom"],
                replace: "var(--ds-semantic-spacing-large)",
              },
            ],
          },
          "0 var(--core-space-xl) var(--core-space-xl)": {
            options: [
              {
                ifProp: ["margin"],
                replace:
                  "0 var(--ds-semantic-spacing-large) var(--ds-semantic-spacing-large)",
              },
            ],
          },
        },
      };

      const context = {
        fileData: content,
        filePath: "css-in-js-test.ts",
        config,
        migratorUtils: mockMigratorUtils,
        isInteractive: false,
      };

      const result = await plugin.process(context);

      // Should find changes for all three property types
      expect(result.changes.length).toBeGreaterThan(0);

      const fontSizeChanges = result.changes.filter(
        (change) =>
          change.replacement === "var(--ds-core-typography-font-size-xs)"
      );
      const marginBottomChanges = result.changes.filter(
        (change) => change.replacement === "var(--ds-semantic-spacing-large)"
      );
      const marginChanges = result.changes.filter(
        (change) =>
          change.replacement ===
          "0 var(--ds-semantic-spacing-large) var(--ds-semantic-spacing-large)"
      );

      expect(fontSizeChanges.length).toBeGreaterThan(0);
      expect(marginBottomChanges.length).toBeGreaterThan(0);
      expect(marginChanges.length).toBeGreaterThan(0);

      console.log("Total changes found:", result.changes.length);
      console.log("FontSize changes:", fontSizeChanges.length);
      console.log("MarginBottom changes:", marginBottomChanges.length);
      console.log("Margin changes:", marginChanges.length);

      result.changes.forEach((change, index) => {
        console.log(
          `Change ${index}: ${change.original} -> ${change.replacement}`
        );
      });
    });
  });
});
