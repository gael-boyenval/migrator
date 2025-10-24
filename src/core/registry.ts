import { Plugin } from "./plugin-interface";
import { SimpleReplacePlugin } from "../plugins/simple-replace/simple-replace";
import { CSSValuesPlugin } from "../plugins/css-values/css-values";
import { StyleValuesPlugin } from "../plugins/style-values/style-values";

export class PluginRegistry {
  private plugins = new Map<string, Plugin>();

  constructor() {
    this.registerBuiltInPlugins();
  }

  private registerBuiltInPlugins = (): void => {
    const simpleReplace = new SimpleReplacePlugin();
    this.plugins.set(simpleReplace.name, simpleReplace);

    const cssValues = new CSSValuesPlugin();
    this.plugins.set(cssValues.name, cssValues);

    const styleValues = new StyleValuesPlugin();
    this.plugins.set(styleValues.name, styleValues);
  };

  register = (plugin: Plugin): void => {
    this.plugins.set(plugin.name, plugin);
  };

  get = (name: string): Plugin | undefined => {
    return this.plugins.get(name);
  };

  has = (name: string): boolean => {
    return this.plugins.has(name);
  };

  list = (): string[] => {
    return Array.from(this.plugins.keys());
  };
}
