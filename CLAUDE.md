# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

aardvark-blue.nvim is a Neovim colorscheme plugin inspired by the Aardvark Blue theme from Ghostty terminal. It provides optimal readability with a deep blue background and balanced syntax highlighting.

## File Structure

```
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
    └── cursor/                  # Future Cursor/VS Code theme
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
- Function names: Bright yellow `#ffe763`
- Variable names: White `#dddddd`
- Strings: Bright green `#95dc55`
- Numbers: Bright blue `#60a4ec`
- Types: Bright cyan `#60b6cb`

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
1. Test various language files (Zig, Lua, JavaScript, etc.)
2. Compare side-by-side with Ghostty terminal
3. Verify both TreeSitter and default syntax highlighting
4. Test LSP features (errors, warnings, references)

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

- [ ] Add Cursor/VS Code theme (extras/cursor/)
- [ ] Additional language-specific highlights
- [ ] Consider light mode variant
- [ ] Incorporate community feedback

## Contribution Guide

1. Always compare changes with Ghostty original
2. Consider both TreeSitter and default syntax highlighting
3. Documentation updates are mandatory
4. Specify reason for changes in commit messages
