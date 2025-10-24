// Test file with ONLY properties that should NOT match
const styles = {
  // These should NOT match 'background' property
  backgroundColor: 'var(--ds-core-color-background)',
  borderColor: 'var(--ds-core-color-border)',
  
  // These should NOT match 'border' property  
  borderColor: 'var(--ds-core-color-border)',
  borderWidth: '1px',
  borderStyle: 'solid',
};

export { styles };
