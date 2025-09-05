module.exports = {
  include: ["test-progress-*.css"],
  exclude: [],
  migrations: [
    {
      name: "css-values",
      plugin: "css-values",
      config: {
        mappings: {
          "--ds-core-color-gray-200": {
            options: [
              {
                ifProp: ["color", "background", "border"],
                replace: [
                  "--ds-semantic-color-disabled-border-medium",
                  "--ds-semantic-color-layout-border-medium-default"
                ]
              }
            ]
          }
        }
      }
    }
  ]
};
