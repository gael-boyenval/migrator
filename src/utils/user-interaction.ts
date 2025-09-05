import * as readline from "readline";
import chalk from "chalk";
import { CLIOutput } from "./cli-output";

export interface ChoiceOption {
  value: string;
  label: string;
  description?: string;
}

export interface ChoiceOptions {
  question: string;
  options: ChoiceOption[];
  allowSkip?: boolean;
  codePreview?: {
    filePath: string;
    lineNumber: number;
    beforeLines: string[];
    changeLine: string;
    afterLines: string[];
    highlightStart: number;
    highlightEnd: number;
  };
  progressInfo?: {
    currentFile: number;
    totalFiles: number;
    currentFileName: string;
  };
}

// Create readline interface
const createReadlineInterface = (): readline.Interface => {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
};

// Prompt user for choice from multiple options
export const askUserForChoice = async (
  options: ChoiceOptions
): Promise<string | null> => {
  const cliOutput = new CLIOutput();

  // Check if we're in a non-interactive environment
  if (!process.stdin.isTTY || process.env["CI"] === "true") {
    cliOutput.info(`Question: ${options.question}`);
    cliOutput.info("Available options:");
    options.options.forEach((option, index) => {
      console.log(`  ${index + 1}. ${option.label}`);
      if (option.description) {
        console.log(`     ${option.description}`);
      }
    });
    if (options.allowSkip) {
      console.log(`  0. Skip`);
    }
    cliOutput.info(
      `Auto-selecting first option: ${options.options[0]?.value || "none"}`
    );
    return options.options[0]?.value || null;
  }

  return new Promise((resolve) => {
    const rl = createReadlineInterface();

    // Create a beautiful choice display
    cliOutput.box(options.question, {
      title: "🤔 User Choice Required",
      borderColor: "blue",
      borderStyle: "round",
    });

    // Display code preview if available
    if (options.codePreview) {
      cliOutput.displayCodePreview(options.codePreview);
    }

    console.log("Available options:");
    console.log();

    options.options.forEach((option, index) => {
      const isDefault = index === 0; // First option is default
      const defaultMarker = isDefault ? " (default)" : "";
      console.log(
        `  ${cliOutput.colorizeNumber(index + 1)}. ${
          option.label
        }${defaultMarker}`
      );
      if (option.description) {
        console.log(
          `     ${cliOutput.colorizeDescription(option.description)}`
        );
      }
    });

    if (options.allowSkip) {
      console.log(
        `  ${cliOutput.colorizeNumber(0)}. ${cliOutput.colorizeSkip("Skip")}`
      );
    }

    console.log();

    const askQuestion = (): void => {
      // Display progress indicator if provided
      if (options.progressInfo) {
        const { currentFile, totalFiles, currentFileName } =
          options.progressInfo;
        console.log();
        cliOutput.info(
          `Progress: [${currentFile}/${totalFiles}] Processing ${currentFileName}`
        );
        console.log();
      }

      const defaultChoice = 1; // First option is default
      const prompt = options.allowSkip
        ? `${cliOutput.colorizePrompt(
            "Enter your choice"
          )} (0 to skip, Enter for default): `
        : `${cliOutput.colorizePrompt(
            "Enter your choice"
          )} (Enter for default): `;
      rl.question(prompt, (answer) => {
        const trimmedAnswer = answer.trim();

        // If empty input, use default
        if (trimmedAnswer === "") {
          const selectedOption = options.options[defaultChoice - 1];
          if (selectedOption) {
            cliOutput.success(`Selected: ${selectedOption.label} (default)`);
            rl.close();
            resolve(selectedOption.value);
            return;
          }
        }

        const choice = parseInt(trimmedAnswer);

        if (isNaN(choice)) {
          cliOutput.warning("Please enter a valid number.");
          askQuestion();
          return;
        }

        if (choice === 0 && options.allowSkip) {
          cliOutput.info("Skipped by user choice.");
          rl.close();
          resolve(null);
          return;
        }

        if (choice < 1 || choice > options.options.length) {
          cliOutput.warning(
            `Please enter a number between 1 and ${options.options.length}${
              options.allowSkip ? " (or 0 to skip)" : ""
            }.`
          );
          askQuestion();
          return;
        }

        const selectedOption = options.options[choice - 1];
        if (selectedOption) {
          cliOutput.success(`Selected: ${selectedOption.label}`);
          rl.close();
          resolve(selectedOption.value);
        } else {
          cliOutput.error("Invalid selection.");
          askQuestion();
        }
      });
    };

    askQuestion();
  });
};

// Prompt user for confirmation
export const askUserForConfirmation = async (
  message: string
): Promise<boolean> => {
  const cliOutput = new CLIOutput();

  // Check if we're in a non-interactive environment
  if (!process.stdin.isTTY || process.env["CI"] === "true") {
    cliOutput.info(message);
    cliOutput.info("Auto-confirming: Yes");
    return true;
  }

  return new Promise((resolve) => {
    const rl = createReadlineInterface();

    // Create a beautiful confirmation display
    cliOutput.box(message, {
      title: "❓ Confirmation Required",
      borderColor: "yellow",
      borderStyle: "round",
    });

    const prompt = `${cliOutput.colorizePrompt("Confirm")} (y/N): `;
    rl.question(prompt, (answer) => {
      const normalizedAnswer = answer.trim().toLowerCase();
      const confirmed = normalizedAnswer === "y" || normalizedAnswer === "yes";

      if (confirmed) {
        cliOutput.success("Confirmed: Yes");
      } else {
        cliOutput.info("Confirmed: No");
      }
      rl.close();
      resolve(confirmed);
    });
  });
};

// Prompt user for text input
export const askUserForInput = async (
  prompt: string,
  defaultValue?: string
): Promise<string> => {
  const cliOutput = new CLIOutput();

  // Check if we're in a non-interactive environment
  if (!process.stdin.isTTY || process.env["CI"] === "true") {
    cliOutput.info(prompt);
    if (defaultValue) {
      cliOutput.info(`Auto-using default: ${defaultValue}`);
      return defaultValue;
    }
    cliOutput.info("No default provided, using empty string");
    return "";
  }

  return new Promise((resolve) => {
    const rl = createReadlineInterface();

    // Create a beautiful input display
    cliOutput.box(prompt, {
      title: "✏️ Input Required",
      borderColor: "green",
      borderStyle: "round",
    });

    const fullPrompt = defaultValue
      ? `${cliOutput.colorizePrompt("Enter value")} (default: ${chalk.gray(
          defaultValue
        )}): `
      : `${cliOutput.colorizePrompt("Enter value")}: `;

    rl.question(fullPrompt, (answer) => {
      const result = answer.trim() || defaultValue || "";
      if (result) {
        cliOutput.success(`Input received: ${result}`);
      } else {
        cliOutput.info("No input provided");
      }
      rl.close();
      resolve(result);
    });
  });
};

// Check if the environment supports user interaction
export const isInteractive = (): boolean => {
  return process.stdin.isTTY && process.env["CI"] !== "true";
};
