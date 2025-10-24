
export const sizingProps = [
  "min-height",
  "max-height",
  "min-width",
  "max-width",
  "container",
  "height",
  "width",
  "flex"
];
export const spacingProps = [
  "padding-inline-start",
  "padding-block-start",
  "margin-inline-start",
  "margin-inline-start",
  "padding-inline-end",
  "margin-block-start",
  "margin-block-start",
  "padding-block-end",
  "margin-inline-end",
  "margin-inline-end",
  "margin-block-end",
  "margin-block-end",
  "padding-bottom",
  "padding-inline",
  "padding-right",
  "padding-block",
  "margin-bottom",
  "margin-inline",
  "padding-left",
  "margin-right",
  "margin-block",
  "padding-top",
  "margin-left",
  "margin-top",
  "padding-x",
  "padding-y",
  "margin-x",
  "margin-y",
  "padding",
  "bottom",
  "margin",
  "right",
  "left",
  "top",
  "gap"
];
export const backgroundProps = [
  "background-color",
  "background"
];
export const contentProps = [
  "color",
  "fill"
];
export const borderColorProps = [
  "border-bottom-color",
  "border-right-color",
  "border-left-color",
  "border-top-color",
  "border-bottom",
  "border-color",
  "border-right",
  "border-left",
  "border-top",
  "border"
];
export const fontProps = [
  "font-family"
];
export const fontSizeProps = [
  "font-size"
];
export const fontWeightProps = [
  "font-weight"
];
export const lineHeightProps = [
  "line-height"
];
export const borderRadiusProps = [
  "border-radius"
];
export const simpleReplaces = {
  "--ds-dimension-page-content-max-width-default": "--ds-semantic-layout-text-max-width",
  "--ds-dimension-page-content-gutter-default": "--ds-semantic-layout-gutter-default",
  "--ds-dimension-page-container-main-gutter": "0px",
  "--ds-dimension-page-container-main-margin": "0px",
  "--ds-color-icon-link-secondary-default": "--ds-semantic-color-action-content-medium",
  "--ds-color-text-link-secondary-default": "--ds-semantic-color-action-content-medium",
  "--ds-color-icon-link-secondary-active": "--ds-semantic-color-action-content-stronger",
  "--ds-color-text-link-secondary-active": "--ds-semantic-color-action-content-stronger",
  "--ds-dimension-font-family-annotation": "--ds-semantic-font-annotation",
  "--ds-color-bg-accent-subtlest-purple": "--ds-semantic-color-accent1-surface-subtlest",
  "--ds-color-bg-success-surface-strong": "--ds-semantic-color-success-surface-medium",
  "--ds-color-bg-success-surface-subtle": "--ds-semantic-color-success-surface-subtle",
  "--ds-color-border-accent-gray-subtle": "--ds-semantic-color-disabled-border-medium",
  "--ds-color-icon-link-primary-default": "--ds-semantic-color-action-content-medium",
  "--ds-color-icon-link-secondary-hover": "--ds-semantic-color-action-content-stronger",
  "--ds-color-text-link-primary-default": "--ds-semantic-color-action-content-medium",
  "--ds-color-text-link-secondary-hover": "--ds-semantic-color-action-content-stronger",
  "--ds-color-bg-accent-subtlest-amber": "--ds-semantic-color-alert-surface-subtlest",
  "--ds-color-bg-accent-subtlest-green": "--ds-semantic-color-success-surface-subtlest",
  "--ds-color-bg-danger-surface-strong": "--ds-semantic-color-danger-surface-medium",
  "--ds-color-bg-danger-surface-subtle": "--ds-semantic-color-danger-surface-subtle",
  "--ds-color-border-secondary-default": "--ds-semantic-color-action-border-medium",
  "--ds-color-icon-link-primary-active": "--ds-semantic-color-action-content-stronger",
  "--ds-color-text-link-primary-active": "--ds-semantic-color-action-content-stronger",
  "--ds-color-bg-accent-subtle-orange": "--ds-semantic-color-accent4-surface-subtle",
  "--ds-color-bg-accent-subtle-purple": "--ds-semantic-color-accent1-surface-subtle",
  "--ds-color-bg-accent-subtle-yellow": "--ds-semantic-color-accent5-surface-subtle",
  "--ds-color-bg-accent-subtlest-blue": "--ds-semantic-color-action-surface-subtlest",
  "--ds-color-bg-accent-subtlest-cyan": "--ds-semantic-color-information-surface-subtlest",
  "--ds-color-bg-accent-subtlest-lime": "--ds-semantic-color-accent3-surface-subtlest",
  "--ds-color-bg-accent-subtlest-pink": "--ds-semantic-color-accent2-surface-subtlest",
  "--ds-color-bg-alert-surface-strong": "--ds-semantic-color-alert-surface-medium",
  "--ds-color-bg-alert-surface-subtle": "--ds-semantic-color-alert-surface-subtle",
  "--ds-color-border-neutral-disabled": "--ds-semantic-color-disabled-border-medium",
  "--ds-color-border-secondary-active": "--ds-semantic-color-action-border-stronger",
  "--ds-color-icon-link-primary-hover": "--ds-semantic-color-action-content-stronger",
  "--ds-color-text-link-primary-hover": "--ds-semantic-color-action-content-strong",
  "--ds-dimension-page-content-margin": "--ds-semantic-layout-margin-default",
  "--ds-dimension-font-family-default": "--ds-semantic-font-default",
  "--ds-color-bg-accent-subtle-amber": "--ds-semantic-color-alert-surface-subtle",
  "--ds-color-bg-accent-subtle-green": "--ds-semantic-color-success-surface-subtle",
  "--ds-color-bg-info-surface-strong": "--ds-semantic-color-information-surface-medium",
  "--ds-color-bg-info-surface-subtle": "--ds-semantic-color-information-surface-subtle",
  "--ds-color-border-neutral-default": "--ds-semantic-color-layout-border-strong-default",
  "--ds-color-border-primary-default": "--ds-semantic-color-action-border-medium",
  "--ds-color-border-secondary-hover": "--ds-semantic-color-action-border-strong",
  "--ds-color-bg-accent-subtle-blue": "--ds-semantic-color-action-surface-subtle",
  "--ds-color-bg-accent-subtle-cyan": "--ds-semantic-color-information-surface-subtle",
  "--ds-color-bg-accent-subtle-grey": "--ds-semantic-color-layout-surface-medium-active",
  "--ds-color-bg-accent-subtle-lime": "--ds-semantic-color-accent3-surface-subtle",
  "--ds-color-bg-accent-subtle-pink": "--ds-semantic-color-accent2-surface-subtle",
  "--ds-color-border-neutral-active": "--ds-semantic-color-layout-border-strongest",
  "--ds-color-border-primary-active": "--ds-semantic-color-action-border-stronger",
  "--ds-color-bg-accent-subtle-red": "--ds-semantic-color-danger-surface-subtle",
  "--ds-color-bg-secondary-default": "--ds-semantic-color-layout-surface-medium-default",
  "--ds-color-border-accent-orange": "--ds-semantic-color-accent4-border-subtle",
  "--ds-color-border-accent-purple": "--ds-semantic-color-accent1-border-subtle",
  "--ds-color-border-accent-yellow": "--ds-semantic-color-accent5-border-subtle",
  "--ds-color-border-neutral-hover": "--ds-semantic-color-layout-border-strong-hover",
  "--ds-color-border-primary-hover": "--ds-semantic-color-action-border-strong",
  "--ds-dimension-radius-secondary": "--ds-semantic-radius-action",
  "--ds-color-bg-neutral-disabled": "--ds-semantic-color-disabled-surface-medium",
  "--ds-color-bg-secondary-active": "--ds-semantic-color-action-surface-subtlest",
  "--ds-color-bg-tertiary-default": "--ds-semantic-color-layout-surface-medium-default",
  "--ds-color-border-accent-amber": "--ds-semantic-color-alert-border-subtle",
  "--ds-color-border-accent-green": "--ds-semantic-color-success-border-subtle",
  "--ds-color-icon-primary-ondark": "--ds-semantic-color-layout-invert-content-medium",
  "--ds-color-text-primary-ondark": "--ds-semantic-color-layout-invert-content-medium",
  "--ds-color-bg-neutral-default": "--ds-semantic-color-layout-surface-medium-default",
  "--ds-color-bg-primary-default": "--ds-semantic-color-action-surface-medium",
  "--ds-color-bg-secondary-hover": "--ds-semantic-color-action-surface-subtlest",
  "--ds-color-bg-success-default": "--ds-semantic-color-success-surface-medium",
  "--ds-color-bg-tertiary-active": "--ds-semantic-color-layout-surface-medium-selected",
  "--ds-color-border-accent-blue": "--ds-semantic-color-layout-border-medium-selected",
  "--ds-color-border-accent-cyan": "--ds-semantic-color-information-border-subtle",
  "--ds-color-border-accent-gray": "--ds-semantic-color-layout-border-strong-default",
  "--ds-color-border-accent-lime": "--ds-semantic-color-accent3-border-subtle",
  "--ds-color-border-accent-pink": "--ds-semantic-color-accent2-border-subtle",
  "--ds-color-icon-accent-orange": "--ds-semantic-color-accent4-content-strong",
  "--ds-color-icon-accent-purple": "--ds-semantic-color-accent1-content-strong",
  "--ds-color-icon-accent-yellow": "--ds-semantic-color-accent5-content-strong",
  "--ds-color-text-accent-orange": "--ds-semantic-color-accent4-content-strong",
  "--ds-color-text-accent-purple": "--ds-semantic-color-accent1-content-strong",
  "--ds-color-text-accent-yellow": "--ds-semantic-color-accent5-content-strong",
  "--ds-dimension-radius-primary": "--ds-semantic-radius-default",
  "--ds-color-bg-danger-default": "--ds-semantic-color-danger-surface-medium",
  "--ds-color-bg-neutral-active": "--ds-semantic-color-neutral-surface-medium-active",
  "--ds-color-bg-primary-active": "--ds-semantic-color-action-surface-stronger",
  "--ds-color-bg-success-active": "--ds-semantic-color-success-surface-medium",
  "--ds-color-bg-tertiary-hover": "--ds-semantic-color-layout-surface-medium-hover",
  "--ds-color-border-accent-red": "--ds-semantic-color-danger-border-subtle",
  "--ds-color-icon-accent-amber": "--ds-semantic-color-alert-content-strong",
  "--ds-color-icon-accent-green": "--ds-semantic-color-success-content-strong",
  "--ds-color-text-accent-amber": "--ds-semantic-color-alert-content-strong",
  "--ds-color-text-accent-green": "--ds-semantic-color-success-content-strong",
  "--ds-color-bg-danger-active": "--ds-semantic-color-danger-surface-stronger",
  "--ds-color-bg-layout-invert": "--ds-semantic-color-layout-invert-surface-medium-default",
  "--ds-color-bg-layout-subtle": "--ds-semantic-color-layout-surface-medium-hover",
  "--ds-color-bg-neutral-hover": "--ds-semantic-color-layout-surface-medium-active",
  "--ds-color-bg-primary-hover": "--ds-semantic-color-action-surface-strong",
  "--ds-color-bg-success-hover": "--ds-semantic-color-success-surface-medium",
  "--ds-color-icon-accent-blue": "--ds-semantic-color-action-content-stronger",
  "--ds-color-icon-accent-cyan": "--ds-semantic-color-information-content-strong",
  "--ds-color-icon-accent-gray": "--ds-semantic-color-layout-content-medium",
  "--ds-color-icon-accent-lime": "--ds-semantic-color-accent3-content-strong",
  "--ds-color-icon-accent-pink": "--ds-semantic-color-accent2-content-strong",
  "--ds-color-text-placeholder": "--ds-semantic-color-layout-content-subtlest",
  "--ds-color-text-accent-blue": "--ds-semantic-color-action-content-stronger",
  "--ds-color-text-accent-cyan": "--ds-semantic-color-information-content-strong",
  "--ds-color-text-accent-gray": "--ds-semantic-color-layout-content-medium",
  "--ds-color-text-accent-lime": "--ds-semantic-color-accent3-content-strong",
  "--ds-color-text-accent-pink": "--ds-semantic-color-accent2-content-strong",
  "--ds-color-bg-danger-hover": "--ds-semantic-color-danger-surface-strong",
  "--ds-color-icon-accent-red": "--ds-semantic-color-danger-content-strong",
  "--ds-color-text-accent-red": "--ds-semantic-color-danger-content-strong",
  "--ds-color-bg-layout-main": "--ds-semantic-color-layout-surface-medium-default",
  "--ds-color-icon-secondary": "--ds-semantic-color-layout-content-subtle",
  "--ds-color-text-secondary": "--ds-semantic-color-layout-content-subtle",
  "--ds-color-border-danger": "--ds-semantic-color-danger-border-medium",
  "--ds-color-border-sucess": "--ds-semantic-color-success-border-medium",
  "--ds-color-icon-disabled": "--ds-semantic-color-disabled-content-medium",
  "--ds-color-text-disabled": "--ds-semantic-color-disabled-content-medium",
  "--ds-color-border-alert": "--ds-semantic-color-alert-border-medium",
  "--ds-color-icon-primary": "--ds-semantic-color-layout-content-medium",
  "--ds-color-text-primary": "--ds-semantic-color-layout-content-medium",
  "--ds-color-border-info": "--ds-semantic-color-information-border-medium",
  "--ds-color-icon-danger": "--ds-semantic-color-danger-content-medium",
  "--ds-color-icon-sucess": "--ds-semantic-color-success-content-medium",
  "--ds-color-text-danger": "--ds-semantic-color-danger-content-medium",
  "--ds-color-text-sucess": "--ds-semantic-color-success-content-medium",
  "--ds-color-icon-alert": "--ds-semantic-color-alert-content-medium",
  "--ds-color-text-alert": "--ds-semantic-color-alert-content-medium",
  "--ds-color-icon-info": "--ds-semantic-color-information-content-medium",
  "--ds-core-color-gray-100": "--ds-brand-color-grey-100",
  "--ds-core-color-gray-200": "--ds-brand-color-grey-200",
  "--ds-core-color-gray-300": "--ds-brand-color-grey-300",
  "--ds-core-color-gray-400": "--ds-brand-color-grey-400",
  "--ds-core-color-gray-500": "--ds-brand-color-grey-500",
  "--ds-core-color-gray-600": "--ds-brand-color-grey-600",
  "--ds-core-color-gray-700": "--ds-brand-color-grey-700",
  "--ds-core-color-gray-800": "--ds-brand-color-grey-800",
  "--ds-core-color-gray-900": "--ds-brand-color-grey-900",
  "--ds-core-color-gray-50": "--ds-brand-color-grey-50",
  "--ds-core-color-white": "--ds-brand-color-grey-0",
  "--ds-core-radius-radius-moderate": "--ds-core-radius-moderate",
  "--ds-core-sizing-width-max-2xl": "--ds-core-size-25",
  "--ds-core-sizing-width-max-3xl": "--ds-core-size-26",
  "--ds-core-sizing-width-max-4xl": "--ds-core-size-27",
  "--ds-core-sizing-width-max-5xl": "--ds-core-size-29",
  "--ds-core-sizing-width-max-6xl": "--ds-core-size-30",
  "--ds-core-sizing-width-max-7xl": "--ds-core-size-31",
  "--ds-core-radius-radius-sharp": "--ds-core-radius-sharp",
  "--ds-core-radius-radius-light": "--ds-core-radius-light",
  "--ds-core-radius-radius-round": "--ds-core-radius-round",
  "--ds-core-radius-radius-pill": "--ds-core-radius-pill",
  "--ds-core-gutters-2xl": "--ds-core-size-14",
  "--ds-core-spacing-2xs": "--ds-core-size-02",
  "--ds-core-spacing-2xl": "--ds-core-size-11",
  "--ds-core-spacing-3xl": "--ds-core-size-12",
  "--ds-core-spacing-4xl": "--ds-core-size-14",
  "--ds-core-gutters-xl": "--ds-core-size-12",
  "--ds-core-spacing-xs": "--ds-core-size-04",
  "--ds-core-spacing-xl": "--ds-core-size-10",
  "--ds-core-gutters-s": "--ds-core-size-06",
  "--ds-core-gutters-m": "--ds-core-size-08",
  "--ds-core-gutters-l": "--ds-core-size-10",
  "--ds-core-spacing-s": "--ds-core-size-05",
  "--ds-core-spacing-m": "--ds-core-size-06",
  "--ds-core-spacing-l": "--ds-core-size-08",
  "--ds-brand-typography-font-family-quaternary": "--ds-semantic-font-title-alt",
  "--ds-brand-typography-font-family-secondary": "--ds-semantic-font-annotation",
  "--ds-brand-typography-font-family-tertiary": "--ds-semantic-font-title",
  "--ds-brand-typography-font-family-primary": "--ds-semantic-font-default",
  "--ds-core-radius-moderate": "--ds-semantic-radius-action",
  "'Gill Sans Nova Inline'": "var(--ds-semantic-font-title-alt)",
  "--ds-core-radius-light": "--ds-semantic-radius-default",
  "--ds-core-radius-pill": "--ds-semantic-radius-skeleton",
  "'Blokletters Balpen'": "var(--ds-semantic-font-annotation)",
  "Poppins": "var(--ds-semantic-font-title)",
  "Cabin": "var(--ds-semantic-font-default)"
};
export const cssValues = {
  "400": {
    "options": [
      {
        "ifProp": [
          "font-weight"
        ],
        "replace": "var(--ds-core-typography-font-weight-regular)"
      }
    ]
  },
  "500": {
    "options": [
      {
        "ifProp": [
          "font-weight"
        ],
        "replace": "var(--ds-core-typography-font-weight-medium)"
      }
    ]
  },
  "600": {
    "options": [
      {
        "ifProp": [
          "font-weight"
        ],
        "replace": "var(--ds-core-typography-font-weight-semibold)"
      }
    ]
  },
  "--ds-semantic-color-accent1-surface-medium": {
    "options": [
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "--ds-semantic-color-accent1-border-medium"
      }
    ]
  },
  "--ds-subtheme-color-accent1-all-subtlest": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-accent1-surface-subtlest"
      }
    ]
  },
  "--ds-subtheme-color-accent2-all-subtlest": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-accent2-surface-subtlest"
      }
    ]
  },
  "--ds-subtheme-color-accent3-all-subtlest": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-accent3-surface-subtlest"
      }
    ]
  },
  "--ds-subtheme-color-action-all-stronger": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-action-surface-stronger"
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "--ds-semantic-color-action-border-stronger"
      },
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "--ds-semantic-color-action-content-stronger"
      }
    ]
  },
  "--ds-subtheme-color-action-all-subtlest": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-action-surface-subtlest"
      }
    ]
  },
  "--ds-subtheme-color-accent1-all-strong": {
    "options": [
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "--ds-semantic-color-accent1-content-strong"
      }
    ]
  },
  "--ds-subtheme-color-accent1-all-subtle": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-accent1-surface-subtle"
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "--ds-semantic-color-accent1-border-subtle"
      }
    ]
  },
  "--ds-subtheme-color-accent1-all-medium": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-accent1-surface-medium"
      }
    ]
  },
  "--ds-subtheme-color-accent2-all-strong": {
    "options": [
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "--ds-semantic-color-accent2-content-strong"
      }
    ]
  },
  "--ds-subtheme-color-accent2-all-subtle": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-accent2-surface-subtle"
      }
    ]
  },
  "--ds-subtheme-color-accent2-all-medium": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-accent2-surface-medium"
      }
    ]
  },
  "--ds-subtheme-color-accent3-all-strong": {
    "options": [
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "--ds-semantic-color-accent3-content-strong"
      }
    ]
  },
  "--ds-subtheme-color-accent3-all-subtle": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-accent3-surface-subtle"
      }
    ]
  },
  "--ds-subtheme-color-accent3-all-medium": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-accent3-surface-medium"
      }
    ]
  },
  "--ds-subtheme-color-action-all-medium": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-action-surface-medium"
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "--ds-semantic-color-action-border-medium"
      },
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "--ds-semantic-color-action-content-medium"
      }
    ]
  },
  "--ds-subtheme-color-action-all-strong": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-action-surface-strong"
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "--ds-semantic-color-action-border-strong"
      },
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "--ds-semantic-color-action-content-strong"
      }
    ]
  },
  "--ds-subtheme-color-action-all-subtle": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-action-surface-subtle"
      }
    ]
  },
  "--ds-brand-color-purple-700": {
    "options": [
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "--ds-semantic-color-accent1-content-strong"
      }
    ]
  },
  "--ds-brand-color-purple-100": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-accent1-surface-subtle"
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "--ds-semantic-color-accent1-border-subtle"
      }
    ]
  },
  "--ds-brand-color-purple-500": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-accent1-surface-medium"
      }
    ]
  },
  "--ds-brand-color-orange-700": {
    "options": [
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "--ds-semantic-color-accent4-content-strong"
      }
    ]
  },
  "--ds-brand-color-orange-100": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-accent4-surface-subtle"
      }
    ]
  },
  "--ds-brand-color-orange-300": {
    "options": [
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "--ds-semantic-color-accent4-border-subtle"
      }
    ]
  },
  "--ds-brand-color-yellow-700": {
    "options": [
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "--ds-semantic-color-accent5-content-strong"
      }
    ]
  },
  "--ds-brand-color-yellow-100": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-accent5-surface-subtle"
      }
    ]
  },
  "--ds-brand-color-yellow-300": {
    "options": [
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "--ds-semantic-color-accent5-border-subtle"
      }
    ]
  },
  "--ds-brand-color-green-600": {
    "options": [
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "--ds-semantic-color-success-content-medium"
      }
    ]
  },
  "--ds-brand-color-green-700": {
    "options": [
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "--ds-semantic-color-success-content-strong"
      }
    ]
  },
  "--ds-brand-color-green-100": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-success-surface-subtle"
      }
    ]
  },
  "--ds-brand-color-green-500": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-success-surface-medium"
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "--ds-semantic-color-success-border-medium"
      }
    ]
  },
  "--ds-brand-color-green-300": {
    "options": [
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "--ds-semantic-color-success-border-subtle"
      }
    ]
  },
  "--ds-brand-color-amber-600": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-alert-surface-medium"
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "--ds-semantic-color-alert-border-medium"
      },
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "--ds-semantic-color-alert-content-medium"
      }
    ]
  },
  "--ds-brand-color-amber-800": {
    "options": [
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "--ds-semantic-color-alert-content-strong"
      }
    ]
  },
  "--ds-brand-color-amber-100": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-alert-surface-subtle"
      }
    ]
  },
  "--ds-brand-color-amber-300": {
    "options": [
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "--ds-semantic-color-alert-border-subtle"
      }
    ]
  },
  "--ds-brand-color-purple-50": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-accent1-surface-subtlest"
      }
    ]
  },
  "--ds-brand-color-orange-50": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-accent4-surface-subtlest"
      }
    ]
  },
  "--ds-brand-color-yellow-50": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-accent5-surface-subtlest"
      }
    ]
  },
  "rgba(255, 255, 255, 0.25)": {
    "options": [
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "var(--ds-semantic-color-layout-invert-border-strong-default)"
      }
    ]
  },
  "--ds-brand-color-grey-800": {
    "options": [
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": [
          "--ds-semantic-color-layout-content-medium",
          "--ds-semantic-color-neutral-content-medium",
          "--ds-semantic-color-neutral-invert-content-medium"
        ]
      }
    ]
  },
  "--ds-brand-color-grey-500": {
    "options": [
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "--ds-semantic-color-neutral-border-medium"
      },
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "--ds-semantic-color-layout-content-subtle"
      }
    ]
  },
  "--ds-brand-color-grey-400": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-read-only-surface-strong"
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": [
          "--ds-semantic-color-neutral-border-subtle",
          "--ds-semantic-color-layout-border-strong-hover",
          "--ds-semantic-color-read-only-border-strong"
        ]
      },
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": [
          "--ds-semantic-color-layout-content-subtlest",
          "--ds-semantic-color-disabled-content-medium"
        ]
      }
    ]
  },
  "--ds-brand-color-grey-100": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": [
          "--ds-semantic-color-layout-surface-strong-default",
          "--ds-semantic-color-neutral-surface-medium-default",
          "--ds-semantic-color-layout-surface-medium-active"
        ]
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "--ds-semantic-color-layout-border-subtle-default"
      }
    ]
  },
  "--ds-brand-color-blue-100": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": [
          "--ds-semantic-color-action-surface-subtle",
          "--ds-semantic-color-layout-surface-stronger-default"
        ]
      }
    ]
  },
  "--ds-brand-color-blue-200": {
    "options": [
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "--ds-semantic-color-layout-border-subtle-selected"
      }
    ]
  },
  "--ds-brand-color-grey-200": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": [
          "--ds-semantic-color-neutral-surface-strong-default",
          "--ds-semantic-color-neutral-surface-medium-hover"
        ]
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": [
          "--ds-semantic-color-layout-border-medium-default",
          "--ds-semantic-color-disabled-border-medium"
        ]
      },
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "--ds-semantic-color-disabled-content-subtle"
      }
    ]
  },
  "--ds-brand-color-grey-300": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": [
          "--ds-semantic-color-neutral-surface-stronger-default",
          "--ds-semantic-color-neutral-surface-medium-active"
        ]
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": [
          "--ds-semantic-color-layout-border-strong-default",
          "--ds-semantic-color-layout-border-medium-hover"
        ]
      }
    ]
  },
  "--ds-brand-color-blue-300": {
    "options": [
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "--ds-semantic-color-layout-border-medium-selected"
      }
    ]
  },
  "--ds-brand-color-blue-500": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-action-surface-medium"
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": [
          "--ds-semantic-color-action-border-medium",
          "--ds-semantic-color-layout-border-strong-selected"
        ]
      },
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "--ds-semantic-color-action-content-medium"
      }
    ]
  },
  "--ds-brand-color-blue-600": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-action-surface-strong"
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "--ds-semantic-color-action-border-strong"
      },
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "--ds-semantic-color-action-content-strong"
      }
    ]
  },
  "--ds-brand-color-blue-700": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-action-surface-stronger"
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "--ds-semantic-color-action-border-stronger"
      },
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "--ds-semantic-color-action-content-stronger"
      }
    ]
  },
  "--ds-brand-color-grey-600": {
    "options": [
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "--ds-semantic-color-read-only-content-medium"
      }
    ]
  },
  "--ds-brand-color-green-50": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-success-surface-subtlest"
      }
    ]
  },
  "--ds-brand-color-amber-50": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-alert-surface-subtlest"
      }
    ]
  },
  "--ds-brand-color-cyan-500": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-information-surface-medium"
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "--ds-semantic-color-information-border-medium"
      },
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "--ds-semantic-color-information-content-medium"
      }
    ]
  },
  "--ds-brand-color-cyan-800": {
    "options": [
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "--ds-semantic-color-information-content-strong"
      }
    ]
  },
  "--ds-brand-color-cyan-100": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-information-surface-subtle"
      }
    ]
  },
  "--ds-brand-color-cyan-300": {
    "options": [
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "--ds-semantic-color-information-border-subtle"
      }
    ]
  },
  "--ds-brand-color-pink-700": {
    "options": [
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "--ds-semantic-color-accent2-content-strong"
      }
    ]
  },
  "--ds-brand-color-pink-100": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-accent2-surface-subtle"
      }
    ]
  },
  "--ds-brand-color-pink-500": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-accent2-surface-medium"
      }
    ]
  },
  "--ds-brand-color-pink-300": {
    "options": [
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "--ds-semantic-color-accent2-border-subtle"
      }
    ]
  },
  "--ds-brand-color-lime-700": {
    "options": [
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "--ds-semantic-color-accent3-content-strong"
      }
    ]
  },
  "--ds-brand-color-lime-100": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-accent3-surface-subtle"
      }
    ]
  },
  "--ds-brand-color-lime-500": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-accent3-surface-medium"
      }
    ]
  },
  "--ds-brand-color-lime-300": {
    "options": [
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "--ds-semantic-color-accent3-border-subtle"
      }
    ]
  },
  "rgba(255, 255, 255, 0.7)": {
    "options": [
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-layout-invert-content-subtle)"
      }
    ]
  },
  "rgba(44, 165, 255, 0.12)": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-layout-invert-surface-medium-hover)"
      }
    ]
  },
  "rgba(44, 165, 255, 0.16)": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-layout-invert-surface-strong-default)"
      }
    ]
  },
  "rgba(255, 255, 255, 0.1)": {
    "options": [
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "var(--ds-semantic-color-layout-invert-border-medium-default)"
      }
    ]
  },
  "rgba(255, 255, 255, 0.3)": {
    "options": [
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-disabled-invert-content-medium)"
      }
    ]
  },
  "rgba(253, 126, 108, 0.7)": {
    "options": [
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-danger-invert-content-subtle)"
      }
    ]
  },
  "--ds-brand-color-red-400": {
    "options": [
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "--ds-semantic-color-danger-invert-content-medium"
      }
    ]
  },
  "--ds-brand-color-grey-50": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": [
          "--ds-semantic-color-layout-surface-subtle-default",
          "--ds-semantic-color-layout-surface-medium-hover",
          "--ds-semantic-color-read-only-surface-medium",
          "--ds-semantic-color-disabled-surface-medium"
        ]
      }
    ]
  },
  "--ds-brand-color-blue-50": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": [
          "--ds-semantic-color-action-surface-subtlest",
          "--ds-semantic-color-layout-surface-medium-selected"
        ]
      }
    ]
  },
  "--ds-brand-color-red-500": {
    "options": [
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "--ds-semantic-color-danger-content-subtle"
      }
    ]
  },
  "--ds-brand-color-red-600": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-danger-surface-medium"
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "--ds-semantic-color-danger-border-medium"
      },
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "--ds-semantic-color-danger-content-medium"
      }
    ]
  },
  "--ds-brand-color-red-700": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-danger-surface-strong"
      },
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "--ds-semantic-color-danger-content-strong"
      }
    ]
  },
  "--ds-brand-color-red-100": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-danger-surface-subtle"
      }
    ]
  },
  "--ds-brand-color-red-800": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-danger-surface-stronger"
      }
    ]
  },
  "--ds-brand-color-red-300": {
    "options": [
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "--ds-semantic-color-danger-border-subtle"
      }
    ]
  },
  "--ds-brand-color-cyan-50": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-information-surface-subtlest"
      }
    ]
  },
  "--ds-brand-color-pink-50": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-accent2-surface-subtlest"
      }
    ]
  },
  "--ds-brand-color-lime-50": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-accent3-surface-subtlest"
      }
    ]
  },
  "--ds-brand-color-grey-0": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": [
          "--ds-semantic-color-layout-surface-medium-default",
          "--ds-semantic-color-neutral-invert-surface-medium-default"
        ]
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "--ds-semantic-color-layout-invert-border-strongest-default"
      },
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "--ds-semantic-color-layout-invert-content-medium"
      }
    ]
  },
  "--ds-brand-color-red-50": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "--ds-semantic-color-danger-surface-subtlest"
      }
    ]
  },
  "rgba(17, 24, 39, 0.3)": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-overlay-surface-medium)"
      }
    ]
  },
  "--ds-core-size-01": {
    "options": [
      {
        "ifProp": [
          "padding-inline-start",
          "padding-block-start",
          "margin-inline-start",
          "margin-inline-start",
          "padding-inline-end",
          "margin-block-start",
          "margin-block-start",
          "padding-block-end",
          "margin-inline-end",
          "margin-inline-end",
          "margin-block-end",
          "margin-block-end",
          "padding-bottom",
          "padding-inline",
          "padding-right",
          "padding-block",
          "margin-bottom",
          "margin-inline",
          "padding-left",
          "margin-right",
          "margin-block",
          "padding-top",
          "margin-left",
          "margin-top",
          "padding-x",
          "padding-y",
          "margin-x",
          "margin-y",
          "padding",
          "bottom",
          "margin",
          "right",
          "left",
          "top",
          "gap"
        ],
        "replace": "--ds-semantic-spacing-4xs"
      }
    ]
  },
  "--ds-core-size-02": {
    "options": [
      {
        "ifProp": [
          "padding-inline-start",
          "padding-block-start",
          "margin-inline-start",
          "margin-inline-start",
          "padding-inline-end",
          "margin-block-start",
          "margin-block-start",
          "padding-block-end",
          "margin-inline-end",
          "margin-inline-end",
          "margin-block-end",
          "margin-block-end",
          "padding-bottom",
          "padding-inline",
          "padding-right",
          "padding-block",
          "margin-bottom",
          "margin-inline",
          "padding-left",
          "margin-right",
          "margin-block",
          "padding-top",
          "margin-left",
          "margin-top",
          "padding-x",
          "padding-y",
          "margin-x",
          "margin-y",
          "padding",
          "bottom",
          "margin",
          "right",
          "left",
          "top",
          "gap"
        ],
        "replace": "--ds-semantic-spacing-3xs"
      },
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "--ds-semantic-sizing-3xs"
      }
    ]
  },
  "--ds-core-size-03": {
    "options": [
      {
        "ifProp": [
          "padding-inline-start",
          "padding-block-start",
          "margin-inline-start",
          "margin-inline-start",
          "padding-inline-end",
          "margin-block-start",
          "margin-block-start",
          "padding-block-end",
          "margin-inline-end",
          "margin-inline-end",
          "margin-block-end",
          "margin-block-end",
          "padding-bottom",
          "padding-inline",
          "padding-right",
          "padding-block",
          "margin-bottom",
          "margin-inline",
          "padding-left",
          "margin-right",
          "margin-block",
          "padding-top",
          "margin-left",
          "margin-top",
          "padding-x",
          "padding-y",
          "margin-x",
          "margin-y",
          "padding",
          "bottom",
          "margin",
          "right",
          "left",
          "top",
          "gap"
        ],
        "replace": "--ds-semantic-spacing-2xs"
      }
    ]
  },
  "--ds-core-size-04": {
    "options": [
      {
        "ifProp": [
          "padding-inline-start",
          "padding-block-start",
          "margin-inline-start",
          "margin-inline-start",
          "padding-inline-end",
          "margin-block-start",
          "margin-block-start",
          "padding-block-end",
          "margin-inline-end",
          "margin-inline-end",
          "margin-block-end",
          "margin-block-end",
          "padding-bottom",
          "padding-inline",
          "padding-right",
          "padding-block",
          "margin-bottom",
          "margin-inline",
          "padding-left",
          "margin-right",
          "margin-block",
          "padding-top",
          "margin-left",
          "margin-top",
          "padding-x",
          "padding-y",
          "margin-x",
          "margin-y",
          "padding",
          "bottom",
          "margin",
          "right",
          "left",
          "top",
          "gap"
        ],
        "replace": "--ds-semantic-spacing-xs"
      },
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "--ds-semantic-sizing-2xs"
      }
    ]
  },
  "--ds-core-size-05": {
    "options": [
      {
        "ifProp": [
          "padding-inline-start",
          "padding-block-start",
          "margin-inline-start",
          "margin-inline-start",
          "padding-inline-end",
          "margin-block-start",
          "margin-block-start",
          "padding-block-end",
          "margin-inline-end",
          "margin-inline-end",
          "margin-block-end",
          "margin-block-end",
          "padding-bottom",
          "padding-inline",
          "padding-right",
          "padding-block",
          "margin-bottom",
          "margin-inline",
          "padding-left",
          "margin-right",
          "margin-block",
          "padding-top",
          "margin-left",
          "margin-top",
          "padding-x",
          "padding-y",
          "margin-x",
          "margin-y",
          "padding",
          "bottom",
          "margin",
          "right",
          "left",
          "top",
          "gap"
        ],
        "replace": "--ds-semantic-spacing-s"
      },
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "--ds-semantic-sizing-xs"
      }
    ]
  },
  "--ds-core-size-06": {
    "options": [
      {
        "ifProp": [
          "padding-inline-start",
          "padding-block-start",
          "margin-inline-start",
          "margin-inline-start",
          "padding-inline-end",
          "margin-block-start",
          "margin-block-start",
          "padding-block-end",
          "margin-inline-end",
          "margin-inline-end",
          "margin-block-end",
          "margin-block-end",
          "padding-bottom",
          "padding-inline",
          "padding-right",
          "padding-block",
          "margin-bottom",
          "margin-inline",
          "padding-left",
          "margin-right",
          "margin-block",
          "padding-top",
          "margin-left",
          "margin-top",
          "padding-x",
          "padding-y",
          "margin-x",
          "margin-y",
          "padding",
          "bottom",
          "margin",
          "right",
          "left",
          "top",
          "gap"
        ],
        "replace": "--ds-semantic-spacing-m"
      },
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "--ds-semantic-sizing-s"
      }
    ]
  },
  "--ds-core-size-08": {
    "options": [
      {
        "ifProp": [
          "padding-inline-start",
          "padding-block-start",
          "margin-inline-start",
          "margin-inline-start",
          "padding-inline-end",
          "margin-block-start",
          "margin-block-start",
          "padding-block-end",
          "margin-inline-end",
          "margin-inline-end",
          "margin-block-end",
          "margin-block-end",
          "padding-bottom",
          "padding-inline",
          "padding-right",
          "padding-block",
          "margin-bottom",
          "margin-inline",
          "padding-left",
          "margin-right",
          "margin-block",
          "padding-top",
          "margin-left",
          "margin-top",
          "padding-x",
          "padding-y",
          "margin-x",
          "margin-y",
          "padding",
          "bottom",
          "margin",
          "right",
          "left",
          "top",
          "gap"
        ],
        "replace": "--ds-semantic-spacing-l"
      },
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "--ds-semantic-sizing-m"
      }
    ]
  },
  "--ds-core-size-10": {
    "options": [
      {
        "ifProp": [
          "padding-inline-start",
          "padding-block-start",
          "margin-inline-start",
          "margin-inline-start",
          "padding-inline-end",
          "margin-block-start",
          "margin-block-start",
          "padding-block-end",
          "margin-inline-end",
          "margin-inline-end",
          "margin-block-end",
          "margin-block-end",
          "padding-bottom",
          "padding-inline",
          "padding-right",
          "padding-block",
          "margin-bottom",
          "margin-inline",
          "padding-left",
          "margin-right",
          "margin-block",
          "padding-top",
          "margin-left",
          "margin-top",
          "padding-x",
          "padding-y",
          "margin-x",
          "margin-y",
          "padding",
          "bottom",
          "margin",
          "right",
          "left",
          "top",
          "gap"
        ],
        "replace": "--ds-semantic-spacing-xl"
      },
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "--ds-semantic-sizing-l"
      }
    ]
  },
  "--ds-core-size-11": {
    "options": [
      {
        "ifProp": [
          "padding-inline-start",
          "padding-block-start",
          "margin-inline-start",
          "margin-inline-start",
          "padding-inline-end",
          "margin-block-start",
          "margin-block-start",
          "padding-block-end",
          "margin-inline-end",
          "margin-inline-end",
          "margin-block-end",
          "margin-block-end",
          "padding-bottom",
          "padding-inline",
          "padding-right",
          "padding-block",
          "margin-bottom",
          "margin-inline",
          "padding-left",
          "margin-right",
          "margin-block",
          "padding-top",
          "margin-left",
          "margin-top",
          "padding-x",
          "padding-y",
          "margin-x",
          "margin-y",
          "padding",
          "bottom",
          "margin",
          "right",
          "left",
          "top",
          "gap"
        ],
        "replace": "--ds-semantic-spacing-2xl"
      },
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "--ds-semantic-sizing-xl"
      }
    ]
  },
  "--ds-core-size-12": {
    "options": [
      {
        "ifProp": [
          "padding-inline-start",
          "padding-block-start",
          "margin-inline-start",
          "margin-inline-start",
          "padding-inline-end",
          "margin-block-start",
          "margin-block-start",
          "padding-block-end",
          "margin-inline-end",
          "margin-inline-end",
          "margin-block-end",
          "margin-block-end",
          "padding-bottom",
          "padding-inline",
          "padding-right",
          "padding-block",
          "margin-bottom",
          "margin-inline",
          "padding-left",
          "margin-right",
          "margin-block",
          "padding-top",
          "margin-left",
          "margin-top",
          "padding-x",
          "padding-y",
          "margin-x",
          "margin-y",
          "padding",
          "bottom",
          "margin",
          "right",
          "left",
          "top",
          "gap"
        ],
        "replace": "--ds-semantic-spacing-3xl"
      },
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "--ds-semantic-sizing-2xl"
      }
    ]
  },
  "--ds-core-size-14": {
    "options": [
      {
        "ifProp": [
          "padding-inline-start",
          "padding-block-start",
          "margin-inline-start",
          "margin-inline-start",
          "padding-inline-end",
          "margin-block-start",
          "margin-block-start",
          "padding-block-end",
          "margin-inline-end",
          "margin-inline-end",
          "margin-block-end",
          "margin-block-end",
          "padding-bottom",
          "padding-inline",
          "padding-right",
          "padding-block",
          "margin-bottom",
          "margin-inline",
          "padding-left",
          "margin-right",
          "margin-block",
          "padding-top",
          "margin-left",
          "margin-top",
          "padding-x",
          "padding-y",
          "margin-x",
          "margin-y",
          "padding",
          "bottom",
          "margin",
          "right",
          "left",
          "top",
          "gap"
        ],
        "replace": "--ds-semantic-spacing-4xl"
      },
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "--ds-semantic-sizing-4xl"
      }
    ]
  },
  "--ds-core-size-16": {
    "options": [
      {
        "ifProp": [
          "padding-inline-start",
          "padding-block-start",
          "margin-inline-start",
          "margin-inline-start",
          "padding-inline-end",
          "margin-block-start",
          "margin-block-start",
          "padding-block-end",
          "margin-inline-end",
          "margin-inline-end",
          "margin-block-end",
          "margin-block-end",
          "padding-bottom",
          "padding-inline",
          "padding-right",
          "padding-block",
          "margin-bottom",
          "margin-inline",
          "padding-left",
          "margin-right",
          "margin-block",
          "padding-top",
          "margin-left",
          "margin-top",
          "padding-x",
          "padding-y",
          "margin-x",
          "margin-y",
          "padding",
          "bottom",
          "margin",
          "right",
          "left",
          "top",
          "gap"
        ],
        "replace": "--ds-semantic-spacing-5xl"
      },
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "--ds-semantic-sizing-6xl"
      }
    ]
  },
  "--ds-core-size-07": {
    "options": [
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "--ds-semantic-sizing-sm"
      }
    ]
  },
  "--ds-core-size-09": {
    "options": [
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "--ds-semantic-sizing-ml"
      }
    ]
  },
  "--ds-core-size-13": {
    "options": [
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "--ds-semantic-sizing-3xl"
      }
    ]
  },
  "--ds-core-size-15": {
    "options": [
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "--ds-semantic-sizing-5xl"
      }
    ]
  },
  "--ds-core-size-17": {
    "options": [
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "--ds-semantic-sizing-7xl"
      }
    ]
  },
  "--ds-core-size-18": {
    "options": [
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "--ds-semantic-sizing-8xl"
      }
    ]
  },
  "--ds-core-size-19": {
    "options": [
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "--ds-semantic-sizing-9xl"
      }
    ]
  },
  "--ds-core-size-20": {
    "options": [
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "--ds-semantic-sizing-10xl"
      }
    ]
  },
  "--ds-core-size-21": {
    "options": [
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "--ds-semantic-sizing-11xl"
      }
    ]
  },
  "--ds-core-size-22": {
    "options": [
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "--ds-semantic-sizing-12xl"
      }
    ]
  },
  "--ds-core-size-23": {
    "options": [
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "--ds-semantic-sizing-13xl"
      }
    ]
  },
  "--ds-core-size-24": {
    "options": [
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "--ds-semantic-sizing-14xl"
      }
    ]
  },
  "--ds-core-size-25": {
    "options": [
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "--ds-semantic-sizing-14xl-bis"
      }
    ]
  },
  "--ds-core-size-26": {
    "options": [
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "--ds-semantic-sizing-15xl"
      }
    ]
  },
  "--ds-core-size-27": {
    "options": [
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "--ds-semantic-sizing-16xl"
      }
    ]
  },
  "#ffffff": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": [
          "var(--ds-semantic-color-layout-surface-medium-default)",
          "var(--ds-semantic-color-neutral-invert-surface-medium-default)"
        ]
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "var(--ds-semantic-color-layout-invert-border-strongest-default)"
      },
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-layout-invert-content-medium)"
      }
    ]
  },
  "#FFFFFF": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": [
          "var(--ds-semantic-color-layout-surface-medium-default)",
          "var(--ds-semantic-color-neutral-invert-surface-medium-default)"
        ]
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "var(--ds-semantic-color-layout-invert-border-strongest-default)"
      },
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-layout-invert-content-medium)"
      }
    ]
  },
  "#153666": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-layout-invert-surface-medium-default)"
      }
    ]
  },
  "#1c5793": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-layout-invert-surface-medium-selected)"
      }
    ]
  },
  "#1C5793": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-layout-invert-surface-medium-selected)"
      }
    ]
  },
  "#fd7e6c": {
    "options": [
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-danger-invert-content-medium)"
      }
    ]
  },
  "#FD7E6C": {
    "options": [
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-danger-invert-content-medium)"
      }
    ]
  },
  "#1f2937": {
    "options": [
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": [
          "var(--ds-semantic-color-layout-content-medium)",
          "var(--ds-semantic-color-neutral-content-medium)",
          "var(--ds-semantic-color-neutral-invert-content-medium)"
        ]
      }
    ]
  },
  "#1F2937": {
    "options": [
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": [
          "var(--ds-semantic-color-layout-content-medium)",
          "var(--ds-semantic-color-neutral-content-medium)",
          "var(--ds-semantic-color-neutral-invert-content-medium)"
        ]
      }
    ]
  },
  "#6b7280": {
    "options": [
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "var(--ds-semantic-color-neutral-border-medium)"
      },
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-layout-content-subtle)"
      }
    ]
  },
  "#6B7280": {
    "options": [
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "var(--ds-semantic-color-neutral-border-medium)"
      },
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-layout-content-subtle)"
      }
    ]
  },
  "#9ca3af": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-read-only-surface-strong)"
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": [
          "var(--ds-semantic-color-neutral-border-subtle)",
          "var(--ds-semantic-color-layout-border-strong-hover)",
          "var(--ds-semantic-color-read-only-border-strong)"
        ]
      },
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": [
          "var(--ds-semantic-color-layout-content-subtlest)",
          "var(--ds-semantic-color-disabled-content-medium)"
        ]
      }
    ]
  },
  "#9CA3AF": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-read-only-surface-strong)"
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": [
          "var(--ds-semantic-color-neutral-border-subtle)",
          "var(--ds-semantic-color-layout-border-strong-hover)",
          "var(--ds-semantic-color-read-only-border-strong)"
        ]
      },
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": [
          "var(--ds-semantic-color-layout-content-subtlest)",
          "var(--ds-semantic-color-disabled-content-medium)"
        ]
      }
    ]
  },
  "#f9fafb": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": [
          "var(--ds-semantic-color-layout-surface-subtle-default)",
          "var(--ds-semantic-color-layout-surface-medium-hover)",
          "var(--ds-semantic-color-read-only-surface-medium)",
          "var(--ds-semantic-color-disabled-surface-medium)"
        ]
      }
    ]
  },
  "#F9FAFB": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": [
          "var(--ds-semantic-color-layout-surface-subtle-default)",
          "var(--ds-semantic-color-layout-surface-medium-hover)",
          "var(--ds-semantic-color-read-only-surface-medium)",
          "var(--ds-semantic-color-disabled-surface-medium)"
        ]
      }
    ]
  },
  "#f3f4f6": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": [
          "var(--ds-semantic-color-layout-surface-strong-default)",
          "var(--ds-semantic-color-neutral-surface-medium-default)",
          "var(--ds-semantic-color-layout-surface-medium-active)"
        ]
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "var(--ds-semantic-color-layout-border-subtle-default)"
      }
    ]
  },
  "#F3F4F6": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": [
          "var(--ds-semantic-color-layout-surface-strong-default)",
          "var(--ds-semantic-color-neutral-surface-medium-default)",
          "var(--ds-semantic-color-layout-surface-medium-active)"
        ]
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "var(--ds-semantic-color-layout-border-subtle-default)"
      }
    ]
  },
  "#eff4ff": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": [
          "var(--ds-semantic-color-action-surface-subtlest)",
          "var(--ds-semantic-color-layout-surface-medium-selected)"
        ]
      }
    ]
  },
  "#EFF4FF": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": [
          "var(--ds-semantic-color-action-surface-subtlest)",
          "var(--ds-semantic-color-layout-surface-medium-selected)"
        ]
      }
    ]
  },
  "#dbe6fe": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": [
          "var(--ds-semantic-color-action-surface-subtle)",
          "var(--ds-semantic-color-layout-surface-stronger-default)"
        ]
      }
    ]
  },
  "#DBE6FE": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": [
          "var(--ds-semantic-color-action-surface-subtle)",
          "var(--ds-semantic-color-layout-surface-stronger-default)"
        ]
      }
    ]
  },
  "#bfd3fe": {
    "options": [
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "var(--ds-semantic-color-layout-border-subtle-selected)"
      }
    ]
  },
  "#BFD3FE": {
    "options": [
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "var(--ds-semantic-color-layout-border-subtle-selected)"
      }
    ]
  },
  "#e5e7eb": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": [
          "var(--ds-semantic-color-neutral-surface-strong-default)",
          "var(--ds-semantic-color-neutral-surface-medium-hover)"
        ]
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": [
          "var(--ds-semantic-color-layout-border-medium-default)",
          "var(--ds-semantic-color-disabled-border-medium)"
        ]
      },
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-disabled-content-subtle)"
      }
    ]
  },
  "#E5E7EB": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": [
          "var(--ds-semantic-color-neutral-surface-strong-default)",
          "var(--ds-semantic-color-neutral-surface-medium-hover)"
        ]
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": [
          "var(--ds-semantic-color-layout-border-medium-default)",
          "var(--ds-semantic-color-disabled-border-medium)"
        ]
      },
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-disabled-content-subtle)"
      }
    ]
  },
  "#d1d5db": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": [
          "var(--ds-semantic-color-neutral-surface-stronger-default)",
          "var(--ds-semantic-color-neutral-surface-medium-active)"
        ]
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": [
          "var(--ds-semantic-color-layout-border-strong-default)",
          "var(--ds-semantic-color-layout-border-medium-hover)"
        ]
      }
    ]
  },
  "#D1D5DB": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": [
          "var(--ds-semantic-color-neutral-surface-stronger-default)",
          "var(--ds-semantic-color-neutral-surface-medium-active)"
        ]
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": [
          "var(--ds-semantic-color-layout-border-strong-default)",
          "var(--ds-semantic-color-layout-border-medium-hover)"
        ]
      }
    ]
  },
  "#93b4fd": {
    "options": [
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "var(--ds-semantic-color-layout-border-medium-selected)"
      }
    ]
  },
  "#93B4FD": {
    "options": [
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "var(--ds-semantic-color-layout-border-medium-selected)"
      }
    ]
  },
  "#3b76f6": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-action-surface-medium)"
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": [
          "var(--ds-semantic-color-action-border-medium)",
          "var(--ds-semantic-color-layout-border-strong-selected)"
        ]
      },
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-action-content-medium)"
      }
    ]
  },
  "#3B76F6": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-action-surface-medium)"
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": [
          "var(--ds-semantic-color-action-border-medium)",
          "var(--ds-semantic-color-layout-border-strong-selected)"
        ]
      },
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-action-content-medium)"
      }
    ]
  },
  "#2563eb": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-action-surface-strong)"
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "var(--ds-semantic-color-action-border-strong)"
      },
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-action-content-strong)"
      }
    ]
  },
  "#2563EB": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-action-surface-strong)"
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "var(--ds-semantic-color-action-border-strong)"
      },
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-action-content-strong)"
      }
    ]
  },
  "#1d58d8": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-action-surface-stronger)"
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "var(--ds-semantic-color-action-border-stronger)"
      },
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-action-content-stronger)"
      }
    ]
  },
  "#1D58D8": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-action-surface-stronger)"
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "var(--ds-semantic-color-action-border-stronger)"
      },
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-action-content-stronger)"
      }
    ]
  },
  "#4b5563": {
    "options": [
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-read-only-content-medium)"
      }
    ]
  },
  "#4B5563": {
    "options": [
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-read-only-content-medium)"
      }
    ]
  },
  "#16a34a": {
    "options": [
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-success-content-medium)"
      }
    ]
  },
  "#16A34A": {
    "options": [
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-success-content-medium)"
      }
    ]
  },
  "#15803d": {
    "options": [
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-success-content-strong)"
      }
    ]
  },
  "#15803D": {
    "options": [
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-success-content-strong)"
      }
    ]
  },
  "#f0fdf4": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-success-surface-subtlest)"
      }
    ]
  },
  "#F0FDF4": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-success-surface-subtlest)"
      }
    ]
  },
  "#dcfce7": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-success-surface-subtle)"
      }
    ]
  },
  "#DCFCE7": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-success-surface-subtle)"
      }
    ]
  },
  "#22c55e": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-success-surface-medium)"
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "var(--ds-semantic-color-success-border-medium)"
      }
    ]
  },
  "#22C55E": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-success-surface-medium)"
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "var(--ds-semantic-color-success-border-medium)"
      }
    ]
  },
  "#86efac": {
    "options": [
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "var(--ds-semantic-color-success-border-subtle)"
      }
    ]
  },
  "#86EFAC": {
    "options": [
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "var(--ds-semantic-color-success-border-subtle)"
      }
    ]
  },
  "#e27f00": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-alert-surface-medium)"
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "var(--ds-semantic-color-alert-border-medium)"
      },
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-alert-content-medium)"
      }
    ]
  },
  "#E27F00": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-alert-surface-medium)"
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "var(--ds-semantic-color-alert-border-medium)"
      },
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-alert-content-medium)"
      }
    ]
  },
  "#7c380b": {
    "options": [
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-alert-content-strong)"
      }
    ]
  },
  "#7C380B": {
    "options": [
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-alert-content-strong)"
      }
    ]
  },
  "#fff7e7": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-alert-surface-subtlest)"
      }
    ]
  },
  "#FFF7E7": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-alert-surface-subtlest)"
      }
    ]
  },
  "#ffeece": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-alert-surface-subtle)"
      }
    ]
  },
  "#FFEECE": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-alert-surface-subtle)"
      }
    ]
  },
  "#ffcd6c": {
    "options": [
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "var(--ds-semantic-color-alert-border-subtle)"
      }
    ]
  },
  "#FFCD6C": {
    "options": [
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "var(--ds-semantic-color-alert-border-subtle)"
      }
    ]
  },
  "#f66551": {
    "options": [
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-danger-content-subtle)"
      }
    ]
  },
  "#F66551": {
    "options": [
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-danger-content-subtle)"
      }
    ]
  },
  "#e23820": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-danger-surface-medium)"
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "var(--ds-semantic-color-danger-border-medium)"
      },
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-danger-content-medium)"
      }
    ]
  },
  "#E23820": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-danger-surface-medium)"
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "var(--ds-semantic-color-danger-border-medium)"
      },
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-danger-content-medium)"
      }
    ]
  },
  "#bf2a16": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-danger-surface-strong)"
      },
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-danger-content-strong)"
      }
    ]
  },
  "#BF2A16": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-danger-surface-strong)"
      },
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-danger-content-strong)"
      }
    ]
  },
  "#fef3f2": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-danger-surface-subtlest)"
      }
    ]
  },
  "#FEF3F2": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-danger-surface-subtlest)"
      }
    ]
  },
  "#ffe5e1": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-danger-surface-subtle)"
      }
    ]
  },
  "#FFE5E1": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-danger-surface-subtle)"
      }
    ]
  },
  "#9d2717": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-danger-surface-stronger)"
      }
    ]
  },
  "#9D2717": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-danger-surface-stronger)"
      }
    ]
  },
  "#ffada2": {
    "options": [
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "var(--ds-semantic-color-danger-border-subtle)"
      }
    ]
  },
  "#FFADA2": {
    "options": [
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "var(--ds-semantic-color-danger-border-subtle)"
      }
    ]
  },
  "#05b7ef": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-information-surface-medium)"
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "var(--ds-semantic-color-information-border-medium)"
      },
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-information-content-medium)"
      }
    ]
  },
  "#05B7EF": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-information-surface-medium)"
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "var(--ds-semantic-color-information-border-medium)"
      },
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-information-content-medium)"
      }
    ]
  },
  "#02658a": {
    "options": [
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-information-content-strong)"
      }
    ]
  },
  "#02658A": {
    "options": [
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-information-content-strong)"
      }
    ]
  },
  "#effaff": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-information-surface-subtlest)"
      }
    ]
  },
  "#EFFAFF": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-information-surface-subtlest)"
      }
    ]
  },
  "#dff4ff": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-information-surface-subtle)"
      }
    ]
  },
  "#DFF4FF": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-information-surface-subtle)"
      }
    ]
  },
  "#78dfff": {
    "options": [
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "var(--ds-semantic-color-information-border-subtle)"
      }
    ]
  },
  "#78DFFF": {
    "options": [
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "var(--ds-semantic-color-information-border-subtle)"
      }
    ]
  },
  "#6d28d9": {
    "options": [
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-accent1-content-strong)"
      }
    ]
  },
  "#6D28D9": {
    "options": [
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-accent1-content-strong)"
      }
    ]
  },
  "#f5f3ff": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-accent1-surface-subtlest)"
      }
    ]
  },
  "#F5F3FF": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-accent1-surface-subtlest)"
      }
    ]
  },
  "#ede9fe": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-accent1-surface-subtle)"
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "var(--ds-semantic-color-accent1-border-subtle)"
      }
    ]
  },
  "#EDE9FE": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-accent1-surface-subtle)"
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "var(--ds-semantic-color-accent1-border-subtle)"
      }
    ]
  },
  "#8b5cf6": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-accent1-surface-medium)"
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "var(--ds-semantic-color-accent1-border-medium)"
      }
    ]
  },
  "#8B5CF6": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-accent1-surface-medium)"
      },
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "var(--ds-semantic-color-accent1-border-medium)"
      }
    ]
  },
  "#be185d": {
    "options": [
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-accent2-content-strong)"
      }
    ]
  },
  "#BE185D": {
    "options": [
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-accent2-content-strong)"
      }
    ]
  },
  "#fdf2f8": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-accent2-surface-subtlest)"
      }
    ]
  },
  "#FDF2F8": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-accent2-surface-subtlest)"
      }
    ]
  },
  "#fce7f3": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-accent2-surface-subtle)"
      }
    ]
  },
  "#FCE7F3": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-accent2-surface-subtle)"
      }
    ]
  },
  "#ec4899": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-accent2-surface-medium)"
      }
    ]
  },
  "#EC4899": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-accent2-surface-medium)"
      }
    ]
  },
  "#f9a8d4": {
    "options": [
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "var(--ds-semantic-color-accent2-border-subtle)"
      }
    ]
  },
  "#F9A8D4": {
    "options": [
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "var(--ds-semantic-color-accent2-border-subtle)"
      }
    ]
  },
  "#4d7c0f": {
    "options": [
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-accent3-content-strong)"
      }
    ]
  },
  "#4D7C0F": {
    "options": [
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-accent3-content-strong)"
      }
    ]
  },
  "#f7fee7": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-accent3-surface-subtlest)"
      }
    ]
  },
  "#F7FEE7": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-accent3-surface-subtlest)"
      }
    ]
  },
  "#ecfccb": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-accent3-surface-subtle)"
      }
    ]
  },
  "#ECFCCB": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-accent3-surface-subtle)"
      }
    ]
  },
  "#84cc16": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-accent3-surface-medium)"
      }
    ]
  },
  "#84CC16": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-accent3-surface-medium)"
      }
    ]
  },
  "#bef264": {
    "options": [
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "var(--ds-semantic-color-accent3-border-subtle)"
      }
    ]
  },
  "#BEF264": {
    "options": [
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "var(--ds-semantic-color-accent3-border-subtle)"
      }
    ]
  },
  "#bb3f0c": {
    "options": [
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-accent4-content-strong)"
      }
    ]
  },
  "#BB3F0C": {
    "options": [
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-accent4-content-strong)"
      }
    ]
  },
  "#fff4ed": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-accent4-surface-subtlest)"
      }
    ]
  },
  "#FFF4ED": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-accent4-surface-subtlest)"
      }
    ]
  },
  "#ffe6d5": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-accent4-surface-subtle)"
      }
    ]
  },
  "#FFE6D5": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-accent4-surface-subtle)"
      }
    ]
  },
  "#fdac74": {
    "options": [
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "var(--ds-semantic-color-accent4-border-subtle)"
      }
    ]
  },
  "#FDAC74": {
    "options": [
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "var(--ds-semantic-color-accent4-border-subtle)"
      }
    ]
  },
  "#996805": {
    "options": [
      {
        "ifProp": [
          "color",
          "fill"
        ],
        "replace": "var(--ds-semantic-color-accent5-content-strong)"
      }
    ]
  },
  "#fefedc": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-accent5-surface-subtlest)"
      }
    ]
  },
  "#FEFEDC": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-accent5-surface-subtlest)"
      }
    ]
  },
  "#fcfdb4": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-accent5-surface-subtle)"
      }
    ]
  },
  "#FCFDB4": {
    "options": [
      {
        "ifProp": [
          "background-color",
          "background"
        ],
        "replace": "var(--ds-semantic-color-accent5-surface-subtle)"
      }
    ]
  },
  "#fff341": {
    "options": [
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "var(--ds-semantic-color-accent5-border-subtle)"
      }
    ]
  },
  "#FFF341": {
    "options": [
      {
        "ifProp": [
          "border-bottom-color",
          "border-right-color",
          "border-left-color",
          "border-top-color",
          "border-bottom",
          "border-color",
          "border-right",
          "border-left",
          "border-top",
          "border"
        ],
        "replace": "var(--ds-semantic-color-accent5-border-subtle)"
      }
    ]
  },
  "120px": {
    "options": [
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "var(--ds-semantic-sizing-7xl)"
      }
    ]
  },
  "168px": {
    "options": [
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "var(--ds-semantic-sizing-8xl)"
      }
    ]
  },
  "240px": {
    "options": [
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "var(--ds-semantic-sizing-9xl)"
      }
    ]
  },
  "288px": {
    "options": [
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "var(--ds-semantic-sizing-10xl)"
      }
    ]
  },
  "320px": {
    "options": [
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "var(--ds-semantic-sizing-11xl)"
      }
    ]
  },
  "440px": {
    "options": [
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "var(--ds-semantic-sizing-12xl)"
      }
    ]
  },
  "560px": {
    "options": [
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "var(--ds-semantic-sizing-13xl)"
      }
    ]
  },
  "600px": {
    "options": [
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "var(--ds-semantic-sizing-14xl)"
      }
    ]
  },
  "672px": {
    "options": [
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "var(--ds-semantic-sizing-14xl-bis)"
      }
    ]
  },
  "768px": {
    "options": [
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "var(--ds-semantic-sizing-15xl)"
      }
    ]
  },
  "896px": {
    "options": [
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "var(--ds-semantic-sizing-16xl)"
      }
    ]
  },
  "12px": {
    "options": [
      {
        "ifProp": [
          "padding-inline-start",
          "padding-block-start",
          "margin-inline-start",
          "margin-inline-start",
          "padding-inline-end",
          "margin-block-start",
          "margin-block-start",
          "padding-block-end",
          "margin-inline-end",
          "margin-inline-end",
          "margin-block-end",
          "margin-block-end",
          "padding-bottom",
          "padding-inline",
          "padding-right",
          "padding-block",
          "margin-bottom",
          "margin-inline",
          "padding-left",
          "margin-right",
          "margin-block",
          "padding-top",
          "margin-left",
          "margin-top",
          "padding-x",
          "padding-y",
          "margin-x",
          "margin-y",
          "padding",
          "bottom",
          "margin",
          "right",
          "left",
          "top",
          "gap"
        ],
        "replace": "var(--ds-semantic-spacing-s)"
      },
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "var(--ds-semantic-sizing-xs)"
      },
      {
        "ifProp": [
          "font-size"
        ],
        "replace": "var(--ds-core-typography-font-size-2xs)"
      },
      {
        "ifProp": [
          "line-height"
        ],
        "replace": "var(--ds-core-typography-line-height-2xs)"
      }
    ]
  },
  "14px": {
    "options": [
      {
        "ifProp": [
          "font-size"
        ],
        "replace": "var(--ds-core-typography-font-size-xs)"
      },
      {
        "ifProp": [
          "line-height"
        ],
        "replace": "var(--ds-core-typography-line-height-xs)"
      }
    ]
  },
  "16px": {
    "options": [
      {
        "ifProp": [
          "padding-inline-start",
          "padding-block-start",
          "margin-inline-start",
          "margin-inline-start",
          "padding-inline-end",
          "margin-block-start",
          "margin-block-start",
          "padding-block-end",
          "margin-inline-end",
          "margin-inline-end",
          "margin-block-end",
          "margin-block-end",
          "padding-bottom",
          "padding-inline",
          "padding-right",
          "padding-block",
          "margin-bottom",
          "margin-inline",
          "padding-left",
          "margin-right",
          "margin-block",
          "padding-top",
          "margin-left",
          "margin-top",
          "padding-x",
          "padding-y",
          "margin-x",
          "margin-y",
          "padding",
          "bottom",
          "margin",
          "right",
          "left",
          "top",
          "gap"
        ],
        "replace": "var(--ds-semantic-spacing-m)"
      },
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "var(--ds-semantic-sizing-s)"
      },
      {
        "ifProp": [
          "font-size"
        ],
        "replace": "var(--ds-core-typography-font-size-s)"
      },
      {
        "ifProp": [
          "line-height"
        ],
        "replace": "var(--ds-core-typography-line-height-s)"
      }
    ]
  },
  "18px": {
    "options": [
      {
        "ifProp": [
          "font-size"
        ],
        "replace": "var(--ds-core-typography-font-size-s-bis)"
      }
    ]
  },
  "20px": {
    "options": [
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "var(--ds-semantic-sizing-sm)"
      },
      {
        "ifProp": [
          "font-size"
        ],
        "replace": "var(--ds-core-typography-font-size-m)"
      },
      {
        "ifProp": [
          "line-height"
        ],
        "replace": "var(--ds-core-typography-line-height-m)"
      }
    ]
  },
  "24px": {
    "options": [
      {
        "ifProp": [
          "padding-inline-start",
          "padding-block-start",
          "margin-inline-start",
          "margin-inline-start",
          "padding-inline-end",
          "margin-block-start",
          "margin-block-start",
          "padding-block-end",
          "margin-inline-end",
          "margin-inline-end",
          "margin-block-end",
          "margin-block-end",
          "padding-bottom",
          "padding-inline",
          "padding-right",
          "padding-block",
          "margin-bottom",
          "margin-inline",
          "padding-left",
          "margin-right",
          "margin-block",
          "padding-top",
          "margin-left",
          "margin-top",
          "padding-x",
          "padding-y",
          "margin-x",
          "margin-y",
          "padding",
          "bottom",
          "margin",
          "right",
          "left",
          "top",
          "gap"
        ],
        "replace": "var(--ds-semantic-spacing-l)"
      },
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "var(--ds-semantic-sizing-m)"
      },
      {
        "ifProp": [
          "font-size"
        ],
        "replace": "var(--ds-core-typography-font-size-l)"
      },
      {
        "ifProp": [
          "line-height"
        ],
        "replace": "var(--ds-core-typography-line-height-l)"
      }
    ]
  },
  "28px": {
    "options": [
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "var(--ds-semantic-sizing-ml)"
      },
      {
        "ifProp": [
          "font-size"
        ],
        "replace": "var(--ds-core-typography-font-size-l-bis)"
      }
    ]
  },
  "32px": {
    "options": [
      {
        "ifProp": [
          "padding-inline-start",
          "padding-block-start",
          "margin-inline-start",
          "margin-inline-start",
          "padding-inline-end",
          "margin-block-start",
          "margin-block-start",
          "padding-block-end",
          "margin-inline-end",
          "margin-inline-end",
          "margin-block-end",
          "margin-block-end",
          "padding-bottom",
          "padding-inline",
          "padding-right",
          "padding-block",
          "margin-bottom",
          "margin-inline",
          "padding-left",
          "margin-right",
          "margin-block",
          "padding-top",
          "margin-left",
          "margin-top",
          "padding-x",
          "padding-y",
          "margin-x",
          "margin-y",
          "padding",
          "bottom",
          "margin",
          "right",
          "left",
          "top",
          "gap"
        ],
        "replace": "var(--ds-semantic-spacing-xl)"
      },
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "var(--ds-semantic-sizing-l)"
      },
      {
        "ifProp": [
          "font-size"
        ],
        "replace": "var(--ds-core-typography-font-size-xl)"
      },
      {
        "ifProp": [
          "line-height"
        ],
        "replace": "var(--ds-core-typography-line-height-xl)"
      }
    ]
  },
  "48px": {
    "options": [
      {
        "ifProp": [
          "padding-inline-start",
          "padding-block-start",
          "margin-inline-start",
          "margin-inline-start",
          "padding-inline-end",
          "margin-block-start",
          "margin-block-start",
          "padding-block-end",
          "margin-inline-end",
          "margin-inline-end",
          "margin-block-end",
          "margin-block-end",
          "padding-bottom",
          "padding-inline",
          "padding-right",
          "padding-block",
          "margin-bottom",
          "margin-inline",
          "padding-left",
          "margin-right",
          "margin-block",
          "padding-top",
          "margin-left",
          "margin-top",
          "padding-x",
          "padding-y",
          "margin-x",
          "margin-y",
          "padding",
          "bottom",
          "margin",
          "right",
          "left",
          "top",
          "gap"
        ],
        "replace": "var(--ds-semantic-spacing-3xl)"
      },
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "var(--ds-semantic-sizing-2xl)"
      },
      {
        "ifProp": [
          "font-size"
        ],
        "replace": "var(--ds-core-typography-font-size-2xl)"
      }
    ]
  },
  "72px": {
    "options": [
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "var(--ds-semantic-sizing-5xl)"
      },
      {
        "ifProp": [
          "font-size"
        ],
        "replace": "var(--ds-core-typography-font-size-3xl)"
      }
    ]
  },
  "40px": {
    "options": [
      {
        "ifProp": [
          "padding-inline-start",
          "padding-block-start",
          "margin-inline-start",
          "margin-inline-start",
          "padding-inline-end",
          "margin-block-start",
          "margin-block-start",
          "padding-block-end",
          "margin-inline-end",
          "margin-inline-end",
          "margin-block-end",
          "margin-block-end",
          "padding-bottom",
          "padding-inline",
          "padding-right",
          "padding-block",
          "margin-bottom",
          "margin-inline",
          "padding-left",
          "margin-right",
          "margin-block",
          "padding-top",
          "margin-left",
          "margin-top",
          "padding-x",
          "padding-y",
          "margin-x",
          "margin-y",
          "padding",
          "bottom",
          "margin",
          "right",
          "left",
          "top",
          "gap"
        ],
        "replace": "var(--ds-semantic-spacing-2xl)"
      },
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "var(--ds-semantic-sizing-xl)"
      },
      {
        "ifProp": [
          "line-height"
        ],
        "replace": "var(--ds-core-typography-line-height-2xl)"
      }
    ]
  },
  "64px": {
    "options": [
      {
        "ifProp": [
          "padding-inline-start",
          "padding-block-start",
          "margin-inline-start",
          "margin-inline-start",
          "padding-inline-end",
          "margin-block-start",
          "margin-block-start",
          "padding-block-end",
          "margin-inline-end",
          "margin-inline-end",
          "margin-block-end",
          "margin-block-end",
          "padding-bottom",
          "padding-inline",
          "padding-right",
          "padding-block",
          "margin-bottom",
          "margin-inline",
          "padding-left",
          "margin-right",
          "margin-block",
          "padding-top",
          "margin-left",
          "margin-top",
          "padding-x",
          "padding-y",
          "margin-x",
          "margin-y",
          "padding",
          "bottom",
          "margin",
          "right",
          "left",
          "top",
          "gap"
        ],
        "replace": "var(--ds-semantic-spacing-4xl)"
      },
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "var(--ds-semantic-sizing-4xl)"
      }
    ]
  },
  "80px": {
    "options": [
      {
        "ifProp": [
          "padding-inline-start",
          "padding-block-start",
          "margin-inline-start",
          "margin-inline-start",
          "padding-inline-end",
          "margin-block-start",
          "margin-block-start",
          "padding-block-end",
          "margin-inline-end",
          "margin-inline-end",
          "margin-block-end",
          "margin-block-end",
          "padding-bottom",
          "padding-inline",
          "padding-right",
          "padding-block",
          "margin-bottom",
          "margin-inline",
          "padding-left",
          "margin-right",
          "margin-block",
          "padding-top",
          "margin-left",
          "margin-top",
          "padding-x",
          "padding-y",
          "margin-x",
          "margin-y",
          "padding",
          "bottom",
          "margin",
          "right",
          "left",
          "top",
          "gap"
        ],
        "replace": "var(--ds-semantic-spacing-5xl)"
      },
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "var(--ds-semantic-sizing-6xl)"
      }
    ]
  },
  "56px": {
    "options": [
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "var(--ds-semantic-sizing-3xl)"
      }
    ]
  },
  "2px": {
    "options": [
      {
        "ifProp": [
          "padding-inline-start",
          "padding-block-start",
          "margin-inline-start",
          "margin-inline-start",
          "padding-inline-end",
          "margin-block-start",
          "margin-block-start",
          "padding-block-end",
          "margin-inline-end",
          "margin-inline-end",
          "margin-block-end",
          "margin-block-end",
          "padding-bottom",
          "padding-inline",
          "padding-right",
          "padding-block",
          "margin-bottom",
          "margin-inline",
          "padding-left",
          "margin-right",
          "margin-block",
          "padding-top",
          "margin-left",
          "margin-top",
          "padding-x",
          "padding-y",
          "margin-x",
          "margin-y",
          "padding",
          "bottom",
          "margin",
          "right",
          "left",
          "top",
          "gap"
        ],
        "replace": "var(--ds-semantic-spacing-4xs)"
      }
    ]
  },
  "4px": {
    "options": [
      {
        "ifProp": [
          "padding-inline-start",
          "padding-block-start",
          "margin-inline-start",
          "margin-inline-start",
          "padding-inline-end",
          "margin-block-start",
          "margin-block-start",
          "padding-block-end",
          "margin-inline-end",
          "margin-inline-end",
          "margin-block-end",
          "margin-block-end",
          "padding-bottom",
          "padding-inline",
          "padding-right",
          "padding-block",
          "margin-bottom",
          "margin-inline",
          "padding-left",
          "margin-right",
          "margin-block",
          "padding-top",
          "margin-left",
          "margin-top",
          "padding-x",
          "padding-y",
          "margin-x",
          "margin-y",
          "padding",
          "bottom",
          "margin",
          "right",
          "left",
          "top",
          "gap"
        ],
        "replace": "var(--ds-semantic-spacing-3xs)"
      },
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "var(--ds-semantic-sizing-3xs)"
      }
    ]
  },
  "6px": {
    "options": [
      {
        "ifProp": [
          "padding-inline-start",
          "padding-block-start",
          "margin-inline-start",
          "margin-inline-start",
          "padding-inline-end",
          "margin-block-start",
          "margin-block-start",
          "padding-block-end",
          "margin-inline-end",
          "margin-inline-end",
          "margin-block-end",
          "margin-block-end",
          "padding-bottom",
          "padding-inline",
          "padding-right",
          "padding-block",
          "margin-bottom",
          "margin-inline",
          "padding-left",
          "margin-right",
          "margin-block",
          "padding-top",
          "margin-left",
          "margin-top",
          "padding-x",
          "padding-y",
          "margin-x",
          "margin-y",
          "padding",
          "bottom",
          "margin",
          "right",
          "left",
          "top",
          "gap"
        ],
        "replace": "var(--ds-semantic-spacing-2xs)"
      }
    ]
  },
  "8px": {
    "options": [
      {
        "ifProp": [
          "padding-inline-start",
          "padding-block-start",
          "margin-inline-start",
          "margin-inline-start",
          "padding-inline-end",
          "margin-block-start",
          "margin-block-start",
          "padding-block-end",
          "margin-inline-end",
          "margin-inline-end",
          "margin-block-end",
          "margin-block-end",
          "padding-bottom",
          "padding-inline",
          "padding-right",
          "padding-block",
          "margin-bottom",
          "margin-inline",
          "padding-left",
          "margin-right",
          "margin-block",
          "padding-top",
          "margin-left",
          "margin-top",
          "padding-x",
          "padding-y",
          "margin-x",
          "margin-y",
          "padding",
          "bottom",
          "margin",
          "right",
          "left",
          "top",
          "gap"
        ],
        "replace": "var(--ds-semantic-spacing-xs)"
      },
      {
        "ifProp": [
          "min-height",
          "max-height",
          "min-width",
          "max-width",
          "container",
          "height",
          "width",
          "flex"
        ],
        "replace": "var(--ds-semantic-sizing-2xs)"
      }
    ]
  }
};