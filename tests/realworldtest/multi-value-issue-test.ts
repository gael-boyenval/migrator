// Test file to demonstrate the multi-value issue
export const styles = {
  // This should be found and processed
  padding: "var(--core-space-m) var(--core-space-l)",

  // This should NOT be found (no CSS custom properties)
  margin: "8px 12px",

  // This should be found and processed
  mixed: {
    padding: "var(--core-space-m) var(--core-space-l)",
    margin: "8px 12px",
  },
};
