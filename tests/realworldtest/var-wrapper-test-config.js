// Test config for var() wrapper issue
module.exports = {
  cssValues: {
    mappings: {
      "var(--core-space-m)": {
        options: [
          {
            ifProp: ["padding"],
            replace: "var(--ds-semantic-spacing-m)",
          },
        ],
      },
      "var(--core-space-xs)": {
        options: [
          {
            ifProp: ["padding"],
            replace: "var(--ds-semantic-spacing-xs)",
          },
        ],
      },
    },
  },
};
