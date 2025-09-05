module.exports = {
  include: ["test-extended-context.css"],
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
                ifProp: ["color", "background"],
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
