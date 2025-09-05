import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { MigratorConfig } from "../types";
import * as fs from "fs";

// Mock fs module
vi.mock("fs");

// Import ConfigManager
import { ConfigManager } from "./config";

describe("ConfigManager", () => {
  let configManager: ConfigManager;
  let mockFs: any;
  let mockRequire: any;

  beforeEach(() => {
    configManager = new ConfigManager();
    mockFs = vi.mocked(fs);
    mockRequire = vi.fn();
    configManager.setRequireFunction(mockRequire);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("loadConfig", () => {
    it("should return success when config file exists and is valid", async () => {
      const validConfig: MigratorConfig = {
        include: ["**/*.ts"],
        exclude: ["**/*.spec.ts"],
        migrations: [
          {
            name: "test",
            plugin: "simple-replace",
            config: { mappings: {} },
          },
        ],
      };

      mockFs.existsSync.mockReturnValue(true);
      mockRequire.mockReturnValue(validConfig);

      const result = await configManager.loadConfig("test.config.js");

      expect(result.success).toBe(true);
      expect((result as any).data).toEqual(validConfig);
    });

    it("should return error when config file does not exist", async () => {
      mockFs.existsSync.mockReturnValue(false);

      const result = await configManager.loadConfig("nonexistent.config.js");

      expect(result.success).toBe(false);
      expect((result as any).error?.message).toContain(
        "Configuration file not found"
      );
    });

    it("should return error when config is invalid", async () => {
      const invalidConfig = { invalid: "config" };

      mockFs.existsSync.mockReturnValue(true);
      mockRequire.mockReturnValue(invalidConfig);

      const result = await configManager.loadConfig("test.config.js");

      expect(result.success).toBe(false);
      expect((result as any).error?.message).toContain("Invalid configuration");
    });
  });

  describe("createDefaultConfig", () => {
    it("should return a valid default configuration", () => {
      const config = configManager.createDefaultConfig();

      expect(config.include).toEqual(["**/*.*"]);
      expect(config.exclude).toEqual(["**/node_modules/**", "**/dist/**"]);
      expect(config.migrations).toHaveLength(1);
      expect(config.migrations[0].name).toBe("Replace deprecated tokens");
      expect(config.migrations[0].plugin).toBe("simple-replace");
    });
  });

  describe("createConfigFromTemplate", () => {
    it("should return default config for default template", () => {
      const config = configManager.createConfigFromTemplate("default");

      expect(config.include).toEqual(["**/*.*"]);
      expect(config.migrations).toHaveLength(1);
    });

    it("should throw error for unknown template", () => {
      expect(() => {
        configManager.createConfigFromTemplate("unknown");
      }).toThrow("Unknown template: unknown");
    });
  });
});
