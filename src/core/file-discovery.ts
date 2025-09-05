import { MigratorConfig, Result } from "../types";
import { discoverFiles, matchesPattern, isExcluded } from "../utils/glob-utils";

export class FileDiscovery {
  discoverFiles = async (config: MigratorConfig): Promise<Result<string[]>> => {
    try {
      // Get all files matching include patterns, with exclude patterns as ignore
      const result = await discoverFiles(config.include, config.exclude || []);
      if (!result.success) {
        return result;
      }

      return { success: true, data: result.data };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  };

  matchesPattern = (filePath: string, patterns: string[]): boolean => {
    return matchesPattern(filePath, patterns);
  };

  isExcluded = (filePath: string, patterns: string[]): boolean => {
    return isExcluded(filePath, patterns);
  };
}
