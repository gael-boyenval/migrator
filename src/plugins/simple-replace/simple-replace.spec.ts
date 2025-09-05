import { describe, it, expect, beforeEach } from "vitest";
import { SimpleReplacePlugin } from "./simple-replace";

describe("SimpleReplacePlugin", () => {
  let plugin: SimpleReplacePlugin;

  beforeEach(() => {
    plugin = new SimpleReplacePlugin();
  });

  it("should have correct name", () => {
    expect(plugin.name).toBe("simple-replace");
  });

  describe("process", () => {
    it("should replace single occurrence", async () => {
      const context = {
        fileData: "color: --ds-semantic-color-grey-50;",
        filePath: "test.css",
        config: {
          mappings: {
            "--ds-semantic-color-grey-50": "--ds-semantic-color-grey-50",
          },
        },
      };

      const result = await plugin.process(context);

      expect(result.data).toBe("color: --ds-semantic-color-grey-50;");
      expect(result.changes).toHaveLength(1);
      expect(result.changes[0]).toEqual({
        type: "replace",
        original: "--ds-semantic-color-grey-50",
        replacement: "--ds-semantic-color-grey-50",
        count: 1,
      });
    });

    it("should replace multiple occurrences", async () => {
      const context = {
        fileData:
          "color: --ds-semantic-color-grey-50; background: --ds-semantic-color-grey-50;",
        filePath: "test.css",
        config: {
          mappings: {
            "--ds-semantic-color-grey-50": "--ds-semantic-color-grey-50",
          },
        },
      };

      const result = await plugin.process(context);

      expect(result.data).toBe(
        "color: --ds-semantic-color-grey-50; background: --ds-semantic-color-grey-50;"
      );
      expect(result.changes).toHaveLength(1);
      expect(result.changes[0].count).toBe(2);
    });

    it("should handle multiple mappings", async () => {
      const context = {
        fileData:
          "color: --ds-semantic-color-grey-50; spacing: --ds-semantic-spacing-xs;",
        filePath: "test.css",
        config: {
          mappings: {
            "--ds-semantic-color-grey-50": "--ds-semantic-color-grey-50",
            "--ds-semantic-spacing-xs": "--ds-semantic-spacing-xs",
          },
        },
      };

      const result = await plugin.process(context);

      expect(result.data).toBe(
        "color: --ds-semantic-color-grey-50; spacing: --ds-semantic-spacing-xs;"
      );
      expect(result.changes).toHaveLength(2);
    });

    it("should handle no matches", async () => {
      const context = {
        fileData: "color: red;",
        filePath: "test.css",
        config: {
          mappings: {
            "--ds-semantic-color-grey-50": "--ds-semantic-color-grey-50",
          },
        },
      };

      const result = await plugin.process(context);

      expect(result.data).toBe("color: red;");
      expect(result.changes).toHaveLength(0);
    });

    it("should handle empty file", async () => {
      const context = {
        fileData: "",
        filePath: "test.css",
        config: {
          mappings: {
            "--ds-semantic-color-grey-50": "--ds-semantic-color-grey-50",
          },
        },
      };

      const result = await plugin.process(context);

      expect(result.data).toBe("");
      expect(result.changes).toHaveLength(0);
    });

    it("should handle special regex characters", async () => {
      const context = {
        fileData: "content: 'test.string';",
        filePath: "test.css",
        config: {
          mappings: {
            "test.string": "new.value",
          },
        },
      };

      const result = await plugin.process(context);

      expect(result.data).toBe("content: 'new.value';");
      expect(result.changes).toHaveLength(1);
    });
  });
});
