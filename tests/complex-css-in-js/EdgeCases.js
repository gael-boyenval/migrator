// Edge cases and complex scenarios for CSS-in-JS testing
import React from 'react';

// File with comments and mixed content
const stylesWithComments = {
  // Main container with CSS variables
  container: {
    padding: 'var(--ds-core-spacing-md)', // 16px padding
    margin: 'var(--ds-core-spacing-sm)',   // 8px margin
    backgroundColor: 'var(--ds-core-color-background)',
    borderRadius: 8,
    boxShadow: 'var(--ds-core-shadow-sm)'
  },
  
  // Button with multiple states
  button: {
    padding: 'var(--ds-core-spacing-sm) var(--ds-core-spacing-md)',
    backgroundColor: 'var(--ds-core-color-primary-500)',
    color: 'var(--ds-core-color-white)',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 500,
    transition: 'all 0.2s ease',
    
    // Hover state
    '&:hover': {
      backgroundColor: 'var(--ds-core-color-primary-600)',
      transform: 'translateY(-1px)'
    },
    
    // Active state
    '&:active': {
      backgroundColor: 'var(--ds-core-color-primary-700)',
      transform: 'translateY(0)'
    },
    
    // Disabled state
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
      backgroundColor: 'var(--ds-core-color-grey-300)'
    }
  }
};

// Object with string values that look like CSS but aren't
const mixedContent = {
  // These are actual CSS properties
  color: 'var(--ds-core-color-text)',
  backgroundColor: 'var(--ds-core-color-background)',
  fontSize: 16,
  fontWeight: 400,
  
  // These are NOT CSS properties (should be ignored)
  apiUrl: 'https://api.example.com',
  version: '1.0.0',
  isEnabled: true,
  config: {
    timeout: 5000,
    retries: 3
  },
  
  // More CSS properties
  padding: 'var(--ds-core-spacing-md)',
  margin: 'var(--ds-core-spacing-sm)',
  border: '1px solid var(--ds-core-color-border)'
};

// Complex nested structure with CSS properties at different levels
const deeplyNestedStyles = {
  level1: {
    padding: 'var(--ds-core-spacing-lg)',
    backgroundColor: 'var(--ds-core-color-background)',
    
    level2: {
      margin: 'var(--ds-core-spacing-md)',
      color: 'var(--ds-core-color-text)',
      
      level3: {
        fontSize: 14,
        fontWeight: 500,
        
        level4: {
          lineHeight: 1.5,
          opacity: 0.9,
          
          level5: {
            textAlign: 'left',
            textDecoration: 'none'
          }
        }
      }
    }
  }
};

// Object with quoted property names (kebab-case)
const quotedProperties = {
  'background-color': 'var(--ds-core-color-background)',
  'font-size': 16,
  'font-weight': 500,
  'line-height': 1.5,
  'border-radius': 8,
  'box-shadow': 'var(--ds-core-shadow-sm)',
  'text-align': 'center',
  'text-decoration': 'none',
  'margin-top': 'var(--ds-core-spacing-sm)',
  'padding-left': 'var(--ds-core-spacing-md)'
};

// Array of objects with CSS properties
const styleArray = [
  {
    name: 'primary',
    styles: {
      backgroundColor: 'var(--ds-core-color-primary-500)',
      color: 'var(--ds-core-color-white)',
      border: '1px solid var(--ds-core-color-primary-500)',
      borderRadius: 4,
      padding: 'var(--ds-core-spacing-sm) var(--ds-core-spacing-md)'
    }
  },
  {
    name: 'secondary',
    styles: {
      backgroundColor: 'var(--ds-core-color-grey-100)',
      color: 'var(--ds-core-color-grey-700)',
      border: '1px solid var(--ds-core-color-grey-300)',
      borderRadius: 4,
      padding: 'var(--ds-core-spacing-sm) var(--ds-core-spacing-md)'
    }
  },
  {
    name: 'danger',
    styles: {
      backgroundColor: 'var(--ds-core-color-red-500)',
      color: 'var(--ds-core-color-white)',
      border: '1px solid var(--ds-core-color-red-500)',
      borderRadius: 4,
      padding: 'var(--ds-core-spacing-sm) var(--ds-core-spacing-md)'
    }
  }
];

// Object with mixed number and string values
const mixedValueTypes = {
  // String values
  color: 'var(--ds-core-color-text)',
  backgroundColor: 'var(--ds-core-color-background)',
  border: '1px solid var(--ds-core-color-border)',
  
  // Number values
  fontSize: 16,
  fontWeight: 500,
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
    }
  }
};

// Object with CSS properties in different formats
const variousFormats = {
  // camelCase properties
  backgroundColor: 'var(--ds-core-color-background)',
  fontSize: 16,
  fontWeight: 500,
  lineHeight: 1.5,
  textAlign: 'center',
  textDecoration: 'none',
  
  // kebab-case properties (quoted)
  'background-color': 'var(--ds-core-color-background)',
  'font-size': 16,
  'font-weight': 500,
  'line-height': 1.5,
  'text-align': 'center',
  'text-decoration': 'none',
  
  // Mixed case
  marginTop: 'var(--ds-core-spacing-sm)',
  paddingLeft: 'var(--ds-core-spacing-md)',
  borderRight: '1px solid var(--ds-core-color-border)',
  'margin-bottom': 'var(--ds-core-spacing-lg)',
  'padding-right': 'var(--ds-core-spacing-xl)',
  'border-left': '2px solid var(--ds-core-color-primary)'
};

// Object with CSS properties that have special characters
const specialCharacters = {
  // Properties with hyphens in camelCase
  'font-family': 'var(--ds-core-font-family-sans)',
  'box-shadow': 'var(--ds-core-shadow-md)',
  'text-shadow': '0 1px 2px rgba(0, 0, 0, 0.1)',
  'border-radius': 8,
  'z-index': 100,
  
  // Properties with underscores
  'border-top': '1px solid var(--ds-core-color-border)',
  'border-bottom': '1px solid var(--ds-core-color-border)',
  'padding-top': 'var(--ds-core-spacing-sm)',
  'padding-bottom': 'var(--ds-core-spacing-sm)',
  
  // Properties with numbers
  'margin-top': 'var(--ds-core-spacing-sm)',
  'padding-left': 'var(--ds-core-spacing-md)',
  'border-right': '1px solid var(--ds-core-color-border)'
};

// Export all test objects
export {
  stylesWithComments,
  mixedContent,
  deeplyNestedStyles,
  quotedProperties,
  styleArray,
  mixedValueTypes,
  variousFormats,
  specialCharacters
};
