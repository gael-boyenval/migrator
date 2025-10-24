// Test file for CSS-in-JS properties that should be migrated
export const testStyles = {
  // Test fontSize property
  text: {
    fontSize: "14px",
  },

  // Test marginBottom property
  container: {
    marginBottom: "var(--core-space-xl)",
  },

  // Test margin property with multiple values
  wrapper: {
    margin: "0 var(--core-space-xl) var(--core-space-xl)",
  },

  // Test mixed properties
  mixed: {
    fontSize: "14px",
    marginBottom: "var(--core-space-xl)",
    margin: "0 var(--core-space-xl) var(--core-space-xl)",
    padding: "var(--core-space-m)",
  },

  // Test nested objects
  nested: {
    button: {
      fontSize: "14px",
      marginBottom: "var(--core-space-xl)",
    },
    input: {
      margin: "0 var(--core-space-xl) var(--core-space-xl)",
    },
  },
};
