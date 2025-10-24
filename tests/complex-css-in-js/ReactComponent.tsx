import React, { useState, useEffect } from "react";
import { styled } from "@emotion/styled";

// Complex TypeScript interface with CSS-in-JS
interface ComponentStyles {
  container: {
    padding: string;
    margin: string;
    backgroundColor: string;
    borderRadius: number;
    boxShadow: string;
  };
  button: {
    padding: string;
    backgroundColor: string;
    color: string;
    border: string;
    borderRadius: number;
    cursor: string;
    transition: string;
    "&:hover": {
      backgroundColor: string;
      transform: string;
    };
  };
  input: {
    padding: string;
    border: string;
    borderRadius: number;
    fontSize: number;
    fontFamily: string;
    "&:focus": {
      outline: string;
      borderColor: string;
    };
  };
}

// Styled component with CSS-in-JS
const StyledContainer = styled.div<{ isActive: boolean }>`
  padding: var(--ds-core-spacing-md);
  margin: var(--ds-core-spacing-sm);
  background-color: var(--ds-core-color-white);
  border-radius: var(--ds-core-border-radius-md);
  box-shadow: var(--ds-core-shadow-sm);

  ${(props) =>
    props.isActive &&
    `
    background-color: var(--ds-core-color-primary-50);
    border: 1px solid var(--ds-core-color-primary-200);
  `}
`;

// Complex component with multiple style objects
const ComplexComponent: React.FC<{ theme: "light" | "dark" }> = ({ theme }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Dynamic styles based on state
  const dynamicStyles: ComponentStyles = {
    container: {
      padding: "var(--ds-core-spacing-lg)",
      margin: "var(--ds-core-spacing-md)",
      backgroundColor:
        theme === "dark"
          ? "var(--ds-core-color-grey-900)"
          : "var(--ds-core-color-white)",
      borderRadius: 8,
      boxShadow: "var(--ds-core-shadow-lg)",
    },
    button: {
      padding: "var(--ds-core-spacing-sm) var(--ds-core-spacing-md)",
      backgroundColor: "var(--ds-core-color-primary-500)",
      color: "var(--ds-core-color-white)",
      border: "none",
      borderRadius: 4,
      cursor: "pointer",
      transition: "all 0.2s ease",
      "&:hover": {
        backgroundColor: "var(--ds-core-color-primary-600)",
        transform: "translateY(-1px)",
      },
    },
    input: {
      padding: "var(--ds-core-spacing-sm)",
      border: "1px solid var(--ds-core-color-grey-300)",
      borderRadius: 4,
      fontSize: 14,
      fontFamily: "var(--ds-core-font-family-sans)",
      "&:focus": {
        outline: "none",
        borderColor: "var(--ds-core-color-primary-500)",
      },
    },
  };

  // Nested object with CSS properties
  const nestedStyles = {
    header: {
      title: {
        fontSize: 24,
        fontWeight: 600,
        color: "var(--ds-core-color-grey-900)",
        marginBottom: "var(--ds-core-spacing-sm)",
      },
      subtitle: {
        fontSize: 16,
        fontWeight: 400,
        color: "var(--ds-core-color-grey-600)",
        marginBottom: "var(--ds-core-spacing-md)",
      },
    },
    content: {
      padding: "var(--ds-core-spacing-lg)",
      backgroundColor: "var(--ds-core-color-grey-50)",
      borderRadius: 8,
    },
  };

  // Array of style objects
  const styleVariants = [
    {
      name: "primary",
      styles: {
        backgroundColor: "var(--ds-core-color-primary-500)",
        color: "var(--ds-core-color-white)",
        border: "1px solid var(--ds-core-color-primary-500)",
      },
    },
    {
      name: "secondary",
      styles: {
        backgroundColor: "var(--ds-core-color-grey-100)",
        color: "var(--ds-core-color-grey-700)",
        border: "1px solid var(--ds-core-color-grey-300)",
      },
    },
    {
      name: "danger",
      styles: {
        backgroundColor: "var(--ds-core-color-red-500)",
        color: "var(--ds-core-color-white)",
        border: "1px solid var(--ds-core-color-red-500)",
      },
    },
  ];

  // Function that returns styles
  const getButtonStyles = (variant: string, disabled: boolean) => {
    const baseStyles = {
      padding: "var(--ds-core-spacing-sm) var(--ds-core-spacing-md)",
      borderRadius: 4,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.6 : 1,
      transition: "all 0.2s ease",
    };

    const variantStyles =
      styleVariants.find((v) => v.name === variant)?.styles || {};

    return {
      ...baseStyles,
      ...variantStyles,
    };
  };

  // Complex object with mixed property types
  const complexStyles = {
    // String values
    color: "var(--ds-core-color-grey-900)",
    backgroundColor: "var(--ds-core-color-white)",
    border: "1px solid var(--ds-core-color-grey-300)",

    // Number values
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.5,
    opacity: 0.9,

    // Mixed nested objects
    states: {
      hover: {
        backgroundColor: "var(--ds-core-color-grey-50)",
        transform: "translateY(-1px)",
        boxShadow: "var(--ds-core-shadow-md)",
      },
      active: {
        backgroundColor: "var(--ds-core-color-primary-100)",
        borderColor: "var(--ds-core-color-primary-500)",
      },
      disabled: {
        opacity: 0.5,
        cursor: "not-allowed",
        backgroundColor: "var(--ds-core-color-grey-100)",
      },
    },

    // Responsive styles
    responsive: {
      mobile: {
        fontSize: 14,
        padding: "var(--ds-core-spacing-sm)",
      },
      tablet: {
        fontSize: 16,
        padding: "var(--ds-core-spacing-md)",
      },
      desktop: {
        fontSize: 18,
        padding: "var(--ds-core-spacing-lg)",
      },
    },
  };

  return (
    <StyledContainer isActive={isLoading}>
      <div style={dynamicStyles.container}>
        <h1 style={nestedStyles.header.title}>Complex Component</h1>
        <p style={nestedStyles.header.subtitle}>With multiple style objects</p>

        <div style={nestedStyles.content}>
          <input style={dynamicStyles.input} placeholder="Enter text..." />

          {styleVariants.map((variant, index) => (
            <button
              key={index}
              style={getButtonStyles(variant.name, isLoading)}
              onClick={() => setIsLoading(!isLoading)}
            >
              {variant.name} button
            </button>
          ))}
        </div>
      </div>
    </StyledContainer>
  );
};

export default ComplexComponent;
