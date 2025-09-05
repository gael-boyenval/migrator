module.exports = {
  include: ["*.css"],
  exclude: [],
  migrations: [
    {
      name: "css-values",
      plugin: "css-values",
      config: {
        mappings: {
          "--ds-stuff-5": {
            options: [
              {
                ifProp: ["color", "background", "border", "padding"],
                replace: "--ds-replacement-5"
              }
            ]
          }
        }
      }
    }
  ]
};
