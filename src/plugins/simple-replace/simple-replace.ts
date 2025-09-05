import {
  Plugin,
  PluginContext,
  PluginResult,
} from "../../core/plugin-interface";
import { Change } from "../../types";
import { escapeRegExp } from "../../utils/file-utils";

export class SimpleReplacePlugin implements Plugin {
  name = "simple-replace";

  process = async (context: PluginContext): Promise<PluginResult> => {
    const { fileData, config } = context;
    const { mappings } = config;

    let newData = fileData;
    const changes: Change[] = [];

    for (const [search, replacement] of Object.entries(mappings)) {
      const regex = new RegExp(escapeRegExp(search), "g");
      const matches = newData.match(regex);

      if (matches) {
        newData = newData.replace(regex, replacement as string);
        changes.push({
          type: "replace",
          original: search,
          replacement: replacement as string,
          count: matches.length,
        });
      }
    }

    return {
      data: newData,
      changes,
    };
  };
}
