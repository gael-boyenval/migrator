import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { FileDiscovery } from "./file-discovery";
import { discoverFiles, matchesPattern, isExcluded } from "../utils/glob-utils";
import { MigratorConfig } from "../types";

// Mock glob-utils
vi.mock("../utils/glob-utils");

const mockDiscoverFiles = vi.mocked(discoverFiles);
const mockMatchesPattern = vi.mocked(matchesPattern);
const mockIsExcluded = vi.mocked(isExcluded);

describe("FileDiscovery", () => {
  let fileDiscovery: FileDiscovery;

  beforeEach(() => {
    vi.clearAllMocks();
    fileDiscovery = new FileDiscovery();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("discoverFiles", () => {
    const mockConfig: MigratorConfig = {
      include: ["**/*.css", "**/*.scss"],
      exclude: ["**/node_modules/**", "**/dist/**"],
      migrations: [],
    };

    it("should discover files successfully", async () => {
      const mockFiles = ["file1.css", "file2.scss", "file3.css"];
      mockDiscoverFiles.mockResolvedValue({
        success: true,
        data: mockFiles,
      });

      const result = await fileDiscovery.discoverFiles(mockConfig);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockFiles);
      expect(mockDiscoverFiles).toHaveBeenCalledWith(
        ["**/*.css", "**/*.scss"],
        ["**/node_modules/**", "**/dist/**"]
      );
    });

    it("should handle empty exclude patterns", async () => {
      const configWithoutExclude: MigratorConfig = {
        include: ["**/*.css"],
        migrations: [],
      };

      const mockFiles = ["file1.css", "file2.css"];
      mockDiscoverFiles.mockResolvedValue({
        success: true,
        data: mockFiles,
      });

      const result = await fileDiscovery.discoverFiles(configWithoutExclude);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockFiles);
      expect(mockDiscoverFiles).toHaveBeenCalledWith(["**/*.css"], []);
    });

    it("should handle discoverFiles errors", async () => {
      const error = new Error("Glob pattern error");
      mockDiscoverFiles.mockResolvedValue({
        success: false,
        error,
      });

      const result = await fileDiscovery.discoverFiles(mockConfig);

      expect(result.success).toBe(false);
      expect(result.error).toBe(error);
    });

    it("should handle discoverFiles exceptions", async () => {
      const error = new Error("Unexpected error");
      mockDiscoverFiles.mockRejectedValue(error);

      const result = await fileDiscovery.discoverFiles(mockConfig);

      expect(result.success).toBe(false);
      expect(result.error).toBe(error);
    });

    it("should handle empty file list", async () => {
      mockDiscoverFiles.mockResolvedValue({
        success: true,
        data: [],
      });

      const result = await fileDiscovery.discoverFiles(mockConfig);

      expect(result.success).toBe(true);
      expect(result.data).toEqual([]);
    });

    it("should handle undefined exclude patterns", async () => {
      const configWithUndefinedExclude: MigratorConfig = {
        include: ["**/*.css"],
        exclude: undefined,
        migrations: [],
      };

      const mockFiles = ["file1.css"];
      mockDiscoverFiles.mockResolvedValue({
        success: true,
        data: mockFiles,
      });

      const result = await fileDiscovery.discoverFiles(
        configWithUndefinedExclude
      );

      expect(result.success).toBe(true);
      expect(mockDiscoverFiles).toHaveBeenCalledWith(["**/*.css"], []);
    });
  });

  describe("matchesPattern", () => {
    it("should delegate to glob-utils matchesPattern", () => {
      const filePath = "test.css";
      const patterns = ["**/*.css", "**/*.scss"];

      mockMatchesPattern.mockReturnValue(true);

      const result = fileDiscovery.matchesPattern(filePath, patterns);

      expect(result).toBe(true);
      expect(mockMatchesPattern).toHaveBeenCalledWith(filePath, patterns);
    });

    it("should return false when pattern doesn't match", () => {
      const filePath = "test.js";
      const patterns = ["**/*.css", "**/*.scss"];

      mockMatchesPattern.mockReturnValue(false);

      const result = fileDiscovery.matchesPattern(filePath, patterns);

      expect(result).toBe(false);
      expect(mockMatchesPattern).toHaveBeenCalledWith(filePath, patterns);
    });

    it("should handle empty patterns array", () => {
      const filePath = "test.css";
      const patterns: string[] = [];

      mockMatchesPattern.mockReturnValue(false);

      const result = fileDiscovery.matchesPattern(filePath, patterns);

      expect(result).toBe(false);
      expect(mockMatchesPattern).toHaveBeenCalledWith(filePath, patterns);
    });

    it("should handle single pattern", () => {
      const filePath = "test.css";
      const patterns = ["**/*.css"];

      mockMatchesPattern.mockReturnValue(true);

      const result = fileDiscovery.matchesPattern(filePath, patterns);

      expect(result).toBe(true);
      expect(mockMatchesPattern).toHaveBeenCalledWith(filePath, patterns);
    });
  });

  describe("isExcluded", () => {
    it("should delegate to glob-utils isExcluded", () => {
      const filePath = "node_modules/test.css";
      const patterns = ["**/node_modules/**", "**/dist/**"];

      mockIsExcluded.mockReturnValue(true);

      const result = fileDiscovery.isExcluded(filePath, patterns);

      expect(result).toBe(true);
      expect(mockIsExcluded).toHaveBeenCalledWith(filePath, patterns);
    });

    it("should return false when file is not excluded", () => {
      const filePath = "src/test.css";
      const patterns = ["**/node_modules/**", "**/dist/**"];

      mockIsExcluded.mockReturnValue(false);

      const result = fileDiscovery.isExcluded(filePath, patterns);

      expect(result).toBe(false);
      expect(mockIsExcluded).toHaveBeenCalledWith(filePath, patterns);
    });

    it("should handle empty exclude patterns", () => {
      const filePath = "test.css";
      const patterns: string[] = [];

      mockIsExcluded.mockReturnValue(false);

      const result = fileDiscovery.isExcluded(filePath, patterns);

      expect(result).toBe(false);
      expect(mockIsExcluded).toHaveBeenCalledWith(filePath, patterns);
    });

    it("should handle single exclude pattern", () => {
      const filePath = "dist/test.css";
      const patterns = ["**/dist/**"];

      mockIsExcluded.mockReturnValue(true);

      const result = fileDiscovery.isExcluded(filePath, patterns);

      expect(result).toBe(true);
      expect(mockIsExcluded).toHaveBeenCalledWith(filePath, patterns);
    });
  });

  describe("error handling", () => {
    it("should handle null config", async () => {
      const result = await fileDiscovery.discoverFiles(null as any);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it("should handle undefined config", async () => {
      const result = await fileDiscovery.discoverFiles(undefined as any);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it("should handle config with null include", async () => {
      const config = {
        include: null,
        migrations: [],
      } as any;

      const result = await fileDiscovery.discoverFiles(config);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it("should handle config with undefined include", async () => {
      const config = {
        include: undefined,
        migrations: [],
      } as any;

      const result = await fileDiscovery.discoverFiles(config);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe("integration scenarios", () => {
    it("should handle complex include/exclude patterns", async () => {
      const complexConfig: MigratorConfig = {
        include: [
          "src/**/*.css",
          "src/**/*.scss",
          "src/**/*.sass",
          "!src/**/*.min.css",
        ],
        exclude: [
          "**/node_modules/**",
          "**/dist/**",
          "**/build/**",
          "**/*.test.css",
        ],
        migrations: [],
      };

      const mockFiles = [
        "src/components/button.css",
        "src/components/button.scss",
        "src/styles/main.sass",
      ];

      mockDiscoverFiles.mockResolvedValue({
        success: true,
        data: mockFiles,
      });

      const result = await fileDiscovery.discoverFiles(complexConfig);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockFiles);
      expect(mockDiscoverFiles).toHaveBeenCalledWith(
        complexConfig.include,
        complexConfig.exclude
      );
    });

    it("should handle no files found scenario", async () => {
      const config: MigratorConfig = {
        include: ["**/*.nonexistent"],
        exclude: [],
        migrations: [],
      };

      mockDiscoverFiles.mockResolvedValue({
        success: true,
        data: [],
      });

      const result = await fileDiscovery.discoverFiles(config);

      expect(result.success).toBe(true);
      expect(result.data).toEqual([]);
    });
  });
});
