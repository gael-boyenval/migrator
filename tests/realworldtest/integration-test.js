// Integration test to run the actual migrator on real-world files
const { CSSValuesPlugin } = require('../../dist/plugins/css-values/css-values.js');
const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

// Test mappings for the specific values mentioned
const testMappings = {
  // Map 14px to a semantic font size
  "14px": {
    options: [
      {
        ifProp: ["fontSize"],
        replace: "var(--ds-core-typography-font-size-xs)",
      },
    ],
  },
  
  // Map --core-space-xl to semantic spacing
  "var(--core-space-xl)": {
    options: [
      {
        ifProp: ["marginBottom"],
        replace: "var(--ds-semantic-spacing-large)",
      },
      {
        ifProp: ["margin"],
        replace: "var(--ds-semantic-spacing-large)",
      },
    ],
  },
  
  // Map the specific margin value
  "0 var(--core-space-xl) var(--core-space-xl)": {
    options: [
      {
        ifProp: ["margin"],
        replace: "0 var(--ds-semantic-spacing-large) var(--ds-semantic-spacing-large)",
      },
    ],
  },
};

async function runIntegrationTest() {
  console.log('🚀 Running integration test for CSS-in-JS properties...\n');
  
  const plugin = new CSSValuesPlugin();
  const testFile = join(process.cwd(), 'tests/realworldtest/testFiles/css-in-js-test.ts');
  const content = readFileSync(testFile, 'utf-8');
  
  console.log('📁 Test file content:');
  console.log(content);
  console.log('\n---\n');
  
  const config = {
    mappings: testMappings,
  };
  
  const mockMigratorUtils = {
    parseCSS: () => [],
    findProperties: () => [],
    replacePropertyValue: () => '',
    parseCSSInJS: (content) => {
      const { parseCSSInJS } = require('../../dist/utils/css-in-js-parser.js');
      return parseCSSInJS(content);
    },
    findCSSInJSProperties: () => [],
    replaceCSSInJSPropertyValue: (content, property, newValue) => {
      const { replaceCSSInJSPropertyValue } = require('../../dist/utils/css-in-js-parser.js');
      return replaceCSSInJSPropertyValue(content, property, newValue);
    },
    log: console.log,
  };
  
  const context = {
    fileData: content,
    filePath: 'css-in-js-test.ts',
    config,
    migratorUtils: mockMigratorUtils,
    isInteractive: false,
  };
  
  try {
    const result = await plugin.process(context);
    
    console.log('✅ Migration completed successfully!');
    console.log(`📊 Found ${result.changes.length} changes:`);
    
    result.changes.forEach((change, index) => {
      console.log(`  ${index + 1}. ${change.original} → ${change.replacement} (${change.count} occurrence${change.count > 1 ? 's' : ''})`);
    });
    
    console.log('\n📝 Updated file content:');
    console.log(result.data);
    
    // Save the result to a new file for inspection
    const outputFile = join(process.cwd(), 'tests/realworldtest/testFiles/css-in-js-test-migrated.ts');
    writeFileSync(outputFile, result.data);
    console.log(`\n💾 Migrated file saved to: ${outputFile}`);
    
    return result;
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

// Run the integration test
runIntegrationTest()
  .then(() => {
    console.log('\n🎉 Integration test completed successfully!');
  })
  .catch((error) => {
    console.error('\n💥 Integration test failed:', error);
    process.exit(1);
  });
