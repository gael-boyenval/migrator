// Test file for precise property matching
const styles = {
  // These should NOT match 'color' property
  backgroundColor: 'var(--ds-core-color-background)',
  borderColor: 'var(--ds-core-color-border)',
  textColor: 'var(--ds-core-color-text)',
  fillColor: 'var(--ds-core-color-fill)',
  
  // This should match 'color' property
  color: 'var(--ds-core-color-text)',
  
  // These should NOT match 'background' property
  backgroundColor: 'var(--ds-core-color-background)',
  borderColor: 'var(--ds-core-color-border)',
  
  // This should match 'background' property
  background: 'var(--ds-core-color-background)',
  
  // These should NOT match 'border' property
  borderColor: 'var(--ds-core-color-border)',
  borderWidth: '1px',
  borderStyle: 'solid',
  
  // This should match 'border' property
  border: '1px solid var(--ds-core-color-border)',
};

export { styles };
