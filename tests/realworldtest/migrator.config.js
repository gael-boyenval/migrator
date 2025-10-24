import { simpleReplaces, cssValues} from './config.js';

export default {
  "include": [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{css,scss}",
    "./style/**/*.{css,scss}",
  ],
  "exclude": [
    "**/node_modules/**",
    "**/dist/**",
    "config.js"
  ],
  "migrations": [
    {
      name: 'Replace tokens',
      plugin: 'simple-replace',
      config: {
        mappings: simpleReplaces,
      },
    },
    {
      name: 'Replace tokens with property checks',
      plugin: 'css-values',
      config: {
        mappings: cssValues,
      },
    },
  ]
};
