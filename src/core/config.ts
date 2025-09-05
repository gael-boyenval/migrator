import * as fs from "fs";
import * as path from "path";
import { MigratorConfig, Result } from "../types";
import { validateConfig } from "../utils/validation";

export class ConfigManager {
  private requireFn: (path: string) => any = require;

  loadConfig = async (configPath: string): Promise<Result<MigratorConfig>> => {
    try {
      if (!fs.existsSync(configPath)) {
        return {
          success: false,
          error: new Error(`Configuration file not found: ${configPath}`),
        };
      }

      const absolutePath = path.resolve(configPath);
      let config: any;

      // Check if it's a JSON file
      if (path.extname(configPath) === ".json") {
        const content = fs.readFileSync(absolutePath, "utf8");
        config = JSON.parse(content);
      } else {
        // For .js files, try to load with require first (CommonJS)
        try {
          const requiredModule = this.requireFn(absolutePath);

          // Check if this is an ES6 module (has __esModule property or looks like ES6 module)
          const isES6Module =
            requiredModule &&
            typeof requiredModule === "object" &&
            (requiredModule.__esModule ||
              (Object.keys(requiredModule).length > 0 &&
                !requiredModule.include &&
                !requiredModule.migrations));

          if (isES6Module) {
            // This is an ES6 module loaded via require
            if (requiredModule.default) {
              // Has default export
              config = requiredModule.default;
            } else {
              // No default export, try to find the config object
              // Look for common export names like 'config', 'migratorConfig', etc.
              const possibleNames = [
                "config",
                "migratorConfig",
                "migrationConfig",
              ];
              for (const name of possibleNames) {
                if (
                  requiredModule[name] &&
                  typeof requiredModule[name] === "object"
                ) {
                  config = requiredModule[name];
                  break;
                }
              }
              // If no named export found, use the module itself (fallback)
              if (!config) {
                config = requiredModule;
              }
            }
          } else {
            // This is a regular CommonJS module
            config = requiredModule;
          }
        } catch (requireError) {
          // If require fails, it might be an ES6 module that needs dynamic import
          // Try to read the file and check if it's an ES6 module
          const content = fs.readFileSync(absolutePath, "utf8");

          // Check if it's an ES6 module (has import/export)
          if (content.includes("import ") || content.includes("export ")) {
            try {
              // Use dynamic import for ES6 modules
              const module = await import(absolutePath);
              // Handle both default export and named exports
              config = module.default || module;
            } catch (importError) {
              throw new Error(
                `Failed to load ES6 module: ${
                  importError instanceof Error
                    ? importError.message
                    : String(importError)
                }\n\n` +
                  `Make sure your ES6 module exports the configuration object as default export:\n` +
                  `  export default { include: [...], migrations: [...] };\n\n` +
                  `Or convert to CommonJS format:\n` +
                  `  module.exports = { include: [...], migrations: [...] };`
              );
            }
          } else {
            // If it's not an ES6 module, re-throw the original require error
            throw requireError;
          }
        }
      }

      const validatedConfig = validateConfig(config);
      return { success: true, data: validatedConfig };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  };

  // For testing purposes - allow injection of custom require function
  setRequireFunction = (requireFn: (path: string) => any) => {
    this.requireFn = requireFn;
  };

  createDefaultConfig = (): MigratorConfig => ({
    include: ["**/*.*"],
    exclude: ["**/node_modules/**", "**/dist/**"],
    migrations: [
      {
        name: "Replace deprecated tokens",
        plugin: "simple-replace",
        config: {
          mappings: {
            foo: "bar",
          },
        },
      },
    ],
  });

  createConfigFromTemplate = (template: string): MigratorConfig => {
    // For now, only support default template
    if (template !== "default") {
      throw new Error(`Unknown template: ${template}`);
    }
    return this.createDefaultConfig();
  };
}
