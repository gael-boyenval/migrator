# Publishing Guide

This document explains how to publish the `@gael-boyenval/migrator` package to npm.

## Prerequisites

1. **npm Account**: You need an npm account with access to the `@gael-boyenval` organization
2. **Login**: Make sure you're logged in to npm:
   ```bash
   npm login
   ```

## Publishing Process

### Option 1: Using the Publish Script (Recommended)

The easiest way to publish is using the provided script:

```bash
npm run publish:package
```

This script will:

- ✅ Check if you're logged in to npm
- ✅ Verify you're on the main branch
- ✅ Check for uncommitted changes
- ✅ Run tests
- ✅ Build the project
- ✅ Show what will be published
- ✅ Ask for confirmation
- ✅ Publish to npm
- ✅ Create and push a git tag

### Option 2: Manual Publishing

If you prefer to publish manually:

1. **Run tests**:

   ```bash
   npm test
   ```

2. **Build the project**:

   ```bash
   npm run build
   ```

3. **Check what will be published**:

   ```bash
   npm pack --dry-run
   ```

4. **Publish**:

   ```bash
   npm publish
   ```

5. **Create and push git tag**:
   ```bash
   git tag "v$(npm view @gael-boyenval/migrator version)"
   git push origin "v$(npm view @gael-boyenval/migrator version)"
   ```

## Version Management

### Updating Version

Use the provided scripts to update the version:

```bash
# Patch version (1.0.0 -> 1.0.1)
npm run version:patch

# Minor version (1.0.0 -> 1.1.0)
npm run version:minor

# Major version (1.0.0 -> 2.0.0)
npm run version:major
```

These scripts will:

- Update the version in `package.json`
- Create a git commit with the version change
- Create a git tag

### Manual Version Update

You can also update the version manually:

```bash
npm version patch   # or minor, major
```

## Package Configuration

The package is configured with the following key settings:

- **Name**: `@gael-boyenval/migrator`
- **Access**: Public (scoped package)
- **Files**: Only `dist/`, `README.md`, and `LICENSE` are included
- **Engines**: Node.js >= 16.0.0
- **TypeScript**: Includes type definitions

## Verification

After publishing, verify the package:

1. **Check npm registry**:

   ```bash
   npm view @gael-boyenval/migrator
   ```

2. **Test installation**:

   ```bash
   npm install -g @gael-boyenval/migrator
   migrator --help
   ```

3. **Check package contents**:
   ```bash
   npm pack @gael-boyenval/migrator
   tar -tzf gael-boyenval-migrator-*.tgz
   ```

## Troubleshooting

### Common Issues

1. **"You do not have permission to publish"**

   - Make sure you're logged in: `npm whoami`
   - Check you have access to the `@gael-boyenval` organization

2. **"Package already exists"**

   - Update the version number before publishing
   - Use `npm run version:patch` to increment

3. **"Build failed"**

   - Check TypeScript compilation: `npm run build`
   - Fix any TypeScript errors before publishing

4. **"Tests failed"**
   - Run tests locally: `npm test`
   - Fix failing tests before publishing

### Rollback

If you need to rollback a published version:

1. **Unpublish** (only within 24 hours):

   ```bash
   npm unpublish @gael-boyenval/migrator@version
   ```

2. **Deprecate** (after 24 hours):
   ```bash
   npm deprecate @gael-boyenval/migrator@version "This version has issues"
   ```

## Security

- Never commit sensitive information to the repository
- Use `.npmignore` to exclude unnecessary files
- The `prepublishOnly` script ensures tests pass before publishing
- All dependencies are properly declared in `package.json`

## Links

- **npm Package**: https://www.npmjs.com/package/@gael-boyenval/migrator
- **GitHub Repository**: https://github.com/gael-boyenval/migrator
- **Documentation**: https://github.com/gael-boyenval/migrator#readme
