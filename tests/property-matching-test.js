// Test file to demonstrate property matching
const styles = {
  // camelCase properties
  backgroundColor: 'var(--ds-core-color-background)',
  marginTop: 'var(--ds-core-spacing-sm)',
  borderColor: 'var(--ds-core-color-border)',
  
  // kebab-case properties (quoted)
  'background-color': 'var(--ds-core-color-background)',
  'margin-top': 'var(--ds-core-spacing-sm)',
  'border-color': 'var(--ds-core-color-border)',
  
  // Mixed case
  paddingLeft: 'var(--ds-core-spacing-md)',
  'padding-right': 'var(--ds-core-spacing-md)',
};

export { styles };
