#!/bin/bash

# Publish script for @gael-boyenval/migrator

set -e

echo "🚀 Publishing @gael-boyenval/migrator..."

# Check if we're logged in to npm
if ! npm whoami > /dev/null 2>&1; then
    echo "❌ Please log in to npm first: npm login"
    exit 1
fi

# Check if we're on the main branch
current_branch=$(git branch --show-current)
if [ "$current_branch" != "main" ]; then
    echo "⚠️  Warning: You're not on the main branch (current: $current_branch)"
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Check if there are uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "❌ You have uncommitted changes. Please commit or stash them first."
    exit 1
fi

# Run tests
echo "🧪 Running tests..."
npm test

# Build the project
echo "🔨 Building project..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Build failed - dist directory not found"
    exit 1
fi

# Show what will be published
echo "📦 Files to be published:"
npm pack --dry-run

# Confirm before publishing
read -p "📤 Publish to npm? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Publishing cancelled"
    exit 1
fi

# Publish to npm
echo "📤 Publishing to npm..."
npm publish

# Get the published version
published_version=$(npm view @gael-boyenval/migrator version)
echo "✅ Successfully published @gael-boyenval/migrator@$published_version"

# Create and push git tag
echo "🏷️  Creating git tag..."
git tag "v$published_version"
git push origin "v$published_version"

echo "🎉 Publishing complete!"
echo "📦 Package: https://www.npmjs.com/package/@gael-boyenval/migrator"
echo "🏷️  Tag: v$published_version"
