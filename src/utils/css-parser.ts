// CSS parsing utilities

export interface CSSProperty {
  property: string;
  value: string;
  startIndex: number;
  endIndex: number;
  line: number;
  column: number;
  isMultiValue?: boolean; // true if this is a split value from a multi-value property
  originalValue?: string; // the original multi-value string before splitting
  valueIndex?: number; // the index of this value in the original multi-value string
}

export interface CSSRule {
  selector: string;
  properties: CSSProperty[];
  startIndex: number;
  endIndex: number;
}

// Parse CSS content into structured format
export const parseCSS = (content: string): CSSRule[] => {
  const rules: CSSRule[] = [];

  // Remove comments first
  const contentWithoutComments = content.replace(/\/\*[\s\S]*?\*\//g, () =>
    " ".repeat(1)
  );

  // Extract all CSS properties from the content, including nested ones
  const allProperties = extractAllProperties(contentWithoutComments);

  // Group properties by their containing rule
  const ruleMap = new Map<string, CSSProperty[]>();

  allProperties.forEach((prop) => {
    // Find the rule that contains this property
    const ruleStart = findContainingRule(
      contentWithoutComments,
      prop.startIndex
    );
    if (ruleStart !== -1) {
      const ruleEnd = findRuleEnd(contentWithoutComments, ruleStart);
      if (ruleEnd !== -1) {
        const selectorStart = findSelectorStart(
          contentWithoutComments,
          ruleStart
        );
        if (selectorStart !== -1) {
          const selector = contentWithoutComments
            .slice(selectorStart, ruleStart)
            .trim();
          const ruleKey = `${selector}-${ruleStart}-${ruleEnd}`;

          if (!ruleMap.has(ruleKey)) {
            ruleMap.set(ruleKey, []);
          }
          ruleMap.get(ruleKey)!.push(prop);
        }
      }
    }
  });

  // Convert map to rules array
  ruleMap.forEach((properties, ruleKey) => {
    const parts = ruleKey.split("-");
    if (parts.length >= 3) {
      const selector = parts[0];
      const startStr = parts[parts.length - 2];
      const endStr = parts[parts.length - 1];

      if (selector && startStr && endStr) {
        const startIndex = parseInt(startStr);
        const endIndex = parseInt(endStr);

        if (!isNaN(startIndex) && !isNaN(endIndex)) {
          rules.push({
            selector,
            properties,
            startIndex,
            endIndex: endIndex + 1,
          });
        }
      }
    }
  });

  return rules;
};

// Extract all CSS properties from content, including nested ones
const extractAllProperties = (content: string): CSSProperty[] => {
  const properties: CSSProperty[] = [];
  const propertyRegex = /([a-zA-Z-]+)\s*:\s*([^;{}]+);/g;
  let match;

  while ((match = propertyRegex.exec(content)) !== null) {
    if (match[1] && match[2]) {
      const property = match[1].trim();
      const value = match[2].trim();
      const startIndex = match.index;
      const endIndex = match.index + match[0].length;

      // Calculate line and column
      const beforeMatch = content.substring(0, startIndex);
      const newlines = (beforeMatch.match(/\n/g) || []).length;
      const lastNewlineIndex = beforeMatch.lastIndexOf("\n");
      const column =
        lastNewlineIndex === -1
          ? startIndex + 1
          : startIndex - lastNewlineIndex;

      // Check if this is a multi-value CSS property
      if (isMultiValueCSSProperty(property, value)) {
        // Split the multi-value property into individual values
        const individualValues = splitMultiValueCSSProperty(value);

        individualValues.forEach((individualValue, index) => {
          properties.push({
            property,
            value: individualValue,
            startIndex: startIndex + index * 10, // Offset each value slightly
            endIndex: startIndex + index * 10 + individualValue.length,
            line: newlines + 1,
            column: column + index * 10,
            isMultiValue: true,
            originalValue: value,
            valueIndex: index,
          });
        });
      } else {
        // Single value property
        properties.push({
          property,
          value,
          startIndex,
          endIndex,
          line: newlines + 1,
          column,
        });
      }
    }
  }

  return properties;
};

// Find the rule that contains a given index
const findContainingRule = (content: string, index: number): number => {
  let currentIndex = 0;

  while (currentIndex < index) {
    const braceIndex = content.indexOf("{", currentIndex);
    if (braceIndex === -1 || braceIndex > index) break;

    const ruleEnd = findRuleEnd(content, braceIndex);
    if (ruleEnd === -1) break;

    if (index >= braceIndex && index <= ruleEnd) {
      return braceIndex;
    }

    currentIndex = ruleEnd + 1;
  }

  return -1;
};

// Find the start of a CSS selector
const findSelectorStart = (content: string, braceIndex: number): number => {
  let index = braceIndex - 1;

  // Skip whitespace before the brace
  while (index >= 0) {
    const char = content[index];
    if (char === undefined || !/\s/.test(char)) break;
    index--;
  }

  // Find the start of the selector
  while (index >= 0 && content[index] !== ";" && content[index] !== "}") {
    index--;
  }

  return index + 1;
};

// Find the end of a CSS rule (closing brace)
const findRuleEnd = (content: string, startIndex: number): number => {
  let braceCount = 1;
  let index = startIndex + 1;

  while (index < content.length && braceCount > 0) {
    const char = content[index];

    if (char === "{") {
      braceCount++;
    } else if (char === "}") {
      braceCount--;
    }

    index++;
  }

  return braceCount === 0 ? index - 1 : -1;
};

// Find CSS properties matching specific names
export const findProperties = (
  rules: CSSRule[],
  propertyNames: string[]
): CSSProperty[] => {
  const matchingProperties: CSSProperty[] = [];
  const normalizedNames = propertyNames.map((name) => name.toLowerCase());

  for (const rule of rules) {
    for (const property of rule.properties) {
      if (normalizedNames.includes(property.property.toLowerCase())) {
        matchingProperties.push(property);
      }
    }
  }

  return matchingProperties;
};

// Replace CSS property value
export const replacePropertyValue = (
  content: string,
  property: CSSProperty,
  newValue: string
): string => {
  // Use a more robust approach: find the property by its value and replace it
  // This avoids issues with index calculations after content changes

  // Create a regex to find the property with its current value
  const escapedValue = property.value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const propertyRegex = new RegExp(
    `(${property.property}\\s*:\\s*)${escapedValue}(\\s*;)`,
    "g"
  );

  // Replace the value while preserving the property name and semicolon
  return content.replace(propertyRegex, `$1${newValue}$2`);
};

// Get all CSS properties from content
export const getAllProperties = (content: string): CSSProperty[] => {
  const rules = parseCSS(content);
  const allProperties: CSSProperty[] = [];

  for (const rule of rules) {
    allProperties.push(...rule.properties);
  }

  return allProperties;
};

// Check if a CSS property value is multi-value (contains spaces and looks like CSS values)
const isMultiValueCSSProperty = (property: string, value: string): boolean => {
  // Only split properties that commonly have multiple values
  const multiValueProperties = [
    "margin",
    "padding",
    "border",
    "borderWidth",
    "borderStyle",
    "borderColor",
    "borderRadius",
    "boxShadow",
    "textShadow",
    "background",
    "backgroundPosition",
    "backgroundSize",
    "transform",
    "transition",
    "animation",
  ];

  const normalizedProperty = property.toLowerCase();
  const isMultiValueProperty = multiValueProperties.some(
    (prop) => normalizedProperty === prop.toLowerCase()
  );

  if (!isMultiValueProperty) return false;

  // Check if the value contains spaces and looks like CSS values
  if (!value.includes(" ")) return false;

  // Split by spaces and check if we have multiple parts
  const parts = value.trim().split(/\s+/);

  // Just check if we have multiple parts that look like CSS values (very simple check)
  return parts.length > 1;
};

// Split a multi-value CSS property into individual values
const splitMultiValueCSSProperty = (value: string): string[] => {
  return value
    .trim()
    .split(/\s+/)
    .map((part) => part.trim());
};

// Check if a value is a CSS custom property
export const isCustomProperty = (value: string): boolean => {
  return value.startsWith("--");
};

// Check if a value is a CSS function call
export const isFunctionCall = (value: string): boolean => {
  return /^[a-zA-Z-]+\(/.test(value.trim());
};
