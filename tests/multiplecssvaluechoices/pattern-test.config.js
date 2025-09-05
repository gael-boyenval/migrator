module.exports = {
  "include": [
    "style.scss"
  ],
  "exclude": [
    "**/*.min.*",
    "**/node_modules/**",
    "**/dist/**"
  ],
  "migrations": [
    {
      "name": "Test pattern matching within CSS values",
      "plugin": "css-values",
      "config": {
        "mappings": {
          "--ds-core-color-gray-200": {
            "options": [
              {
                "ifProp": [
                  "border-color",
                  "border",
                  "border-bottom",
                  "border-top",
                  "border-left",
                  "border-right",
                  "border-top-color",
                  "border-left-color",
                  "border-right-color",
                  "border-bottom-color"
                ],
                "replace": [
                  "--ds-semantic-color-disabled-border-medium",
                  "--ds-semantic-color-layout-border-medium-default"
                ]
              },
              {
                "ifProp": ["color"],
                "replace": "--ds-semantic-content-color-primary"
              },
              {
                "ifProp": ["background-color"],
                "replace": "--ds-semantic-surface-color-primary"
              }
            ]
          }
        }
      }
    }
  ]
};
