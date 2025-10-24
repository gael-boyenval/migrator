import {
  Plugin,
  PluginContext,
  PluginResult,
} from "../../core/plugin-interface";
import { Change, CSSValuesConfig } from "../../types";
import { replacePropertyValue } from "../../utils/css-parser";
import {
  parseCSSInJS,
  replaceCSSInJSPropertyValue,
  camelToKebab,
  kebabToCamel,
  CSSInJSRule,
  CSSInJSProperty,
} from "../../utils/css-in-js-parser";

export class CSSValuesPlugin implements Plugin {
  name = "css-values";

  process = async (context: PluginContext): Promise<PluginResult> => {
    const { fileData, config, migratorUtils, filePath } = context;
    const cssConfig = config as CSSValuesConfig;

    let modifiedData = fileData;
    const changes: Change[] = [];

    try {
      // Detect file type and parse accordingly
      const fileType = this.detectFileType(filePath, fileData);

      if (fileType === "css-in-js") {
        // Parse CSS-in-JS content
        const rules = parseCSSInJS(fileData);

        // Process all multi-value properties first, then individual mappings
        const multiValueChanges = this.processAllCSSInJSMultiValueProperties(
          cssConfig.mappings,
          rules,
          modifiedData,
          migratorUtils,
          context
        );
        changes.push(...multiValueChanges.changes);
        modifiedData = multiValueChanges.data;

        // Process each mapping in the configuration (for non-multi-value properties)
        // Re-parse the data to get updated rules after multi-value processing
        const updatedRules = migratorUtils.parseCSSInJS(modifiedData);

        for (const [originalValue, replacement] of Object.entries(
          cssConfig.mappings
        )) {
          const mappingChanges = await this.processCSSInJSMapping(
            originalValue,
            replacement,
            updatedRules,
            modifiedData,
            migratorUtils,
            context
          );

          changes.push(...mappingChanges.changes);
          modifiedData = mappingChanges.data;
        }
      } else {
        // Parse CSS content (existing functionality)
        const rules = migratorUtils.parseCSS(fileData);

        // Process all multi-value properties first, then individual mappings
        const multiValueChanges = this.processAllCSSMultiValueProperties(
          cssConfig.mappings,
          rules,
          modifiedData,
          migratorUtils,
          context
        );
        changes.push(...multiValueChanges.changes);
        modifiedData = multiValueChanges.data;

        // Process each mapping in the configuration (for non-multi-value properties)
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
    return targetProperties.some((target) => {
      const normalizedTarget = target.toLowerCase();

      // Check exact match
      if (normalizedProperty === normalizedTarget) return true;

      // Check if property matches target converted to kebab-case
      if (normalizedProperty === camelToKebab(target)) return true;

      // Check if property matches target converted to camelCase
      if (normalizedProperty === kebabToCamel(target)) return true;

      // Check if target matches property converted to kebab-case
      if (normalizedTarget === camelToKebab(property)) return true;

      // Check if target matches property converted to camelCase
      if (normalizedTarget === kebabToCamel(property)) return true;

      return false;
    });
  };

  private detectFileType = (
    filePath: string,
    _content: string
  ): "css" | "css-in-js" => {
    // Check file extension
    if (
      filePath.endsWith(".css") ||
      filePath.endsWith(".scss") ||
      filePath.endsWith(".sass")
    ) {
      return "css";
    }

    // For all other files (js, ts, jsx, tsx, etc.), assume CSS-in-JS
    return "css-in-js";
  };

  private processAllCSSInJSMultiValueProperties = (
    mappings: any,
    rules: CSSInJSRule[],
    data: string,
    _migratorUtils: any,
    _context: PluginContext
  ): { data: string; changes: Change[] } => {
    let modifiedData = data;
    const changes: Change[] = [];

    // Group multi-value properties by their original value and property name
    const multiValueGroups = new Map<
      string,
      {
        property: CSSInJSProperty;
        individualValues: CSSInJSProperty[];
        replacements: Map<number, string>;
      }
    >();

    // Find all multi-value properties
    for (const rule of rules) {
      for (const property of rule.properties) {
        if (property.isMultiValue && property.originalValue) {
          const groupKey = `${rule.objectPath}.${property.property}.${property.originalValue}`;

          if (!multiValueGroups.has(groupKey)) {
            // Find all individual values for this multi-value property
            const individualValues = rule.properties.filter(
              (p) =>
                p.isMultiValue &&
                p.property === property.property &&
                p.originalValue === property.originalValue
            );

            multiValueGroups.set(groupKey, {
              property: property,
              individualValues: individualValues,
              replacements: new Map(),
            });
          }
        }
      }
    }

    // Process all mappings for each multi-value group
    for (const [, group] of multiValueGroups) {
      const { property, individualValues, replacements } = group;

      // Check each individual value against all mappings
      for (const individualProperty of individualValues) {
        for (const [originalValue, replacement] of Object.entries(mappings)) {
          if (this.valueContains(individualProperty.value, originalValue)) {
            // Get the replacement for this individual value
            let individualReplacement = originalValue;

            if (typeof replacement === "string") {
              individualReplacement = replacement;
            } else if (
              typeof replacement === "object" &&
              replacement &&
              (replacement as any).options
            ) {
              // Check if this property matches any of the conditions
              for (const option of (replacement as any).options) {
                if (
                  this.propertyMatches(
                    individualProperty.property,
                    option.ifProp
                  )
                ) {
                  if (typeof option.replace === "string") {
                    individualReplacement = option.replace;
                  } else if (Array.isArray(option.replace)) {
                    // For now, use the first option (could be enhanced for user choice)
                    individualReplacement = option.replace[0];
                  }
                  break;
                }
              }
            }

            if (individualReplacement !== originalValue) {
              replacements.set(
                individualProperty.valueIndex || 0,
                individualReplacement
              );
            }
          }
        }
      }

      // If we have replacements, reconstruct the full value
      if (replacements.size > 0) {
        const originalParts = property.originalValue!.split(/\s+/);
        const reconstructedParts = originalParts.map((part, index) => {
          const replacement = replacements.get(index);
          if (replacement) {
            // Apply smart replacement logic to preserve var() wrapper
            if (part.startsWith("var(") && !replacement.startsWith("var(")) {
              // If original has var() wrapper but replacement doesn't, add it
              return `var(${replacement})`;
            } else if (
              !part.startsWith("var(") &&
              replacement.startsWith("var(")
            ) {
              // If original doesn't have var() wrapper but replacement does, remove it
              return replacement.replace(/^var\(|\)$/g, "");
            }
            return replacement;
          }
          return part;
        });
        const reconstructedValue = reconstructedParts.join(" ");

        // Apply the reconstructed value to the property
        modifiedData = replaceCSSInJSPropertyValue(
          modifiedData,
          property,
          reconstructedValue
        );

        changes.push({
          type: "replace",
          original: property.originalValue!,
          replacement: reconstructedValue,
          count: 1,
        });
      }
    }

    return { data: modifiedData, changes };
  };

  private processCSSInJSMapping = async (
    originalValue: string,
    replacement: string | any,
    rules: CSSInJSRule[],
    data: string,
    migratorUtils: any,
    context: PluginContext
  ): Promise<{ data: string; changes: Change[] }> => {
    let modifiedData = data;
    const changes: Change[] = [];

    // Handle simple string replacement
    if (typeof replacement === "string") {
      const simpleChanges = this.processCSSInJSSimpleReplacement(
        originalValue,
        replacement,
        rules,
        modifiedData
      );
      changes.push(...simpleChanges.changes);
      modifiedData = simpleChanges.data;
    } else if (typeof replacement === "object" && replacement.options) {
      // Handle conditional replacement
      const conditionalChanges =
        await this.processCSSInJSConditionalReplacement(
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

  private processAllCSSMultiValueProperties = (
    mappings: any,
    rules: any[],
    data: string,
    migratorUtils: any,
    _context: PluginContext
  ): { data: string; changes: Change[] } => {
    let modifiedData = data;
    const changes: Change[] = [];

    // Group multi-value properties by their original value and property name
    const multiValueGroups = new Map<
      string,
      {
        property: any;
        individualValues: any[];
        replacements: Map<number, string>;
      }
    >();

    // Find all multi-value properties
    for (const rule of rules) {
      for (const property of rule.properties) {
        if (property.isMultiValue && property.originalValue) {
          const groupKey = `${rule.selector}.${property.property}.${property.originalValue}`;

          if (!multiValueGroups.has(groupKey)) {
            // Find all individual values for this multi-value property
            const individualValues = rule.properties.filter(
              (p: any) =>
                p.isMultiValue &&
                p.property === property.property &&
                p.originalValue === property.originalValue
            );

            multiValueGroups.set(groupKey, {
              property: property,
              individualValues: individualValues,
              replacements: new Map(),
            });
          }
        }
      }
    }

    // Process all mappings for each multi-value group
    for (const [, group] of multiValueGroups) {
      const { property, individualValues, replacements } = group;

      // Check each individual value against all mappings
      for (const individualProperty of individualValues) {
        for (const [originalValue, replacement] of Object.entries(mappings)) {
          if (this.valueContains(individualProperty.value, originalValue)) {
            // Get the replacement for this individual value
            let individualReplacement = originalValue;

            if (typeof replacement === "string") {
              individualReplacement = replacement;
            } else if (
              typeof replacement === "object" &&
              replacement &&
              (replacement as any).options
            ) {
              // Check if this property matches any of the conditions
              for (const option of (replacement as any).options) {
                if (
                  this.propertyMatches(
                    individualProperty.property,
                    option.ifProp
                  )
                ) {
                  if (typeof option.replace === "string") {
                    individualReplacement = option.replace;
                  } else if (Array.isArray(option.replace)) {
                    // For now, use the first option (could be enhanced for user choice)
                    individualReplacement = option.replace[0];
                  }
                  break;
                }
              }
            }

            if (individualReplacement !== originalValue) {
              replacements.set(
                individualProperty.valueIndex || 0,
                individualReplacement
              );
            }
          }
        }
      }

      // If we have replacements, reconstruct the full value
      if (replacements.size > 0) {
        const originalParts = property.originalValue!.split(/\s+/);
        const reconstructedParts = originalParts.map(
          (part: string, index: number) => {
            const replacement = replacements.get(index);
            if (replacement) {
              // Apply smart replacement logic to preserve var() wrapper
              if (part.startsWith("var(") && !replacement.startsWith("var(")) {
                // If original has var() wrapper but replacement doesn't, add it
                return `var(${replacement})`;
              } else if (
                !part.startsWith("var(") &&
                replacement.startsWith("var(")
              ) {
                // If original doesn't have var() wrapper but replacement does, remove it
                return replacement.replace(/^var\(|\)$/g, "");
              }
              return replacement;
            }
            return part;
          }
        );
        const reconstructedValue = reconstructedParts.join(" ");

        // Apply the reconstructed value to the property
        // For multi-value properties, we need to replace the original value, not the individual value
        const originalProperty = {
          ...property,
          value: property.originalValue!,
        };
        modifiedData = migratorUtils.replaceCSSInJSPropertyValue(
          modifiedData,
          originalProperty,
          reconstructedValue
        );

        changes.push({
          type: "replace",
          original: property.originalValue!,
          replacement: reconstructedValue,
          count: 1,
        });
      }
    }

    return { data: modifiedData, changes };
  };

  private processCSSInJSSimpleReplacement = (
    originalValue: string,
    replacement: string,
    rules: CSSInJSRule[],
    data: string
  ): { data: string; changes: Change[] } => {
    let modifiedData = data;
    const changes: Change[] = [];
    let totalCount = 0;

    // Find all properties that contain the original value
    for (const rule of rules) {
      for (const property of rule.properties) {
        if (this.valueContains(property.value, originalValue)) {
          const newValue = this.replaceCSSInJSValuePrecisely(
            property.value,
            originalValue,
            replacement
          );

          if (newValue !== property.value) {
            const count = this.countCSSInJSValueOccurrences(
              property.value,
              originalValue
            );
            totalCount += count;

            modifiedData = replaceCSSInJSPropertyValue(
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

  private processCSSInJSConditionalReplacement = async (
    originalValue: string,
    mapping: any,
    rules: CSSInJSRule[],
    data: string,
    migratorUtils: any,
    context: PluginContext
  ): Promise<{ data: string; changes: Change[] }> => {
    let modifiedData = data;
    const changes: Change[] = [];

    // Find all properties that contain the original value
    for (const rule of rules) {
      for (const property of rule.properties) {
        if (this.valueContains(property.value, originalValue)) {
          const replacement = await this.getCSSInJSReplacementForProperty(
            originalValue,
            property,
            mapping,
            migratorUtils,
            context
          );

          if (replacement && replacement !== originalValue) {
            const newValue = this.replaceCSSInJSValuePrecisely(
              property.value,
              originalValue,
              replacement
            );

            if (newValue !== property.value) {
              const count = this.countCSSInJSValueOccurrences(
                property.value,
                originalValue
              );

              modifiedData = replaceCSSInJSPropertyValue(
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

  private getCSSInJSReplacementForProperty = async (
    originalValue: string,
    property: CSSInJSProperty,
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
            const codePreview = this.generateCSSInJSCodePreview(
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

  private valueContains = (
    value: string | number,
    searchValue: string
  ): boolean => {
    return String(value).includes(searchValue);
  };

  private replaceCSSInJSValuePrecisely = (
    value: string | number,
    originalValue: string,
    replacement: string
  ): string | number => {
    const stringValue = String(value);
    const escapedValue = this.escapeRegExp(originalValue);
    const preciseRegex = new RegExp(
      `(?<!\\w)${escapedValue}(?![a-zA-Z0-9-])`,
      "g"
    );

    const newValue = stringValue.replace(preciseRegex, replacement);

    // If the original value was a number, try to convert back to number
    if (typeof value === "number" && !isNaN(Number(newValue))) {
      return Number(newValue);
    }

    return newValue;
  };

  private countCSSInJSValueOccurrences = (
    value: string | number,
    originalValue: string
  ): number => {
    const stringValue = String(value);
    const escapedValue = this.escapeRegExp(originalValue);
    const preciseRegex = new RegExp(
      `(?<!\\w)${escapedValue}(?![a-zA-Z0-9-])`,
      "g"
    );

    const matches = stringValue.match(preciseRegex);
    return matches ? matches.length : 0;
  };

  private generateCSSInJSCodePreview = (
    filePath: string,
    property: CSSInJSProperty,
    originalValue: string,
    fileContent: string
  ): any => {
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
      const escapedValue = originalValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const preciseRegex = new RegExp(
        `(?<!\\w)${escapedValue}(?![a-zA-Z0-9-])`
      );
      const match = changeLine.match(preciseRegex);

      if (match && match.index !== undefined) {
        valueIndex = match.index;
        highlightStart = valueIndex;
        highlightEnd = valueIndex + originalValue.length;
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
