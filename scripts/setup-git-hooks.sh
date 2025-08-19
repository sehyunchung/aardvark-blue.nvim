#!/bin/bash

# Setup script for git hooks
# Run this script to configure git hooks for the project

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
GIT_HOOKS_DIR="$PROJECT_ROOT/.git/hooks"
SOURCE_HOOKS_DIR="$PROJECT_ROOT/.githooks"

echo "Setting up git hooks for aardvark-blue.nvim..."

# Check if we're in a git repository
if [ ! -d "$PROJECT_ROOT/.git" ]; then
    echo "Error: Not in a git repository"
    exit 1
fi

# Create hooks directory if it doesn't exist
mkdir -p "$GIT_HOOKS_DIR"

# Copy hooks from .githooks to .git/hooks
if [ -d "$SOURCE_HOOKS_DIR" ]; then
    for hook in "$SOURCE_HOOKS_DIR"/*; do
        if [ -f "$hook" ]; then
            hook_name=$(basename "$hook")
            target_path="$GIT_HOOKS_DIR/$hook_name"
            
            echo "Installing $hook_name hook..."
            cp "$hook" "$target_path"
            chmod +x "$target_path"
        fi
    done
    
    echo "✅ Git hooks installed successfully!"
    echo ""
    echo "Installed hooks:"
    ls -la "$GIT_HOOKS_DIR" | grep -v "sample" || true
    echo ""
    echo "💡 These hooks will:"
    echo "   • Validate JSON configuration files before commit"
    echo "   • Check TypeScript compilation"
    echo "   • Automatically regenerate theme files when configs change"
    echo "   • Ensure generated files are included in commits"
else
    echo "Error: Source hooks directory not found: $SOURCE_HOOKS_DIR"
    exit 1
fi