import { glob } from "glob";
import { Result } from "../types";

export const discoverFiles = async (
  patterns: string[],
  ignorePatterns: string[] = []
): Promise<Result<string[]>> => {
  try {
    const files: string[] = [];

    for (const pattern of patterns) {
      const matches = await glob(pattern, {
        nodir: true,
        ignore: ignorePatterns,
      });
      files.push(...matches);
    }

    // Remove duplicates
    const uniqueFiles = [...new Set(files)];

    return { success: true, data: uniqueFiles };
  } catch (error) {
    return { success: false, error: error as Error };
  }
};

export const matchesPattern = (
  filePath: string,
  patterns: string[]
): boolean => {
  return patterns.some((pattern) => {
    // Simple glob matching for basic patterns
    const regex = patternToRegex(pattern);
    return regex.test(filePath);
  });
};

export const isExcluded = (filePath: string, patterns: string[]): boolean => {
  return matchesPattern(filePath, patterns);
};

const patternToRegex = (pattern: string): RegExp => {
  // Convert glob pattern to regex
  const escaped = pattern
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    .replace(/\\\*/g, ".*")
    .replace(/\\\?/g, ".");

  return new RegExp(`^${escaped}$`);
};
