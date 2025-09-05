import * as fs from "fs";
import { Result } from "../types";

export const readFile = (path: string): Result<string> => {
  try {
    const content = fs.readFileSync(path, "utf8");
    return { success: true, data: content };
  } catch (error) {
    return { success: false, error: error as Error };
  }
};

export const writeFile = (path: string, content: string): Result<void> => {
  try {
    fs.writeFileSync(path, content, "utf8");
    return { success: true, data: undefined };
  } catch (error) {
    return { success: false, error: error as Error };
  }
};

export const fileExists = (path: string): boolean => {
  return fs.existsSync(path);
};

export const escapeRegExp = (string: string): string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};
