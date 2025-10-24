// Test config for padding migration
module.exports = {
  cssValues: {
    mappings: {
      "var(--ds-core-size-05)": {
        options: [
          {
            ifProp: ["padding"],
            replace: "var(--ds-semantic-spacing-s)",
          },
        ],
      },
      "var(--ds-core-size-08)": {
        options: [
          {
            ifProp: ["padding"],
            replace: "var(--ds-semantic-spacing-l)",
          },
        ],
      },
    },
  },
};
