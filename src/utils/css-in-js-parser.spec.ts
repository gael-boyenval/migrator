import { describe, it, expect } from "vitest";
import {
  parseCSSInJS,
  camelToKebab,
  kebabToCamel,
  findCSSInJSProperties,
  replaceCSSInJSPropertyValue,
  getAllCSSInJSProperties,
  isCSSInJSCustomProperty,
  isCSSInJSFunctionCall,
} from "./css-in-js-parser";

describe("CSS-in-JS Parser", () => {
  describe("parseCSSInJS", () => {
    it("should parse simple CSS-in-JS objects", () => {
      const content = `
        const myElement = {
          marginTop: 'var(--ds-core-spacing-xs)',
          color: 'var(--ds-core-color-grey-50)',
          fontSize: 16
        };
      `;

      const result = parseCSSInJS(content);

      expect(result).toHaveLength(1);
      expect(result[0].objectPath).toBe("myElement");
      expect(result[0].properties).toHaveLength(3);

      expect(result[0].properties[0].property).toBe("marginTop");
      expect(result[0].properties[0].value).toBe("var(--ds-core-spacing-xs)");

      expect(result[0].properties[1].property).toBe("color");
      expect(result[0].properties[1].value).toBe(
        "var(--ds-core-color-grey-50)"
      );

      expect(result[0].properties[2].property).toBe("fontSize");
      expect(result[0].properties[2].value).toBe(16);
    });

    it("should parse nested objects", () => {
      const content = `
        const styles = {
          container: {
            padding: 'var(--ds-core-spacing-m)',
            backgroundColor: 'var(--ds-core-color-white)'
          },
          button: {
            color: 'var(--ds-core-color-primary)',
            fontWeight: 600
          }
        };
      `;

      const result = parseCSSInJS(content);

      expect(result).toHaveLength(2);
      expect(result[0].objectPath).toBe("container");
      expect(result[1].objectPath).toBe("button");
    });

    it("should handle different value types", () => {
      const content = `
        const styles = {
          margin: 16,
          padding: 'var(--ds-core-spacing-s)',
          color: '#ffffff',
          opacity: 0.5,
          display: 'flex'
        };
      `;

      const result = parseCSSInJS(content);

      expect(result[0].properties).toHaveLength(5);
      expect(result[0].properties[0].value).toBe(16);
      expect(result[0].properties[1].value).toBe("var(--ds-core-spacing-s)");
      expect(result[0].properties[2].value).toBe("#ffffff");
      expect(result[0].properties[3].value).toBe(0.5);
      expect(result[0].properties[4].value).toBe("flex");
    });

    it("should handle quoted and unquoted values", () => {
      const content = `
        const styles = {
          color: "var(--ds-core-color-grey-50)",
          backgroundColor: 'var(--ds-core-color-white)',
          fontSize: 14
        };
      `;

      const result = parseCSSInJS(content);

      expect(result[0].properties[0].value).toBe(
        "var(--ds-core-color-grey-50)"
      );
      expect(result[0].properties[1].value).toBe("var(--ds-core-color-white)");
      expect(result[0].properties[2].value).toBe(14);
    });
  });

  describe("camelToKebab", () => {
    it("should convert camelCase to kebab-case", () => {
      expect(camelToKebab("marginTop")).toBe("margin-top");
      expect(camelToKebab("backgroundColor")).toBe("background-color");
      expect(camelToKebab("fontSize")).toBe("font-size");
      expect(camelToKebab("borderRadius")).toBe("border-radius");
    });

    it("should handle already kebab-case strings", () => {
      expect(camelToKebab("margin-top")).toBe("margin-top");
      expect(camelToKebab("background-color")).toBe("background-color");
    });
  });

  describe("kebabToCamel", () => {
    it("should convert kebab-case to camelCase", () => {
      expect(kebabToCamel("margin-top")).toBe("marginTop");
      expect(kebabToCamel("background-color")).toBe("backgroundColor");
      expect(kebabToCamel("font-size")).toBe("fontSize");
      expect(kebabToCamel("border-radius")).toBe("borderRadius");
    });

    it("should handle already camelCase strings", () => {
      expect(kebabToCamel("marginTop")).toBe("marginTop");
      expect(kebabToCamel("backgroundColor")).toBe("backgroundColor");
    });
  });

  describe("findCSSInJSProperties", () => {
    it("should find properties by name", () => {
      const content = `
        const styles = {
          marginTop: 'var(--ds-core-spacing-xs)',
          color: 'var(--ds-core-color-grey-50)',
          backgroundColor: 'var(--ds-core-color-white)'
        };
      `;

      const rules = parseCSSInJS(content);
      const properties = findCSSInJSProperties(rules, [
        "color",
        "backgroundColor",
      ]);

      expect(properties).toHaveLength(2);
      expect(properties[0].property).toBe("color");
      expect(properties[1].property).toBe("backgroundColor");
    });

    it("should find properties with both camelCase and kebab-case", () => {
      const content = `
        const styles = {
          marginTop: 'var(--ds-core-spacing-xs)',
          color: 'var(--ds-core-color-grey-50)'
        };
      `;

      const rules = parseCSSInJS(content);
      const properties = findCSSInJSProperties(rules, ["margin-top", "color"]);

      expect(properties).toHaveLength(2);
      expect(properties[0].property).toBe("marginTop");
      expect(properties[1].property).toBe("color");
    });
  });

  describe("replaceCSSInJSPropertyValue", () => {
    it("should replace string values", () => {
      const content = `
        const styles = {
          color: 'var(--ds-core-color-grey-50)',
          backgroundColor: 'var(--ds-core-color-white)'
        };
      `;

      const rules = parseCSSInJS(content);
      const property = rules[0].properties[0];

      const result = replaceCSSInJSPropertyValue(
        content,
        property,
        "var(--ds-semantic-color-grey-50)"
      );

      expect(result).toContain("var(--ds-semantic-color-grey-50)");
      expect(result).not.toContain("var(--ds-core-color-grey-50)");
    });

    it("should replace number values", () => {
      const content = `
        const styles = {
          fontSize: 16,
          fontWeight: 600
        };
      `;

      const rules = parseCSSInJS(content);
      const property = rules[0].properties[0];

      const result = replaceCSSInJSPropertyValue(content, property, 18);

      expect(result).toContain("fontSize: 18");
      expect(result).not.toContain("fontSize: 16");
    });
  });

  describe("getAllCSSInJSProperties", () => {
    it("should return all properties from all rules", () => {
      const content = `
        const styles = {
          container: {
            padding: 'var(--ds-core-spacing-m)',
            backgroundColor: 'var(--ds-core-color-white)'
          },
          button: {
            color: 'var(--ds-core-color-primary)',
            fontWeight: 600
          }
        };
      `;

      const properties = getAllCSSInJSProperties(content);

      expect(properties).toHaveLength(4);
      expect(properties.map((p) => p.property)).toEqual([
        "padding",
        "backgroundColor",
        "color",
        "fontWeight",
      ]);
    });
  });

  describe("isCSSInJSCustomProperty", () => {
    it("should identify CSS custom properties", () => {
      expect(isCSSInJSCustomProperty("--ds-core-color-grey-50")).toBe(true);
      expect(isCSSInJSCustomProperty("var(--ds-core-color-grey-50)")).toBe(
        false
      );
      expect(isCSSInJSCustomProperty("#ffffff")).toBe(false);
      expect(isCSSInJSCustomProperty(16)).toBe(false);
    });
  });

  describe("isCSSInJSFunctionCall", () => {
    it("should identify CSS function calls", () => {
      expect(isCSSInJSFunctionCall("var(--ds-core-color-grey-50)")).toBe(true);
      expect(isCSSInJSFunctionCall("calc(100% - 20px)")).toBe(true);
      expect(isCSSInJSFunctionCall("rgba(255, 255, 255, 0.5)")).toBe(true);
      expect(isCSSInJSFunctionCall("#ffffff")).toBe(false);
      expect(isCSSInJSFunctionCall(16)).toBe(false);
    });
  });
});
