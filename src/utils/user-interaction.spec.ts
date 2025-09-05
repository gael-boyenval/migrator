import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  askUserForChoice,
  askUserForConfirmation,
  askUserForInput,
  isInteractive,
} from "./user-interaction";

// Mock readline
const mockQuestion = vi.fn();
const mockClose = vi.fn();

vi.mock("readline", () => ({
  createInterface: vi.fn(() => ({
    question: mockQuestion,
    close: mockClose,
  })),
}));

describe("User Interaction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock process.stdin.isTTY to be true for interactive tests
    Object.defineProperty(process.stdin, "isTTY", {
      value: true,
      writable: true,
    });
    // Mock process.env.CI to be undefined
    delete process.env["CI"];
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("askUserForChoice", () => {
    it("should return selected option value", async () => {
      const options = {
        question: "Choose an option:",
        options: [
          { value: "option1", label: "Option 1" },
          { value: "option2", label: "Option 2" },
        ],
      };

      // Mock user input
      mockQuestion.mockImplementation((prompt, callback) => {
        callback("1");
      });

      const result = await askUserForChoice(options);

      expect(result).toBe("option1");
      expect(mockClose).toHaveBeenCalled();
    });

    it("should handle skip option", async () => {
      const options = {
        question: "Choose an option:",
        options: [{ value: "option1", label: "Option 1" }],
        allowSkip: true,
      };

      // Mock user input
      mockQuestion.mockImplementation((prompt, callback) => {
        callback("0");
      });

      const result = await askUserForChoice(options);

      expect(result).toBe(null);
      expect(mockClose).toHaveBeenCalled();
    });

    it("should handle non-interactive mode", async () => {
      // Mock non-interactive environment
      Object.defineProperty(process.stdin, "isTTY", {
        value: false,
        writable: true,
      });

      const options = {
        question: "Choose an option:",
        options: [
          { value: "option1", label: "Option 1" },
          { value: "option2", label: "Option 2" },
        ],
      };

      const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

      const result = await askUserForChoice(options);

      expect(result).toBe("option1");
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining("ℹ️"),
        "Question: Choose an option:"
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining("ℹ️"),
        "Available options:"
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining("ℹ️"),
        "Auto-selecting first option: option1"
      );

      consoleSpy.mockRestore();
    });
  });

  describe("askUserForConfirmation", () => {
    it("should return true for 'y' input", async () => {
      mockQuestion.mockImplementation((prompt, callback) => {
        callback("y");
      });

      const result = await askUserForConfirmation("Continue?");

      expect(result).toBe(true);
      expect(mockClose).toHaveBeenCalled();
    });

    it("should return true for 'yes' input", async () => {
      mockQuestion.mockImplementation((prompt, callback) => {
        callback("yes");
      });

      const result = await askUserForConfirmation("Continue?");

      expect(result).toBe(true);
    });

    it("should return false for 'n' input", async () => {
      mockQuestion.mockImplementation((prompt, callback) => {
        callback("n");
      });

      const result = await askUserForConfirmation("Continue?");

      expect(result).toBe(false);
    });

    it("should handle non-interactive mode", async () => {
      Object.defineProperty(process.stdin, "isTTY", {
        value: false,
        writable: true,
      });

      const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

      const result = await askUserForConfirmation("Continue?");

      expect(result).toBe(true);
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining("ℹ️"),
        "Continue?"
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining("ℹ️"),
        "Auto-confirming: Yes"
      );

      consoleSpy.mockRestore();
    });
  });

  describe("askUserForInput", () => {
    it("should return user input", async () => {
      mockQuestion.mockImplementation((prompt, callback) => {
        callback("user input");
      });

      const result = await askUserForInput("Enter text:");

      expect(result).toBe("user input");
      expect(mockClose).toHaveBeenCalled();
    });

    it("should return default value when input is empty", async () => {
      mockQuestion.mockImplementation((prompt, callback) => {
        callback("");
      });

      const result = await askUserForInput("Enter text:", "default");

      expect(result).toBe("default");
    });

    it("should handle non-interactive mode", async () => {
      Object.defineProperty(process.stdin, "isTTY", {
        value: false,
        writable: true,
      });

      const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

      const result = await askUserForInput("Enter text:", "default");

      expect(result).toBe("default");
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining("ℹ️"),
        "Enter text:"
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining("ℹ️"),
        "Auto-using default: default"
      );

      consoleSpy.mockRestore();
    });
  });

  describe("isInteractive", () => {
    it("should return true in interactive environment", () => {
      Object.defineProperty(process.stdin, "isTTY", {
        value: true,
        writable: true,
      });
      delete process.env["CI"];

      expect(isInteractive()).toBe(true);
    });

    it("should return false when CI is set", () => {
      Object.defineProperty(process.stdin, "isTTY", {
        value: true,
        writable: true,
      });
      process.env["CI"] = "true";

      expect(isInteractive()).toBe(false);
    });

    it("should return false when not TTY", () => {
      Object.defineProperty(process.stdin, "isTTY", {
        value: false,
        writable: true,
      });
      delete process.env["CI"];

      expect(isInteractive()).toBe(false);
    });
  });
});
