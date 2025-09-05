import { MigratorConfig, MigrationStep } from "../types";

export const isValidConfig = (config: unknown): config is MigratorConfig =>
  typeof config === "object" &&
  config !== null &&
  "include" in config &&
  "migrations" in config &&
  Array.isArray((config as any).include) &&
  Array.isArray((config as any).migrations);

export const validateConfig = (rawConfig: unknown): MigratorConfig => {
  // Check if config is an object
  if (typeof rawConfig !== "object" || rawConfig === null) {
    throw new Error("Invalid configuration: configuration must be an object");
  }

  const config = rawConfig as any;
  const errors: string[] = [];

  // Check top-level required fields
  if (!("include" in config)) {
    errors.push("missing required field: 'include'");
  } else if (!Array.isArray(config.include)) {
    errors.push("field 'include' must be an array");
  } else if (config.include.length === 0) {
    errors.push("field 'include' cannot be empty");
  }

  if (!("migrations" in config)) {
    errors.push("missing required field: 'migrations'");
  } else if (!Array.isArray(config.migrations)) {
    errors.push("field 'migrations' must be an array");
  } else if (config.migrations.length === 0) {
    errors.push("field 'migrations' cannot be empty");
  }

  // Check optional fields
  if ("exclude" in config && !Array.isArray(config.exclude)) {
    errors.push("field 'exclude' must be an array (if provided)");
  }

  // Validate each migration step
  if (Array.isArray(config.migrations)) {
    config.migrations.forEach((step: any, index: number) => {
      const stepErrors: string[] = [];

      if (!step || typeof step !== "object") {
        stepErrors.push("must be an object");
      } else {
        if (!("name" in step)) {
          stepErrors.push("missing required field: 'name'");
        } else if (typeof step.name !== "string") {
          stepErrors.push("field 'name' must be a string");
        } else if (step.name.trim() === "") {
          stepErrors.push("field 'name' cannot be empty");
        }

        if (!("plugin" in step)) {
          stepErrors.push("missing required field: 'plugin'");
        } else if (typeof step.plugin !== "string") {
          stepErrors.push("field 'plugin' must be a string");
        } else if (step.plugin.trim() === "") {
          stepErrors.push("field 'plugin' cannot be empty");
        }

        if (!("config" in step)) {
          stepErrors.push("missing required field: 'config'");
        } else if (typeof step.config !== "object" || step.config === null) {
          stepErrors.push("field 'config' must be an object");
        }
      }

      if (stepErrors.length > 0) {
        errors.push(
          `migration step at index ${index}: ${stepErrors.join(", ")}`
        );
      }
    });
  }

  // If there are any errors, throw a detailed error message
  if (errors.length > 0) {
    const errorMessage = `Invalid configuration:\n${errors
      .map((error) => `  - ${error}`)
      .join("\n")}`;
    throw new Error(errorMessage);
  }

  return config as MigratorConfig;
};

export const isValidMigrationStep = (step: unknown): step is MigrationStep =>
  typeof step === "object" &&
  step !== null &&
  "name" in step &&
  "plugin" in step &&
  "config" in step &&
  typeof (step as any).name === "string" &&
  typeof (step as any).plugin === "string";
