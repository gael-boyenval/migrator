import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import * as fs from "fs";
import { readFile, writeFile, fileExists, escapeRegExp } from "./file-utils";

// Mock fs module
vi.mock("fs");

describe("file-utils", () => {
  const mockFs = vi.mocked(fs);

  describe("readFile", () => {
    it("should return success when file exists", () => {
      const content = "test content";
      mockFs.readFileSync.mockReturnValue(content);

      const result = readFile("test.txt");

      expect(result.success).toBe(true);
      expect(result.data).toBe(content);
      expect(mockFs.readFileSync).toHaveBeenCalledWith("test.txt", "utf8");
    });

    it("should return error when file does not exist", () => {
      const error = new Error("ENOENT: no such file or directory");
      mockFs.readFileSync.mockImplementation(() => {
        throw error;
      });

      const result = readFile("nonexistent.txt");

      expect(result.success).toBe(false);
      expect(result.error).toBe(error);
    });
  });

  describe("writeFile", () => {
    it("should return success when write succeeds", () => {
      mockFs.writeFileSync.mockImplementation(() => {});

      const result = writeFile("test.txt", "content");

      expect(result.success).toBe(true);
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        "test.txt",
        "content",
        "utf8"
      );
    });

    it("should return error when write fails", () => {
      const error = new Error("Permission denied");
      mockFs.writeFileSync.mockImplementation(() => {
        throw error;
      });

      const result = writeFile("test.txt", "content");

      expect(result.success).toBe(false);
      expect(result.error).toBe(error);
    });
  });

  describe("fileExists", () => {
    it("should return true when file exists", () => {
      mockFs.existsSync.mockReturnValue(true);

      const result = fileExists("test.txt");

      expect(result).toBe(true);
      expect(mockFs.existsSync).toHaveBeenCalledWith("test.txt");
    });

    it("should return false when file does not exist", () => {
      mockFs.existsSync.mockReturnValue(false);

      const result = fileExists("nonexistent.txt");

      expect(result).toBe(false);
    });
  });

  describe("escapeRegExp", () => {
    it("should escape special regex characters", () => {
      expect(escapeRegExp("test.string")).toBe("test\\.string");
      expect(escapeRegExp("test*string")).toBe("test\\*string");
      expect(escapeRegExp("test+string")).toBe("test\\+string");
      expect(escapeRegExp("test?string")).toBe("test\\?string");
      expect(escapeRegExp("test^string")).toBe("test\\^string");
      expect(escapeRegExp("test$string")).toBe("test\\$string");
      expect(escapeRegExp("test{string}")).toBe("test\\{string\\}");
      expect(escapeRegExp("test(string)")).toBe("test\\(string\\)");
      expect(escapeRegExp("test[string]")).toBe("test\\[string\\]");
      expect(escapeRegExp("test|string")).toBe("test\\|string");
      expect(escapeRegExp("test\\string")).toBe("test\\\\string");
    });

    it("should not escape regular characters", () => {
      expect(escapeRegExp("teststring")).toBe("teststring");
      expect(escapeRegExp("test-string")).toBe("test-string");
      expect(escapeRegExp("test_string")).toBe("test_string");
    });
  });
});
