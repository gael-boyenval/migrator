import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { MigrationEngine } from "./migration-engine";
import { PluginRegistry } from "./registry";
import { ConsoleLogger } from "../utils/logger";
import { readFile, writeFile } from "../utils/file-utils";
import {
  parseCSS,
  findProperties,
  replacePropertyValue,
} from "../utils/css-parser";
import {
  askUserForChoice,
  askUserForConfirmation,
  askUserForInput,
  isInteractive,
} from "../utils/user-interaction";
import { MigratorConfig, Change } from "../types";

// Mock dependencies
vi.mock("../utils/file-utils");
vi.mock("../utils/css-parser");
vi.mock("../utils/user-interaction");

const mockReadFile = vi.mocked(readFile);
const mockWriteFile = vi.mocked(writeFile);
const mockParseCSS = vi.mocked(parseCSS);
const mockFindProperties = vi.mocked(findProperties);
const mockReplacePropertyValue = vi.mocked(replacePropertyValue);
const mockAskUserForChoice = vi.mocked(askUserForChoice);
const mockAskUserForConfirmation = vi.mocked(askUserForConfirmation);
const mockAskUserForInput = vi.mocked(askUserForInput);
const mockIsInteractive = vi.mocked(isInteractive);

describe("MigrationEngine", () => {
  let migrationEngine: MigrationEngine;
  let mockPluginRegistry: PluginRegistry;
  let mockLogger: ConsoleLogger;

  beforeEach(() => {
    vi.clearAllMocks();

    mockPluginRegistry = {
      get: vi.fn(),
      registerPlugin: vi.fn(),
      getAllPlugins: vi.fn(),
    } as any;

    mockLogger = {
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
      debug: vi.fn(),
      verbose: vi.fn(),
      logChange: vi.fn(),
    } as any;

    // Mock the utility functions
    mockParseCSS.mockReturnValue([]);
    mockFindProperties.mockReturnValue([]);
    mockReplacePropertyValue.mockReturnValue("replaced");
    mockAskUserForChoice.mockResolvedValue("choice");
    mockAskUserForConfirmation.mockResolvedValue(true);
    mockAskUserForInput.mockResolvedValue("input");
    mockIsInteractive.mockReturnValue(true);

    migrationEngine = new MigrationEngine(
      mockPluginRegistry,
      mockLogger,
      false,
      false
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("constructor", () => {
    it("should initialize with default parameters", () => {
      const engine = new MigrationEngine(mockPluginRegistry, mockLogger);
      expect(engine).toBeDefined();
    });

    it("should initialize with custom parameters", () => {
      const engine = new MigrationEngine(
        mockPluginRegistry,
        mockLogger,
        true,
        true
      );
      expect(engine).toBeDefined();
    });
  });

  describe("processFiles", () => {
    const mockConfig: MigratorConfig = {
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

    const mockPlugin = {
      name: "test-plugin",
      process: vi.fn(),
    };

    beforeEach(() => {
      mockPluginRegistry.get = vi.fn().mockReturnValue(mockPlugin);
      mockPlugin.process = vi.fn().mockResolvedValue({
        success: true,
        changes: [],
        newContent: "new content",
      });
    });

    it("should process files successfully", async () => {
      const filePaths = ["test1.css", "test2.css"];
      mockReadFile.mockReturnValue({ success: true, data: "file content" });

      const result = await migrationEngine.processFiles(filePaths, mockConfig);

      expect(result).toHaveLength(2);
      expect(mockReadFile).toHaveBeenCalledTimes(2);
      expect(mockPlugin.process).toHaveBeenCalledTimes(2);
    });

    it("should handle file read errors", async () => {
      const filePaths = ["test1.css"];
      const error = new Error("File read error");
      mockReadFile.mockReturnValue({ success: false, error });

      const result = await migrationEngine.processFiles(filePaths, mockConfig);

      expect(result).toHaveLength(1);
      expect(result[0].success).toBe(false);
      expect(result[0].error).toBe(error.message);
    });

    it("should handle plugin processing errors", async () => {
      const filePaths = ["test1.css"];
      mockReadFile.mockReturnValue({ success: true, data: "file content" });
      const error = new Error("Plugin error");
      mockPlugin.process.mockRejectedValue(error);

      const result = await migrationEngine.processFiles(filePaths, mockConfig);

      expect(result).toHaveLength(1);
      expect(result[0].success).toBe(false);
      expect(result[0].error).toBe(error.message);
    });

    it("should skip files when plugin returns null", async () => {
      const filePaths = ["test1.css"];
      mockReadFile.mockReturnValue({ success: true, data: "file content" });
      mockPlugin.process.mockResolvedValue({
        data: "file content",
        changes: [],
      });

      const result = await migrationEngine.processFiles(filePaths, mockConfig);

      expect(result).toHaveLength(1);
      expect(result[0].success).toBe(true);
      expect(result[0].changes).toEqual([]);
    });

    it("should write files when not in dry run mode", async () => {
      const filePaths = ["test1.css"];
      mockReadFile.mockReturnValue({ success: true, data: "old content" });
      mockPlugin.process.mockResolvedValue({
        data: "new content",
        changes: [{ replacement: "new content", original: "old content" }],
      });

      await migrationEngine.processFiles(filePaths, mockConfig);

      expect(mockWriteFile).toHaveBeenCalledWith("test1.css", "new content");
    });

    it("should not write files when in dry run mode", async () => {
      const dryRunEngine = new MigrationEngine(
        mockPluginRegistry,
        mockLogger,
        true,
        false
      );
      const filePaths = ["test1.css"];
      mockReadFile.mockReturnValue({ success: true, data: "old content" });
      mockPlugin.process.mockResolvedValue({
        data: "new content",
        changes: [{ replacement: "new content", original: "old content" }],
      });

      await dryRunEngine.processFiles(filePaths, mockConfig);

      expect(mockWriteFile).not.toHaveBeenCalled();
    });

    it("should track progress correctly", async () => {
      const filePaths = ["test1.css", "test2.css", "test3.css"];
      mockReadFile.mockReturnValue({ success: true, data: "file content" });

      await migrationEngine.processFiles(filePaths, mockConfig);

      // Check that progress info is set correctly
      expect(migrationEngine["migratorUtils"].getProgressInfo).toBeDefined();
      const progressInfo = migrationEngine["migratorUtils"].getProgressInfo?.();
      expect(progressInfo).toBeDefined();
    });
  });

  describe("processFile", () => {
    const mockConfig: MigratorConfig = {
      include: ["**/*.css"],
      migrations: [
        {
          name: "Test migration",
          plugin: "test-plugin",
          config: { test: true },
        },
      ],
    };

    const mockPlugin = {
      name: "test-plugin",
      process: vi.fn(),
    };

    beforeEach(() => {
      mockPluginRegistry.get = vi.fn().mockReturnValue(mockPlugin);
      mockPlugin.process = vi.fn().mockResolvedValue({
        success: true,
        changes: [],
        newContent: "new content",
      });
    });

    it("should process a single file successfully", async () => {
      mockReadFile.mockReturnValue({ success: true, data: "file content" });

      const result = await migrationEngine.processFile("test.css", mockConfig);

      expect(result.success).toBe(true);
      expect(result.changes).toEqual([]);
      expect(mockReadFile).toHaveBeenCalledWith("test.css");
      expect(mockPlugin.process).toHaveBeenCalled();
    });

    it("should handle file read errors", async () => {
      const error = new Error("File read error");
      mockReadFile.mockReturnValue({ success: false, error });

      const result = await migrationEngine.processFile("test.css", mockConfig);

      expect(result.success).toBe(false);
      expect(result.error).toBe(error.message);
    });

    it("should handle plugin not found", async () => {
      mockReadFile.mockReturnValue({ success: true, data: "file content" });
      mockPluginRegistry.get = vi.fn().mockReturnValue(null);

      const result = await migrationEngine.processFile("test.css", mockConfig);

      expect(result.success).toBe(false);
      expect(result.error).toContain("Plugin not found");
    });

    it("should handle plugin processing errors", async () => {
      mockReadFile.mockReturnValue({ success: true, data: "file content" });
      const error = new Error("Plugin error");
      mockPlugin.process.mockRejectedValue(error);

      const result = await migrationEngine.processFile("test.css", mockConfig);

      expect(result.success).toBe(false);
      expect(result.error).toBe(error.message);
    });

    it("should pass correct context to plugin", async () => {
      mockReadFile.mockReturnValue({ success: true, data: "file content" });
      mockIsInteractive.mockReturnValue(true);

      await migrationEngine.processFile("test.css", mockConfig);

      expect(mockPlugin.process).toHaveBeenCalledWith({
        fileData: "file content",
        filePath: "test.css",
        config: { test: true },
        migratorUtils: expect.any(Object),
        isInteractive: true,
      });
    });

    it("should handle non-interactive mode", async () => {
      const nonInteractiveEngine = new MigrationEngine(
        mockPluginRegistry,
        mockLogger,
        false,
        true
      );
      mockReadFile.mockReturnValue({ success: true, data: "file content" });
      mockIsInteractive.mockReturnValue(false);

      await nonInteractiveEngine.processFile("test.css", mockConfig);

      expect(mockPlugin.process).toHaveBeenCalledWith({
        fileData: "file content",
        filePath: "test.css",
        config: { test: true },
        migratorUtils: expect.any(Object),
        isInteractive: false,
      });
    });
  });

  describe("migratorUtils", () => {
    it("should provide all required utility functions", () => {
      const utils = migrationEngine["migratorUtils"];

      expect(utils.log).toBeDefined();
      expect(utils.askUserForChoice).toBeDefined();
      expect(utils.askUserForConfirmation).toBeDefined();
      expect(utils.askUserForInput).toBeDefined();
      expect(utils.parseCSS).toBeDefined();
      expect(utils.findProperties).toBeDefined();
      expect(utils.replacePropertyValue).toBeDefined();
      // getProgressInfo is added dynamically in processFiles
    });

    it("should delegate log calls to logger", () => {
      const utils = migrationEngine["migratorUtils"];

      utils.log("test message", "info");
      expect(mockLogger.info).toHaveBeenCalledWith("test message");

      utils.log("warning message", "warn");
      expect(mockLogger.warn).toHaveBeenCalledWith("warning message");

      utils.log("error message", "error");
      expect(mockLogger.error).toHaveBeenCalledWith("error message");
    });

    it("should delegate user interaction calls", async () => {
      const utils = migrationEngine["migratorUtils"];

      mockAskUserForChoice.mockResolvedValue("choice");
      mockAskUserForConfirmation.mockResolvedValue(true);
      mockAskUserForInput.mockResolvedValue("input");

      await utils.askUserForChoice({ question: "test", options: [] });
      expect(mockAskUserForChoice).toHaveBeenCalled();

      await utils.askUserForConfirmation("test");
      expect(mockAskUserForConfirmation).toHaveBeenCalled();

      await utils.askUserForInput("test");
      expect(mockAskUserForInput).toHaveBeenCalled();
    });

    it("should delegate CSS parsing calls", () => {
      const utils = migrationEngine["migratorUtils"];

      mockParseCSS.mockReturnValue([]);
      mockFindProperties.mockReturnValue([]);
      mockReplacePropertyValue.mockReturnValue("replaced");

      utils.parseCSS("css");
      expect(mockParseCSS).toHaveBeenCalledWith("css");

      utils.findProperties("css", "prop");
      expect(mockFindProperties).toHaveBeenCalledWith("css", "prop");

      utils.replacePropertyValue("css", {} as any, "new");
      expect(mockReplacePropertyValue).toHaveBeenCalled();
    });
  });

  describe("error handling", () => {
    it("should handle null file paths gracefully", async () => {
      const result = await migrationEngine.processFiles(
        [null as any],
        {} as MigratorConfig
      );
      expect(result).toHaveLength(0); // null file paths are filtered out
    });

    it("should handle empty file paths array", async () => {
      const result = await migrationEngine.processFiles(
        [],
        {} as MigratorConfig
      );
      expect(result).toHaveLength(0);
    });

    it("should handle undefined config", async () => {
      const result = await migrationEngine.processFiles(
        ["test.css"],
        undefined as any
      );
      expect(result).toHaveLength(1);
      expect(result[0].success).toBe(false);
    });
  });
});
