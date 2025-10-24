// Test file for CSS-in-JS properties that should be migrated
export const testStyles = {
  // Test fontSize property
  text: {
    fontSize: 'var(--ds-core-typography-font-size-xs)',
  },
  
  // Test marginBottom property
  container: {
    marginBottom: 'var(--ds-semantic-spacing-large)',
  },
  
  // Test margin property with multiple values
  wrapper: {
    margin: '0 var(--ds-semantic-spacing-large) var(--ds-semantic-spacing-large)',
  },
  
  // Test mixed properties
  mixed: {
    fontSize: 'var(--ds-core-typography-font-size-xs)',
    marginBottom: 'var(--ds-semantic-spacing-large)',
    margin: '0 var(--ds-semantic-spacing-large) var(--ds-semantic-spacing-large)',
    padding: 'var(--core-space-m)',
  },
  
  // Test nested objects
  nested: {
    button: {
      fontSize: 'var(--ds-core-typography-font-size-xs)',
      marginBottom: 'var(--ds-semantic-spacing-large)',
    },
    input: {
      margin: '0 var(--ds-semantic-spacing-large) var(--ds-semantic-spacing-large)',
    },
  },
};
