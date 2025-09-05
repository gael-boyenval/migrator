import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { ConsoleLogger } from "./logger";

describe("ConsoleLogger", () => {
  let logger: ConsoleLogger;
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    logger = new ConsoleLogger();
    consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  describe("when verbose mode is disabled", () => {
    it("should log info messages", () => {
      logger.info("Test message");
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining("ℹ️"),
        "Test message"
      );
    });

    it("should log warn messages", () => {
      logger.warn("Warning message");
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining("⚠️"),
        "Warning message"
      );
    });

    it("should log error messages", () => {
      logger.error("Error message");
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining("❌"),
        "Error message"
      );
    });

    it("should not log debug messages", () => {
      logger.debug("Debug message");
      expect(consoleSpy).not.toHaveBeenCalled();
    });

    it("should not log verbose messages", () => {
      logger.verbose("Verbose message");
      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });

  describe("when verbose mode is enabled", () => {
    beforeEach(() => {
      logger = new ConsoleLogger(true);
    });

    it("should log debug messages", () => {
      logger.debug("Debug message");
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining("🐛"),
        "Debug message"
      );
    });

    it("should log verbose messages", () => {
      logger.verbose("Verbose message");
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining("🐛"),
        "Verbose message"
      );
    });
  });
});
