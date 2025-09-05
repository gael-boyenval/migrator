module.exports = {
  include: ["test-pattern-issue.css"],
  exclude: [],
  migrations: [
    {
      name: "css-values",
      plugin: "css-values",
      config: {
        mappings: {
          "--my-test-pattern-50": {
            options: [
              {
                ifProp: ["color", "background", "border", "padding"],
                replace: "--my-replacement-50"
              }
            ]
          }
        }
      }
    }
  ]
};
