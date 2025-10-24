// Complex TypeScript file with CSS-in-JS styles
import { CSSProperties } from "react";

// Type definitions with CSS properties
interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  border: string;
}

interface SpacingScale {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

interface TypographyScale {
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
  fontFamily: string;
}

// Complex theme object with CSS-in-JS
const theme: {
  colors: ThemeColors;
  spacing: SpacingScale;
  typography: {
    heading: TypographyScale;
    body: TypographyScale;
    caption: TypographyScale;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
  };
} = {
  colors: {
    primary: "var(--ds-core-color-primary-500)",
    secondary: "var(--ds-core-color-secondary-500)",
    background: "var(--ds-core-color-background)",
    surface: "var(--ds-core-color-surface)",
    text: "var(--ds-core-color-text)",
    border: "var(--ds-core-color-border)",
  },
  spacing: {
    xs: "var(--ds-core-spacing-xs)",
    sm: "var(--ds-core-spacing-sm)",
    md: "var(--ds-core-spacing-md)",
    lg: "var(--ds-core-spacing-lg)",
    xl: "var(--ds-core-spacing-xl)",
  },
  typography: {
    heading: {
      fontSize: 24,
      fontWeight: 600,
      lineHeight: 1.2,
      fontFamily: "var(--ds-core-font-family-heading)",
    },
    body: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1.5,
      fontFamily: "var(--ds-core-font-family-body)",
    },
    caption: {
      fontSize: 14,
      fontWeight: 500,
      lineHeight: 1.4,
      fontFamily: "var(--ds-core-font-family-body)",
    },
  },
  shadows: {
    sm: "var(--ds-core-shadow-sm)",
    md: "var(--ds-core-shadow-md)",
    lg: "var(--ds-core-shadow-lg)",
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
  },
};

// Complex style objects with mixed types
const componentStyles: Record<string, CSSProperties> = {
  container: {
    padding: theme.spacing.md,
    margin: theme.spacing.sm,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
    boxShadow: theme.shadows.sm,
  },

  button: {
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    backgroundColor: theme.colors.primary,
    color: "var(--ds-core-color-white)",
    border: "none",
    borderRadius: theme.borderRadius.sm,
    cursor: "pointer",
    fontSize: theme.typography.body.fontSize,
    fontWeight: theme.typography.body.fontWeight,
    fontFamily: theme.typography.body.fontFamily,
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "var(--ds-core-color-primary-600)",
      transform: "translateY(-1px)",
    },
  },

  input: {
    padding: theme.spacing.sm,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.borderRadius.sm,
    fontSize: theme.typography.body.fontSize,
    fontFamily: theme.typography.body.fontFamily,
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
    "&:focus": {
      outline: "none",
      borderColor: theme.colors.primary,
      boxShadow: `0 0 0 2px ${theme.colors.primary}20`,
    },
  },
};

// Function that generates styles based on props
const createResponsiveStyles = (
  breakpoint: "mobile" | "tablet" | "desktop"
) => {
  const baseStyles = {
    padding: theme.spacing.md,
    margin: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
  };

  const responsiveStyles = {
    mobile: {
      ...baseStyles,
      fontSize: 14,
      padding: theme.spacing.sm,
      margin: theme.spacing.xs,
    },
    tablet: {
      ...baseStyles,
      fontSize: 16,
      padding: theme.spacing.md,
      margin: theme.spacing.sm,
    },
    desktop: {
      ...baseStyles,
      fontSize: 18,
      padding: theme.spacing.lg,
      margin: theme.spacing.md,
    },
  };

  return responsiveStyles[breakpoint];
};

// Complex nested object with CSS properties
const layoutStyles = {
  grid: {
    container: {
      display: "grid",
      gridTemplateColumns: "repeat(12, 1fr)",
      gap: theme.spacing.md,
      padding: theme.spacing.lg,
      backgroundColor: theme.colors.background,
    },
    item: {
      padding: theme.spacing.md,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.md,
      boxShadow: theme.shadows.sm,
    },
  },

  flexbox: {
    container: {
      display: "flex",
      flexDirection: "row" as const,
      justifyContent: "space-between",
      alignItems: "center",
      padding: theme.spacing.lg,
      backgroundColor: theme.colors.background,
    },
    item: {
      flex: 1,
      padding: theme.spacing.md,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.sm,
      margin: theme.spacing.xs,
    },
  },
};

// Array of style objects with CSS properties
const buttonVariants = [
  {
    name: "primary",
    styles: {
      backgroundColor: theme.colors.primary,
      color: "var(--ds-core-color-white)",
      border: `1px solid ${theme.colors.primary}`,
      borderRadius: theme.borderRadius.sm,
      padding: `${theme.spacing.sm} ${theme.spacing.md}`,
      fontSize: theme.typography.body.fontSize,
      fontWeight: theme.typography.body.fontWeight,
    },
  },
  {
    name: "secondary",
    styles: {
      backgroundColor: "var(--ds-core-color-grey-100)",
      color: theme.colors.text,
      border: `1px solid ${theme.colors.border}`,
      borderRadius: theme.borderRadius.sm,
      padding: `${theme.spacing.sm} ${theme.spacing.md}`,
      fontSize: theme.typography.body.fontSize,
      fontWeight: theme.typography.body.fontWeight,
    },
  },
  {
    name: "outline",
    styles: {
      backgroundColor: "transparent",
      color: theme.colors.primary,
      border: `2px solid ${theme.colors.primary}`,
      borderRadius: theme.borderRadius.sm,
      padding: `${theme.spacing.sm} ${theme.spacing.md}`,
      fontSize: theme.typography.body.fontSize,
      fontWeight: theme.typography.body.fontWeight,
    },
  },
];

// Complex object with mixed content (strings, numbers, nested objects)
const complexStyles = {
  // String CSS values
  color: theme.colors.text,
  backgroundColor: theme.colors.background,
  border: `1px solid ${theme.colors.border}`,
  boxShadow: theme.shadows.md,

  // Number values
  fontSize: theme.typography.body.fontSize,
  fontWeight: theme.typography.body.fontWeight,
  lineHeight: theme.typography.body.lineHeight,
  opacity: 0.95,
  zIndex: 1000,

  // Nested objects with CSS properties
  states: {
    hover: {
      backgroundColor: "var(--ds-core-color-grey-50)",
      transform: "translateY(-2px)",
      boxShadow: theme.shadows.lg,
    },
    active: {
      backgroundColor: theme.colors.primary,
      color: "var(--ds-core-color-white)",
      transform: "translateY(0)",
    },
    disabled: {
      opacity: 0.5,
      cursor: "not-allowed",
      backgroundColor: "var(--ds-core-color-grey-100)",
    },
  },

  // Media queries simulation
  media: {
    mobile: {
      fontSize: 14,
      padding: theme.spacing.sm,
      margin: theme.spacing.xs,
    },
    tablet: {
      fontSize: 16,
      padding: theme.spacing.md,
      margin: theme.spacing.sm,
    },
    desktop: {
      fontSize: 18,
      padding: theme.spacing.lg,
      margin: theme.spacing.md,
    },
  },
};

// Export styles for use in components
export {
  theme,
  componentStyles,
  createResponsiveStyles,
  layoutStyles,
  buttonVariants,
  complexStyles,
};
