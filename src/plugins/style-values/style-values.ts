import {
  Plugin,
  PluginContext,
  PluginResult,
} from "../../core/plugin-interface";
import { Change } from "../../types";

export interface StyleValuesConfig {
  mappings: Record<string, string | StyleValueMapping>;
}

export interface StyleValueMapping {
  options: StyleValueOption[];
}

export interface StyleValueOption {
  ifProp?: string[];
  replace: string | string[];
}

// Re-export the same interfaces as css-values for compatibility
export type CSSValuesConfig = StyleValuesConfig;
export type CSSValueMapping = StyleValueMapping;
export type CSSValueOption = StyleValueOption;

export class StyleValuesPlugin implements Plugin {
  name = "style-values";
  private choiceCache = new Map<string, string>();

  async process(context: PluginContext): Promise<PluginResult> {
    const { fileData, config, migratorUtils } = context;

    // Support multiple config structures for compatibility
    let styleConfig: StyleValuesConfig;

    if (config.styleValues) {
      // New styleValues config structure
      styleConfig = config.styleValues as StyleValuesConfig;
    } else if (config.cssValues) {
      // Check if cssValues is the mappings directly or has a mappings property
      if (config.cssValues.mappings) {
        // cssValues: { mappings: {...} }
        styleConfig = config.cssValues as StyleValuesConfig;
      } else {
        // cssValues: {...} (mappings directly)
        styleConfig = { mappings: config.cssValues };
      }
    } else if (config.mappings) {
      // Direct mappings structure: { mappings: {...} }
      styleConfig = { mappings: config.mappings };
    } else {
      return { data: fileData, changes: [] };
    }

    if (!styleConfig || !styleConfig.mappings) {
      return { data: fileData, changes: [] };
    }

    let modifiedData = fileData;
    const changes: Change[] = [];

    // Process each mapping
    for (const [originalValue, replacement] of Object.entries(
      styleConfig.mappings
    )) {
      const mappingChanges = await this.processMapping(
        originalValue,
        replacement as string | StyleValueMapping,
        modifiedData,
        migratorUtils,
        context
      );

      changes.push(...mappingChanges.changes);
      modifiedData = mappingChanges.data;
    }

    return { data: modifiedData, changes };
  }

  private async processMapping(
    originalValue: string,
    replacement: string | StyleValueMapping,
    data: string,
    migratorUtils: any,
    context: PluginContext
  ): Promise<{ data: string; changes: Change[] }> {
    let modifiedData = data;
    const changes: Change[] = [];

    // Find all occurrences of the original value
    const matches = this.findAllMatches(originalValue, modifiedData);

    for (const match of matches) {
      const { property, startIndex, endIndex } = match;

      // Get the replacement for this property
      const newValue = await this.getReplacementForProperty(
        originalValue,
        property,
        replacement,
        migratorUtils,
        context,
        match
      );

      if (newValue && newValue !== originalValue) {
        // Apply the replacement
        const before = modifiedData.substring(0, startIndex);
        const after = modifiedData.substring(endIndex);
        modifiedData = before + newValue + after;

        changes.push({
          type: "replace",
          original: originalValue,
          replacement: newValue,
          count: 1,
        });

        // Update indices for subsequent matches
        const lengthDiff = newValue.length - originalValue.length;
        matches.forEach((m) => {
          if (m.startIndex > startIndex) {
            m.startIndex += lengthDiff;
            m.endIndex += lengthDiff;
          }
        });
      }
    }

    return { data: modifiedData, changes };
  }

  private findAllMatches(
    originalValue: string,
    content: string
  ): Array<{
    property: string;
    value: string;
    startIndex: number;
    endIndex: number;
    line: number;
  }> {
    const matches: Array<{
      property: string;
      value: string;
      startIndex: number;
      endIndex: number;
      line: number;
    }> = [];

    // Escape special regex characters
    const escapedValue = originalValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escapedValue, "g");
    let match;

    while ((match = regex.exec(content)) !== null) {
      const startIndex = match.index;
      const endIndex = match.index + match[0].length;

      // Skip matches that are inside var() function fallbacks only
      if (this.isInsideVarFallback(content, startIndex)) {
        continue;
      }

      // Skip matches that are preceded by alphanumeric characters (word boundary check)
      if (this.isPrecededByAlphanumeric(content, startIndex, match[0].length)) {
        continue;
      }

      // Calculate line number
      const line =
        (content.substring(0, startIndex).match(/\n/g) || []).length + 1;

      // Find the property name by looking for ':' before the match
      const property = this.extractPropertyName(content, startIndex);

      if (property && property.length > 0) {
        matches.push({
          property,
          value: match[0],
          startIndex,
          endIndex,
          line,
        });
      }
    }
    return matches;
  }

  private isInsideVarFallback(content: string, position: number): boolean {
    // Look backwards from the position to find if we're inside a var() function
    let index = position - 1;
    let varStart = -1;

    // Walk backwards to find the start of a var() function
    while (index >= 0) {
      const char = content[index];

      if (char === ")") {
        // Found a closing parenthesis, skip to its matching opening
        let parenCount = 1;
        index--;
        while (index >= 0 && parenCount > 0) {
          if (content[index] === ")") {
            parenCount++;
          } else if (content[index] === "(") {
            parenCount--;
          }
          index--;
        }
        continue;
      }

      if (char === "(" && index > 3) {
        // Check if this is a var( function
        const beforeParen = content.substring(Math.max(0, index - 3), index);
        if (beforeParen === "var") {
          varStart = index;
          break;
        }
      }

      index--;
    }

    if (varStart === -1) {
      return false; // Not inside a var() function
    }

    // Now check if there's a comma between varStart and position
    // If there is, we're in the fallback part
    for (let i = varStart + 1; i < position; i++) {
      if (content[i] === ",") {
        return true; // We're in the fallback part of var()
      }
    }

    return false; // We're in the main var() value, not the fallback
  }

  private isPrecededByAlphanumeric(
    content: string,
    position: number,
    _matchLength: number
  ): boolean {
    // Check if the match is part of a larger alphanumeric sequence
    // This prevents partial matches like "4px" inside "44px"
    if (position > 0) {
      const charBefore = content[position - 1];
      if (charBefore && /[a-zA-Z0-9]/.test(charBefore)) {
        // This is a partial match - the match is preceded by alphanumeric
        // and is part of a larger alphanumeric sequence
        return true;
      }
    }
    return false;
  }

  private generateCodePreview(
    filePath: string,
    property: { property: string; line: number },
    originalValue: string,
    fileContent: string
  ): any {
    // Use the file content that's already available in context
    const lines = fileContent.split("\n");

    // Get context lines (5 before and 5 after)
    const contextLines = 5;
    const startLine = Math.max(0, property.line - contextLines - 1);
    const endLine = Math.min(lines.length, property.line + contextLines);

    const beforeLines = lines.slice(startLine, property.line - 1);
    const changeLine = lines[property.line - 1];
    const afterLines = lines.slice(property.line, endLine);

    // Find the position of the original value in the line
    let valueIndex = -1;
    let highlightStart = 0;
    let highlightEnd = 0;

    if (changeLine) {
      // Use a more precise approach: find the exact value with word boundaries
      const escapedValue = originalValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const preciseRegex = new RegExp(
        `(?<!\\w)${escapedValue}(?![a-zA-Z0-9-])`
      );
      const match = changeLine.match(preciseRegex);

      if (match && match.index !== undefined) {
        valueIndex = match.index;
        highlightStart = valueIndex;
        highlightEnd = valueIndex + originalValue.length;
      } else {
        // Fallback: try to find it within var() functions
        const varMatches = changeLine.match(/var\([^)]+\)/g);
        if (varMatches) {
          for (const varMatch of varMatches) {
            const varPreciseRegex = new RegExp(
              `(?<!\\w)${escapedValue}(?![a-zA-Z0-9-])`
            );
            const varMatch_result = varMatch.match(varPreciseRegex);
            if (varMatch_result && varMatch_result.index !== undefined) {
              const varIndex = changeLine.indexOf(varMatch);
              valueIndex = varIndex + varMatch_result.index;
              highlightStart = valueIndex;
              highlightEnd = valueIndex + originalValue.length;
              break;
            }
          }
        }
      }
    }

    return {
      filePath,
      lineNumber: property.line,
      beforeLines,
      changeLine: changeLine || "",
      afterLines,
      highlightStart,
      highlightEnd,
    };
  }

  private extractPropertyName(
    content: string,
    valueStartIndex: number
  ): string | null {
    // Look backwards from the value start to find the property name
    let index = valueStartIndex - 1;

    // Skip whitespace
    while (
      index >= 0 &&
      index < content.length &&
      /\s/.test(content[index] || "")
    ) {
      index--;
    }

    // Find the ':' that precedes the value
    let colonIndex = -1;
    while (index >= 0) {
      if (content[index] === ":") {
        colonIndex = index;
        break;
      }
      index--;
    }

    if (colonIndex === -1) {
      return null;
    }

    // Look backwards from the ':' to find the property name
    index = colonIndex - 1;

    // Skip whitespace
    while (
      index >= 0 &&
      index < content.length &&
      /\s/.test(content[index] || "")
    ) {
      index--;
    }

    // Find the start of the property name (look for ',', ';', or '{')
    let propertyStartIndex = -1;
    while (index >= 0) {
      const char = content[index];
      if (char === "," || char === ";" || char === "{") {
        propertyStartIndex = index + 1;
        break;
      }
      index--;
    }

    if (propertyStartIndex === -1) {
      // If we didn't find a delimiter, the property starts at the beginning
      propertyStartIndex = 0;
    }

    // Extract the property name
    const propertyName = content
      .substring(propertyStartIndex, colonIndex)
      .trim();

    // Remove quotes if present
    const cleanPropertyName = propertyName.replace(/^['"]|['"]$/g, "");

    return cleanPropertyName.length > 0 ? cleanPropertyName : null;
  }

  private async getReplacementForProperty(
    originalValue: string,
    property: string,
    replacement: string | StyleValueMapping,
    migratorUtils: any,
    context: PluginContext,
    match?: {
      property: string;
      value: string;
      startIndex: number;
      endIndex: number;
      line: number;
    }
  ): Promise<string | null> {
    if (typeof replacement === "string") {
      return replacement;
    }

    if (typeof replacement === "object" && replacement.options) {
      // Find matching option based on property
      for (const option of replacement.options) {
        if (this.propertyMatches(property, option.ifProp)) {
          if (typeof option.replace === "string") {
            return option.replace;
          } else if (Array.isArray(option.replace)) {
            if (option.replace.length > 1) {
              // Multiple options - check if interactive mode is enabled
              if (context.isInteractive) {
                return await this.showInteractiveChoice(
                  originalValue,
                  option.replace,
                  migratorUtils,
                  match
                    ? { property: match.property, line: match.line }
                    : undefined,
                  context.filePath,
                  context.fileData
                );
              } else {
                // Non-interactive mode - skip this replacement
                migratorUtils.log(
                  `Non-interactive mode: skipping replacement for "${originalValue}" in property "${property}" (requires user choice)`,
                  "info"
                );
                return null;
              }
            } else {
              // Single option
              return option.replace[0] || "";
            }
          }
        }
      }
    }

    return null;
  }

  private propertyMatches(
    property: string,
    targetProperties?: string[]
  ): boolean {
    if (!targetProperties || targetProperties.length === 0) {
      return true;
    }

    // Convert property to both camelCase and kebab-case for matching
    const camelCase = this.kebabToCamel(property);
    const kebabCase = this.camelToKebab(property);

    return targetProperties.some((target) => {
      const targetCamel = this.kebabToCamel(target);
      const targetKebab = this.camelToKebab(target);

      return (
        property === target ||
        property === targetCamel ||
        property === targetKebab ||
        camelCase === target ||
        camelCase === targetCamel ||
        kebabCase === target ||
        kebabCase === targetKebab
      );
    });
  }

  private kebabToCamel(str: string): string {
    return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
  }

  private camelToKebab(str: string): string {
    return str.replace(/([A-Z])/g, "-$1").toLowerCase();
  }

  private async showInteractiveChoice(
    originalValue: string,
    options: string[],
    migratorUtils: any,
    property?: { property: string; line: number },
    filePath?: string,
    fileContent?: string
  ): Promise<string> {
    if (options.length === 1) {
      return options[0] || "";
    }

    // Create a cache key based on the original value and options
    const cacheKey = `${originalValue}:${options.join(",")}`;

    // Check if we already have a choice for this combination
    if (this.choiceCache.has(cacheKey)) {
      const cachedChoice = this.choiceCache.get(cacheKey);
      migratorUtils.log(
        `Using cached choice for "${originalValue}": ${cachedChoice}`
      );
      return cachedChoice || options[0] || "";
    }

    // Show interactive choice
    migratorUtils.log(
      `\nFound multiple replacement options for "${originalValue}":`
    );
    options.forEach((option, index) => {
      if (option) {
        migratorUtils.log(`  ${index + 1}. ${option}`);
      }
    });

    // Generate code preview if we have the necessary information
    let codePreview;
    if (property && filePath && fileContent) {
      codePreview = this.generateCodePreview(
        filePath,
        property,
        originalValue,
        fileContent
      );
    }

    // Use the migratorUtils to get user input
    if (migratorUtils.askUserForChoice) {
      try {
        const choice = await migratorUtils.askUserForChoice({
          question: `Multiple replacement options for "${originalValue}":`,
          options: options.map((option, index) => ({
            value: option,
            label: option,
            description: `Option ${index + 1}`,
          })),
          allowSkip: true,
          codePreview,
        });
        const finalChoice = choice || options[0] || "";

        // Cache the choice for future use
        this.choiceCache.set(cacheKey, finalChoice);

        return finalChoice;
      } catch (error) {
        migratorUtils.log("Error getting user choice, using first option");
        const fallbackChoice = options[0] || "";
        this.choiceCache.set(cacheKey, fallbackChoice);
        return fallbackChoice;
      }
    } else {
      // Fallback: return the first option if no interactive capability
      migratorUtils.log(
        "No interactive capability available, using first option"
      );
      const fallbackChoice = options[0] || "";
      this.choiceCache.set(cacheKey, fallbackChoice);
      return fallbackChoice;
    }
  }
}
