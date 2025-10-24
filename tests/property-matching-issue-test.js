// Test file to detect property matching issues
const styles = {
  // These should NOT match 'color' property
  backgroundColor: 'var(--ds-core-color-background)',
  borderColor: 'var(--ds-core-color-border)',
  textColor: 'var(--ds-core-color-text)',
  fillColor: 'var(--ds-core-color-fill)',
  
  // These should match 'color' property
  color: 'var(--ds-core-color-text)',
  
  // These should NOT match 'background' property
  backgroundColor: 'var(--ds-core-color-background)',
  borderColor: 'var(--ds-core-color-border)',
  
  // These should match 'background' property
  background: 'var(--ds-core-color-background)',
  
  // These should NOT match 'border' property
  borderColor: 'var(--ds-core-color-border)',
  borderWidth: '1px',
  borderStyle: 'solid',
  
  // These should match 'border' property
  border: '1px solid var(--ds-core-color-border)',
  
  // Edge cases - these should NOT match 'color'
  'background-color': 'var(--ds-core-color-background)',
  'border-color': 'var(--ds-core-color-border)',
  'text-color': 'var(--ds-core-color-text)',
  
  // This should match 'color'
  'color': 'var(--ds-core-color-text)',
};

export { styles };
