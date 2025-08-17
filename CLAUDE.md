# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

aardvark-blue.nvim is a Neovim colorscheme plugin inspired by the Aardvark Blue theme from Ghostty terminal. It provides optimal readability with a deep blue background and balanced syntax highlighting.

## File Structure

```bash
aardvark-blue.nvim/
├── colors/
│   └── aardvark-blue.lua        # Vim colorscheme entry point
├── lua/aardvark-blue/
│   ├── init.lua                 # Main colorscheme module
│   ├── palette.lua              # Color palette definitions
│   ├── highlights.lua           # Highlight group definitions
│   └── config.lua               # Configuration options
├── doc/
│   └── aardvark-blue.txt        # Vim help documentation
└── extras/
    └── vscode/                  # VS Code theme (v1.0.1)
```

## Core Components

### Color Palette (palette.lua)

- Uses exact color values from Ghostty Aardvark Blue theme
- Includes both ANSI colors and bright colors
- Defines semantic colors (error, warning, info, hint)

### Highlight Definitions (highlights.lua)

- **Ghostty 1:1 Matching**: Identical color distribution as terminal
- TreeSitter support for modern syntax highlighting
- LSP integration (diagnostics, reference highlights)
- Plugin compatibility (telescope, nvim-tree, etc.)

### Special Keyword Handling

- `pub`, `if`, `else`, `while`, `try`: Magenta `#c43ac3`
- `fn`: Bright blue `#60a4ec`
- Function names: Yellow `#dbba00`
- Variable names: White `#dddddd`
- Strings: Bright green `#95dc55`
- Numbers: Bright blue `#60a4ec`
- Types: Bright cyan `#60b6cb`

### TypeScript/TSX Specific Highlighting

- **TypeScript Modifiers**: `public`, `private`, `protected`, `readonly` - Yellow `#dbba00`
- **TypeScript Keywords**: `interface`, `type`, `enum`, `namespace` - Magenta `#c43ac3`
- **TypeScript Operators**: `keyof`, `satisfies`, `as`, `is` - Cyan `#008eb0`
- **Decorators**: `@Component`, `@Injectable` - Cyan `#008eb0`
- **React Components**: JSX/TSX component tags - Bright blue `#60a4ec`
- **HTML Tags in JSX**: Built-in HTML tags - Blue `#1370d3`
- **JSX Attributes**: Component and HTML attributes - Bright Yellow `#ffe763`
- **JSX Delimiters**: Tag opening/closing brackets - White `#dddddd`

### TreeSitter Group Implementation

The colorscheme leverages specific TreeSitter capture groups for precise syntax highlighting:

**Core Language Support:**

- `@keyword.function` → Bright blue `#60a4ec` (for `fn` keyword)
- `@keyword.operator` → Magenta `#c43ac3` (for `pub` keyword)
- `@keyword.conditional` → Magenta `#c43ac3` (for `if`, `else`)
- `@keyword.repeat` → Magenta `#c43ac3` (for `while`, `for`)
- `@keyword.exception` → Magenta `#c43ac3` (for `try`, `catch`)

**TypeScript Extensions:**

- `@keyword.modifier` → Yellow `#dbba00` (for access modifiers)
- `@keyword.type` → Magenta `#c43ac3` (for type declaration keywords)
- `@keyword.operator` → Cyan `#008eb0` (for type operators)
- `@attribute` → Cyan `#008eb0` (for decorators)

**JSX/TSX Extensions:**

- `@tag.tsx` → Bright blue `#60a4ec` (for React components)
- `@tag.builtin.tsx` → Blue `#1370d3` (for HTML elements)
- `@tag.attribute.tsx` → Bright Yellow `#ffe763` (for JSX attributes)
- `@tag.delimiter.tsx` → White `#bebebe` (for JSX brackets)

## Development Guidelines

### When Changing Colors

1. Check base colors in `palette.lua`
2. Modify corresponding highlight groups in `highlights.lua`
3. Update both TreeSitter and default syntax highlighting
4. Compare with Ghostty terminal to ensure consistency

### When Adding New Highlight Groups

1. Choose from existing color palette
2. Consider both TreeSitter groups and default Vim groups
3. Use consistent naming conventions
4. Document purpose with comments

### When Adding Configuration Options

1. Add to defaults in `config.lua`
2. Use options in `highlights.lua`
3. Update README.md documentation
4. Update Vim help documentation

## Testing Guide

### Local Testing

```lua
-- In Neovim configuration
{
  dir = "~/personal/aardvark-blue.nvim",
  priority = 1000,
  config = function()
    vim.cmd.colorscheme("aardvark-blue")
  end,
}
```

### Color Verification

1. Test various language files (Zig, Lua, JavaScript, TypeScript, TSX, etc.)
2. Compare side-by-side with Ghostty terminal
3. Verify both TreeSitter and default syntax highlighting
4. Test LSP features (errors, warnings, references)
5. Verify TypeScript-specific syntax (interfaces, generics, decorators)
6. Test JSX/TSX component rendering and attribute highlighting

## Plugin Distribution

### GitHub Release Preparation

1. Create version tags (v1.0.0, v1.1.0, etc.)
2. Write release notes
3. Add screenshots (README.md)
4. Verify plugin manager compatibility

### Plugin Manager Support

- lazy.nvim ✅
- packer.nvim ✅
- vim-plug ✅
- Default Vim packages ✅

## Future Plans

- [x] Add VS Code theme (extras/vscode/) - **Completed v1.0.1**
- [x] TypeScript and JSX/TSX syntax highlighting support
- [ ] Additional language-specific highlights (Go, Python, C++, etc.)
- [ ] Consider light mode variant
- [ ] Incorporate community feedback

## Contribution Guide

1. Always compare changes with Ghostty original
2. Consider both TreeSitter and default syntax highlighting
3. Test TypeScript/TSX files to ensure language-specific highlights work correctly
4. Documentation updates are mandatory
5. Specify reason for changes in commit messages
