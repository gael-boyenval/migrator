// Test mappings for the specific values mentioned
export const testMappings = {
  // Map 14px to a semantic font size
  "14px": {
    options: [
      {
        ifProp: ["fontSize"],
        replace: "var(--ds-core-typography-font-size-xs)",
      },
    ],
  },
  
  // Map --core-space-xl to semantic spacing
  "var(--core-space-xl)": {
    options: [
      {
        ifProp: ["marginBottom"],
        replace: "var(--ds-semantic-spacing-large)",
      },
      {
        ifProp: ["margin"],
        replace: "var(--ds-semantic-spacing-large)",
      },
    ],
  },
  
  // Map the specific margin value
  "0 var(--core-space-xl) var(--core-space-xl)": {
    options: [
      {
        ifProp: ["margin"],
        replace: "0 var(--ds-semantic-spacing-large) var(--ds-semantic-spacing-large)",
      },
    ],
  },
};
