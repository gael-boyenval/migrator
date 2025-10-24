// Complex JavaScript file with CSS-in-JS styles
import { createElement } from 'react';

// Complex object with mixed CSS properties
const globalStyles = {
  // String values with CSS variables
  color: 'var(--ds-core-color-text-primary)',
  backgroundColor: 'var(--ds-core-color-background)',
  border: '1px solid var(--ds-core-color-border)',
  boxShadow: 'var(--ds-core-shadow-sm)',
  
  // Number values
  fontSize: 16,
  fontWeight: 400,
  lineHeight: 1.5,
  opacity: 0.9,
  zIndex: 100,
  
  // Mixed nested objects
  states: {
    hover: {
      backgroundColor: 'var(--ds-core-color-hover)',
      transform: 'translateY(-1px)',
      boxShadow: 'var(--ds-core-shadow-md)'
    },
    active: {
      backgroundColor: 'var(--ds-core-color-active)',
      transform: 'translateY(0)',
      boxShadow: 'var(--ds-core-shadow-sm)'
    },
    disabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
      backgroundColor: 'var(--ds-core-color-disabled)'
    }
  }
};

// Function that returns dynamic styles
function createButtonStyles(variant, size, disabled) {
  const baseStyles = {
    padding: 'var(--ds-core-spacing-sm) var(--ds-core-spacing-md)',
    borderRadius: 4,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: 'all 0.2s ease',
    fontSize: 14,
    fontWeight: 500
  };

  const variantStyles = {
    primary: {
      backgroundColor: 'var(--ds-core-color-primary-500)',
      color: 'var(--ds-core-color-white)',
      border: '1px solid var(--ds-core-color-primary-500)'
    },
    secondary: {
      backgroundColor: 'var(--ds-core-color-grey-100)',
      color: 'var(--ds-core-color-grey-700)',
      border: '1px solid var(--ds-core-color-grey-300)'
    },
    danger: {
      backgroundColor: 'var(--ds-core-color-red-500)',
      color: 'var(--ds-core-color-white)',
      border: '1px solid var(--ds-core-color-red-500)'
    }
  };

  const sizeStyles = {
    small: {
      padding: 'var(--ds-core-spacing-xs) var(--ds-core-spacing-sm)',
      fontSize: 12
    },
    medium: {
      padding: 'var(--ds-core-spacing-sm) var(--ds-core-spacing-md)',
      fontSize: 14
    },
    large: {
      padding: 'var(--ds-core-spacing-md) var(--ds-core-spacing-lg)',
      fontSize: 16
    }
  };

  return {
    ...baseStyles,
    ...variantStyles[variant],
    ...sizeStyles[size]
  };
}

// Complex nested object structure
const layoutStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 'var(--ds-core-spacing-lg)',
    backgroundColor: 'var(--ds-core-color-background)',
    borderRadius: 8,
    boxShadow: 'var(--ds-core-shadow-md)'
  },
  
  header: {
    title: {
      fontSize: 24,
      fontWeight: 600,
      color: 'var(--ds-core-color-text-primary)',
      marginBottom: 'var(--ds-core-spacing-sm)'
    },
    subtitle: {
      fontSize: 16,
      fontWeight: 400,
      color: 'var(--ds-core-color-text-secondary)',
      marginBottom: 'var(--ds-core-spacing-md)'
    }
  },
  
  content: {
    padding: 'var(--ds-core-spacing-md)',
    backgroundColor: 'var(--ds-core-color-surface)',
    borderRadius: 6,
    border: '1px solid var(--ds-core-color-border)'
  },
  
  footer: {
    padding: 'var(--ds-core-spacing-sm)',
    backgroundColor: 'var(--ds-core-color-grey-50)',
    borderTop: '1px solid var(--ds-core-color-border)',
    fontSize: 12,
    color: 'var(--ds-core-color-text-secondary)'
  }
};

// Array of style objects
const cardVariants = [
  {
    name: 'default',
    styles: {
      backgroundColor: 'var(--ds-core-color-white)',
      border: '1px solid var(--ds-core-color-border)',
      borderRadius: 8,
      padding: 'var(--ds-core-spacing-md)',
      boxShadow: 'var(--ds-core-shadow-sm)'
    }
  },
  {
    name: 'elevated',
    styles: {
      backgroundColor: 'var(--ds-core-color-white)',
      border: 'none',
      borderRadius: 12,
      padding: 'var(--ds-core-spacing-lg)',
      boxShadow: 'var(--ds-core-shadow-lg)'
    }
  },
  {
    name: 'outlined',
    styles: {
      backgroundColor: 'transparent',
      border: '2px solid var(--ds-core-color-primary-500)',
      borderRadius: 8,
      padding: 'var(--ds-core-spacing-md)',
      boxShadow: 'none'
    }
  }
];

// Complex object with comments and mixed content
const complexStyles = {
  // Main container styles
  container: {
    padding: 'var(--ds-core-spacing-lg)', // 24px
    margin: 'var(--ds-core-spacing-md)',  // 16px
    backgroundColor: 'var(--ds-core-color-background)',
    borderRadius: 8,
    boxShadow: 'var(--ds-core-shadow-md)',
    
    // Nested hover state
    '&:hover': {
      backgroundColor: 'var(--ds-core-color-hover)',
      transform: 'translateY(-2px)',
      boxShadow: 'var(--ds-core-shadow-lg)'
    }
  },
  
  // Button styles with multiple states
  button: {
    base: {
      padding: 'var(--ds-core-spacing-sm) var(--ds-core-spacing-md)',
      borderRadius: 4,
      cursor: 'pointer',
      fontSize: 14,
      fontWeight: 500,
      transition: 'all 0.2s ease'
    },
    
    variants: {
      primary: {
        backgroundColor: 'var(--ds-core-color-primary-500)',
        color: 'var(--ds-core-color-white)',
        border: '1px solid var(--ds-core-color-primary-500)',
        '&:hover': {
          backgroundColor: 'var(--ds-core-color-primary-600)',
          transform: 'translateY(-1px)'
        }
      },
      secondary: {
        backgroundColor: 'var(--ds-core-color-grey-100)',
        color: 'var(--ds-core-color-grey-700)',
        border: '1px solid var(--ds-core-color-grey-300)',
        '&:hover': {
          backgroundColor: 'var(--ds-core-color-grey-200)',
          transform: 'translateY(-1px)'
        }
      }
    }
  },
  
  // Form styles
  form: {
    input: {
      padding: 'var(--ds-core-spacing-sm)',
      border: '1px solid var(--ds-core-color-border)',
      borderRadius: 4,
      fontSize: 14,
      fontFamily: 'var(--ds-core-font-family-sans)',
      backgroundColor: 'var(--ds-core-color-surface)',
      color: 'var(--ds-core-color-text)',
      
      '&:focus': {
        outline: 'none',
        borderColor: 'var(--ds-core-color-primary-500)',
        boxShadow: '0 0 0 2px var(--ds-core-color-primary-200)'
      },
      
      '&:disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
        backgroundColor: 'var(--ds-core-color-grey-100)'
      }
    },
    
    label: {
      fontSize: 14,
      fontWeight: 500,
      color: 'var(--ds-core-color-text-primary)',
      marginBottom: 'var(--ds-core-spacing-xs)',
      display: 'block'
    },
    
    error: {
      fontSize: 12,
      color: 'var(--ds-core-color-red-500)',
      marginTop: 'var(--ds-core-spacing-xs)'
    }
  }
};

// Export all styles
export {
  globalStyles,
  createButtonStyles,
  layoutStyles,
  cardVariants,
  complexStyles
};
