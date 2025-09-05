import {
  Plugin,
  PluginContext,
  PluginResult,
} from "../../core/plugin-interface";
import { Change, CSSValuesConfig } from "../../types";
import { replacePropertyValue } from "../../utils/css-parser";

export class CSSValuesPlugin implements Plugin {
  name = "css-values";

  process = async (context: PluginContext): Promise<PluginResult> => {
    const { fileData, config, migratorUtils } = context;
    const cssConfig = config as CSSValuesConfig;

    let modifiedData = fileData;
    const changes: Change[] = [];

    try {
      // Parse CSS content
      const rules = migratorUtils.parseCSS(fileData);

      // Process each mapping in the configuration
      for (const [originalValue, replacement] of Object.entries(
        cssConfig.mappings
      )) {
        const mappingChanges = await this.processMapping(
          originalValue,
          replacement,
          rules,
          modifiedData,
          migratorUtils,
          context
        );

        changes.push(...mappingChanges.changes);
        modifiedData = mappingChanges.data;
      }

      return {
        data: modifiedData,
        changes,
      };
    } catch (error) {
      migratorUtils.log(
        `Error processing CSS values: ${(error as Error).message}`,
        "error"
      );
      return {
        data: fileData,
        changes: [],
      };
    }
  };

  private processMapping = async (
    originalValue: string,
    replacement: string | any,
    rules: any[],
    data: string,
    migratorUtils: any,
    context: PluginContext
  ): Promise<{ data: string; changes: Change[] }> => {
    let modifiedData = data;
    const changes: Change[] = [];

    // Handle simple string replacement
    if (typeof replacement === "string") {
      const simpleChanges = this.processSimpleReplacement(
        originalValue,
        replacement,
        rules,
        modifiedData
      );
      changes.push(...simpleChanges.changes);
      modifiedData = simpleChanges.data;
    } else if (typeof replacement === "object" && replacement.options) {
      // Handle conditional replacement
      const conditionalChanges = await this.processConditionalReplacement(
        originalValue,
        replacement,
        rules,
        modifiedData,
        migratorUtils,
        context
      );
      changes.push(...conditionalChanges.changes);
      modifiedData = conditionalChanges.data;
    }

    return { data: modifiedData, changes };
  };

  private processSimpleReplacement = (
    originalValue: string,
    replacement: string,
    rules: any[],
    data: string
  ): { data: string; changes: Change[] } => {
    let modifiedData = data;
    const changes: Change[] = [];
    let totalCount = 0;

    // Find all properties that contain the original value
    for (const rule of rules) {
      for (const property of rule.properties) {
        if (property.value.includes(originalValue)) {
          const newValue = this.replaceValuePrecisely(
            property.value,
            originalValue,
            replacement
          );

          if (newValue !== property.value) {
            const count = this.countValueOccurrences(
              property.value,
              originalValue
            );
            totalCount += count;

            modifiedData = replacePropertyValue(
              modifiedData,
              property,
              newValue
            );
          }
        }
      }
    }

    if (totalCount > 0) {
      changes.push({
        type: "replace",
        original: originalValue,
        replacement,
        count: totalCount,
      });
    }

    return { data: modifiedData, changes };
  };

  private processConditionalReplacement = async (
    originalValue: string,
    mapping: any,
    rules: any[],
    data: string,
    migratorUtils: any,
    context: PluginContext
  ): Promise<{ data: string; changes: Change[] }> => {
    let modifiedData = data;
    const changes: Change[] = [];

    // Find all properties that contain the original value
    for (const rule of rules) {
      for (const property of rule.properties) {
        if (property.value.includes(originalValue)) {
          const replacement = await this.getReplacementForProperty(
            originalValue,
            property,
            mapping,
            migratorUtils,
            context
          );

          if (replacement && replacement !== originalValue) {
            const newValue = this.replaceValuePrecisely(
              property.value,
              originalValue,
              replacement
            );

            if (newValue !== property.value) {
              const count = this.countValueOccurrences(
                property.value,
                originalValue
              );

              modifiedData = replacePropertyValue(
                modifiedData,
                property,
                newValue
              );

              changes.push({
                type: "replace",
                original: originalValue,
                replacement,
                count,
              });
            }
          }
        }
      }
    }

    return { data: modifiedData, changes };
  };

  private getReplacementForProperty = async (
    originalValue: string,
    property: any,
    mapping: any,
    migratorUtils: any,
    context: PluginContext
  ): Promise<string | null> => {
    // Find matching option based on CSS property
    for (const option of mapping.options) {
      if (this.propertyMatches(property.property, option.ifProp)) {
        if (typeof option.replace === "string") {
          return option.replace;
        } else if (Array.isArray(option.replace)) {
          // Multiple choices - ask user if interactive
          if (context.isInteractive) {
            const codePreview = this.generateCodePreview(
              context.filePath,
              property,
              originalValue,
              context.fileData
            );
            // Get progress information
            const progressInfo = migratorUtils.getProgressInfo?.();

            const choice = await migratorUtils.askUserForChoice({
              question: `Multiple replacement options for "${originalValue}" in property "${property.property}":`,
              options: option.replace.map((value: string, index: number) => ({
                value,
                label: value,
                description: `Option ${index + 1}`,
              })),
              allowSkip: true,
              codePreview,
              progressInfo,
            });
            return choice;
          } else {
            // Non-interactive mode - skip this replacement
            migratorUtils.log(
              `Non-interactive mode: skipping replacement for "${originalValue}" in property "${property.property}" (requires user choice)`,
              "info"
            );
            return null;
          }
        }
      }
    }

    return null;
  };

  private propertyMatches = (
    property: string,
    targetProperties: string[]
  ): boolean => {
    const normalizedProperty = property.toLowerCase();
    return targetProperties.some(
      (target) => normalizedProperty === target.toLowerCase()
    );
  };

  private escapeRegExp = (string: string): string => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  // Replace value precisely, ensuring it's not part of a larger identifier
  private replaceValuePrecisely = (
    value: string,
    originalValue: string,
    replacement: string
  ): string => {
    // Create a regex that matches the value only when it's not followed by
    // alphanumeric characters or hyphens (to avoid partial matches)
    const escapedValue = this.escapeRegExp(originalValue);
    // For CSS custom properties, we need to handle the -- prefix specially
    const preciseRegex = new RegExp(
      `(?<!\\w)${escapedValue}(?![a-zA-Z0-9-])`,
      "g"
    );

    return value.replace(preciseRegex, replacement);
  };

  // Count occurrences of a value precisely
  private countValueOccurrences = (
    value: string,
    originalValue: string
  ): number => {
    const escapedValue = this.escapeRegExp(originalValue);
    const preciseRegex = new RegExp(
      `(?<!\\w)${escapedValue}(?![a-zA-Z0-9-])`,
      "g"
    );

    const matches = value.match(preciseRegex);
    return matches ? matches.length : 0;
  };

  private generateCodePreview = (
    filePath: string,
    property: any,
    originalValue: string,
    fileContent: string
  ): any => {
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
    // We need to find the exact occurrence that matches the property value, not just any occurrence
    let valueIndex = -1;
    let highlightStart = 0;
    let highlightEnd = 0;

    if (changeLine) {
      // Use a more precise approach: find the exact value with word boundaries
      // This prevents partial matches like --ds-brand-color-blue-50 matching --ds-brand-color-blue-500
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
  };
}
