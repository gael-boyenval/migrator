import { describe, it, expect, vi, beforeEach } from "vitest";
import { CSSValuesPlugin } from "./css-values";
import { CSSValuesConfig } from "../../types";

describe("CSSValuesPlugin", () => {
  let plugin: CSSValuesPlugin;
  let mockMigratorUtils: any;

  beforeEach(() => {
    plugin = new CSSValuesPlugin();

    mockMigratorUtils = {
      parseCSS: vi.fn(),
      log: vi.fn(),
    };
  });

  describe("simple replacements", () => {
    it("should replace simple CSS values", async () => {
      const css = `
        .example {
          color: var(--ds-core-color-grey-50);
          background: var(--ds-core-spacing-xs);
        }
      `;

      const config: CSSValuesConfig = {
        mappings: {
          "--ds-core-color-grey-50": "--ds-semantic-color-grey-50",
          "--ds-core-spacing-xs": "--ds-semantic-spacing-xs",
        },
      };

      // Mock CSS parsing
      mockMigratorUtils.parseCSS.mockReturnValue([
        {
          selector: ".example",
          properties: [
            {
              property: "color",
              value: "var(--ds-core-color-grey-50)",
              startIndex: 20,
              endIndex: 50,
              line: 2,
              column: 10,
            },
            {
              property: "background",
              value: "var(--ds-core-spacing-xs)",
              startIndex: 60,
              endIndex: 85,
              line: 3,
              column: 10,
            },
          ],
        },
      ]);

      const context = {
        fileData: css,
        filePath: "test.css",
        config,
        migratorUtils: mockMigratorUtils,
        isInteractive: false,
      };

      const result = await plugin.process(context);

      expect(result.changes).toHaveLength(2);
      expect(result.changes[0].original).toBe("--ds-core-color-grey-50");
      expect(result.changes[0].replacement).toBe("--ds-semantic-color-grey-50");
      expect(result.changes[1].original).toBe("--ds-core-spacing-xs");
      expect(result.changes[1].replacement).toBe("--ds-semantic-spacing-xs");
    });
  });

  describe("conditional replacements", () => {
    it("should replace values based on CSS property context", async () => {
      const css = `
        .example {
          color: var(--ds-core-color-grey-80);
          background-color: var(--ds-core-color-grey-80);
        }
      `;

      const config: CSSValuesConfig = {
        mappings: {
          "--ds-core-color-grey-80": {
            options: [
              {
                ifProp: ["color"],
                replace: "--ds-semantic-content-color-grey-80",
              },
              {
                ifProp: ["background-color"],
                replace: "--ds-semantic-surface-color-grey-80",
              },
            ],
          },
        },
      };

      // Mock CSS parsing
      mockMigratorUtils.parseCSS.mockReturnValue([
        {
          selector: ".example",
          properties: [
            {
              property: "color",
              value: "var(--ds-core-color-grey-80)",
              startIndex: 20,
              endIndex: 50,
              line: 2,
              column: 10,
            },
            {
              property: "background-color",
              value: "var(--ds-core-color-grey-80)",
              startIndex: 60,
              endIndex: 90,
              line: 3,
              column: 10,
            },
          ],
        },
      ]);

      const context = {
        fileData: css,
        filePath: "test.css",
        config,
        migratorUtils: mockMigratorUtils,
        isInteractive: false,
      };

      const result = await plugin.process(context);

      expect(result.changes).toHaveLength(2);
      expect(result.changes[0].replacement).toBe(
        "--ds-semantic-content-color-grey-80"
      );
      expect(result.changes[1].replacement).toBe(
        "--ds-semantic-surface-color-grey-80"
      );
    });
  });

  describe("multiple choice replacements", () => {
    it("should handle multiple choice replacements in non-interactive mode", async () => {
      const css = `
        .example {
          color: #000000;
        }
      `;

      const config: CSSValuesConfig = {
        mappings: {
          "#000000": {
            options: [
              {
                ifProp: ["color"],
                replace: [
                  "var(--ds-semantic-content-color-black)",
                  "var(--ds-semantic-content-color-primary)",
                ],
              },
            ],
          },
        },
      };

      // Mock CSS parsing
      mockMigratorUtils.parseCSS.mockReturnValue([
        {
          selector: ".example",
          properties: [
            {
              property: "color",
              value: "#000000",
              startIndex: 20,
              endIndex: 28,
              line: 2,
              column: 10,
            },
          ],
        },
      ]);

      const context = {
        fileData: css,
        filePath: "test.css",
        config,
        migratorUtils: mockMigratorUtils,
        isInteractive: false,
      };

      const result = await plugin.process(context);

      expect(result.changes).toHaveLength(0);
      expect(mockMigratorUtils.log).toHaveBeenCalledWith(
        expect.stringContaining("Non-interactive mode: skipping replacement"),
        "info"
      );
    });

    it("should handle multiple choice replacements in interactive mode", async () => {
      const css = `
        .example {
          color: #000000;
        }
      `;

      const config: CSSValuesConfig = {
        mappings: {
          "#000000": {
            options: [
              {
                ifProp: ["color"],
                replace: [
                  "var(--ds-semantic-content-color-black)",
                  "var(--ds-semantic-content-color-primary)",
                ],
              },
            ],
          },
        },
      };

      // Mock CSS parsing
      mockMigratorUtils.parseCSS.mockReturnValue([
        {
          selector: ".example",
          properties: [
            {
              property: "color",
              value: "#000000",
              startIndex: 20,
              endIndex: 28,
              line: 2,
              column: 10,
            },
          ],
        },
      ]);

      // Mock user choice
      mockMigratorUtils.askUserForChoice = vi
        .fn()
        .mockResolvedValue("var(--ds-semantic-content-color-primary)");

      const context = {
        fileData: css,
        filePath: "test.css",
        config,
        migratorUtils: mockMigratorUtils,
        isInteractive: true,
      };

      const result = await plugin.process(context);

      expect(result.changes).toHaveLength(1);
      expect(result.changes[0].replacement).toBe(
        "var(--ds-semantic-content-color-primary)"
      );
      expect(mockMigratorUtils.askUserForChoice).toHaveBeenCalledWith({
        question: expect.stringContaining("Multiple replacement options"),
        options: [
          {
            value: "var(--ds-semantic-content-color-black)",
            label: "var(--ds-semantic-content-color-black)",
            description: "Option 1",
          },
          {
            value: "var(--ds-semantic-content-color-primary)",
            label: "var(--ds-semantic-content-color-primary)",
            description: "Option 2",
          },
        ],
        allowSkip: true,
        codePreview: expect.objectContaining({
          filePath: "test.css",
          lineNumber: expect.any(Number),
          beforeLines: expect.any(Array),
          changeLine: expect.any(String),
          afterLines: expect.any(Array),
          highlightStart: expect.any(Number),
          highlightEnd: expect.any(Number),
        }),
        progressInfo: undefined,
      });
    });
  });

  describe("error handling", () => {
    it("should handle parsing errors gracefully", async () => {
      const css = "invalid css";
      const config: CSSValuesConfig = { mappings: {} };

      mockMigratorUtils.parseCSS.mockImplementation(() => {
        throw new Error("Parse error");
      });

      const context = {
        fileData: css,
        filePath: "test.css",
        config,
        migratorUtils: mockMigratorUtils,
        isInteractive: false,
      };

      const result = await plugin.process(context);

      expect(result.changes).toHaveLength(0);
      expect(result.data).toBe(css);
      expect(mockMigratorUtils.log).toHaveBeenCalledWith(
        "Error processing CSS values: Parse error",
        "error"
      );
    });
  });
});
