// Simple test file with CSS-in-JS
const styles = {
  padding: 'var(--ds-core-spacing-md)',
  margin: 'var(--ds-core-spacing-sm)',
  backgroundColor: 'var(--ds-core-color-background)',
  color: 'var(--ds-core-color-text)',
  fontSize: 16,
  fontWeight: 500
};

const buttonStyles = {
  padding: 'var(--ds-core-spacing-sm) var(--ds-core-spacing-md)',
  backgroundColor: 'var(--ds-core-color-primary-500)',
  color: 'var(--ds-core-color-white)',
  borderRadius: 4,
  cursor: 'pointer'
};

export { styles, buttonStyles };
