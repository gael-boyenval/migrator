import { describe, it, expect } from "vitest";
import {
  parseCSS,
  findProperties,
  replacePropertyValue,
  getAllProperties,
} from "./css-parser";

describe("CSS Parser", () => {
  describe("parseCSS", () => {
    it("should parse simple CSS rules", () => {
      const css = `
        .example {
          color: red;
          background: blue;
        }
      `;

      const rules = parseCSS(css);
      expect(rules).toHaveLength(1);
      expect(rules[0].selector).toBe(".example");
      expect(rules[0].properties).toHaveLength(2);
      expect(rules[0].properties[0].property).toBe("color");
      expect(rules[0].properties[0].value).toBe("red");
      expect(rules[0].properties[1].property).toBe("background");
      expect(rules[0].properties[1].value).toBe("blue");
    });

    it("should parse CSS custom properties", () => {
      const css = `
        :root {
          --primary-color: #007bff;
          --secondary-color: #6c757d;
        }
      `;

      const rules = parseCSS(css);
      expect(rules).toHaveLength(1);
      expect(rules[0].selector).toBe(":root");
      expect(rules[0].properties).toHaveLength(2);
      expect(rules[0].properties[0].property).toBe("--primary-color");
      expect(rules[0].properties[0].value).toBe("#007bff");
    });

    it("should handle multiple rules", () => {
      const css = `
        .header {
          color: red;
        }
        .footer {
          background: blue;
        }
      `;

      const rules = parseCSS(css);
      expect(rules).toHaveLength(2);
      expect(rules[0].selector).toBe(".header");
      expect(rules[1].selector).toBe(".footer");
    });

    it("should handle CSS comments", () => {
      const css = `
        /* This is a comment */
        .example {
          color: red; /* Another comment */
        }
      `;

      const rules = parseCSS(css);
      expect(rules).toHaveLength(1);
      expect(rules[0].selector).toBe(".example");
      expect(rules[0].properties).toHaveLength(1);
    });
  });

  describe("findProperties", () => {
    it("should find properties by name", () => {
      const css = `
        .example {
          color: red;
          background-color: blue;
          border-color: green;
        }
      `;

      const rules = parseCSS(css);
      const properties = findProperties(rules, ["color", "background-color"]);

      expect(properties).toHaveLength(2);
      expect(properties[0].property).toBe("color");
      expect(properties[1].property).toBe("background-color");
    });

    it("should be case insensitive", () => {
      const css = `
        .example {
          COLOR: red;
          Background-Color: blue;
        }
      `;

      const rules = parseCSS(css);
      const properties = findProperties(rules, ["color", "background-color"]);

      expect(properties).toHaveLength(2);
    });
  });

  describe("replacePropertyValue", () => {
    it("should replace property value", () => {
      const css = `
        .example {
          color: red;
        }
      `;

      const rules = parseCSS(css);
      const property = rules[0].properties[0];

      const result = replacePropertyValue(css, property, "blue");

      expect(result).toContain("color: blue");
      expect(result).not.toContain("color: red");
    });

    it("should preserve formatting", () => {
      const css = `
        .example {
          color:   red   ;
        }
      `;

      const rules = parseCSS(css);
      const property = rules[0].properties[0];

      const result = replacePropertyValue(css, property, "blue");

      expect(result).toContain("color:   blue   ;");
    });
  });

  describe("getAllProperties", () => {
    it("should return all properties from all rules", () => {
      const css = `
        .header {
          color: red;
        }
        .footer {
          background: blue;
        }
      `;

      const properties = getAllProperties(css);
      expect(properties).toHaveLength(2);
      expect(properties[0].property).toBe("color");
      expect(properties[1].property).toBe("background");
    });
  });
});
