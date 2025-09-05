import { describe, it, expect } from "vitest";
import {
  validateConfig,
  isValidConfig,
  isValidMigrationStep,
} from "./validation";
import { MigratorConfig, MigrationStep } from "../types";

describe("validation", () => {
  describe("isValidConfig", () => {
    it("should return true for valid config", () => {
      const validConfig = {
        include: ["**/*.css"],
        migrations: [
          {
            name: "Test migration",
            plugin: "test-plugin",
            config: { test: true },
          },
        ],
      };

      expect(isValidConfig(validConfig)).toBe(true);
    });

    it("should return false for null config", () => {
      expect(isValidConfig(null)).toBe(false);
    });

    it("should return false for non-object config", () => {
      expect(isValidConfig("string")).toBe(false);
      expect(isValidConfig(123)).toBe(false);
      expect(isValidConfig(true)).toBe(false);
    });

    it("should return false for config missing include", () => {
      const config = {
        migrations: [],
      };

      expect(isValidConfig(config)).toBe(false);
    });

    it("should return false for config missing migrations", () => {
      const config = {
        include: ["**/*.css"],
      };

      expect(isValidConfig(config)).toBe(false);
    });

    it("should return false for config with non-array include", () => {
      const config = {
        include: "not-an-array",
        migrations: [],
      };

      expect(isValidConfig(config)).toBe(false);
    });

    it("should return false for config with non-array migrations", () => {
      const config = {
        include: ["**/*.css"],
        migrations: "not-an-array",
      };

      expect(isValidConfig(config)).toBe(false);
    });
  });

  describe("isValidMigrationStep", () => {
    it("should return true for valid migration step", () => {
      const validStep = {
        name: "Test migration",
        plugin: "test-plugin",
        config: { test: true },
      };

      expect(isValidMigrationStep(validStep)).toBe(true);
    });

    it("should return false for null step", () => {
      expect(isValidMigrationStep(null)).toBe(false);
    });

    it("should return false for non-object step", () => {
      expect(isValidMigrationStep("string")).toBe(false);
    });

    it("should return false for step missing name", () => {
      const step = {
        plugin: "test-plugin",
        config: { test: true },
      };

      expect(isValidMigrationStep(step)).toBe(false);
    });

    it("should return false for step missing plugin", () => {
      const step = {
        name: "Test migration",
        config: { test: true },
      };

      expect(isValidMigrationStep(step)).toBe(false);
    });

    it("should return false for step missing config", () => {
      const step = {
        name: "Test migration",
        plugin: "test-plugin",
      };

      expect(isValidMigrationStep(step)).toBe(false);
    });

    it("should return false for step with non-string name", () => {
      const step = {
        name: 123,
        plugin: "test-plugin",
        config: { test: true },
      };

      expect(isValidMigrationStep(step)).toBe(false);
    });

    it("should return false for step with non-string plugin", () => {
      const step = {
        name: "Test migration",
        plugin: 123,
        config: { test: true },
      };

      expect(isValidMigrationStep(step)).toBe(false);
    });
  });

  describe("validateConfig", () => {
    it("should validate and return valid config", () => {
      const validConfig = {
        include: ["**/*.css"],
        migrations: [
          {
            name: "Test migration",
            plugin: "test-plugin",
            config: { test: true },
          },
        ],
      };

      const result = validateConfig(validConfig);
      expect(result).toEqual(validConfig);
    });

    it("should validate config with exclude patterns", () => {
      const config = {
        include: ["**/*.css"],
        exclude: ["**/node_modules/**"],
        migrations: [
          {
            name: "Test migration",
            plugin: "test-plugin",
            config: { test: true },
          },
        ],
      };

      const result = validateConfig(config);
      expect(result).toEqual(config);
    });

    it("should throw error for null config", () => {
      expect(() => validateConfig(null)).toThrow(
        "configuration must be an object"
      );
    });

    it("should throw error for non-object config", () => {
      expect(() => validateConfig("string")).toThrow(
        "configuration must be an object"
      );
    });

    it("should throw error for missing include field", () => {
      const config = {
        migrations: [],
      };

      expect(() => validateConfig(config)).toThrow(
        "missing required field: 'include'"
      );
    });

    it("should throw error for missing migrations field", () => {
      const config = {
        include: ["**/*.css"],
      };

      expect(() => validateConfig(config)).toThrow(
        "missing required field: 'migrations'"
      );
    });

    it("should throw error for non-array include", () => {
      const config = {
        include: "not-an-array",
        migrations: [],
      };

      expect(() => validateConfig(config)).toThrow(
        "field 'include' must be an array"
      );
    });

    it("should throw error for non-array migrations", () => {
      const config = {
        include: ["**/*.css"],
        migrations: "not-an-array",
      };

      expect(() => validateConfig(config)).toThrow(
        "field 'migrations' must be an array"
      );
    });

    it("should throw error for empty include array", () => {
      const config = {
        include: [],
        migrations: [],
      };

      expect(() => validateConfig(config)).toThrow(
        "field 'include' cannot be empty"
      );
    });

    it("should throw error for empty migrations array", () => {
      const config = {
        include: ["**/*.css"],
        migrations: [],
      };

      expect(() => validateConfig(config)).toThrow(
        "field 'migrations' cannot be empty"
      );
    });

    it("should throw error for non-array exclude", () => {
      const config = {
        include: ["**/*.css"],
        exclude: "not-an-array",
        migrations: [
          {
            name: "Test migration",
            plugin: "test-plugin",
            config: { test: true },
          },
        ],
      };

      expect(() => validateConfig(config)).toThrow(
        "field 'exclude' must be an array"
      );
    });

    it("should validate migration steps", () => {
      const config = {
        include: ["**/*.css"],
        migrations: [
          {
            name: "Test migration",
            plugin: "test-plugin",
            config: { test: true },
          },
        ],
      };

      const result = validateConfig(config);
      expect(result).toEqual(config);
    });

    it("should throw error for invalid migration step", () => {
      const config = {
        include: ["**/*.css"],
        migrations: [
          {
            name: "Test migration",
            // missing plugin and config
          },
        ],
      };

      expect(() => validateConfig(config)).toThrow("migration step at index 0");
    });

    it("should throw error for migration step with empty name", () => {
      const config = {
        include: ["**/*.css"],
        migrations: [
          {
            name: "",
            plugin: "test-plugin",
            config: { test: true },
          },
        ],
      };

      expect(() => validateConfig(config)).toThrow(
        "field 'name' cannot be empty"
      );
    });

    it("should throw error for migration step with empty plugin", () => {
      const config = {
        include: ["**/*.css"],
        migrations: [
          {
            name: "Test migration",
            plugin: "",
            config: { test: true },
          },
        ],
      };

      expect(() => validateConfig(config)).toThrow(
        "field 'plugin' cannot be empty"
      );
    });

    it("should throw error for migration step with non-object config", () => {
      const config = {
        include: ["**/*.css"],
        migrations: [
          {
            name: "Test migration",
            plugin: "test-plugin",
            config: "not-an-object",
          },
        ],
      };

      expect(() => validateConfig(config)).toThrow(
        "field 'config' must be an object"
      );
    });

    it("should throw error for migration step that is not an object", () => {
      const config = {
        include: ["**/*.css"],
        migrations: ["not-an-object"],
      };

      expect(() => validateConfig(config)).toThrow(
        "migration step at index 0: must be an object"
      );
    });

    it("should throw error for migration step with null config", () => {
      const config = {
        include: ["**/*.css"],
        migrations: [
          {
            name: "Test migration",
            plugin: "test-plugin",
            config: null,
          },
        ],
      };

      expect(() => validateConfig(config)).toThrow(
        "field 'config' must be an object"
      );
    });

    it("should handle multiple migration step errors", () => {
      const config = {
        include: ["**/*.css"],
        migrations: [
          {
            name: "Valid migration",
            plugin: "test-plugin",
            config: { test: true },
          },
          {
            name: "",
            plugin: "test-plugin",
            config: { test: true },
          },
          {
            name: "Another migration",
            plugin: "",
            config: { test: true },
          },
        ],
      };

      expect(() => validateConfig(config)).toThrow("migration step at index 1");
      expect(() => validateConfig(config)).toThrow("migration step at index 2");
    });

    it("should handle complex error messages", () => {
      const config = {
        include: "not-an-array",
        migrations: "not-an-array",
      };

      expect(() => validateConfig(config)).toThrow("Invalid configuration:");
      expect(() => validateConfig(config)).toThrow(
        "field 'include' must be an array"
      );
      expect(() => validateConfig(config)).toThrow(
        "field 'migrations' must be an array"
      );
    });
  });
});
