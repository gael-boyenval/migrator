// CSS-in-JS parsing utilities

export interface CSSInJSProperty {
  property: string; // "marginTop" or "margin-top"
  value: string | number; // "var(--token)" or 600
  objectPath: string; // "myElement" or "myElement.nested"
  startIndex: number;
  endIndex: number;
  line: number;
  column: number;
  isMultiValue?: boolean; // true if this is a split value from a multi-value property
  originalValue?: string; // the original multi-value string before splitting
  valueIndex?: number; // the index of this value in the original multi-value string
}

export interface CSSInJSRule {
  objectPath: string;
  properties: CSSInJSProperty[];
  startIndex: number;
  endIndex: number;
}

// Parse CSS-in-JS content into structured format
export const parseCSSInJS = (content: string): CSSInJSRule[] => {
  const rules: CSSInJSRule[] = [];

  try {
    // Find all object literals that might contain CSS properties
    const objectMatches = findObjectLiterals(content);

    for (const match of objectMatches) {
      const objectPath = match.objectPath;
      const properties = extractCSSPropertiesFromObject(
        match.content,
        match.startIndex
      );

      if (properties.length > 0) {
        rules.push({
          objectPath,
          properties,
          startIndex: match.startIndex,
          endIndex: match.endIndex,
        });
      }
    }
  } catch (error) {
    // If parsing fails, return empty array
    console.warn("Failed to parse CSS-in-JS content:", error);
  }

  return rules;
};

// Find object literals in the content
interface ObjectMatch {
  objectPath: string;
  content: string;
  startIndex: number;
  endIndex: number;
}

const findObjectLiterals = (content: string): ObjectMatch[] => {
  const matches: ObjectMatch[] = [];

  // Look for object patterns that contain CSS variables
  // This regex looks for objects that contain var(--) patterns
  const objectRegex = /\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g;
  let match;

  while ((match = objectRegex.exec(content)) !== null) {
    const objectContent = match[1] || "";
    const startIndex = match.index || 0;
    const endIndex = (match.index || 0) + match[0].length;

    // Skip if this looks like a TypeScript interface or type definition
    const beforeObject = content.substring(
      Math.max(0, startIndex - 100),
      startIndex
    );
    if (
      beforeObject.includes("interface ") ||
      beforeObject.includes("type ") ||
      beforeObject.includes("Record<") ||
      beforeObject.includes("CSSProperties") ||
      beforeObject.includes("React.FC") ||
      beforeObject.includes("React.Component") ||
      beforeObject.includes("styled.")
    ) {
      continue;
    }

    // Skip if it contains template literals or JSX
    if (objectContent.includes("`") && objectContent.includes("${")) {
      continue;
    }

    // Skip if it doesn't contain CSS variables
    if (!objectContent.includes("var(--")) {
      continue;
    }

    // Try to determine the object path (variable name or property path)
    const objectPath = findObjectPath(content, startIndex);

    // Only add if this object contains CSS-like properties
    if (containsCSSProperties(objectContent)) {
      matches.push({
        objectPath,
        content: objectContent,
        startIndex,
        endIndex,
      });
    }
  }

  return matches;
};

// Check if an object contains CSS-like properties
const containsCSSProperties = (objectContent: string): boolean => {
  // Skip if it looks like a TypeScript interface or type definition
  if (
    objectContent.includes("interface ") ||
    objectContent.includes("type ") ||
    objectContent.includes("Record<") ||
    objectContent.includes("CSSProperties") ||
    objectContent.includes("React.FC") ||
    objectContent.includes("React.Component")
  ) {
    return false;
  }

  // Skip if it contains template literals or JSX
  if (objectContent.includes("`") && objectContent.includes("${")) {
    return false;
  }

  // Look for CSS-like property patterns
  const cssPropertyRegex = /(['"]?)([a-zA-Z0-9_-]+)\1\s*:\s*([^,}]+)/g;
  let match;

  while ((match = cssPropertyRegex.exec(objectContent)) !== null) {
    const property = match[2]?.trim() || "";
    const value = match[3]?.trim() || "";

    // Check if it looks like a CSS property
    if (isCSSProperty(property, cleanValue(value))) {
      return true;
    }
  }

  return false;
};

// Try to find the object path (variable name or property path)
const findObjectPath = (content: string, objectStartIndex: number): string => {
  // Look backwards for variable assignment or property access
  const beforeObject = content.substring(0, objectStartIndex);

  // Look for patterns like: const myElement = { or myElement: { or myElement.nested = {
  const patterns = [
    /(?:const|let|var)\s+(\w+)\s*=\s*\{/, // const myElement = {
    /(\w+)\s*:\s*\{/, // myElement: {
    /(\w+(?:\.\w+)*)\s*=\s*\{/, // myElement.nested = {
  ];

  for (const pattern of patterns) {
    const match = beforeObject.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  // Try to find the object path by looking at the line before
  const lines = beforeObject.split("\n");
  const lastLine = lines[lines.length - 1] || "";

  // Look for property assignments like: container: { or button: {
  const propertyMatch = lastLine.match(/(\w+)\s*:\s*\{/);
  if (propertyMatch && propertyMatch[1]) {
    return propertyMatch[1];
  }

  return "anonymous";
};

// Extract CSS properties from an object literal
const extractCSSPropertiesFromObject = (
  objectContent: string,
  baseStartIndex: number
): CSSInJSProperty[] => {
  const properties: CSSInJSProperty[] = [];

  // Parse the object content to find property: value pairs
  // This regex handles both quoted and unquoted property names
  const propertyRegex = /(['"]?)([a-zA-Z0-9_-]+)\1\s*:\s*([^,}]+)/g;
  let match;

  while ((match = propertyRegex.exec(objectContent)) !== null) {
    const property = match[2]?.trim() || "";
    const value = match[3]?.trim() || "";

    // Skip if the value contains TypeScript type annotations
    if (
      value.includes(":") &&
      (value.includes("string") ||
        value.includes("number") ||
        value.includes("boolean"))
    ) {
      continue;
    }

    // Skip if the value contains function calls or complex expressions
    if (
      value.includes("=>") ||
      value.includes("?") ||
      value.includes("&&") ||
      value.includes("||")
    ) {
      continue;
    }

    // Clean up the value (remove quotes, handle numbers)
    const cleanedValue = cleanValue(value);

    // Only process if it looks like a CSS property
    if (isCSSProperty(property, cleanedValue)) {
      const startIndex = baseStartIndex + (match.index || 0);
      const endIndex = baseStartIndex + (match.index || 0) + match[0].length;

      // Calculate line and column
      const matchIndex = match.index || 0;
      const beforeMatch = objectContent.substring(0, matchIndex);
      const newlines = (beforeMatch.match(/\n/g) || []).length;
      const lastNewlineIndex = beforeMatch.lastIndexOf("\n");
      const column =
        lastNewlineIndex === -1
          ? matchIndex + 1
          : matchIndex - lastNewlineIndex;

      // Check if this is a multi-value CSS property (contains spaces and looks like CSS values)
      if (isMultiValueCSSProperty(property, String(cleanedValue))) {
        // Split the multi-value property into individual values
        const individualValues = splitMultiValueCSSProperty(
          String(cleanedValue)
        );

        individualValues.forEach((individualValue, index) => {
          properties.push({
            property,
            value: individualValue,
            objectPath: "anonymous", // Will be updated by the caller
            startIndex: startIndex + index * 10, // Offset each value slightly
            endIndex: startIndex + index * 10 + individualValue.length,
            line: newlines + 1,
            column: column + index * 10,
            isMultiValue: true,
            originalValue: String(cleanedValue),
            valueIndex: index,
          });
        });
      } else {
        // Single value property
        properties.push({
          property,
          value: cleanedValue,
          objectPath: "anonymous", // Will be updated by the caller
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

// Clean and normalize the value
const cleanValue = (value: string): string | number => {
  // Remove surrounding quotes
  const trimmed = value.trim();

  // Handle quoted strings
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  // Handle numbers
  const numValue = parseFloat(trimmed);
  if (!isNaN(numValue) && isFinite(numValue)) {
    return numValue;
  }

  // Handle template literals (remove backticks)
  if (trimmed.startsWith("`") && trimmed.endsWith("`")) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
};

// Check if a property looks like a CSS property
const isCSSProperty = (property: string, value: string | number): boolean => {
  // Check if it's a known CSS property (camelCase or kebab-case)
  const cssProperties = [
    "margin",
    "marginTop",
    "marginRight",
    "marginBottom",
    "marginLeft",
    "padding",
    "paddingTop",
    "paddingRight",
    "paddingBottom",
    "paddingLeft",
    "color",
    "backgroundColor",
    "background",
    "border",
    "borderColor",
    "borderWidth",
    "borderStyle",
    "fontSize",
    "fontWeight",
    "fontFamily",
    "lineHeight",
    "width",
    "height",
    "minWidth",
    "minHeight",
    "maxWidth",
    "maxHeight",
    "display",
    "position",
    "top",
    "right",
    "bottom",
    "left",
    "flex",
    "flexDirection",
    "flexWrap",
    "justifyContent",
    "alignItems",
    "opacity",
    "zIndex",
    "overflow",
    "textAlign",
    "textDecoration",
    "boxShadow",
    "borderRadius",
    "cursor",
    "userSelect",
    "transition",
    "transform",
    "animation",
  ];

  const normalizedProperty = property.toLowerCase();
  const isKnownProperty = cssProperties.some(
    (prop) =>
      prop.toLowerCase() === normalizedProperty ||
      prop.toLowerCase() === camelToKebab(normalizedProperty) ||
      prop.toLowerCase() === kebabToCamel(normalizedProperty)
  );

  // Also check if the value looks like a CSS value
  const isCSSValue =
    typeof value === "string" &&
    (value.startsWith("var(--") ||
      value.includes("px") ||
      value.includes("rem") ||
      value.includes("em") ||
      value.includes("%") ||
      value.includes("vh") ||
      value.includes("vw") ||
      value.includes("rgb") ||
      value.includes("hsl") ||
      value.includes("#") ||
      value === "auto" ||
      value === "none" ||
      value === "inherit" ||
      value === "initial" ||
      value === "unset");

  return isKnownProperty || isCSSValue;
};

// Convert camelCase to kebab-case
export const camelToKebab = (str: string): string => {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
};

// Convert kebab-case to camelCase
export const kebabToCamel = (str: string): string => {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
};

// Find CSS-in-JS properties matching specific names
export const findCSSInJSProperties = (
  rules: CSSInJSRule[],
  propertyNames: string[]
): CSSInJSProperty[] => {
  const matchingProperties: CSSInJSProperty[] = [];

  for (const rule of rules) {
    for (const property of rule.properties) {
      if (propertyMatches(property.property, propertyNames)) {
        matchingProperties.push(property);
      }
    }
  }

  return matchingProperties;
};

// Check if a property matches any of the target properties
// This automatically handles both camelCase and kebab-case with precise matching
const propertyMatches = (
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
    (prop) =>
      normalizedProperty === prop.toLowerCase() ||
      normalizedProperty === camelToKebab(prop).toLowerCase() ||
      normalizedProperty === kebabToCamel(prop).toLowerCase()
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

// Replace CSS-in-JS property value
export const replaceCSSInJSPropertyValue = (
  content: string,
  property: CSSInJSProperty,
  newValue: string | number
): string => {
  // Handle multi-value properties differently
  if (property.isMultiValue && property.originalValue) {
    // For multi-value properties, we need to replace the entire original value
    // This is a simplified approach - in a real implementation, you'd want to
    // track all individual value replacements and reconstruct the full value
    const escapedOriginalValue = String(property.originalValue).replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

    const quotedPattern = new RegExp(
      `(${property.property}\\s*:\\s*)(['"]?)${escapedOriginalValue}\\2(\\s*[,}])`,
      "g"
    );

    const unquotedPattern = new RegExp(
      `(${property.property}\\s*:\\s*)${escapedOriginalValue}(\\s*[,}])`,
      "g"
    );

    // Try quoted pattern first, then unquoted
    let result = content.replace(quotedPattern, `$1$2${newValue}$2$3`);
    if (result === content) {
      result = content.replace(unquotedPattern, `$1${newValue}$2`);
    }

    return result;
  }

  // Handle single-value properties with smart substring replacement
  const originalValue = String(property.value);
  const replacementValue = String(newValue);

  // Check if we need to preserve var() wrapper
  if (originalValue.startsWith("--") && !replacementValue.startsWith("var(")) {
    // This is a CSS custom property without var() wrapper
    // We need to find and replace it within var() calls
    const escapedOriginalValue = originalValue.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

    // Pattern to match var(--original-value) and replace the inner part
    const varPattern = new RegExp(`var\\(${escapedOriginalValue}\\)`, "g");

    // Replace var(--original) with var(--replacement)
    let result = content.replace(varPattern, `var(${replacementValue})`);

    // If no var() wrapper was found, try direct replacement
    if (result === content) {
      const escapedValue = originalValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      // Try both quoted and unquoted patterns for direct replacement
      const quotedPattern = new RegExp(
        `(${property.property}\\s*:\\s*)(['"]?)${escapedValue}\\2(\\s*[,}])`,
        "g"
      );

      const unquotedPattern = new RegExp(
        `(${property.property}\\s*:\\s*)${escapedValue}(\\s*[,}])`,
        "g"
      );

      // Try quoted pattern first, then unquoted
      result = content.replace(quotedPattern, `$1$2${replacementValue}$2$3`);
      if (result === content) {
        result = content.replace(unquotedPattern, `$1${replacementValue}$2`);
      }
    }

    return result;
  }

  // Handle regular replacements (existing logic)
  const escapedValue = originalValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Try both quoted and unquoted patterns
  const quotedPattern = new RegExp(
    `(${property.property}\\s*:\\s*)(['"]?)${escapedValue}\\2(\\s*[,}])`,
    "g"
  );

  const unquotedPattern = new RegExp(
    `(${property.property}\\s*:\\s*)${escapedValue}(\\s*[,}])`,
    "g"
  );

  // Try quoted pattern first, then unquoted
  let result = content.replace(quotedPattern, `$1$2${replacementValue}$2$3`);
  if (result === content) {
    result = content.replace(unquotedPattern, `$1${replacementValue}$2`);
  }

  return result;
};

// Get all CSS-in-JS properties from content
export const getAllCSSInJSProperties = (content: string): CSSInJSProperty[] => {
  const rules = parseCSSInJS(content);
  const allProperties: CSSInJSProperty[] = [];

  for (const rule of rules) {
    allProperties.push(...rule.properties);
  }

  return allProperties;
};

// Check if a value is a CSS custom property
export const isCSSInJSCustomProperty = (value: string | number): boolean => {
  return typeof value === "string" && value.startsWith("--");
};

// Check if a value is a CSS function call
export const isCSSInJSFunctionCall = (value: string | number): boolean => {
  return typeof value === "string" && /^[a-zA-Z-]+\(/.test(value.trim());
};
