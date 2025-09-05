import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { MigratorCLI } from "./cli";
import { ConfigManager } from "./config";
import { FileDiscovery } from "./file-discovery";
import { MigrationEngine } from "./migration-engine";
import { PluginRegistry } from "./registry";
import { ConsoleLogger } from "../utils/logger";
import { CLIOutput } from "../utils/cli-output";
import { fileExists } from "../utils/file-utils";
import { CLIOptions } from "../types";

// Mock dependencies
vi.mock("./config");
vi.mock("./file-discovery");
vi.mock("./migration-engine");
vi.mock("./registry");
vi.mock("../utils/logger");
vi.mock("../utils/cli-output");
vi.mock("../utils/file-utils");

const mockConfigManager = vi.mocked(ConfigManager);
const mockFileDiscovery = vi.mocked(FileDiscovery);
const mockMigrationEngine = vi.mocked(MigrationEngine);
const mockPluginRegistry = vi.mocked(PluginRegistry);
const mockConsoleLogger = vi.mocked(ConsoleLogger);
const mockCLIOutput = vi.mocked(CLIOutput);
const mockFileExists = vi.mocked(fileExists);

describe("MigratorCLI", () => {
  let cli: MigratorCLI;
  let mockConfigManagerInstance: any;
  let mockFileDiscoveryInstance: any;
  let mockMigrationEngineInstance: any;
  let mockPluginRegistryInstance: any;
  let mockLoggerInstance: any;
  let mockCLIOutputInstance: any;

  beforeEach(() => {
    vi.clearAllMocks();

    // Setup mock instances
    mockConfigManagerInstance = {
      loadConfig: vi.fn(),
      createDefaultConfig: vi.fn(),
      createConfigFromTemplate: vi.fn(),
    };

    mockFileDiscoveryInstance = {
      discoverFiles: vi.fn(),
    };

    mockMigrationEngineInstance = {
      processFiles: vi.fn(),
    };

    mockPluginRegistryInstance = {
      getPlugin: vi.fn(),
      registerPlugin: vi.fn(),
      getAllPlugins: vi.fn(),
    };

    mockLoggerInstance = {
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
      debug: vi.fn(),
      verbose: vi.fn(),
      logChange: vi.fn(),
    };

    mockCLIOutputInstance = {
      info: vi.fn(),
      success: vi.fn(),
      error: vi.fn(),
      warning: vi.fn(),
      spinner: vi.fn(),
      stopSpinner: vi.fn(),
      stopSpinnerSuccess: vi.fn(),
      stopSpinnerError: vi.fn(),
      box: vi.fn(),
      divider: vi.fn(),
      displayCodePreview: vi.fn(),
      displayConfigInfo: vi.fn(),
      startSpinner: vi.fn(),
      stopSpinner: vi.fn(),
      stopSpinnerSuccess: vi.fn(),
      stopSpinnerError: vi.fn(),
      displayFileResults: vi.fn(),
      displaySummary: vi.fn(),
      displayCompletion: vi.fn(),
    };

    // Setup constructor mocks
    mockConfigManager.mockImplementation(() => mockConfigManagerInstance);
    mockFileDiscovery.mockImplementation(() => mockFileDiscoveryInstance);
    mockMigrationEngine.mockImplementation(() => mockMigrationEngineInstance);
    mockPluginRegistry.mockImplementation(() => mockPluginRegistryInstance);
    mockConsoleLogger.mockImplementation(() => mockLoggerInstance);
    mockCLIOutput.mockImplementation(() => mockCLIOutputInstance);

    cli = new MigratorCLI();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("constructor", () => {
    it("should initialize all dependencies", () => {
      // The constructor calls the mocked constructors
      expect(mockConfigManager).toHaveBeenCalled();
      expect(mockFileDiscovery).toHaveBeenCalled();
      expect(mockPluginRegistry).toHaveBeenCalled();
      expect(mockConsoleLogger).toHaveBeenCalled();
      expect(mockCLIOutput).toHaveBeenCalled();
      // MigrationEngine is created in migrate method, not constructor
    });
  });

  describe("init", () => {
    it("should throw error if config file already exists", async () => {
      mockFileExists.mockReturnValue(true);

      await expect(cli.init({ config: "existing.config.js" })).rejects.toThrow(
        "Configuration file already exists: existing.config.js"
      );
    });

    it("should create default config when no template specified", async () => {
      mockFileExists.mockReturnValue(false);
      mockConfigManagerInstance.createDefaultConfig.mockReturnValue({
        include: ["**/*.css"],
        migrations: [],
      });

      await cli.init({});

      expect(mockConfigManagerInstance.createDefaultConfig).toHaveBeenCalled();
    });

    it("should create default config when template is specified", async () => {
      mockFileExists.mockReturnValue(false);
      mockConfigManagerInstance.createDefaultConfig.mockReturnValue({
        include: ["**/*.css"],
        migrations: [],
      });

      await cli.init({ template: "default" });

      expect(mockConfigManagerInstance.createDefaultConfig).toHaveBeenCalled();
    });

    it("should create default config for any template", async () => {
      mockFileExists.mockReturnValue(false);
      mockConfigManagerInstance.createDefaultConfig.mockReturnValue({
        include: ["**/*.css"],
        migrations: [],
      });

      await cli.init({ template: "unknown" });

      expect(mockConfigManagerInstance.createDefaultConfig).toHaveBeenCalled();
    });
  });

  describe("migrate", () => {
    const mockConfig = {
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

    const mockFilePaths = ["test1.css", "test2.css"];

    beforeEach(() => {
      mockConfigManagerInstance.loadConfig.mockResolvedValue({
        success: true,
        data: mockConfig,
      });
      mockFileDiscoveryInstance.discoverFiles.mockResolvedValue({
        success: true,
        data: mockFilePaths,
      });
      mockMigrationEngineInstance.processFiles.mockResolvedValue([
        { success: true, changes: 2, error: undefined },
        { success: true, changes: 1, error: undefined },
      ]);
    });

    it("should execute migration successfully", async () => {
      await cli.migrate({ config: "test.config.js" });

      expect(mockConfigManagerInstance.loadConfig).toHaveBeenCalledWith(
        "test.config.js"
      );
      expect(mockFileDiscoveryInstance.discoverFiles).toHaveBeenCalledWith(
        mockConfig
      );
      expect(mockMigrationEngineInstance.processFiles).toHaveBeenCalledWith(
        mockFilePaths,
        mockConfig
      );
    });

    it("should handle config loading errors", async () => {
      mockConfigManagerInstance.loadConfig.mockResolvedValue({
        success: false,
        error: new Error("Config error"),
      });

      await expect(cli.migrate({ config: "test.config.js" })).rejects.toThrow();
    });

    it("should handle file discovery errors", async () => {
      mockFileDiscoveryInstance.discoverFiles.mockResolvedValue({
        success: false,
        error: new Error("File discovery error"),
      });

      await expect(cli.migrate({ config: "test.config.js" })).rejects.toThrow();
    });

    it("should handle migration engine errors", async () => {
      mockMigrationEngineInstance.processFiles.mockRejectedValue(
        new Error("Migration error")
      );

      await expect(cli.migrate({ config: "test.config.js" })).rejects.toThrow(
        "Migration error"
      );
    });

    it("should use default config path when not specified", async () => {
      await cli.migrate({});

      expect(mockConfigManagerInstance.loadConfig).toHaveBeenCalledWith(
        "migrator.config.js"
      );
    });

    it("should pass dry run flag to migration engine", async () => {
      await cli.migrate({ config: "test.config.js", dryRun: true });

      expect(mockMigrationEngine).toHaveBeenCalledWith(
        mockPluginRegistryInstance,
        mockLoggerInstance,
        true,
        false
      );
    });

    it("should pass no interactive flag to migration engine", async () => {
      await cli.migrate({ config: "test.config.js", noInteractive: true });

      expect(mockMigrationEngine).toHaveBeenCalledWith(
        mockPluginRegistryInstance,
        mockLoggerInstance,
        false,
        true
      );
    });

    it("should handle batch processing", async () => {
      await cli.migrate({ config: "test.config.js", batch: "2-1" });

      expect(mockMigrationEngineInstance.processFiles).toHaveBeenCalledWith(
        ["test1.css", "test2.css"],
        mockConfig
      );
    });

    it("should handle invalid batch format", async () => {
      await expect(
        cli.migrate({ config: "test.config.js", batch: "invalid" })
      ).rejects.toThrow();
    });

    it("should handle batch out of range", async () => {
      await expect(
        cli.migrate({ config: "test.config.js", batch: "10-2" })
      ).rejects.toThrow();
    });

    it("should display migration summary", async () => {
      await cli.migrate({ config: "test.config.js" });

      expect(mockCLIOutputInstance.success).toHaveBeenCalledWith(
        "Processing completed!"
      );
    });

    it("should display file processing results", async () => {
      await cli.migrate({ config: "test.config.js" });

      expect(mockCLIOutputInstance.info).toHaveBeenCalledWith(
        "Processing 2 files..."
      );
    });
  });

  describe("parseBatchRange", () => {
    it("should parse valid batch range", () => {
      const result = cli["parseBatchRange"]("50-1", 100);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.startIndex).toBe(0);
        expect(result.data.endIndex).toBe(50);
      }
    });

    it("should parse second batch", () => {
      const result = cli["parseBatchRange"]("50-2", 100);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.startIndex).toBe(50);
        expect(result.data.endIndex).toBe(100);
      }
    });

    it("should handle invalid format", () => {
      const result = cli["parseBatchRange"]("invalid", 100);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain("Invalid batch format");
      }
    });

    it("should handle negative batch size", () => {
      const result = cli["parseBatchRange"]("-1-1", 100);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain("Invalid batch format");
      }
    });

    it("should handle batch out of range", () => {
      const result = cli["parseBatchRange"]("50-3", 100);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain("Batch 3 is out of range");
      }
    });

    it("should cap end index to total files", () => {
      const result = cli["parseBatchRange"]("50-1", 30);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.endIndex).toBe(30);
      }
    });
  });

  describe("error handling", () => {
    it("should handle undefined options", async () => {
      await expect(cli.migrate(undefined as any)).rejects.toThrow();
    });

    it("should handle null options", async () => {
      await expect(cli.migrate(null as any)).rejects.toThrow();
    });
  });
});
